import { ILogger, LOG_LEVEL } from './ILogger';

export abstract class Logger implements ILogger {
  private readonly logLevel: LOG_LEVEL;

  constructor(logLevel: LOG_LEVEL) {
    this.logLevel = logLevel;
  }

  async debug(message: string) {
    if (this.logLevel === 'info') return;
    if (this.logLevel === 'warning') return;
    if (this.logLevel === 'error') return;
    await this.log(message, 'debug');
  }

  async info(message: string) {
    if (this.logLevel === 'warning') return;
    if (this.logLevel === 'error') return;
    await this.log(message, 'info');
  }

  async warning(message: string) {
    if (this.logLevel === 'error') return;
    await this.log(message, 'warning');
  }

  async error(message: string) {
    await this.log(message, 'error');
  }

  abstract log(message: string, logLevel: LOG_LEVEL): Promise<void>;
}
