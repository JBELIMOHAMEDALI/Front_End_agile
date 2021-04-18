import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlsService } from '../../../services/controls.service';
import { AuthService } from "../../../services/auth.service";
import { LoginErrorComponent } from '../login-error/login-error.component';

@Component({
  selector: 'app-firstconnection',
  templateUrl: './firstconnection.component.html',
  styleUrls: ['./firstconnection.component.scss']
})
export class FirstconnectionComponent implements OnInit {

  // Form Control
  loginForm = new FormGroup({

    password: new FormControl(
      "",
      Validators.required && Validators.minLength(6)
    ),
    confirmPass: new FormControl(
      "",
      Validators.required && Validators.minLength(6)
    ),
  });


  idUser: string;
  constructor(private modalService: NgbModal,
    private route: Router, private actifRoute:
      ActivatedRoute, private authService: AuthService,
    public controls: ControlsService) {

    this.idUser = this.actifRoute.snapshot.paramMap.get('id');

  }


  ngOnInit() {
    const idcnx = JSON.parse(localStorage.getItem('idConnexion'));

    const userRoleData = this.verifUser();

    if (idcnx != null) {
      const { loggedin, connexionid } = idcnx;

      if (loggedin) {
        return this.route.navigate(['/dashboard', userRoleData[0]]);

      }

      if (this.idUser != this.controls.decryptData(connexionid)) {
        return this.route.navigate(['/user/' + this.idUser]);
      }
    }


    else {
      return this.route.navigate(['/user/' + this.idUser]);

    }

  }



  async connect(form: NgForm) {
    const userRoleData = this.verifUser();

    const id = JSON.parse(localStorage.getItem('idConnexion')).idUser;
    const { password } = form.value;
    const data = { 'id': this.controls.decryptData(id), 'password': password, 'tabname': userRoleData[0], 'nomId': userRoleData[1] };
    try {
      const { erorer, msg } = await this.authService.firstConnect(data) as any;
      if (!erorer) {
        const idcnx = JSON.parse(localStorage.getItem('idConnexion'));

        const payloadvf = { ...idcnx, loggedin: true };
        localStorage.setItem('idConnexion', JSON.stringify(payloadvf));

        this.route.navigate(['/dashboard', userRoleData[0]]);
      }

    } catch (error) {

      // this.route.navigate(['/user/' + this.idUser]);
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Vérifier vos coordonnées ou l'activation de votre compte !";


    }


  }

  verifUser(): string[] {
    const idUser = this.actifRoute.snapshot.paramMap.get('id');
    const values = ["pqrsxy123tu", "fghij789kl!", "abcde456no?"];
    const element = idUser[0];

    if (values[0].includes(element)) {

      return ["administrateur", "id_admin"];
    } else if (values[1].includes(element)) {

      return ["chefService", "id_chefService"];
    } else if (values[2].includes(element)) {

      return ["chauffeur", "id_chauffeur"];
    }

  };



}
