import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Carnetdeboard } from "../../../models/carnetdeboard";
import { CarnetDeboardService } from "../../../services/carnet-deboard.service";
import { PopupCarnetdeboardComponent } from "../popup-carnetdeboard/popup-carnetdeboard.component";
import { ControlsService } from "../../../services/controls.service";

@Component({
  selector: "app-carnet-de-board",
  templateUrl: "./carnet-de-board.component.html",
  styleUrls: ["./carnet-de-board.component.scss"],
})
export class CarnetDeBoardComponent implements OnInit {
  chauffeursActif: any;
  p: number;
  carnetboardlist: Carnetdeboard[] = [];
  term: any;
  constructor(
    private serviceCarnetBord: CarnetDeboardService,
    public controls: ControlsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllCarnetBoard((result) => {
      this.carnetboardlist = result;
    });
  }

  async getAllCarnetBoard(callback) {
    try {
      const { msg, erorer } =
        ((await this.serviceCarnetBord.getAllCarnetBored(this.getId())) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }

  Ajouter() {
    const modalRef = this.modalService.open(PopupCarnetdeboardComponent);
    modalRef.componentInstance.title = "NOUVEAU CARNET DE BOARD";
    modalRef.componentInstance.id_choufeur = this.getId();
  }

  getId() {
    const idUser = JSON.parse(localStorage.getItem("idConnexion")).idUser;
    return this.controls.decryptData(idUser).toString();
  }
}
