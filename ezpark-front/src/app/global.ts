import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public ROOT_URL:string = "http://18.222.157.135:8080";
  public USER_NAME:string = null;
  public ACCESS_TOKEN:string = null;
}
