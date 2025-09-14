import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransportType } from 'app/entities/enumerations/transport-type.model';
import { IRoute } from '../route.model';
import { RouteService } from '../service/route.service';
import { RouteFormGroup, RouteFormService } from './route-form.service';

@Component({
  selector: 'jhi-route-update',
  templateUrl: './route-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RouteUpdateComponent implements OnInit {
  isSaving = false;
  route: IRoute | null = null;
  transportTypeValues = Object.keys(TransportType);

  protected routeService = inject(RouteService);
  protected routeFormService = inject(RouteFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RouteFormGroup = this.routeFormService.createRouteFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ route }) => {
      this.route = route;
      if (route) {
        this.updateForm(route);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const route = this.routeFormService.getRoute(this.editForm);
    if (route.id !== null) {
      this.subscribeToSaveResponse(this.routeService.update(route));
    } else {
      this.subscribeToSaveResponse(this.routeService.create(route));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoute>>): void {
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

  protected updateForm(route: IRoute): void {
    this.route = route;
    this.routeFormService.resetForm(this.editForm, route);
  }
}
