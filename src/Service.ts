import { IService, IServiceArgs } from './IService';

export class Service implements IService {
  readonly name: string;

  readonly services: IService[];

  constructor(args: IServiceArgs) {
    this.name = args.name;
    this.services = args.services;
  }

  async start() {
    console.log(`Service[${this.name}] starting...`);
    await Promise.all(this.services.map((service) => service.start()));
    await this.onStart();
    console.log(`Service[${this.name}] started!`);
  }

  async stop() {
    console.log(`Service[${this.name}] stopping...`);
    await this.onStop();
    await Promise.all(this.services.map((service) => service.stop()));
    console.log(`Service[${this.name}] stopped!`);
  }

  async onStart() {
    // NOP
  }

  async onStop() {
    // NOP
  }
}
