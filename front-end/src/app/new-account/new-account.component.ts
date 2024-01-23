import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {AccountModel} from "../model/account.model";
import {CustomerModel} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent implements OnInit{

  public accountForm! : FormGroup
  public customers : Array<CustomerModel> = []
  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private accountService : AccountService,
              private customerService : CustomerService) {
  }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe({
        next : data => {
          this.customers = data
        },
        error : err => {
          alert("Error During Customer Loading")
        }
      });

    this.accountForm = this.formBuilder.group({
      balance : this.formBuilder.control(0, [Validators.required]),
      currency : this.formBuilder.control('', [Validators.required]),
      accountType : this.formBuilder.control('', [Validators.required]),
      // customer : new FormControl('', [Validators.required]),
    });

  }

  addAccount() {
    let account = this.accountForm.value
    this.accountService.addAccount(account)
      .subscribe({
        next : data => {
          this.router.navigate(['/accounts'])
        },
        error : err => {
          alert("Error During Account Creation")
        }
      })
    alert(JSON.stringify(account))
  }
}
