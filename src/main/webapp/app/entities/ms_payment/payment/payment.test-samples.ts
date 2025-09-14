import dayjs from 'dayjs/esm';

import { IPayment, NewPayment } from './payment.model';

export const sampleWithRequiredData: IPayment = {
  id: '2961fd68-a9f1-488c-9629-f0074093e98e',
  bookingId: '6dc1cddc-530b-44c8-a5bc-9c6be9af29e2',
  userId: '46fbd550-36d7-4053-a845-6c2ca7c5b15f',
  amount: 8417.64,
  currency: 'psst',
  paymentMethod: 'even',
  status: 'REFUNDED',
  createdAt: dayjs('2025-08-30T17:41'),
  updatedAt: dayjs('2025-08-31T00:45'),
};

export const sampleWithPartialData: IPayment = {
  id: 'd95dcc6d-33af-4767-9231-66f60f094f2e',
  bookingId: 'bb0e3044-7fc2-4e1f-8df9-f05dee90c9be',
  userId: 'df823dc1-469d-42bd-a428-c2c9a5deeeed',
  amount: 5315.91,
  currency: 'huzzah',
  paymentMethod: 'lest',
  status: 'REFUNDED',
  paymentGatewayResponse: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-08-31T09:40'),
  updatedAt: dayjs('2025-08-31T02:17'),
};

export const sampleWithFullData: IPayment = {
  id: 'd575cb51-5fbb-449b-8e1a-bef4b12b2bce',
  bookingId: '40742cda-a9db-4349-8601-4e5b92a00bd6',
  userId: '0f97ff43-451a-4632-9e7f-2cc9baa7ffa5',
  amount: 29252.02,
  currency: 'dark',
  paymentMethod: 'ah step collaborate',
  status: 'PENDING',
  transactionId: 'provided overconfidently',
  paymentGatewayResponse: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-08-30T19:15'),
  updatedAt: dayjs('2025-08-30T22:35'),
};

export const sampleWithNewData: NewPayment = {
  bookingId: '310abbdf-31a7-4453-8d65-5542b434b86d',
  userId: '10d7dbd8-39e3-4b6c-90ac-6c232b4e81db',
  amount: 22702.36,
  currency: 'of',
  paymentMethod: 'skean gently conservation',
  status: 'FAILED',
  createdAt: dayjs('2025-08-31T02:46'),
  updatedAt: dayjs('2025-08-31T07:24'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
