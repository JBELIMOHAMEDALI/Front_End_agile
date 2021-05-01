import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loginavbar',
  templateUrl: './loginavbar.component.html',
  styleUrls: ['./loginavbar.component.scss']
})
export class LoginavbarComponent implements OnInit {
  idUser: string;
  userRole: string;

  constructor(private actifRoute: ActivatedRoute) {
    this.idUser = this.actifRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  getRoute(type: string) {
    let ch: string = "";
    let result: string = "";

    switch (type) {
      case 'chefService':
        ch = "fghij789kl!";
        break;
      case 'chauffeur':
        ch = "abcde456nom";
        break;
    }
    for (let i = 0; i < ch.length; i++) {
      const index = Math.floor(this.getRandomArbitrary(0, 11));
      result += ch[index];
    }
    return result;
  }


  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }


}
