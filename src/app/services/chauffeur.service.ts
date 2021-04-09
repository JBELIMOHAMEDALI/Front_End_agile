import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Chauffeur } from "../models/chauffeur";

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  constructor(private httpClient: HttpClient) { }

  addChauffeur(chauffeur: Chauffeur) {
    const { matricule, nomPrenom, email, tel, dns, region } = chauffeur;

    let param1 = new HttpParams;
    param1 = param1.set('matricule', matricule);
    param1 = param1.set('email', email);
    param1 = param1.set('nomPrenom', nomPrenom);
    param1 = param1.set('tel', tel);
    param1 = param1.set('region', region);
    param1 = param1.set('dns', dns);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/chauffeur/add_chauffeur', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }



  updateChauffeur(chauffeur: Chauffeur) {
    const { matricule, nomPrenom, email, tel, dns, region, statut, id_chauffeur } = chauffeur;

    let param1 = new HttpParams;
    param1 = param1.set('matricule', matricule);
    param1 = param1.set('email', email);
    param1 = param1.set('nomPrenom', nomPrenom);
    param1 = param1.set('tel', tel);
    param1 = param1.set('region', region);
    param1 = param1.set('dns', dns);
    // param1 = param1.set('statut', statut);
    param1 = param1.set('id', id_chauffeur);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/chauffeur/update_chauffeur', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }






}
