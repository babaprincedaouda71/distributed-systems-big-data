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
  customer_id! : number
  account! : AccountModel
  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private accountService : AccountService,
              private customerService : CustomerService) {
  }

  ngOnInit() {
    this.getCustomers()

    this.accountForm = this.formBuilder.group({
      balance : this.formBuilder.control(0, [Validators.required]),
      // currency : this.formBuilder.control('', [Validators.required]),
      currency : new FormControl('', [Validators.required]),
      // accountType : this.formBuilder.control('', [Validators.required]),
      accountType : new FormControl('', [Validators.required]),
      customer : new FormControl('', [Validators.required]),
    });

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

  addAccount() {
    this.account = this.accountForm.value
    this.customer_id = this.accountForm.get("customer")?.value
    this.account.customer_id = parseInt(String(this.customer_id));
    this.account.customer = {
      id : this.account.customer_id,
      firstName : this.account.customer.firstName,
      lastName : this.account.customer.lastName,
      email : this.account.customer.email
    }
    console.log(this.account.customer)
    this.accountService.addAccount(this.account)
      .subscribe({
        next : data => {
          this.router.navigate(['/accounts'])
        },
        error : err => {
          alert("Error During Account Creation")
        }
      })
  }
}
