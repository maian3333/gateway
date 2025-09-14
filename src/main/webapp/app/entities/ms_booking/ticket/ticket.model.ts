import dayjs from 'dayjs/esm';
import { SeatType } from 'app/entities/enumerations/seat-type.model';
import { TicketStatus } from 'app/entities/enumerations/ticket-status.model';

export interface ITicket {
  id: string;
  scheduleId?: string | null;
  seatNumber?: string | null;
  seatType?: keyof typeof SeatType | null;
  price?: number | null;
  status?: keyof typeof TicketStatus | null;
  reservedUntil?: dayjs.Dayjs | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewTicket = Omit<ITicket, 'id'> & { id: null };
