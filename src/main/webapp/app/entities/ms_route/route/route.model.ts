import dayjs from 'dayjs/esm';
import { TransportType } from 'app/entities/enumerations/transport-type.model';

export interface IRoute {
  id: string;
  routeName?: string | null;
  origin?: string | null;
  destination?: string | null;
  distance?: number | null;
  estimatedDuration?: number | null;
  transportType?: keyof typeof TransportType | null;
  isActive?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewRoute = Omit<IRoute, 'id'> & { id: null };
