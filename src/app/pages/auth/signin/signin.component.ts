import { ChangeDetectionStrategy, Component, NgModule, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "../login-error/login-error.component";
import * as CryptoJS from 'crypto-js';



@NgModule()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {

  // Form Control
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]),
    password: new FormControl(
      "",
      Validators.required && Validators.minLength(6)
    ),
  });


  constructor(private actifRoute: ActivatedRoute, private authServ: AuthService,
    private route: Router, private modalService: NgbModal) {

  }

  ngOnInit() {
    const idcnx = JSON.parse(localStorage.getItem('idConnexion'));
    const idUser = this.getUserid();

    if (idcnx != null) {

      if (idcnx.loggedin) {
        this.route.navigate(['/dashboard']);

      } else {

        this.route.navigate(['/user/' + idUser]);
        return localStorage.clear();

      }
    }

    if (idUser.length != 11) {//verif idUser in actifRoute
      return this.route.navigate(['/accueil']);
    }


  }
  //voir si compte desactivé pour message
  async onSignin(email: string, password: string) {
    const userRole = this.verifUser();
    try {
      const { erorer, msg } = await this.authServ.getLogin(email, password, userRole) as any;

      if (erorer) {
        const modelServ = this.modalService.open(LoginErrorComponent);
        modelServ.componentInstance.message = msg;

      } else {
        this.verifAndRedirect(msg, userRole)

      }
    } catch (error) {
      let errormsg: string = "Vérifier vos coordonnées";
      if (userRole === 'chauffeur') {
        errormsg += " ou l'activation de votre compte !"
      }
      const modelServ = this.modalService.open(LoginErrorComponent);
      modelServ.componentInstance.message = errormsg;


    }
  }


  verifAndRedirect(msg, userRole: string) {
    var payload = { idUser: '', type: '' };
    switch (userRole) {
      case 'administrateur':
        payload = { idUser: this.encryptData(msg.id_admin), type: this.encryptData('administrateur') };

        break;
      case 'chefService':
        payload = { idUser: this.encryptData(msg.id_chefService), type: this.encryptData('chefService') };

        break;
      case 'chauffeur':
        payload = { idUser: this.encryptData(msg.id_chauffeur), type: this.encryptData('chauffeur') };
        break;


    }

    switch (msg.first_connected) {
      case "0":
        const routeid = this.getUserid();
        const cryptedData = { 'connexionid': this.encryptData(routeid), 'idUser': payload.idUser, 'type': payload.type };

        this.route.navigate(['/connexion/' + routeid]);
        localStorage.setItem('idConnexion', JSON.stringify(cryptedData));


        break;
      case "1":

        this.route.navigate(['/dashboard', userRole]);
        const payloadvf = { ...payload, loggedin: true };
        localStorage.setItem('idConnexion', JSON.stringify(payloadvf));
        break;


    }



  }


  verifUser(): string {
    const idUser = this.actifRoute.snapshot.paramMap.get('id');
    const values = ["pqrsxy123tu", "fghij789kl!", "abcde456no?"];
    const element = idUser[0];

    if (values[0].includes(element)) {

      return "administrateur"
    } else if (values[1].includes(element)) {

      return "chefService"
    } else if (values[2].includes(element)) {

      return "chauffeur"
    }

  }

  getUserid(): string {//used in html
    return this.actifRoute.snapshot.paramMap.get('id');
  }

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), 'secretKey').toString();
    } catch (e) {
      return e;
    }
  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, 'secretKey');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      return e;
    }
  }



  //localstorage=type,id
  //khouloud@gmail.com
  // 14265401
  //create account tetnaha
  //login =>connecter
  //rebuild login
  //dashboard hedhy =>chauffeur
  //type user
  //popup fail to login
  //API http://localhost/pfe_api/<ControllerName>/(<function>na7y menha post wala get)
}

export class API {
  host: string = 'http://localhost/'
  projectName: string = 'pfe_api/'
  controllerName: string
  functionName: string
}


