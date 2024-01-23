import { Injectable } from '@angular/core';
import {CustomerModel} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public customerState : any = {
     customers : [],
     keyword : ""
  }

  constructor() { }
}
