import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { UpdateUserComponent } from "../../gestion-users/update-user/update-user.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestion-chauffeurs',
  templateUrl: './gestion-chauffeurs.component.html',
  styleUrls: ['./gestion-chauffeurs.component.scss']
})
export class GestionChauffeursComponent implements OnInit {
  constructor(private userServ: UserService, private chefServ: ChefService, private modalService: NgbModal, private router: Router) { }
  chauffeurs: Chauffeur[] = [];
  chauffeursActif: Chauffeur[] = [];
  chauffeursInactif: Chauffeur[] = [];

  ngOnInit() {
    this.getUsers(res => {
      this.chauffeursActif = res;

      this.getUsers(result => {
        this.chauffeursInactif = result;
        // this.chauffeurs = [...this.chauffeurs].concat(result || []);
      }, false);

    }, true);
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
    const modalRef = this.modalService.open(UpdateUserComponent);
    modalRef.componentInstance.title = 'Modifier Un Chauffeur';
    modalRef.componentInstance.id = Number(id);

  }
  async desactiver(id: string) {

    try {
      const { erorer, msg } = await this.chefServ.disableChauffeurAccount(id) as any;

      if (!erorer) {
        this.reloadComponent();
      }


    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }

  }

  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
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
    const modalRef = this.modalService.open(UpdateUserComponent);
    modalRef.componentInstance.title = 'Ajouter Un Chauffeur';
    // modalRef.componentInstance.id = -1;
  }

  async activer(id: string) {

    try {
      const { erorer, msg } = await this.chefServ.activeChauffeurAccount(id) as any;

      if (!erorer) {
        this.reloadComponent();
      }
      // const modelServ = this.modalService.open(LoginErrorComponent);
      // modelServ.componentInstance.message = "Activation avec succés";

    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }

  }

  showChauffeur(id: string, actif: boolean) {
    const modalRef = this.modalService.open(UpdateUserComponent);
    modalRef.componentInstance.title = 'Affichage Chauffeur';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = actif;

  }

}

