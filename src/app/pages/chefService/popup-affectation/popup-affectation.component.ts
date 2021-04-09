import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VoitureService } from '../../../services/voiture.service';
import { Voiture } from '../../../models/voiture';
import { Chauffeur } from '../../../models/chauffeur';
import { NgForm } from '@angular/forms';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { AffectVoitureService } from '../../../services/affect-voiture.service';

@Component({
  selector: 'app-popup-affectation',
  templateUrl: './popup-affectation.component.html',
  styleUrls: ['./popup-affectation.component.scss']
})
export class PopupAffectationComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() voiture: any;
  @Input() chauffeur: any;

  voitureList = new Array<Voiture>();
  chauffeurList = new Array<Chauffeur>();


  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private affectVoitureService: AffectVoitureService) { }

  async ngOnInit() {

    if (this.id != -1) {

      this.voiture = await this.voiture;
      this.chauffeur = await this.chauffeur;


    }


    this.loadChauffeursNonAffectes(chauffeurs => {
      this.chauffeurList = chauffeurs;
    });
    this.loadVoituresNonAffectees(voitures => {
      this.voitureList = voitures;
    });
  }


  async getOneAffectationbyid(id: string, callback) {
    try {

      const { msg } = await this.affectVoitureService.getOneAffectationbyId(id) as any || [];

      if (msg.length > 0) {
        callback(msg[0]);
      } else {
        callback(null);
      }

    } catch (error) {
      callback(null);
      return error;
    }
  }


  onSubmit(form: NgForm) {
    if (this.id === -1) {

      return this.addAffectation(form);
    }

    this.updateAffectation(form);

  }



  closeReload() {
    const currentRoute = this.router.url;

    this.activeModal.dismiss();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }



  async addAffectation(form: NgForm) {

    try {

      const { msg, erorer } = await this.affectVoitureService.addAffectaion(form.value) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Affectation non effectué !";
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Affectation non effectué !";
    }
    this.closeReload();
  }


  async updateAffectation(form: NgForm) {

    const { voitureopt, chauffeuropt } = form.value;

    try {
      const payload = { id_voiture: voitureopt, id_chauffeur: chauffeuropt, id_affectation: this.id }
      const { msg, erorer } = await this.affectVoitureService.updateAffectaion(payload) as any || [];
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

  async loadChauffeursNonAffectes(callback) {
    try {
      const { msg, erorer } = await this.affectVoitureService.getChauffeursVoituresNonaffectesActifs('chauffeur') as any || [];
      if (erorer) {
        callback([]);

      } else {
        callback(msg);
      }

    } catch (error) {
      callback([]);
    }
  }

  async loadVoituresNonAffectees(callback) {

    try {
      const { msg, erorer } = await this.affectVoitureService.getChauffeursVoituresNonaffectesActifs('voiture') as any || [];
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
