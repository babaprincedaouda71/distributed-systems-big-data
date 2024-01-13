import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

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

  customers : any

  constructor(private http : HttpClient) {
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8888/CUSTOMER-SERVICE/customer/all")
      .subscribe({
        next : value => {
          this.customers = value;
        },
        error : err => {
          alert("Erreur lors du chargement des Clients")
        }
      })
  }

}
