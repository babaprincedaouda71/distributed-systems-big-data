import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountModel} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  public getAccounts() {
    return this.http.get<Array<AccountModel>>("http://localhost:8888/ACCOUNT-SERVICE/account/all")
  }

  public addAccount(account: AccountModel) {
    return this.http.post<AccountModel>("http://localhost:8888/ACCOUNT-SERVICE/account/add", account)
  }
}
