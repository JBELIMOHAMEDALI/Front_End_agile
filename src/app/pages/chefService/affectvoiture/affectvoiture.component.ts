import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ControlsService } from "../../../services/controls.service";
import { AffectVoitureService } from "../../../services/affect-voiture.service";
import { PopupAffectationComponent } from "../popup-affectation/popup-affectation.component";

@Component({
  selector: "app-affectvoiture",
  templateUrl: "./affectvoiture.component.html",
  styleUrls: ["./affectvoiture.component.scss"],
})
export class AffectvoitureComponent implements OnInit {
  voituresAffectes: [] = [];
  p: number;
  term: any;
  constructor(
    private affectService: AffectVoitureService,
    private modalService: NgbModal,
    private affectVoitureService: AffectVoitureService,
    private controls: ControlsService
  ) { }
  ngOnInit() {
    this.getAllAffectations((res) => {
      this.voituresAffectes = res;
    });
  }
  Affecter() {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.title = "AFFECTATION CHAUFFEUR VOITURE";
  }
  async getAllAffectations(callback) {
    try {
      const { msg, erorer } =
        ((await this.affectService.getAllAffectations("1")) as any) || [];
      if (!erorer) callback(msg);
    } catch (error) {
      return error;
    }
  }
  updateAffectation(payload) {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.title = "MODIFICATION AFFECTATION";
    modalRef.componentInstance.id = Number(payload.id_affectation);
    modalRef.componentInstance.voiture = this.loadObjects(
      "voiture",
      payload.id_voiture
    );
    modalRef.componentInstance.chauffeur = this.loadObjects(
      "chauffeur",
      payload.id_chauffeur
    );
  }
  async loadObjects(option: string, id?: string) {
    try {
      const { msg, erorer } =
        ((await this.affectVoitureService.getAll(option)) as any) || [];
      if (!erorer) {
        switch (option) {
          case "chauffeur":
            return msg.find((element) => element.id_chauffeur === id);
          case "voiture":
            return msg.find((element) => element.id_voiture === id);
        }
      }
    } catch (error) {
      return error;
    }
  }
  activerDesactiverAffectation(idAffectation: string) {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.title =
      "SUPPRESSION D'UNE AFFECTATION CHAUFFEUR VOITURE";
    modalRef.componentInstance.idAffectation = idAffectation;
  }
}
