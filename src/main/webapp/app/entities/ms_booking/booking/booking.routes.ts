import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import BookingResolve from './route/booking-routing-resolve.service';

const bookingRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/booking.component').then(m => m.BookingComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/booking-detail.component').then(m => m.BookingDetailComponent),
    resolve: {
      booking: BookingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/booking-update.component').then(m => m.BookingUpdateComponent),
    resolve: {
      booking: BookingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/booking-update.component').then(m => m.BookingUpdateComponent),
    resolve: {
      booking: BookingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bookingRoute;
