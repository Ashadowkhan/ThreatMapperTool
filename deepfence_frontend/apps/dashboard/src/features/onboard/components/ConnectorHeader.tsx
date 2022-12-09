import cx from 'classnames';
import { HiChevronRight } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbLink, Typography } from 'ui-components';

type ConnectorHeaderProps = {
  title: string;
  description: string;
};

const canRoute = (pathname: string) => {
  const path = {
    addConnector: '',
    scanResult: '',
    viewResult: '',
  };
  if (pathname.includes('view-scan-results')) {
    path.viewResult = '/onboard/view-scan-results';
    path.scanResult = '/onboard/scan-infrastructure';
    path.addConnector = '/onboard/add-connectors';
  } else if (pathname.includes('scan-infrastructure')) {
    path.scanResult = '/onboard/scan-infrastructure';
    path.addConnector = '/onboard/add-connectors';
    path.viewResult = '#';
  } else if (pathname.includes('add-connectors')) {
    path.addConnector = '/onboard/add-connectors';
    path.scanResult = '#';
    path.viewResult = '#';
  }
  return path;
};

export const ConnectorHeader = ({ title, description }: ConnectorHeaderProps) => {
  const location = useLocation();

  const isAddConnectorRoutePath = () => {
    return location.pathname.includes('add-connectors');
  };

  const isScanRoutePath = () => {
    return location.pathname.includes('scan-infrastructure');
  };

  const isViewResultsRoutePath = () => {
    return location.pathname.includes('view-scan-results');
  };

  return (
    <div className="pt-8">
      <h1
        className={`${Typography.size['3xl']} leading-[38px] text-black dark:text-white`}
      >
        {title}
      </h1>
      <p
        className={`${Typography.size.base} ${Typography.weight.normal} mt-1.5 mb-4 dark:text-gray-400 text-gray-900`}
      >
        {description}
      </p>
      <div className="mb-8">
        <Breadcrumb separator={<HiChevronRight />} outline>
          <BreadcrumbLink>
            <Link
              to={canRoute(location.pathname).addConnector}
              className={cx({
                ['text-blue-600']: isAddConnectorRoutePath(),
              })}
            >
              Add a connector
            </Link>
          </BreadcrumbLink>
          <BreadcrumbLink>
            <Link
              to={canRoute(location.pathname).scanResult}
              className={cx({
                ['text-blue-400']: isScanRoutePath(),
              })}
            >
              Scan Infrastructure
            </Link>
          </BreadcrumbLink>
          <BreadcrumbLink>
            <Link
              to={canRoute(location.pathname).viewResult}
              className={cx({
                ['text-blue-400']: isViewResultsRoutePath(),
              })}
            >
              View Scan Results
            </Link>
          </BreadcrumbLink>
        </Breadcrumb>
      </div>
    </div>
  );
};
