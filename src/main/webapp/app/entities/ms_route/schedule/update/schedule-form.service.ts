import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISchedule, NewSchedule } from '../schedule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISchedule for edit and NewScheduleFormGroupInput for create.
 */
type ScheduleFormGroupInput = ISchedule | PartialWithRequiredKeyOf<NewSchedule>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISchedule | NewSchedule> = Omit<T, 'departureTime' | 'arrivalTime' | 'createdAt' | 'updatedAt'> & {
  departureTime?: string | null;
  arrivalTime?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type ScheduleFormRawValue = FormValueOf<ISchedule>;

type NewScheduleFormRawValue = FormValueOf<NewSchedule>;

type ScheduleFormDefaults = Pick<NewSchedule, 'id' | 'departureTime' | 'arrivalTime' | 'isActive' | 'createdAt' | 'updatedAt'>;

type ScheduleFormGroupContent = {
  id: FormControl<ScheduleFormRawValue['id'] | NewSchedule['id']>;
  departureTime: FormControl<ScheduleFormRawValue['departureTime']>;
  arrivalTime: FormControl<ScheduleFormRawValue['arrivalTime']>;
  totalSeats: FormControl<ScheduleFormRawValue['totalSeats']>;
  availableSeats: FormControl<ScheduleFormRawValue['availableSeats']>;
  basePrice: FormControl<ScheduleFormRawValue['basePrice']>;
  isActive: FormControl<ScheduleFormRawValue['isActive']>;
  createdAt: FormControl<ScheduleFormRawValue['createdAt']>;
  updatedAt: FormControl<ScheduleFormRawValue['updatedAt']>;
  route: FormControl<ScheduleFormRawValue['route']>;
};

export type ScheduleFormGroup = FormGroup<ScheduleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ScheduleFormService {
  createScheduleFormGroup(schedule: ScheduleFormGroupInput = { id: null }): ScheduleFormGroup {
    const scheduleRawValue = this.convertScheduleToScheduleRawValue({
      ...this.getFormDefaults(),
      ...schedule,
    });
    return new FormGroup<ScheduleFormGroupContent>({
      id: new FormControl(
        { value: scheduleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      departureTime: new FormControl(scheduleRawValue.departureTime, {
        validators: [Validators.required],
      }),
      arrivalTime: new FormControl(scheduleRawValue.arrivalTime, {
        validators: [Validators.required],
      }),
      totalSeats: new FormControl(scheduleRawValue.totalSeats, {
        validators: [Validators.required],
      }),
      availableSeats: new FormControl(scheduleRawValue.availableSeats, {
        validators: [Validators.required],
      }),
      basePrice: new FormControl(scheduleRawValue.basePrice, {
        validators: [Validators.required],
      }),
      isActive: new FormControl(scheduleRawValue.isActive, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(scheduleRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(scheduleRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      route: new FormControl(scheduleRawValue.route, {
        validators: [Validators.required],
      }),
    });
  }

  getSchedule(form: ScheduleFormGroup): ISchedule | NewSchedule {
    return this.convertScheduleRawValueToSchedule(form.getRawValue() as ScheduleFormRawValue | NewScheduleFormRawValue);
  }

  resetForm(form: ScheduleFormGroup, schedule: ScheduleFormGroupInput): void {
    const scheduleRawValue = this.convertScheduleToScheduleRawValue({ ...this.getFormDefaults(), ...schedule });
    form.reset(
      {
        ...scheduleRawValue,
        id: { value: scheduleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ScheduleFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      departureTime: currentTime,
      arrivalTime: currentTime,
      isActive: false,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertScheduleRawValueToSchedule(rawSchedule: ScheduleFormRawValue | NewScheduleFormRawValue): ISchedule | NewSchedule {
    return {
      ...rawSchedule,
      departureTime: dayjs(rawSchedule.departureTime, DATE_TIME_FORMAT),
      arrivalTime: dayjs(rawSchedule.arrivalTime, DATE_TIME_FORMAT),
      createdAt: dayjs(rawSchedule.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawSchedule.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertScheduleToScheduleRawValue(
    schedule: ISchedule | (Partial<NewSchedule> & ScheduleFormDefaults),
  ): ScheduleFormRawValue | PartialWithRequiredKeyOf<NewScheduleFormRawValue> {
    return {
      ...schedule,
      departureTime: schedule.departureTime ? schedule.departureTime.format(DATE_TIME_FORMAT) : undefined,
      arrivalTime: schedule.arrivalTime ? schedule.arrivalTime.format(DATE_TIME_FORMAT) : undefined,
      createdAt: schedule.createdAt ? schedule.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: schedule.updatedAt ? schedule.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
