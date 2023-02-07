import { Outlet } from 'react-router-dom';

import { DashboardLayout } from '@/features/dashboard/layouts/DashboardLayout';
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoader';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { module as integrations } from '@/features/integrations/pages/Integrations';
import {
  ConnectorsLayout,
  connectorsLoader,
} from '@/features/onboard/layouts/ConnectorsLayout';
import {
  OnboardLayout,
  rootOnboardLoader,
} from '@/features/onboard/layouts/OnboardLayout';
import { AmazonECRConnector } from '@/features/onboard/pages/AmazonECRConnector';
import { AWSConnector } from '@/features/onboard/pages/AWSConnector';
import { AzureConnector } from '@/features/onboard/pages/AzureConnector';
import { module as chooseScan } from '@/features/onboard/pages/ChooseScan';
import { ComplianceScanConfigure } from '@/features/onboard/pages/ComplianceScanConfigure';
import { ComplianceScanSummary } from '@/features/onboard/pages/ComplianceScanSummary';
import { AddConnector } from '@/features/onboard/pages/connectors/AddConnectors';
import { module as myConnectors } from '@/features/onboard/pages/connectors/MyConnectors';
import { DockerConnector } from '@/features/onboard/pages/DockerConnector';
import { GCPConnector } from '@/features/onboard/pages/GCPConnector';
import { K8sConnector } from '@/features/onboard/pages/K8sConnector';
import { LinuxConnector } from '@/features/onboard/pages/LinuxConnector';
import { module as scanInProgress } from '@/features/onboard/pages/ScanInProgress';
import { module as secretScanConfigure } from '@/features/onboard/pages/SecretScanConfigure';
import { module as secretScanSumary } from '@/features/onboard/pages/SecretScanSummary';
import { module as vulnerabilityScanConfigure } from '@/features/onboard/pages/VulnerabilityScanConfigure';
import { module as vulnerabilityScanSumary } from '@/features/onboard/pages/VulnerabilityScanSummary';
import { Registries } from '@/features/registries/pages/Registries';
import { CustomRouteObject } from '@/utils/router';

export const privateRoutes: CustomRouteObject[] = [
  {
    path: '/onboard',
    element: <OnboardLayout />,
    loader: rootOnboardLoader,
    children: [
      {
        path: 'connectors',
        element: <ConnectorsLayout />,
        loader: connectorsLoader,
        children: [
          {
            path: 'add-connectors',
            element: <AddConnector />,
            meta: { title: 'Add Connectors' },
          },
          {
            path: 'my-connectors',
            ...myConnectors,
            meta: { title: 'My Connectors' },
          },
        ],
      },
      {
        path: 'instructions',
        element: <Outlet />,
        children: [
          {
            path: 'cloud/aws',
            element: <AWSConnector />,
            meta: { title: 'Connect AWS Account' },
          },
          {
            path: 'cloud/gcp',
            element: <GCPConnector />,
            meta: { title: 'Connect GCP Account' },
          },
          {
            path: 'cloud/azure',
            element: <AzureConnector />,
            meta: { title: 'Connect Azure Account' },
          },
          {
            path: 'host/k8s',
            element: <K8sConnector />,
            meta: { title: 'Connect K8S Cluster' },
          },
          {
            path: 'host/docker',
            element: <DockerConnector />,
            meta: { title: 'Connect Docker Container' },
          },
          {
            path: 'host/linux',
            element: <LinuxConnector />,
            meta: { title: 'Connect Linux Machine' },
          },
          {
            path: 'registry/amazon-ecr',
            element: <AmazonECRConnector />,
            meta: { title: 'Connect ECR Registry' },
          },
        ],
      },
      {
        path: 'scan',
        children: [
          {
            path: 'choose/:nodeType/:nodeIds',
            ...chooseScan,
            meta: { title: 'Choose scan type' },
          },
          {
            path: 'configure/compliance',
            element: <ComplianceScanConfigure />,
            meta: { title: 'Configure Compliance Scan' },
          },
          {
            path: 'configure/vulnerability/:nodeType/:nodeIds',
            ...vulnerabilityScanConfigure,
            meta: { title: 'Configure Vulnerability Scan' },
          },
          {
            path: 'configure/secret/:nodeType/:nodeIds',
            ...secretScanConfigure,
            meta: { title: 'Configure Secret Scan' },
          },
          {
            path: 'view-summary/compliance',
            element: <ComplianceScanSummary />,
            meta: { title: 'Configure Compliance Scan' },
          },
          {
            path: 'view-summary/vulnerability/:scanIds',
            ...vulnerabilityScanSumary,
            meta: { title: 'Summary Vulnerability Scan' },
          },
          {
            path: 'view-summary/secret/:scanIds',
            ...secretScanSumary,
            meta: { title: 'Summary Secret Scan' },
          },
          {
            path: 'view-summary/running/:nodeId/:nodeType/:scanType/:bulkScanId',
            ...scanInProgress,
            meta: { title: 'Scan Summary' },
          },
        ],
      },
    ],
  },
  {
    path: '/',
    loader: dashboardLoader,
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        meta: { title: 'Dashboard' },
      },
      {
        path: 'registries',
        element: <Registries />,
        meta: { title: 'Registries' },
      },
      {
        path: 'integrations',
        ...integrations,
        meta: { title: 'Integrations' },
      },
    ],
  },
];
