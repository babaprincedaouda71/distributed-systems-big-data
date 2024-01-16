import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf, JsonPipe],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  public customerForm! : FormGroup

  constructor(private formBuilder : FormBuilder,
              private customerService : CustomerService,
              private router : Router) {
  }

  ngOnInit(): void {
        this.customerForm = this.formBuilder.group({
          firstName : this.formBuilder.control('', [Validators.required]),
          lastName : this.formBuilder.control('', [Validators.required]),
          email : this.formBuilder.control('', [Validators.required]),
        })
    }

  addCustomer() {
    let customer = this.customerForm.value
    this.customerService.addCustomer(customer)
      .subscribe({
        next : data => {
          console.log(data)
          // alert(JSON.stringify(data))
          this.router.navigate(['/customers'])
        },
        error : err => {
          alert("Error During Saving Customerss")
        }
      })
  }
}
