export interface IHandlable {}

export interface IHandler {
  canHandle(handlable: IHandlable): Promise<boolean>;
  handle(handlable: IHandlable): Promise<void>;
}
