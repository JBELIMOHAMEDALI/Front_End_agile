import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-voitures",
  templateUrl: "./voitures.component.html",
  styleUrls: ["./voitures.component.scss"],
})
export class VoituresComponent implements OnInit {
  voitureListActif: Voiture[] = [];
  voitureListAll: Voiture[] = [];
  term: any;

  p: number = 1;
  constructor(
    private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService
  ) {}

  async ngOnInit() {
    this.getVoitures((resActif) => {
      this.voitureListActif = resActif;
      this.voitureListAll = [...resActif];
    }, true);
    this.getVoitures((results) => {
      this.voitureListAll = [...this.voitureListAll.concat(results)];
    }, false);
  }

  Ajouter() {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "NOUVELLE VOITURE";
    if (this.voitureListAll.length > 0) {
      const tab = this.controls.getAllMatriculeOrEmails(
        this.voitureListAll,
        "matricule"
      );

      modalRef.componentInstance.matList = tab;
    }
  }

  update(voiture: Voiture) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "MODIFICATION VOITURE";
    modalRef.componentInstance.voiture = { ...voiture };
    if (this.voitureListAll.length > 0) {
      modalRef.componentInstance.matList = this.controls.getAllMatriculeOrEmails(
        this.voitureListAll,
        "matricule"
      );
    }
  }

  showVoiture(voiture: Voiture) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "DONNEES VOITURE";
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = true;
    modalRef.componentInstance.voiture = { ...voiture };
  }

  async getVoitures(callback, actif: boolean) {
    try {
      const { msg, erorer } =
        ((await this.voitureService.getAllVoitures(actif)) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }

  activerDesactiver(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = "DESACTIVATION VOITURE";
    modalRef.componentInstance.id = id;
  }
}
