import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlsService } from '../../../services/controls.service';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { PopupMissionComponent } from '../popup-mission/popup-mission.component';
import { MissionsService } from '../../../services/missions.service';

@Component({
  selector: 'app-affectmission',
  templateUrl: './affectmission.component.html',
  styleUrls: ['./affectmission.component.scss']
})


export class AffectmissionComponent implements OnInit {
  missionsList: [] = [];
  p: number;

  constructor(private missionService: MissionsService,
    private modalService: NgbModal,
    public controls: ControlsService) { }

  ngOnInit() {    
    this.getAllMissions(res => {
      this.missionsList = res;
    });

  }

  Affecter() {
    const modalRef = this.modalService.open(PopupMissionComponent);
    modalRef.componentInstance.title = 'NOUVELLE MISSION';
    modalRef.componentInstance.id = -1;

  }


  async getAllMissions(callback) {
    try {
      const { msg, erorer } = await this.missionService.getAllMissions() as any || [];
      if (!erorer)
        callback(msg);
    } catch (error) {
      return error;
    }
  }



  updateMission(mission) {
    const modalRef = this.modalService.open(PopupMissionComponent);
    modalRef.componentInstance.title = 'MODIFIER UNE MISSION';
    modalRef.componentInstance.id = Number(mission.id_mission);
    modalRef.componentInstance.mission = { ...mission }
  }


  async supprimerMission(id_mission: string) {
    try {
      const { msg, erorer } = await this.missionService.deleteMission(id_mission) as any || [];
      if (!erorer) {
        this.controls.reloadComponent();
      }

    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Suppression non effectuée";
    }
  }

  showMission(mission) {
    const modalRef = this.modalService.open(PopupMissionComponent);
    modalRef.componentInstance.title = 'DONNEES MISSION';
    modalRef.componentInstance.id = Number(mission.id_mission);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.mission = { ...mission }

  }
}

