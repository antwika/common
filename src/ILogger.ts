export type LOG_LEVEL = 'debug' | 'info' | 'warning' | 'error';

export interface ILogger {
  debug(message: string): Promise<void>;
  info(message: string): Promise<void>;
  warning(message: string): Promise<void>;
  error(message: string): Promise<void>;
  log(message: string, logLevel: LOG_LEVEL): Promise<void>;
}
