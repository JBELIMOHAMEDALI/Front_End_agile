import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { ChefService } from "../../../models/chef-service";
import { NgForm } from '@angular/forms';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlsService } from '../../../services/controls.service';

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

  user: any



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

  constructor(private userServ: UserService,
    private route: Router,
    private modalService: NgbModal,
    public controls: ControlsService) {
  }

  async ngOnInit() {

    const user = JSON.parse(localStorage.getItem('idConnexion'));
    if (user) {
      const userRole = this.controls.decryptData(user.type);
      var nom_id: string = "";
      switch (userRole) {
        // case 'administrateur':
        //   nom_id = "id_admin";
        //   break;
        case 'chefService':
          nom_id = "id_chefService";
          break;
        case 'chauffeur':
          nom_id = "id_chauffeur";
          break;
      }

      const payload = { 'id': this.controls.decryptData(user.idUser), 'tabname': userRole, 'nomId': nom_id };

      try {
        const { erorer, msg } = await this.userServ.getOneUserbyId(payload, true,'profil') as any;
        if (erorer) {
          this.route.navigate(['/']);

        } else {
          this.user = msg[0];

        }
      } catch (error) {
        const modalRef = this.modalService.open(LoginErrorComponent);
        modalRef.componentInstance.message = "Erreur d'accées internet !";
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

    const idName=this.user.type==='chauffeur'?"id_chauffeur":"id_chefService";

    const tabName=this.user.type==='chauffeur'?"chauffeur":"chefservice";

    const idValue=this.user.type==='chauffeur'?this.user.id_chauffeur:this.user.id_chefService
    const data = { id: idValue, ...userData.value,tabname:tabName,idname:idName };

    try {
      const { erorer, msg } = this.userServ.UpdateUser(data) as any || [];
      if (!erorer) {
        location.reload();
      }

    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Modification non effectuée";
    }
  };


  getCurrentUser(){
    if(this.user)
    return {...this.user};
  }
}
