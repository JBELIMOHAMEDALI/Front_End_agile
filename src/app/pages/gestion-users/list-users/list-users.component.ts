import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { UpdateUserComponent } from "../update-user/update-user.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  constructor(private userServ: UserService, private chefServ: ChefService, private modalService: NgbModal, private router: Router) { }
  chauffeurs: Chauffeur[] = [];
  ngOnInit() {
    // this.getUsers();

  }

  // async getUsers() {
  //   // const { type } = JSON.parse(localStorage.getItem('idConnexion'));
  //   // const userRole = this.decryptData(type);
  //   try {
  //     const { msg, erorer } = await this.userServ.getAllUsers() as any || [];
  //     if (erorer) {

  //       this.chauffeurs = [];

  //     } else {

  //       this.chauffeurs = msg;
  //     }

  //   } catch (error) {
  //     this.chauffeurs = [];
  //   }

  // }

  async update(id: string) {
    const modalRef = this.modalService.open(UpdateUserComponent);
    modalRef.componentInstance.titel = 'Modifier Un Utilisateur';
    modalRef.componentInstance.id = id;

  }
  // async desactiver(id: string) {

  //   try {
  //     const { erorer, msg } = await this.chefServ.disableChauffeurAccount(id) as any;

  //     if (!erorer) {
  //       // this.getUsers();
  //       this.reloud();
  //     }


  //   } catch (error) {
  //     const modelServ = this.modalService.open(LoginErrorComponent);
  //     modelServ.componentInstance.message = error.message;
  //   }

  // }


  // async activer(id: string) {

  //   try {
  //     const { erorer, msg } = await this.chefServ.disableChauffeurAccount(id) as any;

  //     if (!erorer) {
  //       // this.getUsers();
  //       this.reloud();
  //     }


  //   } catch (error) {
  //     const modelServ = this.modalService.open(LoginErrorComponent);
  //     modelServ.componentInstance.message = error.message;
  //   }

  // }

  reloud() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }


  opendetaile(id) {
    // console.log(id);
    // this.router.navigate(['detail',id]);
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

}
