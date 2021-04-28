import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { ChauffeurService } from "../../../services/chauffeur.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-popup-chauffeur",
  templateUrl: "./popup-chauffeur.component.html",
  styleUrls: ["./popup-chauffeur.component.scss"],
})
export class PopupChauffeurComponent implements OnInit {
  @Input() title: string = "";
  @Input() show: boolean = false;
  @Input() actif: boolean = true;
  @Input() matList: string[] = [];
  @Input() emailList: string[] = [];
  @Input() chauffeursAll: Chauffeur[] = [];

  @Input() chauffeur: Chauffeur;
  sameChauffeur: boolean = false;

  regions: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private chauffeurService: ChauffeurService,
    private modalService: NgbModal,
    public controls: ControlsService
  ) {
    this.regions = this.controls.getRegions();
  }

  ngOnInit() {
    console.log(this.emailList);
    if (!this.show) {
      this.matList = this.matList.filter(
        (matricule) => matricule != this.chauffeur.matricule
      );
      this.emailList = this.emailList.filter(
        (email) => email != this.chauffeur.email
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.chauffeur) {
      this.updateChauffeur(form);
    } else {
      this.addChauffeur(form);
    }
  }

  async addChauffeur(form: NgForm) {
    const { matricule, nomPrenom, email, tel, dns, region } = form.value;

    try {
      const chauffeur = new Chauffeur(
        email,
        matricule,
        nomPrenom,
        tel.toString(),
        region,
        dns
      );
      const { msg, erorer } =
        ((await this.chauffeurService.addChauffeur(chauffeur)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
  }

  async updateChauffeur(form: NgForm) {
    const {
      matricule,
      nomPrenom,
      email,
      tel,
      dns,
      region,
      statut,
    } = form.value;

    let st = "0";
    if (statut === "1" || statut) {
      st = "1";
    }
    try {
      const chauffeur = new Chauffeur(
        email,
        matricule,
        nomPrenom,
        tel,
        region,
        dns,
        this.chauffeur.id_chauffeur,
        st
      );
      const { msg, erorer } =
        ((await this.chauffeurService.updateChauffeur(chauffeur)) as any) || [];
      if (!erorer) {
        this.activeModal.dismiss();
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectuée !";
    }
  }
}
