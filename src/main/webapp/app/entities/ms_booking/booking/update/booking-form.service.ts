import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBooking, NewBooking } from '../booking.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBooking for edit and NewBookingFormGroupInput for create.
 */
type BookingFormGroupInput = IBooking | PartialWithRequiredKeyOf<NewBooking>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBooking | NewBooking> = Omit<T, 'createdAt' | 'updatedAt' | 'expiresAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
  expiresAt?: string | null;
};

type BookingFormRawValue = FormValueOf<IBooking>;

type NewBookingFormRawValue = FormValueOf<NewBooking>;

type BookingFormDefaults = Pick<NewBooking, 'id' | 'createdAt' | 'updatedAt' | 'expiresAt'>;

type BookingFormGroupContent = {
  id: FormControl<BookingFormRawValue['id'] | NewBooking['id']>;
  userId: FormControl<BookingFormRawValue['userId']>;
  scheduleId: FormControl<BookingFormRawValue['scheduleId']>;
  ticketIds: FormControl<BookingFormRawValue['ticketIds']>;
  totalAmount: FormControl<BookingFormRawValue['totalAmount']>;
  status: FormControl<BookingFormRawValue['status']>;
  passengerDetails: FormControl<BookingFormRawValue['passengerDetails']>;
  contactEmail: FormControl<BookingFormRawValue['contactEmail']>;
  contactPhone: FormControl<BookingFormRawValue['contactPhone']>;
  bookingReference: FormControl<BookingFormRawValue['bookingReference']>;
  createdAt: FormControl<BookingFormRawValue['createdAt']>;
  updatedAt: FormControl<BookingFormRawValue['updatedAt']>;
  expiresAt: FormControl<BookingFormRawValue['expiresAt']>;
};

export type BookingFormGroup = FormGroup<BookingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BookingFormService {
  createBookingFormGroup(booking: BookingFormGroupInput = { id: null }): BookingFormGroup {
    const bookingRawValue = this.convertBookingToBookingRawValue({
      ...this.getFormDefaults(),
      ...booking,
    });
    return new FormGroup<BookingFormGroupContent>({
      id: new FormControl(
        { value: bookingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      userId: new FormControl(bookingRawValue.userId, {
        validators: [Validators.required],
      }),
      scheduleId: new FormControl(bookingRawValue.scheduleId, {
        validators: [Validators.required],
      }),
      ticketIds: new FormControl(bookingRawValue.ticketIds, {
        validators: [Validators.required],
      }),
      totalAmount: new FormControl(bookingRawValue.totalAmount, {
        validators: [Validators.required],
      }),
      status: new FormControl(bookingRawValue.status, {
        validators: [Validators.required],
      }),
      passengerDetails: new FormControl(bookingRawValue.passengerDetails, {
        validators: [Validators.required],
      }),
      contactEmail: new FormControl(bookingRawValue.contactEmail, {
        validators: [Validators.required],
      }),
      contactPhone: new FormControl(bookingRawValue.contactPhone, {
        validators: [Validators.required],
      }),
      bookingReference: new FormControl(bookingRawValue.bookingReference, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(bookingRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(bookingRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      expiresAt: new FormControl(bookingRawValue.expiresAt, {
        validators: [Validators.required],
      }),
    });
  }

  getBooking(form: BookingFormGroup): IBooking | NewBooking {
    return this.convertBookingRawValueToBooking(form.getRawValue() as BookingFormRawValue | NewBookingFormRawValue);
  }

  resetForm(form: BookingFormGroup, booking: BookingFormGroupInput): void {
    const bookingRawValue = this.convertBookingToBookingRawValue({ ...this.getFormDefaults(), ...booking });
    form.reset(
      {
        ...bookingRawValue,
        id: { value: bookingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BookingFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
      expiresAt: currentTime,
    };
  }

  private convertBookingRawValueToBooking(rawBooking: BookingFormRawValue | NewBookingFormRawValue): IBooking | NewBooking {
    return {
      ...rawBooking,
      createdAt: dayjs(rawBooking.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawBooking.updatedAt, DATE_TIME_FORMAT),
      expiresAt: dayjs(rawBooking.expiresAt, DATE_TIME_FORMAT),
    };
  }

  private convertBookingToBookingRawValue(
    booking: IBooking | (Partial<NewBooking> & BookingFormDefaults),
  ): BookingFormRawValue | PartialWithRequiredKeyOf<NewBookingFormRawValue> {
    return {
      ...booking,
      createdAt: booking.createdAt ? booking.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: booking.updatedAt ? booking.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      expiresAt: booking.expiresAt ? booking.expiresAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
