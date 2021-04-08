import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpC: HttpClient) { }

  getLogin(email: string, password: string, tabname: string) {
   return new Promise((resolve, reject) => {
      const body = { params: { 'email': email, 'password': password, 'tabname': tabname } };

      this.httpC.get('http://localhost/pfe_api/Generale/login/', body)
        .forEach(data => {
          resolve(data)

        }
        ).catch((err) => {
          reject(err);
        });
    });
  }


  resetPassword(formGroup: FormGroup, userRole: string) {
    const { email, newPass, matricule } = formGroup.value;
    let param1 = new HttpParams;
    param1 = param1.set('matrcule', matricule);
    param1 = param1.set('nomTab', userRole);
    param1 = param1.set('email', email);
    param1 = param1.set('newpass', newPass);



    return new Promise((resolve, reject) => {

      this.httpC.post('http://localhost/pfe_api/Generale/resset_passwored', param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }



  firstConnect(data) {
    const { id, nomId, tabname, password } = data;

    let param1 = new HttpParams;
    param1 = param1.set('id', id);
    param1 = param1.set('nomId', nomId);
    param1 = param1.set('tabname', tabname);
    param1 = param1.set('password', password);

    return new Promise((resolve, reject) => {

      this.httpC.post('http://localhost/pfe_api/Generale/update_all_Passwored', param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });


  }


}
