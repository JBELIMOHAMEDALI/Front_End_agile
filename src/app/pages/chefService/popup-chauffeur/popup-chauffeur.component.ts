import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from '../../../services/user.service';
import { ChauffeurService } from '../../../services/chauffeur.service';
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ControlsService } from '../../../services/controls.service';

@Component({
  selector: 'app-popup-chauffeur',
  templateUrl: './popup-chauffeur.component.html',
  styleUrls: ['./popup-chauffeur.component.scss']
})

export class PopupChauffeurComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() show: boolean = false;
  @Input() actif: boolean = true;
  @Input() matList: string[] = [];
  @Input() emailList: string[] = [];
  @Input() chauffeursAll: Chauffeur[] = [];

  chauffeur: Chauffeur;
  sameChauffeur: boolean = false;


  constructor(public activeModal: NgbActiveModal,
    private chauffeurService: ChauffeurService,
    private modalService: NgbModal,
    private userServ: UserService,
    public controls: ControlsService) {

  }



  ngOnInit() {
    if (this.id != -1 || this.show) {

      this.getOneChauffeur(this.actif);
    }
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

      const { msg, erorer } = await this.userServ.getOneChauffeurbyId(payload, actif) as any || [];

      if (!erorer) {
        this.chauffeur = msg[0];
        this.matList = this.matList.filter(matricule => matricule != this.chauffeur.matricule);
        this.emailList = this.emailList.filter(email => email != this.chauffeur.email);

      }

    } catch (error) {
      return error;
    }


  }


  async addChauffeur(form: NgForm) {
    const { matricule, nomPrenom, email, tel, dns, region } = form.value;

    try {
      const chauffeur = new Chauffeur(email, matricule, nomPrenom, tel.toString(), region, dns);
      const { msg, erorer } = await this.chauffeurService.addChauffeur(chauffeur) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Ajout non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
    this.activeModal.dismiss();
    this.controls.reloadComponent();
  }


  async updateChauffeur(form: NgForm) {
    const { matricule, nomPrenom, email, tel, dns, region, statut } = form.value;

    let st = '0'
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
    this.activeModal.dismiss();
    this.controls.reloadComponent();
  }


  // validateEmailregex(input: HTMLInputElement): boolean {
  //   if (input.value) {
  //     const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     return emailPattern.test(input.value.toString().toLowerCase());
  //   } else {
  //     return false
  //   }
  // }

  // verifTel(tel: HTMLInputElement): boolean {
  //   if (tel.value) {
  //     const telephone = tel.value.toString();
  //     if (telephone.length != 8) {
  //       return true;
  //     } else
  //       if (telephone.charAt(0) === '7' || telephone.charAt(0) === '2' || telephone.charAt(0) === '5' || telephone.charAt(0) === '9') {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //   } else {
  //     return false;
  //   }

  // }

  // verifMatriculeExiste(input: HTMLInputElement): boolean {
  //   if (input.value) {

  //     const arrayMat = [...this.matList]
  //     if (arrayMat.length > 0)
  //       if (arrayMat.includes(this.trimStr(input.value)))
  //         return true;

  //     return false;
  //   } else {
  //     return false;
  //   }

  // }

  // validateLength(input: HTMLInputElement): boolean {
  //   if (input.value)
  //     return input.value.trim().length < 5;
  //   return false
  // }

  // trimStr(value: string): string {
  //   let str: string = "";
  //   for (let index = 0; index < value.length; index++) {
  //     const element = value[index];
  //     if (element != " ")
  //       str += element;

  //   }
  //   return str;
  // }

  // containsAt(input: HTMLInputElement) {
  //   if (input.value) {
  //     const str = "&1234567890/*-_=+$*µ§!/:@#,.<>~{([|``\^à}])ç^°";
  //     for (let index = 0; index < str.length; index++) {
  //       const char = str[index];
  //       if (input.value.indexOf(char) > -1) {
  //         return true
  //       }
  //     }
  //     return false;
  //   } else {
  //     return false;

  //   }

  // }

  // verifEmailExist(input: HTMLInputElement): boolean {
  //   if (input.value) {

  //     const arrayEmail = [...this.emailList]
  //     if (arrayEmail.length > 0)
  //       if (arrayEmail.includes(this.trimStr(input.value)))
  //         return true;

  //     return false;
  //   } else {
  //     return false;
  //   }
  // }


}

