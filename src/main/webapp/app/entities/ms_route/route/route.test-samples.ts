import dayjs from 'dayjs/esm';

import { IRoute, NewRoute } from './route.model';

export const sampleWithRequiredData: IRoute = {
  id: 'a282ce57-bf05-4b7b-9623-ae9c3f229e13',
  routeName: 'bicycle pack',
  origin: 'ah nervously actual',
  destination: 'when timely',
  distance: 14114.86,
  estimatedDuration: 20261,
  transportType: 'TRAIN',
  isActive: false,
  createdAt: dayjs('2025-08-30T18:04'),
  updatedAt: dayjs('2025-08-30T20:45'),
};

export const sampleWithPartialData: IRoute = {
  id: '557970e1-c446-400a-a308-dba4f1ae218d',
  routeName: 'pants house knitting',
  origin: 'accentuate',
  destination: 'giving robust pendant',
  distance: 7054.97,
  estimatedDuration: 27262,
  transportType: 'BUS',
  isActive: true,
  createdAt: dayjs('2025-08-31T10:26'),
  updatedAt: dayjs('2025-08-31T05:15'),
};

export const sampleWithFullData: IRoute = {
  id: '90512c17-8f89-4696-928a-e1d37816cad0',
  routeName: 'misreport yahoo',
  origin: 'joyfully',
  destination: 'retool',
  distance: 17324.44,
  estimatedDuration: 1925,
  transportType: 'TRAIN',
  isActive: false,
  createdAt: dayjs('2025-08-31T12:50'),
  updatedAt: dayjs('2025-08-30T23:49'),
};

export const sampleWithNewData: NewRoute = {
  routeName: 'director miskey imagineer',
  origin: 'keel angrily',
  destination: 'rarely',
  distance: 22057.99,
  estimatedDuration: 31710,
  transportType: 'TRAIN',
  isActive: true,
  createdAt: dayjs('2025-08-31T12:02'),
  updatedAt: dayjs('2025-08-30T22:19'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
