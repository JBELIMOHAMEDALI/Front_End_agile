import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Entretien } from "../models/entretien";

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private httpClient: HttpClient) { }

  addEntretien(entretien: Entretien) {
    const { id_voiture, date, description } = entretien;

    let param1 = new HttpParams;
    param1 = param1.set('id_voiture', id_voiture);
    param1 = param1.set('date', date);
    param1 = param1.set('description', description);


    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Entretien/add_entretien', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  };


  updateEntretien(entretien: Entretien) {
    const { id_voiture, date, description, id_entretien } = entretien;

    let param1 = new HttpParams;
    param1 = param1.set('id_voiture', id_voiture);
    param1 = param1.set('date', date);
    param1 = param1.set('description', description);
    param1 = param1.set('id', id_entretien);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Entretien/update_entretien', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  };


  getAllEntrtieninfo() {

    return new Promise((resolve, reject) => {

      this.httpClient.get(`http://127.0.0.1/pfe_api/entretien/get_entretien_info`)
        .forEach(data =>
          resolve(data)
        )
    });
  }



  deleteEntretien(id_entretien: string) {


    let param1 = new HttpParams;
    param1 = param1.set('tabname', 'entretien');
    param1 = param1.set('nomId', 'id_entretien');
    param1 = param1.set('id', id_entretien);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Generale/delete_generale', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  };


  getOneEntretienbyId(id_entretien: string) {

    return new Promise((resolve, reject) => {
      const body = { params: { id: id_entretien } };

      this.httpClient.get(`http://127.0.0.1/pfe_api/Entretien/get_one_entretien_info`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }

}
