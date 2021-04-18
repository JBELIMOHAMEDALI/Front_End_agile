import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionsChauffeurService {

  constructor(private httpClient: HttpClient) { }
  getMesMission(id_choufeur: string, etat_mission: string, statu_choufeur) {
    return new Promise((resolve, reject) => {
      const body = { params: { id: id_choufeur, etat: etat_mission, statu: statu_choufeur } };
      this.httpClient.get('http://127.0.0.1/pfe_api/Chauffeur/get_Mes_Mission_for_one_choufeur', body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => { reject(err) })
    });
  }

  getOneMission(id_mission: string) {
    return new Promise((resolve, reject) => {
      const body = { params: { id: id_mission } };
      this.httpClient.get('http://127.0.0.1/pfe_api/Chauffeur/get_One_Mission_for_one_choufeur', body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => { reject(err) })
    });
  }

  updateEtatMission(id_mession: string) {

    let param1 = new HttpParams;
    param1 = param1.set('id', id_mession);
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://127.0.0.1/pfe_api/Mission/don_fonction', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  }
}
