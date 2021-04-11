import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.scss']
})
export class VoituresComponent implements OnInit {
  voitureListActif: Voiture[] = [];
  voitureListAll: Voiture[] = [];


  constructor(private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService) { }




  async ngOnInit() {
    this.getVoitures(res => {
      this.voitureListActif = res;
    }, true);
    this.getVoitures(res => {
      this.voitureListAll = [...this.voitureListActif.concat(res)];
    }, false);


  }



  update(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'MODIFICATION VOITURE';
    modalRef.componentInstance.id = Number(id);
    if (this.voitureListAll.length > 0) {
      modalRef.componentInstance.matList = this.getAllMatricule(this.voitureListAll);
    }
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
    modalRef.componentInstance.title = 'NOUVELLE VOITURE';
    modalRef.componentInstance.id = -1;
    if (this.voitureListAll.length > 0) {
      modalRef.componentInstance.matList = this.getAllMatricule(this.voitureListAll);
    }
  }


  showVoiture(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'DONNEES VOITURE';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = true;

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

  getAllMatricule(array: Voiture[]): string[] {

    const matList = new Array<string>();
    for (let index = 0; index < array.length; index++) {
      const matricule = array[index].matricule;
      matList.push(matricule)

    }
    return matList;
  }

}


