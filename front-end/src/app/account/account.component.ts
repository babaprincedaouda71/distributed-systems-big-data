import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HttpClientModule, NgForOf, NgIf],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  accounts : any

  constructor(private http : HttpClient) {
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8888/ACCOUNT-SERVICE/account/all")
      .subscribe({
        next : value => {
          this.accounts = value
        },
        error : err => {
          alert("Erreur lors du chargement des Comptes")
        }
      })
  }

}
