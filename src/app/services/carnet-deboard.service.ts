import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carnetdeboard } from '../models/carnetdeboard';

@Injectable({
  providedIn: 'root'
})
export class CarnetDeboardService {

  constructor(private httpClient: HttpClient) { }

  addCarnetBord(carnetbord: Carnetdeboard) {
    let param1 = new HttpParams;
    param1 = param1.set("klm", carnetbord.klm.toString());
    param1 = param1.set("consomation", carnetbord.consomation.toString());
    param1 = param1.set("id_choufer", carnetbord.id_choufer.toString());
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://127.0.0.1/pfe_api/Carnet_bord/add_carnet_bord', param1)
        .forEach(data =>
          resolve(data)).
        catch((err) => {
          reject(err);
        });
    });
  }

  getAllCarnetBored(id_carent: string) {

    return new Promise((resolve, reject) => {
      const body = { params: { id: id_carent } };
      this.httpClient.get('http://127.0.0.1/pfe_api/Carnet_bord/get_all_carnet_bord_for_chouffeur', body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => { reject(err) })
    });
  }
}
