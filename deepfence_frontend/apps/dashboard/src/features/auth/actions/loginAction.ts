import { ActionFunction, redirect } from 'react-router-dom';

import { getAuthenticationApiClient } from '@/api/api';
import { ApiDocsBadRequestResponse } from '@/api/generated';
import { ApiError, makeRequest } from '@/utils/api';
import storage from '@/utils/storage';

export type LoginActionReturnType = {
  error?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
};

export const loginAction: ActionFunction = async ({
  request,
}): Promise<LoginActionReturnType> => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  const r = await makeRequest({
    apiFunction: getAuthenticationApiClient().login,
    apiArgs: [
      {
        modelLoginRequest: {
          email: body.email as string,
          password: body.password as string,
        },
      },
    ],
    errorHandler: async (r) => {
      const error = new ApiError<LoginActionReturnType>({});
      if (r.status === 404 || r.status === 401) {
        return error.set({
          error: 'Invalid credentials',
        });
      } else if (r.status === 400) {
        const modelResponse: ApiDocsBadRequestResponse = await r.json();
        return error.set({
          fieldErrors: {
            email: modelResponse.error_fields?.email,
            password: modelResponse.error_fields?.password,
          },
        });
      }
    },
  });

  if (ApiError.isApiError(r)) {
    return r.value();
  }

  storage.setAuth({
    accessToken: r.access_token,
    refreshToken: r.refresh_token,
  });
  throw redirect('/onboard', 302);
};
