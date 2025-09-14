import dayjs from 'dayjs/esm';

import { IUser, NewUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'cdbac2c8-5af0-4c05-9390-f838bceaee96',
  username: 'swill lumbering',
  email: 'Laurie.Erdman13@hotmail.com',
  passwordHash: 'flat pfft which',
  firstName: 'Elinor',
  lastName: 'Dooley',
  phoneNumber: 'misreport lest',
  createdAt: dayjs('2025-08-30T21:55'),
  updatedAt: dayjs('2025-08-31T05:23'),
  keycloakUserId: 'cc1d6650-4650-4418-89c2-24a5f64c3912',
  isActive: true,
};

export const sampleWithPartialData: IUser = {
  id: '076bdf79-9b28-4046-9dd5-d1b0596d4e82',
  username: 'apropos',
  email: 'Ernie.Shanahan89@gmail.com',
  passwordHash: 'against',
  firstName: 'Armand',
  lastName: 'Pfannerstill',
  phoneNumber: 'kissingly',
  dateOfBirth: dayjs('2025-08-31'),
  createdAt: dayjs('2025-08-30T23:00'),
  updatedAt: dayjs('2025-08-30T21:53'),
  keycloakUserId: '36638332-00db-436d-aeb9-f23420b6b7d3',
  isActive: true,
};

export const sampleWithFullData: IUser = {
  id: '2c184532-359e-417e-8339-7736058f89c7',
  username: 'duh very',
  email: 'Bradly.Hansen18@yahoo.com',
  passwordHash: 'ew foot',
  firstName: 'Lourdes',
  lastName: 'Kshlerin',
  phoneNumber: 'an colorful provider',
  dateOfBirth: dayjs('2025-08-31'),
  createdAt: dayjs('2025-08-31T11:49'),
  updatedAt: dayjs('2025-08-31T00:39'),
  keycloakUserId: 'b1fd4ace-88e5-4c14-86ef-00169b55c4ba',
  userAvatar: 'abaft among',
  isActive: true,
};

export const sampleWithNewData: NewUser = {
  username: 'mostly crystallize gym',
  email: 'Eunice.Schmitt-Lehner@yahoo.com',
  passwordHash: 'till hm',
  firstName: 'Edison',
  lastName: 'Fisher',
  phoneNumber: 'yahoo',
  createdAt: dayjs('2025-08-31T12:45'),
  updatedAt: dayjs('2025-08-31T00:24'),
  keycloakUserId: '9dc7709f-b6e9-4eae-97f0-6195510f1ebb',
  isActive: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
