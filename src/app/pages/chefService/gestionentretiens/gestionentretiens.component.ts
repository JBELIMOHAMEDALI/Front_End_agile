import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../../../services/entretien.service';
import { Entretien } from '../../../models/entretien';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { PopupEntretienComponent } from '../popup-entretien/popup-entretien.component';
import { Router } from '@angular/router';
import { VoitureService } from '../../../services/voiture.service';
import { Voiture } from '../../../models/voiture';

@Component({
  selector: 'app-gestionentretiens',
  templateUrl: './gestionentretiens.component.html',
  styleUrls: ['./gestionentretiens.component.scss']
})
export class GestionentretiensComponent implements OnInit {
  entretienList: any[] = [];
  voitureList: Voiture[] = [];


  constructor(private entretienService: EntretienService,
    private voitureService: VoitureService,
    private modalService: NgbModal,
    private router: Router) {
  }

  ngOnInit() {



    this.getAllEntrtiens(entretiens => {

      this.entretienList = entretiens;

    });
  }

  AddEntretien() {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = 'Ajouter Un entretien';
    modalRef.componentInstance.id = -1;
    // modalRef.componentInstance.show = true;

  }

  updateEntretien(id_entretien: string) {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = 'Modifier Un entretien';
    modalRef.componentInstance.id = Number(id_entretien);
    this.getOneEntretien(id_entretien, valuEntretien => {
      modalRef.componentInstance.entretien = valuEntretien;
    });
  }


  async supprimerEntretien(id_entetien: string) {
    try {
      const { msg, erorer } = await this.entretienService.deleteEntretien(id_entetien) as any || [];
      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = "Suppression échouée";
      }

    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }
    this.reloadComponent();
  }



  async getAllEntrtiens(callback) {
    try {
      const { msg, erorer } = await this.entretienService.getAllEntrtieninfo() as any || [];
      if (erorer) {

        callback([]);

      } else {

        callback(msg);
      }

    } catch (error) {
      callback([]);
    }
  }



  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  showEntretien(id_entretien: string) {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = `Affichage d'un entretien`;
    modalRef.componentInstance.id = Number(id_entretien);
    modalRef.componentInstance.show = true;

    this.getOneEntretien(id_entretien, valuEntretien => {
      modalRef.componentInstance.entretien = valuEntretien;
    });
  }
  async getOneEntretien(id_entretien: string, callback) {


    try {

      const { msg } = await this.entretienService.getOneEntretienbyId(id_entretien) as any || [];

      if (msg.length > 0) {
        callback(msg[0]);
      } else {
        callback({})
      }

    } catch (error) {
      callback({})
      return error;
    }


  }


}
