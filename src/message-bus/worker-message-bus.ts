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
} from 'rxjs';
import { startWith, scan, shareReplay, map, switchMap } from 'rxjs/operators';
import { BusState, BusStateCmd } from './message-bus-interface';

export class WorkerMessageBus {
  protected outgoingQueue: PriorityQueue;

  protected incomingQueue: PriorityQueue;
  // == CONSTANTS ===========================================================
  protected initialBusState: BusState = {
    updatePeriod: 10,
    isActive: true,
  };

  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  protected newOutgoingMsg = new Subject<Message<any>>();

  // === STATE OBSERVABLES ==================================================
  protected programmaticCmdSubject = new Subject<BusStateCmd>();
  protected busStateCmds$ = merge(this.programmaticCmdSubject);

  protected busState$: Observable<BusState> = this.busStateCmds$.pipe(
    startWith(this.initialBusState),
    scan<BusState>((counterState, cmd) => ({ ...counterState, ...cmd })),
    shareReplay(1)
  );

  // === INTERACTION OBSERVABLES ============================================
  // == INTERMEDIATE OBSERVABLES ============================================
  protected updatePeriod$ = this.busState$.pipe(map((s) => s.updatePeriod));
  protected isActive$ = this.busState$.pipe(map((s) => s.isActive));

  protected timerUpdateTrigger = combineLatest(
    this.isActive$,
    this.updatePeriod$
  ).pipe(
    switchMap(([isActive, updatePeriod]) =>
      isActive ? timer(0, updatePeriod) : NEVER
    )
  );

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

  send<T>(msg: Message<T>) {}
}
