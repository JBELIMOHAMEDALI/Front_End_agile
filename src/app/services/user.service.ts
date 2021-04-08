import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpC: HttpClient) { }

  getAllUsers(actif: boolean) {
    var req: string = "get_all_Act";
    if (!actif) {
      req = "get_all_Not_Act";
    }
    return new Promise((resolve, reject) => {
      const body = { params: { 'tabname': 'chauffeur' } };
      this.httpC.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        )
    });
  }



  getOneChauffeurbyId(payload, actif: boolean) {
    let req: string = "get_One_Act_By_ID";
    if (!actif) {
      req = "get_One_Not_Act_By_Id";
    }

    return new Promise((resolve, reject) => {
      const body = { params: { id: payload.id.toString(), tabname: payload.tabname, nomId: payload.nomId } };

      this.httpC.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }


  // getOneChauffeurNotActivebyId(payload) {

  //   return new Promise((resolve, reject) => {
  //     const body = { params: { id: payload.id.toString(), tabname: payload.tabname, nomId: payload.nomId } };

  //     this.httpC.get('http://127.0.0.1/pfe_api/Generale/get_One_Not_Act_By_Id', body)
  //       .forEach(data =>
  //         resolve(data)
  //       ).catch((err) => {
  //         reject(err);
  //       });
  //   });

  // }


  UpdateUser(userData) {

    return new Promise((resolve, reject) => {
      const body = { params: { 'id': userData.id, 'matricule': userData.mat, 'email': userData.email, 'nom_prnom': userData.nomComplet, 'tel': userData.tel, 'region': userData.region, 'DNS': userData.dns, } };

      this.httpC.get('http://127.0.0.1/pfe_api/chauffeur/update_chauffeur', body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }







}
