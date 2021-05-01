import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarnetDeboardService } from '../../../services/carnet-deboard.service';
import { Carnetdeboard } from '../../../models/carnetdeboard';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { ControlsService } from '../../../services/controls.service';

@Component({
  selector: 'app-popup-carnetdeboard',
  templateUrl: './popup-carnetdeboard.component.html',
  styleUrls: ['./popup-carnetdeboard.component.scss']
})
export class PopupCarnetdeboardComponent implements OnInit {

  @Input() id_choufeur;
  @Input() title;
  model: any = {};

  constructor(private controls: ControlsService, public activeModal: NgbActiveModal,
    private serv_carne_bord: CarnetDeboardService, private modalService: NgbModal,) { }


  ngOnInit() {

  }


  onSubmit(form: NgForm) {
    const { klm, con } = form.value;
    try {
      const carnbored = new Carnetdeboard(klm, con, this.id_choufeur);


      const { msg, erorer } = this.serv_carne_bord.addCarnetBord(carnbored) as any || [];
      if (!erorer) {
        this.controls.reloadComponent();
        this.activeModal.dismiss();
      }
    } catch (error) {
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Ajout non effectué !";
    }
  }





}


