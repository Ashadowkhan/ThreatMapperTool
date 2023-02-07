import { IconContext } from 'react-icons';
import {
  FaAws,
  FaBook,
  FaBullhorn,
  FaCopyright,
  FaFire,
  FaGoogle,
  FaInstalod,
  FaMagento,
  FaMicrosoft,
  FaMixer,
  FaReact,
  FaSearchengin,
  FaSlack,
} from 'react-icons/fa';
import { HiArrowSmRight } from 'react-icons/hi';
import { Card } from 'ui-components';

import { DFLink } from '@/components/DFLink';

const IntegrationsData = [
  {
    name: 'Notification',
    icon: (
      <>
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-50 flex items-center justify-center rounded-sm">
          <IconContext.Provider
            value={{
              className: 'text-gray-600 dark:text-gray-200',
            }}
          >
            <FaBullhorn />
          </IconContext.Provider>
        </div>
      </>
    ),
    types: [
      {
        name: 'Slack',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-red-400',
            }}
          >
            <FaSlack />
          </IconContext.Provider>
        ),
      },
      {
        name: 'Microsoft Teams',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-blue-400',
            }}
          >
            <FaMicrosoft />
          </IconContext.Provider>
        ),
      },
      {
        name: 'Page Duty',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-green-400',
            }}
          >
            <FaMagento />
          </IconContext.Provider>
        ),
      },
      {
        name: 'HTTP Endpoint',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-blue-400',
            }}
          >
            <FaMixer />
          </IconContext.Provider>
        ),
      },
    ],
  },
  {
    name: 'SEIM',
    icon: (
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-50 flex items-center justify-center rounded-sm">
        <IconContext.Provider
          value={{
            className: 'text-gray-600 dark:text-gray-200',
          }}
        >
          <FaBook />
        </IconContext.Provider>
      </div>
    ),
    types: [
      {
        name: 'Splunk',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-green-400',
            }}
          >
            <FaReact />
          </IconContext.Provider>
        ),
      },
      {
        name: 'Elasticsearch',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-blue-400',
            }}
          >
            <FaSearchengin />
          </IconContext.Provider>
        ),
      },
      {
        name: 'Sumo Logic',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-green-400',
            }}
          >
            <FaInstalod />
          </IconContext.Provider>
        ),
      },
      {
        name: 'Google Chronicle',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-blue-400',
            }}
          >
            <FaGoogle />
          </IconContext.Provider>
        ),
      },
    ],
  },
  {
    name: 'Ticketing',
    icon: (
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-50 flex items-center justify-center rounded-sm">
        <IconContext.Provider
          value={{
            className: 'text-gray-600 dark:text-gray-200',
          }}
        >
          <FaCopyright />
        </IconContext.Provider>
      </div>
    ),
    types: [
      {
        name: 'Jira',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-blue-400',
            }}
          >
            <FaCopyright />
          </IconContext.Provider>
        ),
      },
    ],
  },
  {
    name: 'Archival',
    icon: (
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-50 flex items-center justify-center rounded-sm">
        <IconContext.Provider
          value={{
            className: 'text-gray-600 dark:text-gray-200',
          }}
        >
          <FaFire />
        </IconContext.Provider>
      </div>
    ),
    types: [
      {
        name: 'S3',
        icon: (
          <IconContext.Provider
            value={{
              className: 'w-10 h-10 text-yellow-400',
            }}
          >
            <FaAws />
          </IconContext.Provider>
        ),
      },
    ],
  },
];

const Integrations = () => {
  return (
    <div className="flex flex-col space-y-8">
      {IntegrationsData.map((integration) => {
        return (
          <section key={integration.name} className="flex flex-col">
            <div className="flex items-center pl-2 mb-2 text-gray-700">
              <IconContext.Provider
                value={{
                  className: 'w-4 h-4 text-gray-700',
                }}
              >
                {integration.icon}
              </IconContext.Provider>
              <h2 className="px-4 tracking-wider text-gary-900 dark:text-gray-200 font-semibold">
                {integration.name.toUpperCase()}
              </h2>
            </div>
            <div className="pl-2 flex flex-wrap gap-4">
              {integration?.types?.map((type) => {
                return (
                  <Card key={type.name} className="p-4 flex flex-col shrink-0 gap-y-1">
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-gray-900 text-md dark:text-white mr-4">
                        {type.name}
                      </h4>
                      <div className="ml-auto">
                        <DFLink to={'/'} className="flex items-center hover:no-underline">
                          <span className="text-xs text-blue-600 dark:text-blue-500">
                            Configure
                          </span>
                          <IconContext.Provider
                            value={{
                              className: 'text-blue-600 dark:text-blue-500 ',
                            }}
                          >
                            <HiArrowSmRight />
                          </IconContext.Provider>
                        </DFLink>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-6">
                      <div className="p-4 flex border-r border-gray-200 dark:border-gray-700 w-20 h-20">
                        {type.icon}
                      </div>
                      <div className="flex flex-col gap-x-4">
                        <span className="text-[1.5rem] text-gray-900 dark:text-gray-200 font-light">
                          23
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          Connections
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export const module = {
  element: <Integrations />,
};
