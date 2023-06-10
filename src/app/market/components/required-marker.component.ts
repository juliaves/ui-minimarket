import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-required-marker',
  template: '*',
  styleUrls: ['./required-marker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRequiredMarkerComponent {}