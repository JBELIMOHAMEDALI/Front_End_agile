import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-voituresinactifs",
  templateUrl: "./voituresinactifs.component.html",
  styleUrls: ["./voituresinactifs.component.scss"],
})
export class VoituresinactifsComponent implements OnInit {
  voitureListInactif: Voiture[] = [];
  p: number;
  term: any;

  constructor(
    private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService
  ) { }
  async ngOnInit() {
    this.getVoitures((result) => {
      this.voitureListInactif = result;
    });
  }

  showVoiture(voiture: Voiture) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "DONNEES VOITURE";
    modalRef.componentInstance.id = Number(voiture.id_voiture);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = false;
    modalRef.componentInstance.voiture = { ...voiture };
  }

  async getVoitures(callback) {
    try {
      const { msg, erorer } =
        ((await this.voitureService.getAllVoitures(false)) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }

  activerDesactiver(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "ACTIVATION VOITURE";
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.actif = true;
  }
}
