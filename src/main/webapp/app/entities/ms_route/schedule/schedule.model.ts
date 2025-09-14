import dayjs from 'dayjs/esm';
import { IRoute } from 'app/entities/ms_route/route/route.model';

export interface ISchedule {
  id: string;
  departureTime?: dayjs.Dayjs | null;
  arrivalTime?: dayjs.Dayjs | null;
  totalSeats?: number | null;
  availableSeats?: number | null;
  basePrice?: number | null;
  isActive?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  route?: Pick<IRoute, 'id'> | null;
}

export type NewSchedule = Omit<ISchedule, 'id'> & { id: null };
