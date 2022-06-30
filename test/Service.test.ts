import { ILogger } from '../src/ILogger';
import { IService } from '../src/IService';
import { Service } from '../src/Service';
import { createLoggerMock } from './mocks/LoggerMock';

describe('Service', () => {
  let logger: jest.Mocked<ILogger>;

  beforeAll(() => {
    logger = createLoggerMock();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('outputs a warning if the service is instantiated without a logger instance', async () => {
    jest.spyOn(global.console, 'warn').mockImplementation();
    const service = new Service({
      name: 'DummyService',
      services: [],
    });
    expect(console.warn).toHaveBeenCalledWith('Provide a logger instance to the Service constructor! This will be enforced in next major version!');
    await service.start();
    await service.stop();
    expect(service).toBeDefined();
  });

  it('can start and stop nested services', async () => {
    const nestedService: IService = {
      name: 'Nested dummy service',
      services: [],
      start: jest.fn(),
      stop: jest.fn(),
      onStart: jest.fn(),
      onStop: jest.fn(),
    };

    const service = new Service({
      name: 'DummyService',
      services: [nestedService],
      logger,
    });

    await service.start();
    expect(nestedService.start).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Service[DummyService] starting...');
    expect(logger.info).toHaveBeenCalledWith('Service[DummyService] started!');
    await service.stop();
    expect(nestedService.stop).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Service[DummyService] stopping...');
    expect(logger.info).toHaveBeenCalledWith('Service[DummyService] stopped!');
  });
});
