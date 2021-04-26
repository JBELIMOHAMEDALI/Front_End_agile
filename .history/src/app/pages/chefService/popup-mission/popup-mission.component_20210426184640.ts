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
  chauffeurtoUpdate=new Array<Chauffeur>();
  constructor(
    public activeModal: NgbActiveModal,
    private missionService: MissionsService,
    private modalService: NgbModal,
    public controls: ControlsService,
    private affectVoitureService: AffectVoitureService
  ) { }

  ngOnInit() {
    this.loadChauffeursNonAffectes(chauffeurs => {
      this.chauffeurList = chauffeurs
      this.chauffeurtoUpdate = chauffeurs.filter(chauffeur=>chauffeur.id_chauffeur!=this.mission.id_chauffeur);
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
    const idChefService = this.controls.decryptData(JSON.parse(localStorage.getItem('idConnexion')).idUser);

    const { id_chauffeur, dd, df, desc } = form.value;

    try {
      const mission = new Mission(desc, dd.toString(), df.toString(), idChefService, id_chauffeur);

      const { msg, erorer } = await this.missionService.addMission(mission) as any || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué,Vérifier la voiture affectée à ce chauffeur !";
    }
  }


  async updateMission(form: NgForm) {
    const idChefService = this.controls.decryptData(JSON.parse(localStorage.getItem('idConnexion')).idUser);
    const { dd, df, id_chauffeur, desc } = form.value;

    try {
      const mission = new Mission(desc, dd, df, idChefService, id_chauffeur, this.id.toString());
      const { msg, erorer } = await this.missionService.updateMission(mission) as any || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectuée !";
    }

  }


  async loadChauffeursNonAffectes(callback) {
    try {
      const { msg, erorer } = await this.missionService.getChauffeursAffectes() as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }
  }

  async loadVoituresNonAffectees(callback) {

    try {
      const { msg, erorer } = await this.affectVoitureService.getChauffeursVoituresNonaffectesActifs('voiture') as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }

  }




}
