/**
 * A base interface to extend for specific handlables.
 */
export interface IHandlable {}

/**
 * A base interface for handlers to implement.
 */
export interface IHandler {
  /**
   * Checks if the passed "handlable" matches the expected handling conditions.
   * @param handlable The "handlable" to be evaluated.
   */
  canHandle(handlable: IHandlable): Promise<boolean>;

  /**
   * Makes use of the content in the "handlable" to perform an action.
   * @param handlable The "handlable" as input for an action.
   */
  handle(handlable: IHandlable): Promise<void>;
}
