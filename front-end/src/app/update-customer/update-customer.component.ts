import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerModel} from "../model/customer.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit{

  public customerForm! : FormGroup
  customerId : number = 0
  customer! : CustomerModel


  constructor(private customerService : CustomerService,
              private formBuilder : FormBuilder,
              private route : ActivatedRoute,
              private router : Router) {
    this.route.params.subscribe(
      params => {
        this.customerId = +params['id']
      }
    )
  }
  ngOnInit(): void {
    this.getCustomer()
  }

  private getCustomer() {
    this.customerService.getCustomer(this.customerId)
      .subscribe({
        next : customer => {
          this.customerForm = this.formBuilder.group({
            firstName : this.formBuilder.control(customer.firstName, [Validators.required]),
            lastName : this.formBuilder.control(customer.lastName, [Validators.required]),
            email : this.formBuilder.control(customer.email, [Validators.required]),
          })
        },
        error : err => {
          alert("Error")
        }
      })
  }

  updateCustomer(customerId : number) {
    this.customer = this.customerForm.value
    console.log(this.customer)
    this.customerService.updateCustomer(this.customer, customerId)
      .subscribe({
        next : customer => {
          this.router.navigate(['/customers'])
        },
        error : err => {
          alert("Error during Updating Product")
        }
      });
  }
}
