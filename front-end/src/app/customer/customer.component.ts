import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {CustomerModel} from "../model/customer.model";
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgIf, HttpClientModule, NgForOf, FormsModule, RouterLink, ReactiveFormsModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  customers : Array<CustomerModel> = []
  keyword : string = ""
  customer! : CustomerModel
  constructor(private customerService : CustomerService,
              public customerState : AppStateService,
              private formBuilder : FormBuilder,
              private router : Router) {
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
    document.getElementById('delete-customer-form')?.click()
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

  addCustomer(addCustomerForm : NgForm) {
    document.getElementById('add-customer-form')?.click()
    let customer = addCustomerForm.value
    this.customerService.addCustomer(customer)
      .subscribe({
        next : data => {
          this.getCustomers()
          addCustomerForm.reset()
        },
        error : err => {
          alert("Error During Saving Customerss")
        }
      })
  }
}
