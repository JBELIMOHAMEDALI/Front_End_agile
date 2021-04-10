import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AffectVoitureService } from '../../../services/affect-voiture.service';
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { PopupAffectationComponent } from '../popup-affectation/popup-affectation.component';

@Component({
  selector: 'app-historiqueaffectvoiture',
  templateUrl: './historiqueaffectvoiture.component.html',
  styleUrls: ['./historiqueaffectvoiture.component.scss']
})
export class HistoriqueaffectvoitureComponent implements OnInit {
  voituresNonAffectees: [] = [];

  constructor(private affectService: AffectVoitureService,
    private modalService: NgbModal,
    private router: Router,
    private affectVoitureService: AffectVoitureService) { }

  ngOnInit() {
    
    this.getAllAffectations(result => {
      this.voituresNonAffectees = result;
    });
  }

 


  async getAllAffectations(callback) {
    try {
      const { msg, erorer } = await this.affectService.getAllAffectations('0') as any || [];
      if (erorer)

        callback([]);
      else

        callback(msg);

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

}

