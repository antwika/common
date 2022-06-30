import { LOG_LEVEL } from '../src/ILogger';
import { Logger } from '../src/Logger';

const log = jest.fn();

class DummyLogger extends Logger {
  async log(message: string, logLevel: LOG_LEVEL) {
    log(message, logLevel);
  }
}

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs "error" messages when log level is "error".', async () => {
    const logger = new DummyLogger('error');
    await logger.error('error message');
    expect(log).toHaveBeenCalledWith('error message', 'error');
  });

  it('logs "error" and "warning" messages when log level is "warning".', async () => {
    const logger = new DummyLogger('warning');
    await logger.error('error message');
    await logger.warning('warning message');
    expect(log).toHaveBeenCalledWith('error message', 'error');
    expect(log).toHaveBeenCalledWith('warning message', 'warning');
  });

  it('logs "error", "warning" and "info" messages when log level is "info".', async () => {
    const logger = new DummyLogger('info');
    await logger.error('error message');
    await logger.warning('warning message');
    await logger.info('info message');
    expect(log).toHaveBeenCalledWith('error message', 'error');
    expect(log).toHaveBeenCalledWith('warning message', 'warning');
    expect(log).toHaveBeenCalledWith('info message', 'info');
  });

  it('logs "error", "warning", "info", "debug" messages when log level is "debug".', async () => {
    const logger = new DummyLogger('debug');
    await logger.error('error message');
    await logger.warning('warning message');
    await logger.info('info message');
    await logger.debug('debug message');
    expect(log).toHaveBeenCalledWith('error message', 'error');
    expect(log).toHaveBeenCalledWith('warning message', 'warning');
    expect(log).toHaveBeenCalledWith('info message', 'info');
    expect(log).toHaveBeenCalledWith('debug message', 'debug');
  });

  it('does not log "debug", "info" and "warning" messages when log level is "error".', async () => {
    const logger = new DummyLogger('error');
    await logger.debug('debug message');
    await logger.info('info message');
    await logger.warning('warning message');
    expect(log).not.toHaveBeenCalled();
  });

  it('does not log "debug" and "info" messages when log level is "warning".', async () => {
    const logger = new DummyLogger('warning');
    await logger.debug('debug message');
    await logger.info('info message');
    expect(log).not.toHaveBeenCalled();
  });

  it('does not log "debug" messages when log level is "info".', async () => {
    const logger = new DummyLogger('info');
    await logger.debug('debug message');
    expect(log).not.toHaveBeenCalled();
  });
});
