import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { VoitureService } from "../../../services/voiture.service";
import { Voiture } from "../../../models/voiture";
import { PopupVoitureComponent } from "../popup-voiture/popup-voiture.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: 'app-voituresinactifs',
  templateUrl: './voituresinactifs.component.html',
  styleUrls: ['./voituresinactifs.component.scss']
})
export class VoituresinactifsComponent implements OnInit {
  constructor(private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService) { }
  voitureListInactif: Voiture[] = [];
  p: number;
  async ngOnInit() {

    this.getVoitures(result => {
      this.voitureListInactif = result;

    });

  }


  async activerDesactiver(id: string) {

    try {
      const { erorer, msg } = await this.voitureService.activeDisactiveVoiture(id, true) as any;

      if (!erorer) {
        this.controls.reloadComponent();
      }


    } catch (error) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Opération non effectuée !";
    }

  }



  showVoiture(voiture: Voiture) {
    const modalRef = this.modalService.open(PopupVoitureComponent);
    modalRef.componentInstance.title = 'DONNEES VOITURE';
    modalRef.componentInstance.id = Number(voiture.id_voiture);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = false;
    modalRef.componentInstance.voiture = { ...voiture };

  }

  async getVoitures(callback) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(false) as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }
  }



}



