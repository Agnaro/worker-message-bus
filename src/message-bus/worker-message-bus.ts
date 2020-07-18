import { postMessageFn, msgEventEmitter } from './interfaces';
import { PriorityQueue } from './priority-queue';
import { Message } from './messages/message';
import {
  Subject,
  merge,
  Observable,
  combineLatest,
  timer,
  EMPTY,
  NEVER,
  fromEvent,
} from 'rxjs';
import { startWith, scan, shareReplay, map, switchMap } from 'rxjs/operators';
import { BusState, BusStateCmd } from './message-bus-interface';

export class WorkerMessageBus {
  // == CONSTANTS ===========================================================
  protected initialBusState: BusState = {
    updatePeriod: 10,
    isActive: true,
  };

  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  protected outgoingMsg$ = new Subject<Message<any>>();

  protected incomingMsg$: Observable<Message<any>> = fromEvent(
    this.msgEvtEmitter,
    'message'
  );

  // === STATE OBSERVABLES ==================================================
  // === INTERACTION OBSERVABLES ============================================
  // == INTERMEDIATE OBSERVABLES ============================================

  // = SIDE EFFECTS =========================================================
  // == SUBSCRIPTION ========================================================
  // === INPUTs =============================================================
  // === OUTPUTS ============================================================
  // = HELPER ===============================================================
  // = CUSTOM OPERATORS =====================================================
  // == CREATION METHODS ====================================================
  // == OPERATORS ===========================================================

  constructor(
    protected post: postMessageFn,
    protected msgEvtEmitter: msgEventEmitter
  ) {}

  send<T>(msg: Message<T>) {
    this.outgoingMsg$.next(msg);
  }
}
