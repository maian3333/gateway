import dayjs from 'dayjs/esm';
import { BookingStatus } from 'app/entities/enumerations/booking-status.model';

export interface IBooking {
  id: string;
  userId?: string | null;
  scheduleId?: string | null;
  ticketIds?: string | null;
  totalAmount?: number | null;
  status?: keyof typeof BookingStatus | null;
  passengerDetails?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  bookingReference?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  expiresAt?: dayjs.Dayjs | null;
}

export type NewBooking = Omit<IBooking, 'id'> & { id: null };
