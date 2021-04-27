import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../login-error/login-error.component";
import { ControlsService } from "../../../services/controls.service";

@NgModule()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  constructor(
    private actifRoute: ActivatedRoute,
    private authServ: AuthService,
    private route: Router,
    private modalService: NgbModal,
    private controls: ControlsService
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.controls.verifLogin();
    // const idcnx = JSON.parse(localStorage.getItem('idConnexion'));
    const idUser = this.getUserid();
    if (idUser.length != 11) {
      //verif idUser in actifRoute
      return this.route.navigate(["/accueil"]);
    }
  }

  async onSignin(form: NgForm) {
    const { email, pass } = form.value;
    const userRole = this.verifUser();
    try {
      const { erorer, msg } = (await this.authServ.getLogin(
        email,
        pass,
        userRole
      )) as any;

      if (!erorer) {
        // console.log(msg,userRole)
        this.verifAndRedirect(msg, userRole);
      }
    } catch (error) {
      let errormsg: string = "Vérifier vos coordonnées";
      if (userRole === "chauffeur") {
        errormsg += " ou l'activation de votre compte !";
      }
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = errormsg;
    }
  }

  verifAndRedirect(msg, userRole: string) {
    var payload = { idUser: "", type: "" };
    switch (userRole) {
      // case 'administrateur':
      //   payload = { idUser: this.controls.encryptData(msg.id_admin), type: this.controls.encryptData('administrateur') };

      //   break;
      case "chefService":
        payload = {
          idUser: this.controls.encryptData(msg.id_chefService),
          type: this.controls.encryptData("chefService"),
        };

        break;
      case "chauffeur":
        payload = {
          idUser: this.controls.encryptData(msg.id_chauffeur),
          type: this.controls.encryptData("chauffeur"),
        };
        break;
    }

    switch (msg.first_connected) {
      case "0":
        const routeid = this.getUserid();
        this.route.navigate(["/connexion/" + routeid]);
        const cryptedData = {
          connexionid: this.controls.encryptData(routeid),
          idUser: payload.idUser,
          type: payload.type,
        };

        localStorage.setItem("idConnexion", JSON.stringify(cryptedData));

        break;
      case "1":
        this.route.navigate(["/dashboard", userRole]);
        const payloadvf = { ...payload, loggedin: true };
        localStorage.setItem("idConnexion", JSON.stringify(payloadvf));
        break;
    }
  }

  verifUser(): string {
    const idUser = this.getUserid();
    const values = ["fghij789kl!", "abcde456no?"];
    const element = idUser[0];

    if (values[0].includes(element)) {
      return "chefService";
    } else if (values[1].includes(element)) {
      return "chauffeur";
    }
  }

  getUserid(): string {
    //used in html
    return this.actifRoute.snapshot.paramMap.get("id");
  }
}
