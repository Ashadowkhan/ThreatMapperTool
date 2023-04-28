import { HiChevronRight } from 'react-icons/hi';
import { Outlet, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbLink } from 'ui-components';

import { DFLink } from '@/components/DFLink';
import { integrationTypeToNameMapping } from '@/features/integrations/pages/Integrations';

const IntegrationsLayout = () => {
  const params = useParams() as {
    integrationType: string;
  };

  if (!params.integrationType) {
    throw new Error('Integration Type is required');
  }

  return (
    <>
      <div className="flex p-2  w-full items-center shadow bg-white dark:bg-gray-800">
        <Breadcrumb separator={<HiChevronRight />} transparent>
          <BreadcrumbLink>
            <DFLink to="/integrations">Integrations</DFLink>
          </BreadcrumbLink>

          <BreadcrumbLink>
            <span className="inherit cursor-auto">
              {integrationTypeToNameMapping[params.integrationType]}
            </span>
          </BreadcrumbLink>
        </Breadcrumb>
      </div>

      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
};
export const module = {
  element: <IntegrationsLayout />,
};
