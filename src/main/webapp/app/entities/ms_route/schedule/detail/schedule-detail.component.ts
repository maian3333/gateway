import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { ISchedule } from '../schedule.model';

@Component({
  selector: 'jhi-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class ScheduleDetailComponent {
  schedule = input<ISchedule | null>(null);

  previousState(): void {
    window.history.back();
  }
}
