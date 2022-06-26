import { IService, IServiceArgs } from './IService';

/**
 * Base class for services to extend from.
 */
export class Service implements IService {
  /**
   * Name of the service.
   */
  readonly name: string;

  /**
   * A list of services that is owned and managed by this service.
   */
  readonly services: IService[];

  /**
   * Constructor
   */
  constructor(args: IServiceArgs) {
    this.name = args.name;
    this.services = args.services;
  }

  /**
   * Function to start the service.
   * Sub-services are launched before the onStart lifecycle function is called.
   */
  async start() {
    console.log(`Service[${this.name}] starting...`);
    await Promise.all(this.services.map((service) => service.start()));
    await this.onStart();
    console.log(`Service[${this.name}] started!`);
  }

  /**
   * Function to stop the service.
   * Sub-services are stopped after the onStop lifecycle function has been called.
   */
  async stop() {
    console.log(`Service[${this.name}] stopping...`);
    await this.onStop();
    await Promise.all(this.services.map((service) => service.stop()));
    console.log(`Service[${this.name}] stopped!`);
  }

  /**
   * Lifecycle function implementation called after the service have completely started up.
   */
  async onStart() {
    // NOP
  }

  /**
   * Lifecycle function implementation called immediately when the service is instructed to stop.
   */
  async onStop() {
    // NOP
  }
}
