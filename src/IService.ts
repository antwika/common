export interface IService {
  name: string;
  services: IService[];
  start(): Promise<void>;
  stop(): Promise<void>;
  onStart(): Promise<void>;
  onStop(): Promise<void>;
}

export interface IServiceArgs {
  name: string;
  services: IService[];
}
