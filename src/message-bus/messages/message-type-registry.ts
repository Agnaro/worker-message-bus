import { Message, MessageType } from './message';

/**
 * A registry of all the message types to avoid collision of message kind strings and
 * allow for dynamic creation of message types
 */
class MessageTypeRegistry {
  protected _registry = new Map<string, MessageType<any>>();

  register<T extends MessageType<any>>(type: T, kind: string) {
    const existing = this._registry.get(kind);
    if (existing && existing !== type) {
      throw new Error(
        'This message kind already exists in the registry. This kind string is already used.'
      );
    } else {
      this._registry.set(kind, type);
    }
  }
}

export const MsgTypeRegistry = new MessageTypeRegistry();
