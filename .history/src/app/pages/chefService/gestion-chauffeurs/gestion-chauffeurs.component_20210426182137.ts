import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { ChefService } from "../../../services/chef-service.service";
import { ControlsService } from '../../../services/controls.service';
import { PopupChauffeurComponent } from "../popup-chauffeur/popup-chauffeur.component";

@Component({
  selector: 'app-gestion-chauffeurs',
  templateUrl: './gestion-chauffeurs.component.html',
  styleUrls: ['./gestion-chauffeurs.component.scss']
})
export class GestionChauffeursComponent implements OnInit {
  p: number;
  constructor(private userServ: UserService,
    private chefServ: ChefService,
    private modalService: NgbModal,
    private controls: ControlsService) { }

  chauffeursActif: Chauffeur[] = [];
  chauffeursAll: Chauffeur[] = [];


  ngOnInit() {
    this.getUsers(resAcitf => {
      this.chauffeursActif = resAcitf
    }, true);
      this.getUsers(results => {
        this.chauffeursAll = [...this.chauffeursActif.concat(results)];
      }, false);

  }

  async getUsers(callback, actif: boolean) {

    try {
      const { msg, erorer } = await this.userServ.getAllUsers(actif) as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }

  }

  async update(chauffeur: Chauffeur) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'MODIFICATION CHAUFFEUR';
    modalRef.componentInstance.chauffeur = { ...chauffeur };

    if (this.chauffeursAll.length > 0) {
      modalRef.componentInstance.chauffeursAll = this.chauffeursAll;
      modalRef.componentInstance.matList = this.controls.getAllMatriculeOrEmails(this.chauffeursAll, 'matricule');
      modalRef.componentInstance.emailList = this.controls.getAllMatriculeOrEmails(this.chauffeursAll, 'email');
    }

  }
  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.chefServ.activeDesactiveChauffeurAccount(id, true) as any;

      if (!erorer) {
        this.controls.reloadComponent();
      }
    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Opération non effectuée !";
    }

  }

  Ajouter() {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'NOUVEAU CHAUFFEUR';
    if (this.chauffeursAll.length > 0) {
      alert(true)

      // modalRef.componentInstance.matList = this.controls.getAllMatriculeOrEmails(this.chauffeursAll, 'matricule');

      // modalRef.componentInstance.emailList = this.controls.getAllMatriculeOrEmails(this.chauffeursAll, 'email');
    }
  }


  showChauffeur(chauffeur: Chauffeur, actif: boolean) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'DONNEES CHAUFFEUR';
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;
    modalRef.componentInstance.chauffeur = { ...chauffeur };

  }


}

