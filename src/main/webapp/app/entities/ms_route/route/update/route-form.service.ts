import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRoute, NewRoute } from '../route.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRoute for edit and NewRouteFormGroupInput for create.
 */
type RouteFormGroupInput = IRoute | PartialWithRequiredKeyOf<NewRoute>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRoute | NewRoute> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type RouteFormRawValue = FormValueOf<IRoute>;

type NewRouteFormRawValue = FormValueOf<NewRoute>;

type RouteFormDefaults = Pick<NewRoute, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;

type RouteFormGroupContent = {
  id: FormControl<RouteFormRawValue['id'] | NewRoute['id']>;
  routeName: FormControl<RouteFormRawValue['routeName']>;
  origin: FormControl<RouteFormRawValue['origin']>;
  destination: FormControl<RouteFormRawValue['destination']>;
  distance: FormControl<RouteFormRawValue['distance']>;
  estimatedDuration: FormControl<RouteFormRawValue['estimatedDuration']>;
  transportType: FormControl<RouteFormRawValue['transportType']>;
  isActive: FormControl<RouteFormRawValue['isActive']>;
  createdAt: FormControl<RouteFormRawValue['createdAt']>;
  updatedAt: FormControl<RouteFormRawValue['updatedAt']>;
};

export type RouteFormGroup = FormGroup<RouteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RouteFormService {
  createRouteFormGroup(route: RouteFormGroupInput = { id: null }): RouteFormGroup {
    const routeRawValue = this.convertRouteToRouteRawValue({
      ...this.getFormDefaults(),
      ...route,
    });
    return new FormGroup<RouteFormGroupContent>({
      id: new FormControl(
        { value: routeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      routeName: new FormControl(routeRawValue.routeName, {
        validators: [Validators.required],
      }),
      origin: new FormControl(routeRawValue.origin, {
        validators: [Validators.required],
      }),
      destination: new FormControl(routeRawValue.destination, {
        validators: [Validators.required],
      }),
      distance: new FormControl(routeRawValue.distance, {
        validators: [Validators.required],
      }),
      estimatedDuration: new FormControl(routeRawValue.estimatedDuration, {
        validators: [Validators.required],
      }),
      transportType: new FormControl(routeRawValue.transportType, {
        validators: [Validators.required],
      }),
      isActive: new FormControl(routeRawValue.isActive, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(routeRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(routeRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getRoute(form: RouteFormGroup): IRoute | NewRoute {
    return this.convertRouteRawValueToRoute(form.getRawValue() as RouteFormRawValue | NewRouteFormRawValue);
  }

  resetForm(form: RouteFormGroup, route: RouteFormGroupInput): void {
    const routeRawValue = this.convertRouteToRouteRawValue({ ...this.getFormDefaults(), ...route });
    form.reset(
      {
        ...routeRawValue,
        id: { value: routeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RouteFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isActive: false,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertRouteRawValueToRoute(rawRoute: RouteFormRawValue | NewRouteFormRawValue): IRoute | NewRoute {
    return {
      ...rawRoute,
      createdAt: dayjs(rawRoute.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawRoute.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertRouteToRouteRawValue(
    route: IRoute | (Partial<NewRoute> & RouteFormDefaults),
  ): RouteFormRawValue | PartialWithRequiredKeyOf<NewRouteFormRawValue> {
    return {
      ...route,
      createdAt: route.createdAt ? route.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: route.updatedAt ? route.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
