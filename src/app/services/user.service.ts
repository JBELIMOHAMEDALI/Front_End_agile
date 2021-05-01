import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ControlsService } from "./controls.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient, private controls: ControlsService) { }

  getAllUsers(actif: boolean) {
    this.controls.verifVF('chauffeur');

    var req: string = "get_all_Act";
    if (!actif) {
      req = "get_all_Not_Act";
    }
    return new Promise((resolve, reject) => {
      const body = { params: { 'tabname': 'chauffeur' } };
      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }



  getOneUserbyId(payload, actif: boolean, from?: string) {
    if (from) {
      this.controls.verifProfile();
    }
    // else{
    // this.controls.verifVF();

    // }

    let req: string = "get_One_Act_By_ID";
    if (!actif) {
      req = "get_One_Not_Act_By_Id";
    }

    return new Promise((resolve, reject) => {
      const body = { params: { id: payload.id.toString(), tabname: payload.tabname, nomId: payload.nomId } };

      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }





  UpdateUser(userData) {
    this.controls.verifProfile();

    return new Promise((resolve, reject) => {

      let param1 = new HttpParams;
      param1 = param1.set('id', userData.id);
      param1 = param1.set('email', userData.email);
      param1 = param1.set('matricule', userData.matricule);
      param1 = param1.set('nomPrenom', userData.nomComplet);
      param1 = param1.set('region', userData.region);
      param1 = param1.set('dns', userData.dns);
      param1 = param1.set('tel', userData.tel);
      param1 = param1.set('tabName', userData.tabname);
      param1 = param1.set('idName', userData.idname);


      this.httpClient.post('http://127.0.0.1/pfe_api/chauffeur/update_chauffeur_chefService_profil', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }




}






