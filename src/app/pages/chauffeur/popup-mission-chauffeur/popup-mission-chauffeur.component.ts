import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../../../models/mission';
import { MissionsChauffeurService } from '../../../services/missions-chauffeur.service';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { ControlsService } from "../../../services/controls.service";


@Component({
  selector: 'app-popup-mission-chauffeur',
  templateUrl: './popup-mission-chauffeur.component.html',
  styleUrls: ['./popup-mission-chauffeur.component.scss']
})


export class PopupMissionChauffeurComponent implements OnInit {
  @Input() title;
  @Input() mission:Mission;
  @Input() id:string;


  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,
    public controls: ControlsService,
    private router: Router, private missionServise: MissionsChauffeurService) { }
 
 
  ngOnInit() {
   
    this.controls.daysDiff(this.mission.date_fin)

  }

  async update_etat() {

    try {
      const { msg, erorer } = await this.missionServise.updateEtatMission(this.id) as any || [];
      if (!erorer) {
           this.controls.reloadComponent();
          this.activeModal.dismiss();

      }
    } catch (error) {
       const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Erreur d'accées internet !";
    }
  }
  // async get_info(callback) {

  //   try {
  //     const { msg, erorer } = await this.missionServise.getOneMission(this.id) as any || [];
  //     if (erorer) {

  //       callback([]);

  //     } else {

  //       callback(msg);
  //     }

  //   } catch (error) {
  //     callback([]);
  //   }


  // }

  
}


