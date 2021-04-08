import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffectVoitureService {

  constructor(private httpClient: HttpClient) { }


  addAffectaion(affectation) {
    const { id_voiture, id_chauffeur } = affectation;

    let param1 = new HttpParams;
    param1 = param1.set('id_voiture', id_voiture);
    param1 = param1.set('id_chauffeur', id_chauffeur);


    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Affecter_v_chauffeur/add_Affecter_v_chauffeur', param1)
        .forEach(data => {
          console.log(data)
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  getAllAffectations() {

    return new Promise((resolve, reject) => {
      this.httpClient.get('http://127.0.0.1/pfe_api/Affecter_v_chauffeur/get_all_affecation_info')
        .forEach(data =>
          resolve(data)
        )
    });
  }



}
