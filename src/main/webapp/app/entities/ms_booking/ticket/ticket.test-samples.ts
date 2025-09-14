import dayjs from 'dayjs/esm';

import { ITicket, NewTicket } from './ticket.model';

export const sampleWithRequiredData: ITicket = {
  id: '6288f68a-0c91-4447-84b6-ee245fb87118',
  scheduleId: '2727de82-1cf0-48b9-80d0-dc35391716c6',
  seatNumber: 'farm',
  seatType: 'FIRST_CLASS',
  price: 29866.34,
  status: 'EXPIRED',
  createdAt: dayjs('2025-08-31T13:39'),
  updatedAt: dayjs('2025-08-30T19:22'),
};

export const sampleWithPartialData: ITicket = {
  id: 'c742dfc8-30b4-4242-b0bf-ccf81ca55ad1',
  scheduleId: '3b8ac7af-5ec8-4815-8f22-cb83ff01dcb5',
  seatNumber: 'functional',
  seatType: 'FIRST_CLASS',
  price: 30556.66,
  status: 'CANCELLED',
  reservedUntil: dayjs('2025-08-30T23:46'),
  createdAt: dayjs('2025-08-30T19:29'),
  updatedAt: dayjs('2025-08-30T20:10'),
};

export const sampleWithFullData: ITicket = {
  id: '752d0453-09ab-4838-8064-f19bc83c813a',
  scheduleId: '64674ca3-4700-4bfd-883e-7e7cfdb7c13c',
  seatNumber: 'yahoo wrongly private',
  seatType: 'ECONOMY',
  price: 22086.89,
  status: 'EXPIRED',
  reservedUntil: dayjs('2025-08-31T12:51'),
  createdAt: dayjs('2025-08-30T22:09'),
  updatedAt: dayjs('2025-08-30T19:03'),
};

export const sampleWithNewData: NewTicket = {
  scheduleId: '83a8c9bf-c7cf-4893-8656-9809543c71be',
  seatNumber: 'gah',
  seatType: 'BUSINESS',
  price: 11316.97,
  status: 'EXPIRED',
  createdAt: dayjs('2025-08-30T22:43'),
  updatedAt: dayjs('2025-08-31T04:54'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
