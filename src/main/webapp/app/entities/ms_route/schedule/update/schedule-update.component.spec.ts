import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IRoute } from 'app/entities/ms_route/route/route.model';
import { RouteService } from 'app/entities/ms_route/route/service/route.service';
import { ScheduleService } from '../service/schedule.service';
import { ISchedule } from '../schedule.model';
import { ScheduleFormService } from './schedule-form.service';

import { ScheduleUpdateComponent } from './schedule-update.component';

describe('Schedule Management Update Component', () => {
  let comp: ScheduleUpdateComponent;
  let fixture: ComponentFixture<ScheduleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let scheduleFormService: ScheduleFormService;
  let scheduleService: ScheduleService;
  let routeService: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScheduleUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ScheduleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ScheduleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    scheduleFormService = TestBed.inject(ScheduleFormService);
    scheduleService = TestBed.inject(ScheduleService);
    routeService = TestBed.inject(RouteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Route query and add missing value', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const route: IRoute = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
      schedule.route = route;

      const routeCollection: IRoute[] = [{ id: '49e2c511-948a-4381-a293-ae53a33bea8e' }];
      jest.spyOn(routeService, 'query').mockReturnValue(of(new HttpResponse({ body: routeCollection })));
      const additionalRoutes = [route];
      const expectedCollection: IRoute[] = [...additionalRoutes, ...routeCollection];
      jest.spyOn(routeService, 'addRouteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(routeService.query).toHaveBeenCalled();
      expect(routeService.addRouteToCollectionIfMissing).toHaveBeenCalledWith(
        routeCollection,
        ...additionalRoutes.map(expect.objectContaining),
      );
      expect(comp.routesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const schedule: ISchedule = { id: '06daa4d3-a4db-40fe-8685-fc15320e015f' };
      const route: IRoute = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
      schedule.route = route;

      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      expect(comp.routesSharedCollection).toContainEqual(route);
      expect(comp.schedule).toEqual(schedule);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchedule>>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      jest.spyOn(scheduleFormService, 'getSchedule').mockReturnValue(schedule);
      jest.spyOn(scheduleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: schedule }));
      saveSubject.complete();

      // THEN
      expect(scheduleFormService.getSchedule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(scheduleService.update).toHaveBeenCalledWith(expect.objectContaining(schedule));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchedule>>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      jest.spyOn(scheduleFormService, 'getSchedule').mockReturnValue({ id: null });
      jest.spyOn(scheduleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: schedule }));
      saveSubject.complete();

      // THEN
      expect(scheduleFormService.getSchedule).toHaveBeenCalled();
      expect(scheduleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchedule>>();
      const schedule = { id: '5c834510-7171-4d53-a4b0-b1d5e8245594' };
      jest.spyOn(scheduleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schedule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(scheduleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRoute', () => {
      it('should forward to routeService', () => {
        const entity = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
        const entity2 = { id: 'b1c399a0-817d-4c04-ae0b-b97422c251aa' };
        jest.spyOn(routeService, 'compareRoute');
        comp.compareRoute(entity, entity2);
        expect(routeService.compareRoute).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
