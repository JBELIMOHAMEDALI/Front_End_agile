import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";
import * as moment from 'moment';

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
    this.getVoitures(resActif => {
      this.voitureListActif = resActif;
      this.getVoitures(results => {
        this.voitureListAll = [...resActif.concat(results)];
      }, false);
    }, true);
    // const a = new Date("2017-12-31 11:12:30");
    // const b = new Date("2018-05-31 16:12:30");

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


