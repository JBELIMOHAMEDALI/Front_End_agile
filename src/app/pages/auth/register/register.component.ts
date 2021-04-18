import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  // Form Control
  registerForm = new FormGroup({
    matricule: new FormControl("", Validators.required),
    fullname: new FormControl("", Validators.required),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]),
    tel: new FormControl("", Validators.required),
    password: new FormControl(
      "",
      Validators.required && Validators.minLength(6)
    ),
  });

  constructor(private authServ: AuthService, private actifRoute: ActivatedRoute,) { }

  ngOnInit() { }

  async onSignup(matricule: string, fullname: string, email: string, tel: string, password: string) {
    //   let user = new User(email,matricule, fullname,password ,"" , tel,"" );
    //   console.log("my user : ", user);
    //   this.authServ.register(user).subscribe((data) => {
    //     let resp: any;
    //     resp = data;
    //     if (resp.erorer == false) {
    //       alert(resp.msg)
    //     } else if (resp.erorer == true) {
    //       alert(resp.msg);
    //     }
    //   });
  }

  getUserid(): string {//used in html
    return this.actifRoute.snapshot.paramMap.get('id');
  }
}
