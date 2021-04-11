import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Voiture } from "../../../models/voiture";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VoitureService } from "../../../services/voiture.service";
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { ControlsService } from '../../../services/controls.service';



@Component({
  selector: 'app-popup-voiture',
  templateUrl: './popup-voiture.component.html',
  styleUrls: ['./popup-voiture.component.scss']
})
export class PopupVoitureComponent implements OnInit {
  @Input() title: string = "";
  @Input() id: number = -1;
  @Input() show: boolean = false;
  @Input() actif: boolean = true;
  @Input() matList: string[] = [];

  voiture: Voiture
  voitureList = new Array<Voiture>();

  constructor(public activeModal: NgbActiveModal,
    private voitureService: VoitureService,
    private modalService: NgbModal,
    public controls: ControlsService) { }


  ngOnInit() {
    if (this.id != -1)
      this.getOneVoiture(this.actif);
  }


  onSubmit(form: NgForm) {
    if (this.voiture) {
      this.updateVoiture(form);

    } else {
      this.addVoiture(form);
    }

  }

  async getOneVoiture(actif: boolean) {


    try {

      const { msg, erorer } = await this.voitureService.getOneVoiturebyId(this.id.toString(), actif) as any || [];

      if (!erorer) {
        this.voiture = msg[0];
        this.matList = this.matList.filter(matricule => matricule != this.voiture.matricule);

      }

    } catch (error) {
      return error;
    }


  }


  async addVoiture(form: NgForm) {
    const { matricule, type, dmc, puissance, service } = form.value;

    try {
      const voiture = new Voiture(matricule, puissance, service, type, dmc);
      const { msg, erorer } = await this.voitureService.addVoiture(voiture) as any || [];
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


  async updateVoiture(form: NgForm) {
    const { matricule, dmc, puissance, service, type } = form.value;

    try {
      const voiture = new Voiture(matricule, puissance, service, type, dmc, this.id.toString());
      const { msg, erorer } = await this.voitureService.updateVoiture(voiture) as any || [];
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




}


