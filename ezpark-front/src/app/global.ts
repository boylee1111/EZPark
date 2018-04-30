import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public ROOT_URL:string = "http://192.168.1.156:8080";
  public USER_NAME:string = null;
  public ACCESS_TOKEN:string = null;
}
