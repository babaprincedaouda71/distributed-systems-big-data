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
  customer! : CustomerModel
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
    this.customerService.deleteCustomer(customerId)
      .subscribe({
        next : value => {
          // this.customers = this.customers.filter(customer => customer.id !== customerId )
          this.getCustomers()
        },
        error : err => {
          alert(err.message)
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

  onOpenModal(customer: CustomerModel, modal: string) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal')
    if (modal === 'delete') {
      button.setAttribute('data-bs-target', '#deleteModal')
      this.customer = customer
    }

    container?.appendChild(button)
    button.click()
  }
}
