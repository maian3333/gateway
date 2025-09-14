import NavbarItem from 'app/layouts/navbar/navbar-item.model';

export const EntityNavbarItems: NavbarItem[] = [
  {
    name: 'User',
    route: '/user',
    translationKey: 'global.menu.entities.msUserUser',
  },
  {
    name: 'KeycloakUser',
    route: '/keycloak-user',
    translationKey: 'global.menu.entities.msUserKeycloakUser',
  },
  {
    name: 'Route',
    route: '/route',
    translationKey: 'global.menu.entities.msRouteRoute',
  },
  {
    name: 'Schedule',
    route: '/schedule',
    translationKey: 'global.menu.entities.msRouteSchedule',
  },
  {
    name: 'Ticket',
    route: '/ticket',
    translationKey: 'global.menu.entities.msBookingTicket',
  },
  {
    name: 'Booking',
    route: '/booking',
    translationKey: 'global.menu.entities.msBookingBooking',
  },
  {
    name: 'Payment',
    route: '/payment',
    translationKey: 'global.menu.entities.msPaymentPayment',
  },
  {
    name: 'Notification',
    route: '/notification',
    translationKey: 'global.menu.entities.msNotificationNotification',
  },
];
