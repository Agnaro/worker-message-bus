import { v4 as uuid } from 'uuid';

export abstract class Message<T = any> {
  get priority() {
    return this._priority;
  }

  get id() {
    return this._uid;
  }

  get kind() {
    return this._kind;
  }

  protected _kind: string;

  protected _priority: number;

  protected _uid: string;

  protected _data: T;

  constructor(kind: string, data: T, priority = 0) {
    this._kind = kind;
    this._data = data;
    this._priority = priority;
    this._uid = uuid();
  }
}

export interface MessageType<T> {
  new (...args: any[]): Message<T>;
}
