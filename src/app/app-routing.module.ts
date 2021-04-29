import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SigninComponent } from "./pages/auth/signin/signin.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { AccueilComponent } from "./pages/accueil/accueil.component";
import { FirstconnectionComponent } from "./pages/auth/firstconnection/firstconnection.component";
import { VoituresComponent } from "./pages/chefService/voitures/voitures.component";
import { GestionChauffeursComponent } from "./pages/chefService/gestion-chauffeurs/gestion-chauffeurs.component";
import { DashboardChefServiceComponent } from "./pages/chefService/dashboard-chef-service/dashboard-chef-service.component";
import { GestionentretiensComponent } from "./pages/chefService/gestionentretiens/gestionentretiens.component";
import { DashboardChauffeurComponent } from "./pages/chauffeur/dashboard-chauffeur/dashboard-chauffeur.component";
import { CarnetDeBoardComponent } from "./pages/chauffeur/carnet-de-board/carnet-de-board.component";
import { DocumentsComponent } from "./pages/chauffeur/documents/documents.component";
import { MissionsComponent } from "./pages/chauffeur/missions/missions.component";
import * as CryptoJS from "crypto-js";
import { AffectvoitureComponent } from "./pages/chefService/affectvoiture/affectvoiture.component";
import { AffectmissionComponent } from "./pages/chefService/affectmission/affectmission.component";
import { HistoriqueaffectvoitureComponent } from "./pages/chefService/historiqueaffectvoiture/historiqueaffectvoiture.component";
import { VoituresinactifsComponent } from "./pages/chefService/voituresinactifs/voituresinactifs.component";
import { ChauffeursinactivesComponent } from "./pages/chefService/chauffeursinactives/chauffeursinactives.component";
import { MissionstermineesComponent } from "./pages/chauffeur/missionsterminees/missionsterminees.component";

const routes: Routes = [
  // { path: 'register/:id', component: RegisterComponent },
  { path: "forgotPass/:id", component: ForgotPasswordComponent },
  { path: "accueil", component: AccueilComponent },
  { path: "user/:id", component: SigninComponent },
  { path: "connexion/:id", component: FirstconnectionComponent },
  {
    path: "",
    component: getFirstPath(),
    children: [
      {
        path: "",
        component: getRoleComponent(),
      },
    ],
  },
  {
    path: "dashboard",
    component: HomePageComponent,
    children: [
      {
        path: "",
        component: getRoleComponent(),
      },
      {
        path: "chauffeur",
        children: [
          {
            path: "",
            component: DashboardChauffeurComponent,
          },
          { path: "carnetDeBoard", component: CarnetDeBoardComponent },
          { path: "missions", component: MissionsComponent },
          { path: "missionsdon", component: MissionstermineesComponent },
          {
            path: "documents",
            component: DocumentsComponent,
            children: [
              { path: "", component: DocumentsComponent },
              // { path: "document2", component: CarnetDeBoardComponent },
              // { path: "document1", component: CarnetDeBoardComponent },
            ],
          },
          {
            path: "profil",
            component: ProfileComponent,
          },
        ],
      },
      {
        path: "chefService",
        children: [
          { path: "", component: DashboardChefServiceComponent },
          { path: "voitures", component: VoituresComponent },
          { path: "voituresInactives", component: VoituresinactifsComponent },
          { path: "chauffeur", component: GestionChauffeursComponent },
          {
            path: "chauffeursInactifs",
            component: ChauffeursinactivesComponent,
          },
          { path: "affectV", component: AffectvoitureComponent },
          {
            path: "historiqueAffectV",
            component: HistoriqueaffectvoitureComponent,
          },
          { path: "affectM", component: AffectmissionComponent },
          { path: "entretien", component: GestionentretiensComponent },
          { path: "profil", component: ProfileComponent },
        ],
      },
    ],
  },

  {
    path: "**",
    redirectTo: getinvalidpath(),
    pathMatch: "full",
  },
];

export function getRoleComponent() {
  const data = JSON.parse(localStorage.getItem("idConnexion"));

  if (data) {
    const role = decryptData(data.type);
    switch (role) {
      case "chauffeur":
        return DashboardChauffeurComponent;
      case "chefService":
        return DashboardChefServiceComponent;

      default:
        return AccueilComponent;
    }
  } else {
    return AccueilComponent;
  }
}
export function getFirstPath() {
  if (localStorage.getItem("idConnexion")) return HomePageComponent;
  else return AccueilComponent;
}

export function getinvalidpath() {
  if (localStorage.getItem("idConnexion")) {
    return "/dashboard";
    // const role = decryptData(JSON.parse(localStorage.getItem('idConnexion')).type);
    // switch (role) {
    //   case 'chauffeur':
    //     return '/dashboard/chauffeur'
    //   case 'chefService':
    //     return '/dashboard/chefService'
    // }
  } else {
    return "/accueil";
  }
}

export function decryptData(data) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "secretKey");
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    return e;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
