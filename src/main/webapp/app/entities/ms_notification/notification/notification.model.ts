import dayjs from 'dayjs/esm';

export interface INotification {
  id: string;
  recipientId?: string | null;
  type?: string | null;
  title?: string | null;
  message?: string | null;
  isRead?: boolean | null;
  relatedEntityType?: string | null;
  relatedEntityId?: string | null;
  createdAt?: dayjs.Dayjs | null;
  scheduledAt?: dayjs.Dayjs | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
