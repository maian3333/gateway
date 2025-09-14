import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPayment, NewPayment } from '../payment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPayment for edit and NewPaymentFormGroupInput for create.
 */
type PaymentFormGroupInput = IPayment | PartialWithRequiredKeyOf<NewPayment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPayment | NewPayment> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type PaymentFormRawValue = FormValueOf<IPayment>;

type NewPaymentFormRawValue = FormValueOf<NewPayment>;

type PaymentFormDefaults = Pick<NewPayment, 'id' | 'createdAt' | 'updatedAt'>;

type PaymentFormGroupContent = {
  id: FormControl<PaymentFormRawValue['id'] | NewPayment['id']>;
  bookingId: FormControl<PaymentFormRawValue['bookingId']>;
  userId: FormControl<PaymentFormRawValue['userId']>;
  amount: FormControl<PaymentFormRawValue['amount']>;
  currency: FormControl<PaymentFormRawValue['currency']>;
  paymentMethod: FormControl<PaymentFormRawValue['paymentMethod']>;
  status: FormControl<PaymentFormRawValue['status']>;
  transactionId: FormControl<PaymentFormRawValue['transactionId']>;
  paymentGatewayResponse: FormControl<PaymentFormRawValue['paymentGatewayResponse']>;
  createdAt: FormControl<PaymentFormRawValue['createdAt']>;
  updatedAt: FormControl<PaymentFormRawValue['updatedAt']>;
};

export type PaymentFormGroup = FormGroup<PaymentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentFormService {
  createPaymentFormGroup(payment: PaymentFormGroupInput = { id: null }): PaymentFormGroup {
    const paymentRawValue = this.convertPaymentToPaymentRawValue({
      ...this.getFormDefaults(),
      ...payment,
    });
    return new FormGroup<PaymentFormGroupContent>({
      id: new FormControl(
        { value: paymentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bookingId: new FormControl(paymentRawValue.bookingId, {
        validators: [Validators.required],
      }),
      userId: new FormControl(paymentRawValue.userId, {
        validators: [Validators.required],
      }),
      amount: new FormControl(paymentRawValue.amount, {
        validators: [Validators.required],
      }),
      currency: new FormControl(paymentRawValue.currency, {
        validators: [Validators.required],
      }),
      paymentMethod: new FormControl(paymentRawValue.paymentMethod, {
        validators: [Validators.required],
      }),
      status: new FormControl(paymentRawValue.status, {
        validators: [Validators.required],
      }),
      transactionId: new FormControl(paymentRawValue.transactionId),
      paymentGatewayResponse: new FormControl(paymentRawValue.paymentGatewayResponse),
      createdAt: new FormControl(paymentRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(paymentRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getPayment(form: PaymentFormGroup): IPayment | NewPayment {
    return this.convertPaymentRawValueToPayment(form.getRawValue() as PaymentFormRawValue | NewPaymentFormRawValue);
  }

  resetForm(form: PaymentFormGroup, payment: PaymentFormGroupInput): void {
    const paymentRawValue = this.convertPaymentToPaymentRawValue({ ...this.getFormDefaults(), ...payment });
    form.reset(
      {
        ...paymentRawValue,
        id: { value: paymentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PaymentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertPaymentRawValueToPayment(rawPayment: PaymentFormRawValue | NewPaymentFormRawValue): IPayment | NewPayment {
    return {
      ...rawPayment,
      createdAt: dayjs(rawPayment.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawPayment.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertPaymentToPaymentRawValue(
    payment: IPayment | (Partial<NewPayment> & PaymentFormDefaults),
  ): PaymentFormRawValue | PartialWithRequiredKeyOf<NewPaymentFormRawValue> {
    return {
      ...payment,
      createdAt: payment.createdAt ? payment.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: payment.updatedAt ? payment.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
