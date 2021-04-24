import { Component, OnInit } from '@angular/core';
import { MissionsChauffeurService } from '../../../services/missions-chauffeur.service';
import { Mission } from '../../../models/mission';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupMissionChauffeurComponent } from '../popup-mission-chauffeur/popup-mission-chauffeur.component';
import { Router } from '@angular/router';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { ControlsService } from "../../../services/controls.service";


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  listmession: Mission[] = [];
  p:number;
  mayId: string;

  
  constructor(public controls:ControlsService,private serviseMesion: MissionsChauffeurService, private modalService: NgbModal) {
    
  }

  ngOnInit() {
    this.getMesMession(resulta => {
      this.listmession = resulta;
    });
  }
  async getMesMession(callback) {

    try {
      const { msg, erorer } = await this.serviseMesion.getMesMission(this.getId(), "0", "1") as any || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
     return error;  
      }

  }


  don(idMission: string) {
    const modalRef = this.modalService.open(PopupMissionChauffeurComponent);
    modalRef.componentInstance.title = 'Mission Terminée';
    modalRef.componentInstance.id = idMission;
  }


  showMission(mission:Mission) {
    const modalRef = this.modalService.open(PopupMissionChauffeurComponent);
    modalRef.componentInstance.title = 'Info Mission';
    modalRef.componentInstance.mission = {...mission};
  }

  getId(){
   const idUser = JSON.parse(localStorage.getItem('idConnexion')).idUser
    return this.controls.decryptData(idUser).toString();

}

}


