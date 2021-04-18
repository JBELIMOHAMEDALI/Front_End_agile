import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginErrorComponent } from '../login-error/login-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  // ForgotPassForm = new FormGroup({
  //   email: new FormControl("", [
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  //   ]),
  //   matricule: new FormControl(
  //     "",
  //     Validators.required
  //   ),
  //   newPass: new FormControl(
  //     "",
  //     Validators.required
  //   ),
  //   // confirmPass: new FormControl(
  //   //   "",
  //   //   Validators.required
  //   // ),
  // });


  constructor(private authServ: AuthService,
    private modalService: NgbModal,
    private actifRoute: ActivatedRoute,
    private route: Router,
  ) {



  }

  ngOnInit() {
    const userRole = this.verifUser()[0];
    if (userRole === 'administrateur') {
      this.route.navigate(['/user/' + this.verifUser()[1]]);
    }
  }

  async resetPassword(form: NgForm) {

    const userRole = this.verifUser()[0];

    try {
      const { erorer, msg } = await this.authServ.resetPassword(form, userRole) as any;

      if (!erorer) {
        this.route.navigate(['/user/' + this.verifUser()[1]])
      }
    } catch (error) {

      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = "Vérifier vos coordonnées ou l'activation de votre compte";


    }
  }

  verifUser(): string[] {
    const idUser = this.actifRoute.snapshot.paramMap.get('id');
    const values = ["pqrsxy123tu", "fghij789kl", "abcde456no"];
    const element = idUser[0];
    if (values[0].includes(element)) {

      return ["administrateur", idUser]
    } else if (values[1].includes(element)) {

      return ["chefService", idUser]
    } else if (values[2].includes(element)) {

      return ["chauffeur", idUser]
    }

  }
}
