import { Component, OnInit, Input } from '@angular/core';
import { ControlsService } from '../../../services/controls.service';
import { MissionsService } from '../../../services/missions.service';
import { Mission } from "../../../models/mission";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { Voiture } from '../../../models/voiture';
import { Chauffeur } from '../../../models/chauffeur';
import { AffectVoitureService } from '../../../services/affect-voiture.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-popup-mission',
  templateUrl: './popup-mission.component.html',
  styleUrls: ['./popup-mission.component.scss']
})
export class PopupMissionComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() show: boolean = false;

  @Input() mission: any;
  voitureList = new Array<Voiture>();
  chauffeurList = new Array<Chauffeur>();

  constructor(
    public activeModal: NgbActiveModal,
    private missionService: MissionsService,
    private modalService: NgbModal,
    public controls: ControlsService,
    private affectVoitureService: AffectVoitureService
  ) { }

  ngOnInit() {
    // if (this.id != -1)
    //   this.getOneMission();
    console.log(this.mission)

    this.loadChauffeursNonAffectes(chauffeurs => {
      this.chauffeurList = chauffeurs;
    });
    this.loadVoituresNonAffectees(voitures => {
      this.voitureList = voitures;
    });
  }


  onSubmit(form: NgForm) {
    if (this.mission) {
      this.updateMission(form);

    } else {
      this.addMission(form);
    }

  }

  async addMission(form: NgForm) {
    const idChefService = this.decryptData(JSON.parse(localStorage.getItem('idConnexion')).idUser);

    const { id_voiture, id_chauffeur, dd, df, desc } = form.value;

    try {
      const mission = new Mission(desc, dd.toString(), df.toString(), null, null, idChefService, id_chauffeur, id_voiture);
      const { msg, erorer } = await this.missionService.addMission(mission) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Ajout non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
    this.activeModal.dismiss();
    this.controls.reloadComponent();
  }


  async updateMission(form: NgForm) {
    const idChefService = this.decryptData(JSON.parse(localStorage.getItem('idConnexion')).idUser);
    const { dd, df, id_chauffeur, id_voiture, desc } = form.value;

    try {
      const mission = new Mission(desc, dd, df, null, this.id.toString(), idChefService, id_chauffeur, id_voiture);
      const { msg, erorer } = await this.missionService.updateMission(mission) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Modification non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectué !";
    }
    this.activeModal.dismiss();
    this.controls.reloadComponent();
  }


  async loadChauffeursNonAffectes(callback) {
    try {
      const { msg, erorer } = await this.affectVoitureService.getChauffeursVoituresNonaffectesActifs('chauffeur') as any || [];
      if (erorer) {
        callback([]);

      } else {
        callback(msg);
      }

    } catch (error) {
      callback([]);
    }
  }

  async loadVoituresNonAffectees(callback) {

    try {
      const { msg, erorer } = await this.affectVoitureService.getChauffeursVoituresNonaffectesActifs('voiture') as any || [];
      if (erorer) {
        callback([]);
      } else {
        callback(msg);
      }

    } catch (error) {
      callback([]);
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

}
