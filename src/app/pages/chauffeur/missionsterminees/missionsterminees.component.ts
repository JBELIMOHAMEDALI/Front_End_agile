import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MissionsChauffeurService } from "../../../services/missions-chauffeur.service";
import { Mission } from "../../../models/mission";
import { PopupMissionChauffeurComponent } from "../popup-mission-chauffeur/popup-mission-chauffeur.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-missionsterminees",
  templateUrl: "./missionsterminees.component.html",
  styleUrls: ["./missionsterminees.component.scss"],
})
export class MissionstermineesComponent implements OnInit {
  listmession: Mission[] = [];
  p: number;
  mayId: string;
  term: any;

  constructor(
    public controls: ControlsService,
    private serviseMesion: MissionsChauffeurService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getMesMession((resulta) => {
      this.listmession = resulta;
    });
  }
  showMission(mission: Mission) {
    const modalRef = this.modalService.open(PopupMissionChauffeurComponent);
    modalRef.componentInstance.title = "Info Mission";
    modalRef.componentInstance.mission = { ...mission };
  }

  async getMesMession(callback) {
    try {
      const { msg, erorer } =
        ((await this.serviseMesion.getMesMission(
          this.getId(),
          "1",
          "1"
        )) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }

  getId() {
    const idUser = JSON.parse(localStorage.getItem("idConnexion")).idUser;
    return this.controls.decryptData(idUser).toString();
  }
}
