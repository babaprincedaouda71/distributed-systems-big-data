import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AccountService} from "../services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountModel} from "../model/account.model";
import {FormsModule, NgForm} from "@angular/forms";

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
  fromAccount : string = ""
  toAccount : string = ""
  amount : number = 0

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

  transfer(transferForm: NgForm) {
    document.getElementById('transfer-form')?.click()
    console.log(transferForm.value)
    const fromAccount = transferForm.controls['fromAccount'].value
    const toAccount = transferForm.controls['toAccount'].value
    const amount = transferForm.controls['amount'].value
    const transferData = {fromAccount, toAccount, amount}
    this.accountService.transfer(transferData)
      .subscribe({
        next : value => {
          transferForm.reset()
          this.getAccounts();
        },
        error : err => {
          alert("Error : " + err)
        }
      })
  }
}
