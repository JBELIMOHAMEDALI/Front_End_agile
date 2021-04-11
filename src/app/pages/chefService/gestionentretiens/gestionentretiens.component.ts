import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../../../services/entretien.service';
import { ControlsService } from '../../../services/controls.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { PopupEntretienComponent } from '../popup-entretien/popup-entretien.component';
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
    private modalService: NgbModal,
    public controls: ControlsService) {
  }

  ngOnInit() {



    this.getAllEntrtiens(entretiens => {

      this.entretienList = entretiens;

    });
  }

  AddEntretien() {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = 'NOUVEL ENTRETIEN';
    modalRef.componentInstance.id = -1;
    // modalRef.componentInstance.show = true;

  }

  updateEntretien(id_entretien: string) {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = 'MODIFICATION ENTRETIEN';
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
        modelServ.componentInstance.message = "SUPPRESSION ECHOUEE";
      }

    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = error.message;
    }
    this.controls.reloadComponent();
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

  showEntretien(id_entretien: string) {
    const modalRef = this.modalService.open(PopupEntretienComponent);
    modalRef.componentInstance.title = `DONNEES ENTRETIEN`;
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
