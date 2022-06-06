import { INavView } from '../model/nav-view';

export const RegistrationRouteView: Array<INavView> = [
  {
    pageOrder: 3,
    name: 'scan-details',
    url: '/scan-details',
    backUrl: '/scan'
  },
  {
    pageOrder: 4,
    name: 'connection-details',
    url: '/connection-details',
    backUrl: '/scan-details'
  },
  {
    pageOrder: 10,
    name: 'current-purchases',
    url: '/current-purchases',
    backUrl: '/purchase-summary'
  },
  {
    pageOrder: 12,
    name: 'purchase-details',
    url: '/purchase-details',
    backUrl: '/current-purchases'
  },
  {
    pageOrder: 13,
    name: 'purchase-details',
    url: '/purchase-details',
    backUrl: '/current-purchases',
    isCacheId: true
  },
  {
    pageOrder: 15,
    name: 'invoice-details',
    url: '/invoice-details',
    backUrl: '/purchase-details'
  },
  {
    pageOrder: 16,
    name: 'pdf-result',
    url: '/pdf-result',
    backUrl: '/current-purchases'
  }
];

