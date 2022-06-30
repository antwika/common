import { LOG_LEVEL } from './ILogger';
import { Logger } from './Logger';

export class ConsoleLogger extends Logger {
  async log(message: string, logLevel: LOG_LEVEL) {
    console.log(`[${logLevel.toUpperCase()}]: ${message}`);
  }
}
