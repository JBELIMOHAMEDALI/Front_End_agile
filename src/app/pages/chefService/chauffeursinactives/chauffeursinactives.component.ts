import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Chauffeur } from "../../../models/chauffeur";
import { UserService } from "../../../services/user.service";
import { LoginErrorComponent } from "../../auth/login-error/login-error.component";
import { ChefService } from "../../../services/chef-service.service";
import { ControlsService } from "../../../services/controls.service";
import { PopupChauffeurComponent } from "../popup-chauffeur/popup-chauffeur.component";

@Component({
  selector: "app-chauffeursinactives",
  templateUrl: "./chauffeursinactives.component.html",
  styleUrls: ["./chauffeursinactives.component.scss"],
})
export class ChauffeursinactivesComponent implements OnInit {
  p: number;
  term: any;
  constructor(
    private userServ: UserService,
    private chefServ: ChefService,
    private modalService: NgbModal,
    private controls: ControlsService
  ) { }
  chauffeursInactif: Chauffeur[] = [];
  ngOnInit() {
    this.getUsers((result) => {
      this.chauffeursInactif = result;
    });
  }
  async getUsers(callback) {
    try {
      const { msg, erorer } =
        ((await this.userServ.getAllUsers(false)) as any) || [];
      if (!erorer) {
        callback(msg);
      }
    } catch (error) {
      return error;
    }
  }
  activerDesactiver(id_chauffeur: string) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "ACTIVATION CHAUFFEUR";
    modalRef.componentInstance.id_chauffeur = id_chauffeur;
    modalRef.componentInstance.actif = false;
  }
  showChauffeur(chauffeur: Chauffeur) {
    const modalRef = this.modalService.open(PopupChauffeurComponent);
    modalRef.componentInstance.title = "DONNEES CHAUFFEUR";
    modalRef.componentInstance.id = Number(chauffeur.id_chauffeur);
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.actif = false;
    modalRef.componentInstance.chauffeur = { ...chauffeur };
  }
}
