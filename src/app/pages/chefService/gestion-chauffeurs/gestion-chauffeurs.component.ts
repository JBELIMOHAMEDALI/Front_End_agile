import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { Router } from "@angular/router";
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
    private modalService: NgbModal, private router: Router,
    private controls: ControlsService) { }

  chauffeursActif: Chauffeur[] = [];

  ngOnInit() {
    this.getUsers(res => {
      this.chauffeursActif = res;
    });

  }

  async getUsers(callback) {

    try {
      const { msg, erorer } = await this.userServ.getAllUsers(true) as any || [];
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
    modalRef.componentInstance.title = 'Modifier Un Chauffeur';
    modalRef.componentInstance.id = Number(id);

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
    modalRef.componentInstance.title = 'Ajouter Un Chauffeur';
    // modalRef.componentInstance.id = -1;
  }


  showChauffeur(id: string, actif: boolean) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = 'Affichage Chauffeur';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;

  }

}

