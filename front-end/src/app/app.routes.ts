import { Routes } from '@angular/router';
import {CustomerComponent} from "./customer/customer.component";
import {AccountComponent} from "./account/account.component";

export const routes: Routes = [
  { path : "customers", component : CustomerComponent},
  { path : "accounts", component : AccountComponent}
];
