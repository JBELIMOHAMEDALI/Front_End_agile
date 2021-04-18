import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffectVoitureService {

  constructor(private httpClient: HttpClient) { }

  addAffectaion(affectation) {
    const { voitureopt, chauffeuropt } = affectation;

    let param1 = new HttpParams;
    param1 = param1.set('id_voiture', voitureopt);
    param1 = param1.set('id_chauffeur', chauffeuropt);


    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Affecter_v_chauffeur/add_Affecter_v_chauffeur', param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  updateAffectaion(affectation) {

    const { id_voiture, id_chauffeur, id_affectation } = affectation;

    let param1 = new HttpParams;
    param1 = param1.set('id_voiture', id_voiture);
    param1 = param1.set('id_chauffeur', id_chauffeur);
    param1 = param1.set('id', id_affectation);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Affecter_v_chauffeur/update_Affecter_v_chauffeur', param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }

  getAllAffectations(statut: string) {

    const body = { params: { statut: statut } };
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://127.0.0.1/pfe_api/Affecter_v_chauffeur/get_all_affecation_info', body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err)
        })
    });
  }

  activerDesactiverAffectation(id: string) {
    let param1 = new HttpParams;
    param1 = param1.set("id", id);
    param1 = param1.set("tabname", "affecter_v_chauffeur");
    param1 = param1.set("nomId", "id_affecter_v_chauffeur");



    return new Promise((resolve, reject) => {

      this.httpClient.post(`http://localhost/pfe_api/Generale/desactive_compte`, param1)
        .forEach(data => {
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  getChauffeursVoituresNonaffectesActifs(option: string) {
    let req: string = 'get_chouffeur_non_affecte_voture';
    if (option === 'voiture') {
      req = 'get_voitur_non_affecte';
    }
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/${option}/${req}`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }

  getAll(role: string) {

    return new Promise((resolve, reject) => {
      const body = { params: { 'tabname': role } };
      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/get_all_Act`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }


  getOneAffectationbyId(id: string) {

    return new Promise((resolve, reject) => {
      const body = { params: { id: id, tabname: 'affecter_v_chauffeur', nomId: 'id_affecter_v_chauffeur' } };

      this.httpClient.get(`http://127.0.0.1/pfe_api/Generale/get_One_Act_By_ID`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }





}
