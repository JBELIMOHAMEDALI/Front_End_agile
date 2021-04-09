import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Voiture } from "../models/voiture";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private httpClient: HttpClient) { }


  addVoiture(voiture: Voiture) {
    const { matricule, statut, type, dmc, puissance, service } = voiture;

    let param1 = new HttpParams;
    param1 = param1.set('matricule', matricule);
    param1 = param1.set('type', type);
    param1 = param1.set('dmc', dmc);
    param1 = param1.set('puissance', puissance);
    param1 = param1.set('service', service);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Voiture/add_voiture', param1)
        .forEach(data => {
          console.log(data)
          resolve(data);
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }



  updateVoiture(voiture: Voiture) {
    const { matricule, type, dmc, puissance, service, id_voiture } = voiture;

    let param1 = new HttpParams;
    param1 = param1.set('matricule', matricule);
    param1 = param1.set('type', type);
    param1 = param1.set('dmc', dmc);
    param1 = param1.set('puissance', puissance);
    param1 = param1.set('service', service);
    param1 = param1.set('id', id_voiture);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Voiture/update_voiture', param1)
        .forEach(data => {

          resolve(data);
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  getAllVoitures(actif: boolean) {
    var req: string = "get_all_Act";
    if (!actif) {
      req = "get_all_Not_Act";
    }
    const body = { params: { 'tabname': 'voiture' } };

    return new Promise((resolve, reject) => {

      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        )
    });
  }



  activeDisactiveVoiture(id: string, actif: boolean) {
    let param1 = new HttpParams;
    param1 = param1.set("id", id);
    param1 = param1.set("tabname", "voiture");
    param1 = param1.set("nomId", "id_voiture");
    var req: string = "active_compte";
    if (!actif) {
      req = "desactive_compte";
    }

    return new Promise((resolve, reject) => {

      this.httpClient.post(`http://localhost/pfe_api/Generale/${req}`, param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }


  getOneVoiturebyId(id: string, actif: boolean) {
    let req: string = "get_One_Act_By_ID";
    if (!actif) {
      req = "get_One_Not_Act_By_Id";
    }

    return new Promise((resolve, reject) => {
      const body = { params: { id: id, tabname: "voiture", nomId: "id_voiture" } };

      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/${req}`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }





}
//components//npm i ngx-print//icones/les controles de saisie