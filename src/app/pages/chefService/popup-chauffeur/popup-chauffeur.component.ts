import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { ChauffeurService } from "../../../services/chauffeur.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ControlsService } from "../../../services/controls.service";
import { ChefService } from "../../../services/chef-service.service";

@Component({
  selector: "app-popup-chauffeur",
  templateUrl: "./popup-chauffeur.component.html",
  styleUrls: ["./popup-chauffeur.component.scss"],
})
export class PopupChauffeurComponent implements OnInit {
  @Input() title: string = "";
  @Input() show: boolean = false;//double click
  @Input() matList: string[] = [];//controle matrcule
  @Input() emailList: string[] = [];//controle email
  @Input() chauffeur: Chauffeur;//update
  @Input() id_chauffeur: string = null;//delete
  @Input() actif: boolean = true;//type =>actve / desctive
  regions: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private chauffeurService: ChauffeurService,
    private chefServ: ChefService,
    private modalService: NgbModal,
    public controls: ControlsService
  ) {
    this.regions = this.controls.getRegions();
  }

  ngOnInit() {
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

  async activerDesactiver() {
    try {
      const {
        erorer,
        msg,
      } = (await this.chefServ.activeDesactiveChauffeurAccount(
        this.id_chauffeur,
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
