import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRoute } from 'app/entities/ms_route/route/route.model';
import { RouteService } from 'app/entities/ms_route/route/service/route.service';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleFormGroup, ScheduleFormService } from './schedule-form.service';

@Component({
  selector: 'jhi-schedule-update',
  templateUrl: './schedule-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ScheduleUpdateComponent implements OnInit {
  isSaving = false;
  schedule: ISchedule | null = null;

  routesSharedCollection: IRoute[] = [];

  protected scheduleService = inject(ScheduleService);
  protected scheduleFormService = inject(ScheduleFormService);
  protected routeService = inject(RouteService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ScheduleFormGroup = this.scheduleFormService.createScheduleFormGroup();

  compareRoute = (o1: IRoute | null, o2: IRoute | null): boolean => this.routeService.compareRoute(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schedule }) => {
      this.schedule = schedule;
      if (schedule) {
        this.updateForm(schedule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const schedule = this.scheduleFormService.getSchedule(this.editForm);
    if (schedule.id !== null) {
      this.subscribeToSaveResponse(this.scheduleService.update(schedule));
    } else {
      this.subscribeToSaveResponse(this.scheduleService.create(schedule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(schedule: ISchedule): void {
    this.schedule = schedule;
    this.scheduleFormService.resetForm(this.editForm, schedule);

    this.routesSharedCollection = this.routeService.addRouteToCollectionIfMissing<IRoute>(this.routesSharedCollection, schedule.route);
  }

  protected loadRelationshipsOptions(): void {
    this.routeService
      .query()
      .pipe(map((res: HttpResponse<IRoute[]>) => res.body ?? []))
      .pipe(map((routes: IRoute[]) => this.routeService.addRouteToCollectionIfMissing<IRoute>(routes, this.schedule?.route)))
      .subscribe((routes: IRoute[]) => (this.routesSharedCollection = routes));
  }
}
