import { Injectable } from '@angular/core';

export abstract class BaseService {

  constructor(public serviceNameStr?: string) {
    this._serviceName = this.getServiceName(serviceNameStr);
  }

  private _serviceName: string;

  public get serviceName(): string {
    return this._serviceName;
  }

  public set serviceName(value: string){
    this._serviceName = value;
  }

  private getServiceName(serviceName: string): string {

    const regExp = new RegExp('service$');

    if (!regExp.test(serviceName.toLowerCase())) {
      throw Error("the name of the class not match the naming convention, the service name must need suffix 'service'");
    }
    else {
      return serviceName.substring(0, serviceName.toLowerCase().indexOf("service"))
    }


  }
}

