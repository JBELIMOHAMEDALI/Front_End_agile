import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Mission } from "../models/mission";
import { ControlsService } from "./controls.service";

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private httpClient: HttpClient,private controls:ControlsService) { }

  addMission(mission: Mission) {
    this.controls.verifVF('chauffeur');
    const { id_chefService, id_chauffeur, date_debut, date_fin, description } = mission;
    let param1 = new HttpParams;
    param1 = param1.set('id_chefService', id_chefService);
    param1 = param1.set('id_chauffeur', id_chauffeur);
    param1 = param1.set('date_debut', date_debut);
    param1 = param1.set('date_fin', date_fin);
    param1 = param1.set('description', description);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Mission/add_mission', param1)
        .forEach(data => {

          resolve(data);
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }



  updateMission(mission: Mission) {
    this.controls.verifVF('chauffeur');
    const { id_chefService, id_chauffeur, date_debut, date_fin, description, id_mission } = mission;

    let param1 = new HttpParams;

    param1 = param1.set('id_chefService', id_chefService);
    param1 = param1.set('id_chauffeur', id_chauffeur);

    param1 = param1.set('date_debut', date_debut);
    param1 = param1.set('date_fin', date_fin);
    param1 = param1.set('description', description);
    param1 = param1.set('id', id_mission);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Mission/update_mission', param1)
        .forEach(data => {

          resolve(data);
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  getAllMissions() {
    this.controls.verifVF('chauffeur');
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/Mission/get_mission_info_all`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err)
        })
    });
  }


  getChauffeursAffectes() {
    this.controls.verifVF('chauffeur');

    return new Promise((resolve, reject) => {

      this.httpClient.get(`http://127.0.0.1/pfe_api/chauffeur/get_chouffeur_for_mession`)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });

  }


 



  deleteMission(id_mission: string) {

    this.controls.verifVF('chauffeur');

    let param1 = new HttpParams;
    param1 = param1.set('tabname', 'mission');
    param1 = param1.set('nomId', 'id_mission');
    param1 = param1.set('id', id_mission);

    return new Promise((resolve, reject) => {

      this.httpClient.post('http://127.0.0.1/pfe_api/Generale/delete_generale', param1)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });

  };
}
