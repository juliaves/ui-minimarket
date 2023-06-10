import {Subject} from 'rxjs';
import {OnDestroy, Injectable} from '@angular/core';

@Injectable()
export abstract class Destroyable implements OnDestroy {
  public destroyed$: Subject<any>;

  constructor() {
    this.destroyed$ = new Subject();
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
