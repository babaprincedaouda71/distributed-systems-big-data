import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AccountService} from "../services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountModel} from "../model/account.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgForOf, NgIf, HttpClientModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  accounts : Array<AccountModel> = []
  keyword : string = ""
  account! : AccountModel

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
        },
        error : err => {
          alert("Erreur lors du chargement des Comptes")
        }
      })
  }

  searchAccount(keyword: string) {
    this.accountService.searchAccount(keyword)
      .subscribe({
        next : data => {
          this.accounts = this.accounts.filter(value => value.id == data.id)
        },
        error : err => {
          alert("Account Not Found")
        }
      })
  }
}
