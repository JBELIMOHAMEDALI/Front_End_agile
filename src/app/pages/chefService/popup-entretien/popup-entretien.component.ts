import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Voiture } from "../../../models/voiture";
import { Entretien } from "../../../models/entretien";
import { EntretienService } from "../../../services/entretien.service";
import { VoitureService } from "../../../services/voiture.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-popup-entretien",
  templateUrl: "./popup-entretien.component.html",
  styleUrls: ["./popup-entretien.component.scss"],
})
export class PopupEntretienComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() show: boolean = false;

  @Input() voitureList: Voiture[] = [];
  @Input() entretien: any;

  constructor(
    public activeModal: NgbActiveModal,
    private entretienService: EntretienService,
    private modalService: NgbModal,
    private voitureService: VoitureService,
    public controls: ControlsService
  ) {}

  ngOnInit() {
    if (!this.show) {
      this.getActifAllvoitures((voitures) => {
        this.voitureList = voitures;
      });
    }
  }

  onSubmit(form: NgForm) {
    if (this.entretien) {
      this.updateEntrtien(form);
    } else {
      this.addEntretien(form);
    }
  }

  async addEntretien(form: NgForm) {
    const { date, desc, voitureopt } = form.value;

    try {
      const entretien = new Entretien(voitureopt, date, desc);
      const { msg, erorer } =
        ((await this.entretienService.addEntretien(entretien)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
  }

  async updateEntrtien(form: NgForm) {
    const { date, desc } = form.value;
    try {
      const entretien = new Entretien(
        this.entretien.id_voiture,
        date,
        desc,
        this.entretien.id_entretien
      );
      const { msg, erorer } =
        ((await this.entretienService.updateEntretien(entretien)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectuée !";
    }
  }

  async getActifAllvoitures(callback) {
    try {
      const { msg, erorer } =
        ((await this.voitureService.getAllVoitures(true)) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }

  async supprimerEntretien() {
    try {
      const { msg, erorer } =
        ((await this.entretienService.deleteEntretien(
          this.id.toString()
        )) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Suppression non effectuée";
    }
  }
}
