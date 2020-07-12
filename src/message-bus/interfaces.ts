import { EventEmitter } from 'events';

export type postMessageFn = (message: any) => void;

export interface msgEventEmitter extends EventEmitter {
  onmessage(e: MessageEvent): void;
}
