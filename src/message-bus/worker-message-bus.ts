import { postMessageFn, msgEventEmitter } from './interfaces';
import { PriorityQueue } from './priority-queue';
import { Message } from './messages/message';
import { Subject, merge, Observable, fromEvent } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { eqBy } from 'ramda';
import { ErrorMessage, isErrorMessage } from './messages/error-message';

export class WorkerMessageBus {
  get allMessages(): Observable<Message> {
    return this.incomingMsg$;
  }

  get errorMessages(): Observable<ErrorMessage> {
    return this.incomingMsg$.pipe(filter(isErrorMessage));
  }

  // == CONSTANTS ===========================================================

  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  protected outgoingMsg$ = new Subject<Message>();

  protected incomingMsg$: Observable<Message> = fromEvent(
    this.msgEvtEmitter,
    'message'
  );

  // === STATE OBSERVABLES ==================================================
  // === INTERACTION OBSERVABLES ============================================
  // == INTERMEDIATE OBSERVABLES ============================================

  // = SIDE EFFECTS =========================================================
  // === INPUTs =============================================================
  // === OUTPUTS ============================================================
  protected outgoingMsgHandler$ = this.outgoingMsg$.pipe(
    tap((msg) => this.post(msg))
  );

  // == SUBSCRIPTION ========================================================
  protected subscription = merge(this.outgoingMsgHandler$).subscribe();

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

  sendWithResponse<T>(msg: Message<T>): Observable<Message<T>> {
    this.send(msg);
    return this.incomingMsg$.pipe(filter(eqBy((m) => m.id, msg)));
  }
}
