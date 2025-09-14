import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: '4917d9fb-b873-41d6-981d-153319417462',
  recipientId: '7cbd8e45-bf20-4985-9db0-587406cdd0fb',
  type: 'punctuation indeed',
  title: 'quickly longingly',
  message: '../fake-data/blob/hipster.txt',
  isRead: true,
  createdAt: dayjs('2025-08-31T00:50'),
};

export const sampleWithPartialData: INotification = {
  id: '901a96b6-6127-403c-ab49-0129d6818ca4',
  recipientId: '101bfb44-5fad-4589-885d-62783af2f3b8',
  type: 'terrorise bracelet',
  title: 'whereas loyally meaty',
  message: '../fake-data/blob/hipster.txt',
  isRead: false,
  createdAt: dayjs('2025-08-31T12:07'),
  scheduledAt: dayjs('2025-08-31T05:43'),
};

export const sampleWithFullData: INotification = {
  id: '27befbee-c69c-445f-a315-e759c182bfa5',
  recipientId: '073f2df6-7f85-484f-9a6f-41951f414a55',
  type: 'compromise whereas painfully',
  title: 'loftily fuzzy',
  message: '../fake-data/blob/hipster.txt',
  isRead: true,
  relatedEntityType: 'victoriously throughout abnormally',
  relatedEntityId: '7ab1b649-1055-4e53-8268-d02cf359b308',
  createdAt: dayjs('2025-08-31T04:14'),
  scheduledAt: dayjs('2025-08-31T06:54'),
};

export const sampleWithNewData: NewNotification = {
  recipientId: 'ced2f2c2-e523-4c7f-a107-5024f3ea15f6',
  type: 'whose',
  title: 'qua when',
  message: '../fake-data/blob/hipster.txt',
  isRead: false,
  createdAt: dayjs('2025-08-30T19:00'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
