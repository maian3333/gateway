import dayjs from 'dayjs/esm';

import { ISchedule, NewSchedule } from './schedule.model';

export const sampleWithRequiredData: ISchedule = {
  id: '64a7231d-35cf-456b-98ca-3f5cab909dc9',
  departureTime: dayjs('2025-08-30T20:30'),
  arrivalTime: dayjs('2025-08-31T14:18'),
  totalSeats: 4688,
  availableSeats: 1835,
  basePrice: 536.89,
  isActive: true,
  createdAt: dayjs('2025-08-31T16:28'),
  updatedAt: dayjs('2025-08-31T11:21'),
};

export const sampleWithPartialData: ISchedule = {
  id: '64ccdbe0-1668-44f8-bba6-f90008ad05d9',
  departureTime: dayjs('2025-08-31T01:18'),
  arrivalTime: dayjs('2025-08-31T03:15'),
  totalSeats: 3286,
  availableSeats: 18361,
  basePrice: 23366.57,
  isActive: false,
  createdAt: dayjs('2025-08-30T20:17'),
  updatedAt: dayjs('2025-08-30T23:37'),
};

export const sampleWithFullData: ISchedule = {
  id: '5a565d23-7eec-4555-944c-e4838b9fa180',
  departureTime: dayjs('2025-08-31T04:36'),
  arrivalTime: dayjs('2025-08-31T13:11'),
  totalSeats: 1328,
  availableSeats: 6770,
  basePrice: 2126.22,
  isActive: false,
  createdAt: dayjs('2025-08-31T10:13'),
  updatedAt: dayjs('2025-08-30T23:04'),
};

export const sampleWithNewData: NewSchedule = {
  departureTime: dayjs('2025-08-30T22:54'),
  arrivalTime: dayjs('2025-08-31T04:19'),
  totalSeats: 27218,
  availableSeats: 12019,
  basePrice: 30973.85,
  isActive: false,
  createdAt: dayjs('2025-08-31T02:42'),
  updatedAt: dayjs('2025-08-31T15:17'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
