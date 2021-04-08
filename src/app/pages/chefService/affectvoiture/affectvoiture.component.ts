import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AffectVoitureService } from '../../../services/affect-voiture.service';
import { PopupAffectationComponent } from '../popup-affectation/popup-affectation.component';

@Component({
  selector: 'app-affectvoiture',
  templateUrl: './affectvoiture.component.html',
  styleUrls: ['./affectvoiture.component.scss']
})
export class AffectvoitureComponent implements OnInit {
  voituresAffectes: [] = [];

  constructor(private affectService: AffectVoitureService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllAffectations();
  }

  Affecter() {

  }


  async getAllAffectations() {
    try {
      const { msg, erorer } = await this.affectService.getAllAffectations() as any || [];
      if (!erorer)
        this.voituresAffectes = msg || [];
    } catch (error) {
      this.voituresAffectes = [];

    }
  }

  updateAffectation(id: string) {
    const modalRef = this.modalService.open(PopupAffectationComponent);
    modalRef.componentInstance.titel = 'Modifier Une Affectation';
    modalRef.componentInstance.id = Number(id);

  }

  supprimerAffectation() {

  }
}
