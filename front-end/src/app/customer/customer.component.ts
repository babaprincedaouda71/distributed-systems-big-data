import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {CustomerModel} from "../model/customer.model";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgIf,HttpClientModule, NgForOf
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  customers : Array<CustomerModel> = []

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
    this.customerService.deleteCustomer(customerId)
      .subscribe({
        next : value => {
          alert("Client Supprimé avec Succès !!!")
          this.customers = this.customers.filter(customer => customer.id !== customerId )
        },
        error : err => {
          alert("Erreur lors de la suppression !!!!")
        }
      })
  }
}
