import cx from 'classnames';
import { memo } from 'react';
import { HiViewGridAdd } from 'react-icons/hi';
import { Button, Card, Step, Stepper, Typography } from 'ui-components';

import { CopyToClipboardIcon } from '@/components/CopyToClipboardIcon';
import { usePageNavigation } from '@/utils/usePageNavigation';

export const AWSTerraform = memo(() => {
  const { navigate } = usePageNavigation();
  const code = `provider "aws" {
  region = "<AWS-REGION>; eg. us-east-1"
}

module "cloud-scanner_example_single-account-ecs" {
  source = "deepfence/cloud-scanner/aws//examples/single-account-ecs"
  version = "0.1.0"
  mgmt-console-url = "<Console URL> eg. XXX.XXX.XX.XXX"
  mgmt-console-port = "443"
  deepfence-key = "<Deepfence-key> eg. XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
`;

  return (
    <div className="w-full sm:w-1/2">
      <Stepper>
        <Step indicator={<HiViewGridAdd />} title="Teraform Cloud Formation">
          <div className={`${Typography.size.sm} dark:text-gray-200`}>
            Connect to your AWS Cloud Account via Teraform. Find out more information by{' '}
            <a
              href={`https://registry.terraform.io/modules/deepfence/cloud-scanner/aws/latest/examples/single-account-ecs#usag`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 dark:text-blue-500 mt-2"
            >
              reading our documentation
            </a>
            .
          </div>
        </Step>
        <Step indicator="1" title="Region Selection">
          <div>
            <p className={`mb-2.5 ${Typography.size.sm} dark:text-gray-200`}>
              Copy the following code and paste it into a .tf file on your local machine:
            </p>
            <Card className="w-full relative ">
              <pre
                className={cx(
                  'p-4 overflow-auto',
                  `${Typography.weight.normal} ${Typography.size.xs} `,
                )}
              >
                {code}
              </pre>
              <CopyToClipboardIcon text={code} />
            </Card>
          </div>
        </Step>
        <Step indicator="2" title="Deploy">
          <div className={`${Typography.size.sm} dark:text-gray-400`}>
            <p className="mb-2.5">
              Copy the following commands and paste them into your shell.
            </p>
            <Card className="w-full relative">
              <div className="relative">
                <pre
                  className={cx(
                    'pl-4 pt-4',
                    'h-fit',
                    `${Typography.weight.normal} ${Typography.size.xs} `,
                  )}
                >
                  terraform init
                </pre>
                <CopyToClipboardIcon text={'terraform init'} className="top-4" />
              </div>
              <div className="relative">
                <pre
                  className={cx(
                    'px-4',
                    'h-fit',
                    `${Typography.weight.normal} ${Typography.size.xs} `,
                  )}
                >
                  terraform plan
                </pre>
                <CopyToClipboardIcon text={'terraform plan'} className="top-0" />
              </div>
              <div className="relative">
                <pre
                  className={cx(
                    'px-4',
                    'h-fit',
                    `${Typography.weight.normal} ${Typography.size.xs} `,
                  )}
                >
                  terraform apply
                </pre>
                <CopyToClipboardIcon text={'terraform apply'} className="top-0" />
              </div>
            </Card>
            <div className="flex flex-col mt-6">
              <p className={`${Typography.size.xs}`}>
                Note: After successfully run the commands above, your connector will
                appear on MyConnector page, then you can perform scanning.
              </p>
              <Button
                size="xs"
                color="primary"
                className="ml-auto"
                onClick={() => {
                  navigate('/onboard/connectors/my-connectors');
                }}
              >
                Go to connectors
              </Button>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
});
