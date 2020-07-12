export abstract class Message {
  get priority() {
    return this._priority;
  }

  protected kind: string;

  protected _priority: number;
}
