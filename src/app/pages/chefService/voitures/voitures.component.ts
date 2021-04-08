import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { VoitureService } from "../../../services/voiture.service";
import { UserService } from "../../../services/user.service";
import { Voiture } from "../../../models/voiture";

import { Router } from "@angular/router";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.scss']
})
export class VoituresComponent implements OnInit {
  constructor(private voitureService: VoitureService, private userServ: UserService, private chefServ: ChefService,
    private modalService: NgbModal, private router: Router) { }
  voitureListActif: Voiture[] = [];
  voitureListInactif: Voiture[] = [];

  async ngOnInit() {
    this.getVoitures(res => {
      this.voitureListActif = res;
      this.getVoitures(result => {
        this.voitureListInactif = result;

      }, false);

    }, true);


  }



  update(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.titel = 'Modifier Une Voiture';
    modalRef.componentInstance.id = Number(id);

  }

  async activerDesactiver(id: string, actif: boolean) {

    try {
      const { erorer, msg } = await this.voitureService.activeDisactiveVoiture(id, actif) as any;

      if (!erorer) {
        this.reloadComponent();
      }


    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }

  }

  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }




  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, 'secretKey');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return e;
    }
  }


  Ajouter() {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'Ajouter une voiture';
    modalRef.componentInstance.id = -1;
  }


  showVoiture(id: string, actif: boolean) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'Affichage Voiture';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;

  }

  async getVoitures(callback, actif: boolean) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(actif) as any || [];
      if (erorer) {

        callback([]);

      } else {

        callback(msg);
      }

    } catch (error) {
      callback([]);
    }
  }



}


