import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AffectVoitureService } from '../../../services/affect-voiture.service';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { PopupAffectationComponent } from '../popup-affectation/popup-affectation.component';

@Component({
  selector: 'app-affectvoiture',
  templateUrl: './affectvoiture.component.html',
  styleUrls: ['./affectvoiture.component.scss']
})
export class AffectvoitureComponent implements OnInit {
  voituresAffectes: [] = [];
  voituresNonAffectees: [] = [];

  constructor(private affectService: AffectVoitureService,
    private modalService: NgbModal,
    private router: Router,
    private affectVoitureService: AffectVoitureService) { }

  ngOnInit() {
    this.getAllAffectations(res => {
      this.voituresAffectes = res;
    }, '1');
    this.getAllAffectations(result => {
      this.voituresNonAffectees = result;
    }, '0');
  }

  Affecter() {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.titel = 'Modifier Une Affectation';
  }


  async getAllAffectations(callback, affect: string) {
    try {
      const { msg, erorer } = await this.affectService.getAllAffectations(affect) as any || [];
      if (erorer)
        // this.voituresAffectes = [];
        callback([]);
      else
        // this.voituresAffectes = msg || [];
        callback(msg);

    } catch (error) {

      // this.voituresAffectes = [];
      callback([]);

    }
  }



  async activerDesactiverAffectation(idAffectation: string) {
    try {
      const { erorer, msg } = await this.affectService.activerDesactiverAffectation(idAffectation) as any || [];

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


  updateAffectation(payload) {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.titel = 'Modifier Une Affectation';
    modalRef.componentInstance.id = Number(payload.id_affectation);
    modalRef.componentInstance.voiture = this.loadObjects('voiture', payload.id_voiture);
    modalRef.componentInstance.chauffeur = this.loadObjects('chauffeur', payload.id_chauffeur);

  }


  async loadObjects(option: string, id?: string) {
    try {
      const { msg, erorer } = await this.affectVoitureService.getAll(option) as any || [];
      if (erorer) {

        return null;

      }
      else {
        switch (option) {
          case 'chauffeur':
            return (msg.find(element => element.id_chauffeur === id));

            break;
          case 'voiture':
            return (msg.find(element => element.id_voiture === id));

            break;


        }
      }


    } catch (error) {
      return null;
    }
  }
}
