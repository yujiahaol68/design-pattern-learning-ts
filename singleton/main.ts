interface Connection {
  name:string;
  connectionInstance:any;
}

class ServiceContainer {
  private static _instance:ServiceContainer;
  private connections:Connection[] = [];

  private constructor() {
    if (ServiceContainer._instance)
    throw new Error('Use ServiceContainer.getInstance() to get global singleton');
  }

  public static getInstance() {
    ServiceContainer._instance = ServiceContainer._instance || new ServiceContainer();
    return ServiceContainer._instance;
  }

  public create(connection:Connection) : void {
    if (this.has(connection.name))
      throw new Error('Service exist! Create new service failed.');
    this.connections.push(connection);
  }

  private has(name:string) : boolean {
    return this.connections.find(connection => connection.name === name) ? true : false;
  }

  private find(name:string) : Connection | undefined {
    return this.connections.find(connection => connection.name === name);
  }

  public resolve(serviceName:string) : any {
    const service = this.find(serviceName);
    if (service)
      return service.connectionInstance;
    throw new Error('Not found service!');
  }
}

export const Container = ServiceContainer.getInstance();