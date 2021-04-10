import { Component, OnInit } from '@angular/core';
import { AffectVoitureService } from '../../../services/affect-voiture.service';

@Component({
  selector: 'app-historiqueaffectvoiture',
  templateUrl: './historiqueaffectvoiture.component.html',
  styleUrls: ['./historiqueaffectvoiture.component.scss']
})
export class HistoriqueaffectvoitureComponent implements OnInit {
  voituresNonAffectees: [] = [];

  constructor(private affectService: AffectVoitureService) { }

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

}

