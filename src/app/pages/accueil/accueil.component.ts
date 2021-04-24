import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ControlsService } from '../../services/controls.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private cdref: ChangeDetectorRef,private actifRoute:ActivatedRoute,private controls:ControlsService) {
  }


  ngOnInit() {
   
    this.controls.verifLogin();

  }

  






}
