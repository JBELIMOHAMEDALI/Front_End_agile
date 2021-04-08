import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../models/user";
import { NgForm } from '@angular/forms';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  // Declaration variables
  user: User
  // fullname: string;
  // matricule: string;
  // email: string;
  // tel: string;


  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public basicContent: string;


  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;

  constructor(private userServ: UserService, private route: Router, private modalService: NgbModal) {
  }

  async ngOnInit() {

    const user = JSON.parse(localStorage.getItem('idConnexion'));

    if (user) {
      const userRole = this.decryptData(user.type);
      var nom_id: string = "";
      switch (userRole) {
        case 'administrateur':
          nom_id = "id_admin";
          break;
        case 'chefService':
          nom_id = "id_chefService";
          break;
        case 'chauffeur':
          nom_id = "id_chauffeur";
          break;
      }

      const payload = { 'id': this.decryptData(user.idUser), 'tabname': userRole, 'nomId': nom_id };
      const { erorer, msg } = await this.userServ.getOneChauffeurbyId(payload, true) as any;

      if (erorer) {
        this.route.navigate(['/']);

      } else {
        this.user = msg[0];
      }
    } else {
      this.route.navigate(['/accueil']);
    }

  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  async SaveUser(userData: NgForm) {

    const data = { id: this.user.id_user, ...userData.value }
    try {
      await this.userServ.UpdateUser(data);
      this.toggleEditProfile();

    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = error.message;
    }
  };

  verifNomComplet(nomComplet: HTMLInputElement): boolean {
    return true;
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
  formatType(type: string): string {
    if (type)
      return type.replace(type.charAt(0), type.charAt(0).toLocaleUpperCase());
    else
      return null
  }

}
