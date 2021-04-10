import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import * as CryptoJS from 'crypto-js';
import { ChefService } from "../../../services/chef-service.service";
import { VoitureService } from "../../../services/voiture.service";
import { UserService } from "../../../services/user.service";
import { Voiture } from "../../../models/voiture";

import { Router } from "@angular/router";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";

@Component({
  selector: 'app-voituresinactifs',
  templateUrl: './voituresinactifs.component.html',
  styleUrls: ['./voituresinactifs.component.scss']
})
export class VoituresinactifsComponent implements OnInit {
  constructor(private voitureService: VoitureService, private userServ: UserService, private chefServ: ChefService,
    private modalService: NgbModal, private router: Router) { }
  voitureListInactif: Voiture[] = [];

  async ngOnInit() {
   
    this.getVoitures(result => {
      this.voitureListInactif = result;

    });

  }


  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.voitureService.activeDisactiveVoiture(id, true) as any;

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


  

  showVoiture(id: string) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'Affichage Voiture';
    modalRef.componentInstance.id = Number(id);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = false;

  }

  async getVoitures(callback) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(false) as any || [];
      if (erorer) {

        callback([]);

      } else {

        callback(msg);
      }

    } catch (error) {
      callback([]);
    }
  }



}



