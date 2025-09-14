import dayjs from 'dayjs/esm';
import { PaymentStatus } from 'app/entities/enumerations/payment-status.model';

export interface IPayment {
  id: string;
  bookingId?: string | null;
  userId?: string | null;
  amount?: number | null;
  currency?: string | null;
  paymentMethod?: string | null;
  status?: keyof typeof PaymentStatus | null;
  transactionId?: string | null;
  paymentGatewayResponse?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewPayment = Omit<IPayment, 'id'> & { id: null };
