import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginErrorComponent } from "app/pages/auth/login-error/login-error.component";
import { AffectVoitureService } from "../../../services/affect-voiture.service";

@Component({
  selector: "app-historiqueaffectvoiture",
  templateUrl: "./historiqueaffectvoiture.component.html",
  styleUrls: ["./historiqueaffectvoiture.component.scss"],
})
export class HistoriqueaffectvoitureComponent implements OnInit {
  voituresNonAffectees: [] = [];
  p: number;
  term: any;

  constructor(
    private affectService: AffectVoitureService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllAffectations((result) => {
      this.voituresNonAffectees = result;
    });
  }

  async getAllAffectations(callback) {
    try {
      const { msg, erorer } =
        ((await this.affectService.getAllAffectations("0")) as any) || [];
      if (!erorer) callback(msg);
    } catch (error) {
      return error;
    }
  }
}
