import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WorkerMessageBus } from '../message-bus/worker-message-bus';
import { withLatestFrom, map } from 'rxjs/operators';
import { Message } from 'src/message-bus/messages/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  get maxVal(): number {
    return this._maxVal.getValue();
  }

  set maxVal(v: number) {
    this._maxVal.next(v);
  }

  get output(): string {
    return this._output.getValue();
  }

  private _maxVal = new BehaviorSubject<number>(1);
  private _output = new BehaviorSubject<string>('');

  private worker = new Worker('../workers/example-worder.worker.js');
  private workerBus = new WorkerMessageBus(
    this.worker.postMessage,
    this.worker
  );

  private startCalculation$ = new Subject<void>();

  private calculationRequests$ = this.startCalculation$.pipe(
    withLatestFrom(this._maxVal, (_, maxVal) => new Message())
  );

  public onBtnClick() {
    this.startCalculation$.next();
  }
}
