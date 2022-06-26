/**
 * Common interface for services.
 */
export interface IService {
  /**
   * Name of the service.
   */
  name: string;

  /**
   * A list of services that is owned and managed by this service.
   */
  services: IService[];

  /**
   * Function to start the service (and implicitly starting its sub-services).
   */
  start(): Promise<void>;

  /**
   * Function to stop the service (and implicitly stopping its sub-services).
   */
  stop(): Promise<void>;

  /**
   * Lifecycle function called after the service have completely started up.
   */
  onStart(): Promise<void>;

  /**
   * Lifecycle function called immediately when the service is instructed to stop.
   */
  onStop(): Promise<void>;
}

/**
 * Constructur arguments for Service implementations
 * @see {@link Service}
 */
export interface IServiceArgs {
  /**
   * Name of the service.
   */
  name: string;

  /**
   * A list of services that is owned and managed by this service.
   */
  services: IService[];
}
