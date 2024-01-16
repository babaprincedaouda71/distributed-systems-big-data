import {CustomerModel} from "./customer.model";

export interface AccountModel {
  id : string,
  balance : number,
  openingDate : string,
  currency : string,
  accountType : string,
  customer_id : number,
  customer : CustomerModel
}
