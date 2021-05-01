import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { ControlsService } from "../../../services/controls.service";
import { PopupChauffeurComponent } from "../popup-chauffeur/popup-chauffeur.component";

@Component({
  selector: "app-gestion-chauffeurs",
  templateUrl: "./gestion-chauffeurs.component.html",
  styleUrls: ["./gestion-chauffeurs.component.scss"],
})
export class GestionChauffeursComponent implements OnInit {
  p: number;
  term: any;

  constructor(
    private userServ: UserService,
    private modalService: NgbModal,
    private controls: ControlsService
  ) { }

  chauffeursActif: Chauffeur[] = [];
  chauffeursAll: Chauffeur[] = [];

  ngOnInit() {
    this.getUsers((resAcitf) => {
      this.chauffeursActif = resAcitf;
      this.chauffeursAll = [...resAcitf];
    }, true);
    this.getUsers((results) => {
      this.chauffeursAll = [...this.chauffeursAll.concat(results)];
    }, false);
  }

  async getUsers(callback, actif: boolean) {
    try {
      const { msg, erorer } =
        ((await this.userServ.getAllUsers(actif)) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }
  async update(chauffeur: Chauffeur) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "MODIFICATION CHAUFFEUR";
    modalRef.componentInstance.chauffeur = { ...chauffeur };
    modalRef.componentInstance.id_chauffeur = null;

    if (this.chauffeursAll.length > 0) {
      modalRef.componentInstance.chauffeursAll = this.chauffeursAll;
      modalRef.componentInstance.matList = this.controls.getAllMatriculeOrEmailsUpdate(
        this.chauffeursAll,
        "matricule",
        chauffeur.matricule
      );

      modalRef.componentInstance.emailList = this.controls.getAllMatriculeOrEmailsUpdate(
        this.chauffeursAll,
        "email",
        chauffeur.email
      );
    }
  }
  Ajouter() {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "NOUVEAU CHAUFFEUR";
    modalRef.componentInstance.id_chauffeur = null;

    if (this.chauffeursAll.length > 0) {
      modalRef.componentInstance.matList = this.controls.getAllMatriculeOrEmails(
        this.chauffeursAll,
        "matricule"
      );

      modalRef.componentInstance.emailList = this.controls.getAllMatriculeOrEmails(
        this.chauffeursAll,
        "email"
      );
    }
  }
  showChauffeur(chauffeur: Chauffeur, actif: boolean) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "DONNEES CHAUFFEUR";
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;
    modalRef.componentInstance.chauffeur = { ...chauffeur };
  }
  activerDesactiver(id_chauffeur: string) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "DESACTIVATION CHAUFFEUR";
    modalRef.componentInstance.id_chauffeur = id_chauffeur;
  }
}
