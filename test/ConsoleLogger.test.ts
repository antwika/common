import { ConsoleLogger } from '../src/ConsoleLogger';

describe('ConsoleLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can log messages to console', async () => {
    jest.spyOn(global.console, 'log').mockImplementation();
    const consoleLogger = new ConsoleLogger('debug');
    await consoleLogger.log('error message', 'error');
    expect(console.log).toHaveBeenCalledWith('[ERROR]: error message');
    await consoleLogger.log('warning message', 'warning');
    expect(console.log).toHaveBeenCalledWith('[WARNING]: warning message');
    await consoleLogger.log('info message', 'info');
    expect(console.log).toHaveBeenCalledWith('[INFO]: info message');
    await consoleLogger.log('debug message', 'debug');
    expect(console.log).toHaveBeenCalledWith('[DEBUG]: debug message');
  });
});
