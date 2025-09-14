import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../route.test-samples';

import { RouteFormService } from './route-form.service';

describe('Route Form Service', () => {
  let service: RouteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteFormService);
  });

  describe('Service methods', () => {
    describe('createRouteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRouteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            routeName: expect.any(Object),
            origin: expect.any(Object),
            destination: expect.any(Object),
            distance: expect.any(Object),
            estimatedDuration: expect.any(Object),
            transportType: expect.any(Object),
            isActive: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          }),
        );
      });

      it('passing IRoute should create a new form with FormGroup', () => {
        const formGroup = service.createRouteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            routeName: expect.any(Object),
            origin: expect.any(Object),
            destination: expect.any(Object),
            distance: expect.any(Object),
            estimatedDuration: expect.any(Object),
            transportType: expect.any(Object),
            isActive: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          }),
        );
      });
    });

    describe('getRoute', () => {
      it('should return NewRoute for default Route initial value', () => {
        const formGroup = service.createRouteFormGroup(sampleWithNewData);

        const route = service.getRoute(formGroup) as any;

        expect(route).toMatchObject(sampleWithNewData);
      });

      it('should return NewRoute for empty Route initial value', () => {
        const formGroup = service.createRouteFormGroup();

        const route = service.getRoute(formGroup) as any;

        expect(route).toMatchObject({});
      });

      it('should return IRoute', () => {
        const formGroup = service.createRouteFormGroup(sampleWithRequiredData);

        const route = service.getRoute(formGroup) as any;

        expect(route).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRoute should not enable id FormControl', () => {
        const formGroup = service.createRouteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRoute should disable id FormControl', () => {
        const formGroup = service.createRouteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
