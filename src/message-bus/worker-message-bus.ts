import { postMessageFn, msgEventEmitter } from './interfaces';
import { PriorityQueue } from './priority-queue';
import { Message } from './messages/message';
import { Subject } from 'rxjs';

export class WorkerMessageBus {
  protected queue: PriorityQueue;
  // == CONSTANTS ===========================================================
  // = BASE OBSERVABLES  ====================================================
  // == SOURCE OBSERVABLES ==================================================
  protected _newMessage = new Subject();

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

  send<T>(msg: Message<T>) {}
}
