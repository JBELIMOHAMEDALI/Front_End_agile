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
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.scss']
})
export class VoituresComponent implements OnInit {
  constructor(private voitureService: VoitureService,
    private modalService: NgbModal,
    private controls: ControlsService) { }


  voitureListActif: Voiture[] = [];


  async ngOnInit() {
    this.getVoitures(res => {
      this.voitureListActif = res;
    });



  }



  update(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.titel = 'Modifier Une Voiture';
    modalRef.componentInstance.id = Number(id);

  }

  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.voitureService.activeDisactiveVoiture(id, false) as any;

      if (!erorer) {
        this.controls.reloadComponent();
      }


    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }

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


  showVoiture(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'Affichage Voiture';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = true;

  }

  async getVoitures(callback) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(true) as any || [];
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


