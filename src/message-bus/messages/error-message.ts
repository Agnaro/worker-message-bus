import { Message } from './message';
import { MsgTypeRegistry } from './message-type-registry';
import { inherits } from 'util';

export const BusErrorMessageType = 'MESSAGE_BUS_ERROR';

export class ErrorMessage extends Message<BusError> {
  constructor(error: BusError) {
    super(BusErrorMessageType, error, Number.MAX_SAFE_INTEGER);
  }
}

MsgTypeRegistry.register(ErrorMessage, BusErrorMessageType);

export interface BusError {
  message: string;
}
