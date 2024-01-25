import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {CustomerModel} from "../model/customer.model";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgIf, HttpClientModule, NgForOf, FormsModule, RouterLink
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customers : Array<CustomerModel> = []
  keyword : string = ""
  constructor(private customerService : CustomerService,
              public customerState : AppStateService) {
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
