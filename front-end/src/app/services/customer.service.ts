import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerModel} from "../model/customer.model";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  public getCustomers(){
    return this.http.get<Array<CustomerModel>>("http://localhost:8888/CUSTOMER-SERVICE/customer/all")
  }

  deleteCustomer(customerId : number) {
    return this.http.delete(`http://localhost:8888/CUSTOMER-SERVICE/customer/remove/${customerId}`)
  }

  addCustomer(customer : CustomerModel) {
    return this.http.post<CustomerModel>(`http://localhost:8888/CUSTOMER-SERVICE/customer/add`, customer)
  }

  searchCustomer(keyword: string) {
    return this.http.get<Array<CustomerModel>>(`http://localhost:8888/CUSTOMER-SERVICE/customer/findBy/${keyword}`)
  }
}
