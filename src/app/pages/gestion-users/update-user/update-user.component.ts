import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from '../../../services/user.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";




@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() show: boolean = false;
  @Input() actif: boolean = true;

  chauffeur: Chauffeur
  chauffeurList = new Array<Chauffeur>();

  constructor(public activeModal: NgbActiveModal,
    private chauffeurService: ChauffeurService,
    private modalService: NgbModal,
    private userServ: UserService, private router: Router) { }


  ngOnInit() {
    if (this.id != -1 || this.show)
      this.getOneChauffeur(this.actif);


  }


  onSubmit(form: NgForm) {
    if (this.chauffeur) {
      this.updateChauffeur(form);

    } else {
      this.addChauffeur(form);
    }

  }

  async getOneChauffeur(actif: boolean) {

    const payload = { 'tabname': 'chauffeur', 'id': this.id, 'nomId': 'id_chauffeur' };

    try {

      const { msg } = await this.userServ.getOneChauffeurbyId(payload, actif) as any || [];

      if (msg.length > 0) {
        this.chauffeur = msg[0];
      }

    } catch (error) {
      return error;
    }


  }


  closeReload() {
    const currentRoute = this.router.url;

    this.activeModal.dismiss();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  verifTel(tel: HTMLInputElement): boolean {
    const telephone = tel.value.toString();
    if (telephone.charAt(0) != '2' || telephone.charAt(0) != '5' || telephone.charAt(0) != '9') {
      return false;
    } else {
      return true;
    }
  }

  async addChauffeur(form: NgForm) {
    const { matricule, nomPrenom, email, tel, dns, region } = form.value;

    try {
      const chauffeur = new Chauffeur(email, matricule, nomPrenom, tel, region, dns);
      const { msg, erorer } = await this.chauffeurService.addChauffeur(chauffeur) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Ajout non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
    this.closeReload();
  }


  async updateChauffeur(form: NgForm) {
    const { matricule, nomPrenom, email, tel, dns, region, statut } = form.value;

    var st = '0'
    if (statut === '1' || statut) {
      st = '1';
    }
    try {
      const chauffeur = new Chauffeur(email, matricule, nomPrenom, tel, region, dns, this.chauffeur.id_chauffeur, st);
      const { msg, erorer } = await this.chauffeurService.updateChauffeur(chauffeur) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Modification non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Modification non effectué !";
    }
    this.closeReload();

  }


}
