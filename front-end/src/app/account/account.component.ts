import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AccountService} from "../services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountModel} from "../model/account.model";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgForOf, NgIf, HttpClientModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  accounts : Array<AccountModel> = []

  constructor(private accountService : AccountService) {
  }
  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe({
        next : data => {
          this.accounts = data
          this.accounts = this.accounts.filter(account => account.customer !== null)
          console.log(this.accounts)
        },
        error : err => {
          alert("Erreur lors du chargement des Comptes")
        }
      })
  }
}
