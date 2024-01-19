import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerModel} from "../model/customer.model";

@Component({
  selector: 'app-update-customer',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
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
    this.customerForm = this.formBuilder.group({
      email : this.formBuilder.control('', [Validators.required]),
    })
  }

  private getCustomer() {
    this.customerService.getCustomer(this.customerId)
      .subscribe({
        next : data => {
          this.customer = data
        },
        error : err => {
          alert("Error")
        }
      })
  }

  updateCustomer(customerId : number) {
    this.customer = this.customerForm.value
    console.log(this.customer)
    this.customer.id = customerId
    console.log(typeof customerId)
    this.customer.firstName = "";
    this.customer.lastName = "";
    this.customerService.updateCustomer(this.customer, customerId);
    this.router.navigate(['/customers'])
  }
}
