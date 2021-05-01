import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlsService } from "./controls.service";

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  constructor(private controls: ControlsService, private httpClient: HttpClient) { }


  activeDesactiveChauffeurAccount(id: string, actif: boolean) {
    this.controls.verifVF('chauffeur');

    let param1 = new HttpParams;
    param1 = param1.set("id", id);
    param1 = param1.set("tabname", "chauffeur");
    param1 = param1.set("nomId", "id_chauffeur");
    var req = "desactive_compte";
    if (!actif) {
      req = "active_compte";
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
}
