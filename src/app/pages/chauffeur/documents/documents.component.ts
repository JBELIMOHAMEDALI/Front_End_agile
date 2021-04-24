import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../../../services/controls.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor(private controls:ControlsService) { }

  ngOnInit() {
    switch (this.controls.verifLocalStorage()) {
      case "chefService":
          this.controls.navigateAndreload('/dashboard');
        break;
      case null:
          this.controls.navigateAndreload('/accueil');
        break;
      
    }
  }

}
