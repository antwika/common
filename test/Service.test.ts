import { IService } from '../src/IService';
import { Service } from '../src/Service';

describe('Service', () => {
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
    });

    await service.start();
    expect(nestedService.start).toHaveBeenCalledTimes(1);
    await service.stop();
    expect(nestedService.stop).toHaveBeenCalledTimes(1);
  });
});
