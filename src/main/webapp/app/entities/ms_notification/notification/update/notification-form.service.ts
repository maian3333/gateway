import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INotification, NewNotification } from '../notification.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INotification for edit and NewNotificationFormGroupInput for create.
 */
type NotificationFormGroupInput = INotification | PartialWithRequiredKeyOf<NewNotification>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends INotification | NewNotification> = Omit<T, 'createdAt' | 'scheduledAt'> & {
  createdAt?: string | null;
  scheduledAt?: string | null;
};

type NotificationFormRawValue = FormValueOf<INotification>;

type NewNotificationFormRawValue = FormValueOf<NewNotification>;

type NotificationFormDefaults = Pick<NewNotification, 'id' | 'isRead' | 'createdAt' | 'scheduledAt'>;

type NotificationFormGroupContent = {
  id: FormControl<NotificationFormRawValue['id'] | NewNotification['id']>;
  recipientId: FormControl<NotificationFormRawValue['recipientId']>;
  type: FormControl<NotificationFormRawValue['type']>;
  title: FormControl<NotificationFormRawValue['title']>;
  message: FormControl<NotificationFormRawValue['message']>;
  isRead: FormControl<NotificationFormRawValue['isRead']>;
  relatedEntityType: FormControl<NotificationFormRawValue['relatedEntityType']>;
  relatedEntityId: FormControl<NotificationFormRawValue['relatedEntityId']>;
  createdAt: FormControl<NotificationFormRawValue['createdAt']>;
  scheduledAt: FormControl<NotificationFormRawValue['scheduledAt']>;
};

export type NotificationFormGroup = FormGroup<NotificationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NotificationFormService {
  createNotificationFormGroup(notification: NotificationFormGroupInput = { id: null }): NotificationFormGroup {
    const notificationRawValue = this.convertNotificationToNotificationRawValue({
      ...this.getFormDefaults(),
      ...notification,
    });
    return new FormGroup<NotificationFormGroupContent>({
      id: new FormControl(
        { value: notificationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      recipientId: new FormControl(notificationRawValue.recipientId, {
        validators: [Validators.required],
      }),
      type: new FormControl(notificationRawValue.type, {
        validators: [Validators.required],
      }),
      title: new FormControl(notificationRawValue.title, {
        validators: [Validators.required],
      }),
      message: new FormControl(notificationRawValue.message, {
        validators: [Validators.required],
      }),
      isRead: new FormControl(notificationRawValue.isRead, {
        validators: [Validators.required],
      }),
      relatedEntityType: new FormControl(notificationRawValue.relatedEntityType),
      relatedEntityId: new FormControl(notificationRawValue.relatedEntityId),
      createdAt: new FormControl(notificationRawValue.createdAt, {
        validators: [Validators.required],
      }),
      scheduledAt: new FormControl(notificationRawValue.scheduledAt),
    });
  }

  getNotification(form: NotificationFormGroup): INotification | NewNotification {
    return this.convertNotificationRawValueToNotification(form.getRawValue() as NotificationFormRawValue | NewNotificationFormRawValue);
  }

  resetForm(form: NotificationFormGroup, notification: NotificationFormGroupInput): void {
    const notificationRawValue = this.convertNotificationToNotificationRawValue({ ...this.getFormDefaults(), ...notification });
    form.reset(
      {
        ...notificationRawValue,
        id: { value: notificationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NotificationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isRead: false,
      createdAt: currentTime,
      scheduledAt: currentTime,
    };
  }

  private convertNotificationRawValueToNotification(
    rawNotification: NotificationFormRawValue | NewNotificationFormRawValue,
  ): INotification | NewNotification {
    return {
      ...rawNotification,
      createdAt: dayjs(rawNotification.createdAt, DATE_TIME_FORMAT),
      scheduledAt: dayjs(rawNotification.scheduledAt, DATE_TIME_FORMAT),
    };
  }

  private convertNotificationToNotificationRawValue(
    notification: INotification | (Partial<NewNotification> & NotificationFormDefaults),
  ): NotificationFormRawValue | PartialWithRequiredKeyOf<NewNotificationFormRawValue> {
    return {
      ...notification,
      createdAt: notification.createdAt ? notification.createdAt.format(DATE_TIME_FORMAT) : undefined,
      scheduledAt: notification.scheduledAt ? notification.scheduledAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
