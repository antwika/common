import { ILogger } from '../../src/ILogger';

export const createLoggerMock = () => jest.mocked<ILogger>({
  debug: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
});
