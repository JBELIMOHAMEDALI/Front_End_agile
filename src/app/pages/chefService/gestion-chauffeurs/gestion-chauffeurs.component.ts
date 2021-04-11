import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { ControlsService } from '../../../services/controls.service';
import { PopupChauffeurComponent } from "../popup-chauffeur/popup-chauffeur.component";

@Component({
  selector: 'app-gestion-chauffeurs',
  templateUrl: './gestion-chauffeurs.component.html',
  styleUrls: ['./gestion-chauffeurs.component.scss']
})
export class GestionChauffeursComponent implements OnInit {
  constructor(private userServ: UserService,
    private chefServ: ChefService,
    private modalService: NgbModal,
    private controls: ControlsService) { }

  chauffeursActif: Chauffeur[] = [];
  chauffeursAll: Chauffeur[] = [];


  ngOnInit() {
    this.getUsers(res => {
      this.chauffeursActif = res;
    }, true);
    this.getUsers(res => {
      this.chauffeursAll = [...this.chauffeursActif.concat(res)];
    }, false);

  }

  async getUsers(callback, actif: boolean) {

    try {
      const { msg, erorer } = await this.userServ.getAllUsers(actif) as any || [];
      if (erorer) {

        callback([]);

      } else {

        callback(msg);
      }

    } catch (error) {
      callback([]);
    }

  }

  async update(id: string) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'MODIFICATION CHAUFFEUR';
    modalRef.componentInstance.id = Number(id);

    if (this.chauffeursAll.length > 0) {
      modalRef.componentInstance.chauffeursAll = this.chauffeursAll;
      modalRef.componentInstance.matList = this.getAllMatricule(this.chauffeursAll);
      modalRef.componentInstance.emailList = this.getAllEmails(this.chauffeursAll);
    }

  }
  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.chefServ.activeDesactiveChauffeurAccount(id, true) as any;

      if (!erorer) {
        this.controls.reloadComponent();
      }


    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }

  }


  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, 'secretKey');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return e;
    }
  }


  Ajouter() {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'NOUVEAU CHAUFFEUR';
    if (this.chauffeursAll.length > 0) {

      modalRef.componentInstance.matList = this.getAllMatricule(this.chauffeursAll);

      modalRef.componentInstance.emailList = this.getAllEmails(this.chauffeursAll);
    }

    // modalRef.componentInstance.id = -1;
  }


  showChauffeur(id: string, actif: boolean) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'DONNEES CHAUFFEUR';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;

  }

  getAllMatricule(array: Chauffeur[]): string[] {
    const matList = new Array<string>();
    for (let index = 0; index < array.length; index++) {
      const matricule = array[index].matricule;
      matList.push(matricule)

    }
    return matList;
  }

  getAllEmails(array: Chauffeur[]): string[] {
    const emailList = new Array<string>();
    for (let index = 0; index < array.length; index++) {
      const email = array[index].email;
      emailList.push(email)

    }
    return emailList;
  }

}

