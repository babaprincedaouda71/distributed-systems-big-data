import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {CustomerModel} from "../model/customer.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgIf,HttpClientModule, NgForOf, FormsModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  public customers : Array<CustomerModel> = []
  public keyword: string = "";

  constructor(private customerService : CustomerService) {
  }
  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers(){
    this.customerService.getCustomers()
      .subscribe({
        next : data => {
          this.customers = data;
        },
        error : err => {
          alert("Erreur lors du chargement des Clients")
        }
      })
  }

  deleteCustomer(customerId : number) {
    if (confirm("You're About to Delete a Customer "))
    this.customerService.deleteCustomer(customerId)
      .subscribe({
        next : value => {
          this.customers = this.customers.filter(customer => customer.id !== customerId )
        },
        error : err => {
          alert("Erreur lors de la suppression !!!!")
        }
      })
  }

  searchCustomer(keyword: string) {
    this.customerService.searchCustomer(keyword)
      .subscribe({
        next : data => {
          this.customers = data
        },
        error : err => {
          alert("Error During Search")
        }
      })
  }
}
