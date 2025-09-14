import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    data: { pageTitle: 'gatewayApp.msUserUser.home.title' },
    loadChildren: () => import('./ms_user/user/user.routes'),
  },
  {
    path: 'keycloak-user',
    data: { pageTitle: 'gatewayApp.msUserKeycloakUser.home.title' },
    loadChildren: () => import('./ms_user/keycloak-user/keycloak-user.routes'),
  },
  {
    path: 'route',
    data: { pageTitle: 'gatewayApp.msRouteRoute.home.title' },
    loadChildren: () => import('./ms_route/route/route.routes'),
  },
  {
    path: 'schedule',
    data: { pageTitle: 'gatewayApp.msRouteSchedule.home.title' },
    loadChildren: () => import('./ms_route/schedule/schedule.routes'),
  },
  {
    path: 'ticket',
    data: { pageTitle: 'gatewayApp.msBookingTicket.home.title' },
    loadChildren: () => import('./ms_booking/ticket/ticket.routes'),
  },
  {
    path: 'booking',
    data: { pageTitle: 'gatewayApp.msBookingBooking.home.title' },
    loadChildren: () => import('./ms_booking/booking/booking.routes'),
  },
  {
    path: 'payment',
    data: { pageTitle: 'gatewayApp.msPaymentPayment.home.title' },
    loadChildren: () => import('./ms_payment/payment/payment.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'gatewayApp.msNotificationNotification.home.title' },
    loadChildren: () => import('./ms_notification/notification/notification.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
