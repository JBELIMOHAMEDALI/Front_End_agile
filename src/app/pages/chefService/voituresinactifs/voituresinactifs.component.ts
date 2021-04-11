import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: 'app-voituresinactifs',
  templateUrl: './voituresinactifs.component.html',
  styleUrls: ['./voituresinactifs.component.scss']
})
export class VoituresinactifsComponent implements OnInit {
  constructor(private voitureService: VoitureService,
    private modalService: NgbModal,
    private controls: ControlsService) { }
  voitureListInactif: Voiture[] = [];

  async ngOnInit() {

    this.getVoitures(result => {
      this.voitureListInactif = result;

    });

  }


  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.voitureService.activeDisactiveVoiture(id, true) as any;

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

  showVoiture(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'DONNEES VOITURE';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = false;

  }

  async getVoitures(callback) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(false) as any || [];
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



