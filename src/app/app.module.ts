import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./layout/admin/admin.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SigninComponent } from "./pages/auth/signin/signin.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgotPasswordComponent } from "./pages/auth/forgot-password/forgot-password.component";
import { ToastrModule } from "ngx-toastr";
import { LoginErrorComponent } from "./pages/auth/login-error/login-error.component";
import { AccueilComponent } from "./pages/accueil/accueil.component";
import { LoginavbarComponent } from "./pages/loginavbar/loginavbar.component";
import { FirstconnectionComponent } from "./pages/auth/firstconnection/firstconnection.component";
import { VoituresComponent } from "./pages/chefService/voitures/voitures.component";
import { GestionChauffeursComponent } from "./pages/chefService/gestion-chauffeurs/gestion-chauffeurs.component";
import { GestionentretiensComponent } from "./pages/chefService/gestionentretiens/gestionentretiens.component";
import { DashboardChefServiceComponent } from "./pages/chefService/dashboard-chef-service/dashboard-chef-service.component";
import { MissionsComponent } from "./pages/chauffeur/missions/missions.component";
import { CarnetDeBoardComponent } from "./pages/chauffeur/carnet-de-board/carnet-de-board.component";
import { DocumentsComponent } from "./pages/chauffeur/documents/documents.component";
import { DashboardChauffeurComponent } from "./pages/chauffeur/dashboard-chauffeur/dashboard-chauffeur.component";
import { AffectvoitureComponent } from "./pages/chefService/affectvoiture/affectvoiture.component";
import { AffectmissionComponent } from "./pages/chefService/affectmission/affectmission.component";
import { PopupVoitureComponent } from "./pages/chefService/popup-voiture/popup-voiture.component";
import { PopupAffectationComponent } from "./pages/chefService/popup-affectation/popup-affectation.component";
import { PopupEntretienComponent } from "./pages/chefService/popup-entretien/popup-entretien.component";
import { NgxPrintModule } from "ngx-print";
import { HistoriqueaffectvoitureComponent } from "./pages/chefService/historiqueaffectvoiture/historiqueaffectvoiture.component";
import { VoituresinactifsComponent } from "./pages/chefService/voituresinactifs/voituresinactifs.component";
import { ChauffeursinactivesComponent } from "./pages/chefService/chauffeursinactives/chauffeursinactives.component";
import { PopupChauffeurComponent } from "./pages/chefService/popup-chauffeur/popup-chauffeur.component";
import { PopupMissionComponent } from "./pages/chefService/popup-mission/popup-mission.component";
import { PopupCarnetdeboardComponent } from "./pages/chauffeur/popup-carnetdeboard/popup-carnetdeboard.component";
import { DocumentDecPanneComponent } from "./pages/chauffeur/document-pep/document-dec-panne/document-dec-panne.component";
import { DocumentOrderServiceComponent } from "./pages/chauffeur/document-pep/document-order-service/document-order-service.component";
import { DocumentPrelevementMatrComponent } from "./pages/chauffeur/document-pep/document-prelevement-matr/document-prelevement-matr.component";
import { PopupMissionChauffeurComponent } from "./pages/chauffeur/popup-mission-chauffeur/popup-mission-chauffeur.component";
import { MissionstermineesComponent } from "./pages/chauffeur/missionsterminees/missionsterminees.component";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SigninComponent,
    HomePageComponent,
    ProfileComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LoginErrorComponent,
    AccueilComponent,
    LoginavbarComponent,
    FirstconnectionComponent,
    VoituresComponent,
    GestionChauffeursComponent,
    GestionentretiensComponent,
    DashboardChefServiceComponent,
    MissionsComponent,
    CarnetDeBoardComponent,
    DocumentsComponent,
    DashboardChauffeurComponent,
    AffectvoitureComponent,
    AffectmissionComponent,
    PopupVoitureComponent,
    PopupAffectationComponent,
    PopupEntretienComponent,
    HistoriqueaffectvoitureComponent,
    VoituresinactifsComponent,
    ChauffeursinactivesComponent,
    PopupChauffeurComponent,
    PopupMissionComponent,
    PopupCarnetdeboardComponent,
    DocumentDecPanneComponent,
    DocumentOrderServiceComponent,
    DocumentPrelevementMatrComponent,
    PopupMissionChauffeurComponent,
    MissionstermineesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPrintModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  entryComponents: [
    PopupChauffeurComponent,
    LoginErrorComponent,
    PopupVoitureComponent,
    PopupAffectationComponent,
    PopupEntretienComponent,
    PopupMissionComponent,
    PopupMissionChauffeurComponent,
    PopupCarnetdeboardComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
