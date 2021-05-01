import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Voiture } from "../../../models/voiture";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VoitureService } from "../../../services/voiture.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-popup-voiture",
  templateUrl: "./popup-voiture.component.html",
  styleUrls: ["./popup-voiture.component.scss"],
})
export class PopupVoitureComponent implements OnInit {
  @Input() title: string = "";
  @Input() show: boolean = false;
  @Input() matList: string[] = [];

  @Input() id: string = null;
  voitureList = new Array<Voiture>();

  @Input() actif: boolean = false;
  @Input() voiture: Voiture;

  constructor(
    public activeModal: NgbActiveModal,
    private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService
  ) {}

  ngOnInit() {
    if (this.voiture && !this.show)
      this.matList = this.matList.filter(
        (matricule) => matricule != this.voiture.matricule
      );
  }

  onSubmit(form: NgForm) {
    if (this.voiture) {
      this.updateVoiture(form);
    } else {
      this.addVoiture(form);
    }
  }

  async addVoiture(form: NgForm) {
    const { matricule, type, dmc, puissance, service } = form.value;

    try {
      const voiture = new Voiture(matricule, puissance, service, type, dmc);
      const { msg, erorer } =
        ((await this.voitureService.addVoiture(voiture)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
  }

  async updateVoiture(form: NgForm) {
    const { matricule, dmc, puissance, service, type } = form.value;

    try {
      const voiture = new Voiture(
        matricule,
        puissance,
        service,
        type,
        dmc,
        this.voiture.id_voiture
      );
      const { msg, erorer } =
        ((await this.voitureService.updateVoiture(voiture)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectuée !";
    }
  }

  async activerDesactiver() {
    try {
      const { erorer, msg } = (await this.voitureService.activeDisactiveVoiture(
        this.id,
        this.actif
      )) as any;

      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Opération non effectuée !";
    }
  }
}
