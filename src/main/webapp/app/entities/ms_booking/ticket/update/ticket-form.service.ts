import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITicket, NewTicket } from '../ticket.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITicket for edit and NewTicketFormGroupInput for create.
 */
type TicketFormGroupInput = ITicket | PartialWithRequiredKeyOf<NewTicket>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITicket | NewTicket> = Omit<T, 'reservedUntil' | 'createdAt' | 'updatedAt'> & {
  reservedUntil?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type TicketFormRawValue = FormValueOf<ITicket>;

type NewTicketFormRawValue = FormValueOf<NewTicket>;

type TicketFormDefaults = Pick<NewTicket, 'id' | 'reservedUntil' | 'createdAt' | 'updatedAt'>;

type TicketFormGroupContent = {
  id: FormControl<TicketFormRawValue['id'] | NewTicket['id']>;
  scheduleId: FormControl<TicketFormRawValue['scheduleId']>;
  seatNumber: FormControl<TicketFormRawValue['seatNumber']>;
  seatType: FormControl<TicketFormRawValue['seatType']>;
  price: FormControl<TicketFormRawValue['price']>;
  status: FormControl<TicketFormRawValue['status']>;
  reservedUntil: FormControl<TicketFormRawValue['reservedUntil']>;
  createdAt: FormControl<TicketFormRawValue['createdAt']>;
  updatedAt: FormControl<TicketFormRawValue['updatedAt']>;
};

export type TicketFormGroup = FormGroup<TicketFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TicketFormService {
  createTicketFormGroup(ticket: TicketFormGroupInput = { id: null }): TicketFormGroup {
    const ticketRawValue = this.convertTicketToTicketRawValue({
      ...this.getFormDefaults(),
      ...ticket,
    });
    return new FormGroup<TicketFormGroupContent>({
      id: new FormControl(
        { value: ticketRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      scheduleId: new FormControl(ticketRawValue.scheduleId, {
        validators: [Validators.required],
      }),
      seatNumber: new FormControl(ticketRawValue.seatNumber, {
        validators: [Validators.required],
      }),
      seatType: new FormControl(ticketRawValue.seatType, {
        validators: [Validators.required],
      }),
      price: new FormControl(ticketRawValue.price, {
        validators: [Validators.required],
      }),
      status: new FormControl(ticketRawValue.status, {
        validators: [Validators.required],
      }),
      reservedUntil: new FormControl(ticketRawValue.reservedUntil),
      createdAt: new FormControl(ticketRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(ticketRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getTicket(form: TicketFormGroup): ITicket | NewTicket {
    return this.convertTicketRawValueToTicket(form.getRawValue() as TicketFormRawValue | NewTicketFormRawValue);
  }

  resetForm(form: TicketFormGroup, ticket: TicketFormGroupInput): void {
    const ticketRawValue = this.convertTicketToTicketRawValue({ ...this.getFormDefaults(), ...ticket });
    form.reset(
      {
        ...ticketRawValue,
        id: { value: ticketRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TicketFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      reservedUntil: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertTicketRawValueToTicket(rawTicket: TicketFormRawValue | NewTicketFormRawValue): ITicket | NewTicket {
    return {
      ...rawTicket,
      reservedUntil: dayjs(rawTicket.reservedUntil, DATE_TIME_FORMAT),
      createdAt: dayjs(rawTicket.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTicket.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTicketToTicketRawValue(
    ticket: ITicket | (Partial<NewTicket> & TicketFormDefaults),
  ): TicketFormRawValue | PartialWithRequiredKeyOf<NewTicketFormRawValue> {
    return {
      ...ticket,
      reservedUntil: ticket.reservedUntil ? ticket.reservedUntil.format(DATE_TIME_FORMAT) : undefined,
      createdAt: ticket.createdAt ? ticket.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: ticket.updatedAt ? ticket.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
