import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AccountService} from "../services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountModel} from "../model/account.model";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {interval} from "rxjs";
import {CustomerModel} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgForOf, NgIf, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{

  accounts : Array<AccountModel> = []
  public customers : Array<CustomerModel> = []
  keyword : string = ""
  account! : AccountModel
  fromAccount : string = ""
  toAccount : string = ""
  amount : number = 0
  customer_id! : number

  constructor(private accountService : AccountService,
              private customerService : CustomerService) {
  }
  ngOnInit(): void {
    this.getAccounts();
    this.getCustomers();
  }

  onOpenModal(account: AccountModel, modal: string) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button')
    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal')
    if (modal === 'delete') {
      button.setAttribute('data-bs-target', '#deleteModal')
      this.account = account
    }

    if (modal === 'update') {
      button.setAttribute('data-bs-target', '#updateAccountModal')
      this.account =account
    }

    container?.appendChild(button)
    button.click()
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe({
        next : data => {
          this.accounts = data
          this.accounts = this.accounts.filter(account => account.customer !== null)
        },
        error : err => {
          // this.handleNotification()
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

  addAccount(addAccountForm : NgForm) {
    document.getElementById('add-account-form')?.click()
    this.account = addAccountForm.value
    this.customer_id = addAccountForm.controls['customer']?.value
    this.account.customer_id = parseInt(String(this.customer_id));
    this.account.customer = {
      id : this.account.customer_id,
      firstName : this.account.customer.firstName,
      lastName : this.account.customer.lastName,
      email : this.account.customer.email
    }
    console.log(this.account.customer)
    console.log(this.customer_id)
    console.log(this.account)
    this.accountService.addAccount(this.account)
      .subscribe({
        next : data => {
          this.getAccounts()
          addAccountForm.reset()
        },
        error : err => {
          alert("Error During Account Creation")
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

  getCustomers(){
    this.customerService.getCustomers()
      .subscribe({
        next : data => {
          this.customers = data
        },
        error : err => {
          alert("Error During Customer Loading")
        }
      });
  }

  handleNotification(){
    document.getElementById('notification')?.removeAttribute('hidden')
    interval(5000)
      .subscribe(() => this.getAccounts())
  }

  deleteAccount(id: string) {
    document.getElementById('delete-account-form')?.click()
    this.accountService.deleteAccount(id)
      .subscribe({
        next : data => {
          this.getAccounts()
        },
        error : err => {
          alert(err.message.toString())
        }
      })
  }
}
