/**
 * Created by thilina on 12/16/16.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Url} from "url";


import {Merchant} from '../class/merchant';





@Injectable()
export class MerchantService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private merchantRegisterUrl = 'http://192.168.8.100/merchant/register';
  private merchantListUrl = 'http://192.168.8.100/merchant/list';
  constructor(private http: Http) { }



  login(user: any):  Promise<any> {
    return new Promise((resolve, reject) => {
      //noinspection TypeScriptUnresolvedFunction
      this.http
        .post(this.merchantRegisterUrl, JSON.stringify({user: user}), {headers: this.headers})
        .toPromise()
        .then(response => {
          //noinspection TypeScriptUnresolvedFunction
          console.log(response.json())
          resolve(response.json());
        },error => {
          reject(error);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    })
  }

  register(merchant:Merchant): Promise<any> {

    return new Promise((resolve, reject) => {
      return this.http
        .post(this.merchantRegisterUrl, JSON.stringify(merchant), {headers: this.headers})
        .toPromise()
        .then(response => {
          //noinspection TypeScriptUnresolvedFunction
          console.log(response.json());


          resolve(response.json());
        }, error => {
          console.log(error);
          reject(error);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });

    });
  }
  dataTableData = [{
    "merchantId": "12345",
    "merchantAddress": "success",
    "merchantAccountNumber": "2015-05-22T14:56:29.000Z",
    "merchantEmail": "c@gmail.com"

  },
    {
      "merchantId": "12345",
      "merchantAddress": "success",
      "merchantAccountNumber": "2015-05-22T14:56:29.000Z",
      "merchantEmail": "ab@gmial.com"
    }
  ];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http
        .get(this.merchantListUrl, {headers: this.headers})
        .toPromise()
        .then(response => {
          //noinspection TypeScriptUnresolvedFunction
          console.log(response.json());


          resolve(response.json());
        }, error => {
          console.log(error);
          reject(error);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });

    });
  }

}
