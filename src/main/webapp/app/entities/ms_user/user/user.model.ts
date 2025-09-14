import dayjs from 'dayjs/esm';

export interface IUser {
  id: string;
  username?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  keycloakUserId?: string | null;
  userAvatar?: string | null;
  isActive?: boolean | null;
}

export type NewUser = Omit<IUser, 'id'> & { id: null };
