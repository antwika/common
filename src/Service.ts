import { ILogger } from './ILogger';
import { IService } from './IService';

/**
 * Constructur arguments for Service implementations
 * @see {@link Service}
 */
export interface ServiceArgs {
  /**
   * Name of the service.
   */
  name: string;

  /**
   * A list of services that is owned and managed by this service.
   */
  services: IService[];

  /**
   * Logger instance
   */
  logger?: ILogger;
}

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
   * Logger instance
   */
  readonly logger?: ILogger;

  /**
   * Constructor
   */
  constructor(args: ServiceArgs) {
    if (!args.logger) console.warn('Provide a logger instance to the Service constructor! This will be enforced in next major version!');
    this.name = args.name;
    this.services = args.services;
    this.logger = args.logger;
  }

  /**
   * Function to start the service.
   * Sub-services are launched before the onStart lifecycle function is called.
   */
  async start() {
    this.logger?.info(`Service[${this.name}] starting...`);
    await Promise.all(this.services.map((service) => service.start()));
    await this.onStart();
    this.logger?.info(`Service[${this.name}] started!`);
  }

  /**
   * Function to stop the service.
   * Sub-services are stopped after the onStop lifecycle function has been called.
   */
  async stop() {
    this.logger?.info(`Service[${this.name}] stopping...`);
    await this.onStop();
    await Promise.all(this.services.map((service) => service.stop()));
    this.logger?.info(`Service[${this.name}] stopped!`);
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
