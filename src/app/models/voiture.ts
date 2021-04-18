export class Voiture {
  id_voiture: string;
  statut: string;
  matricule: string;
  type: string;
  dmc: string;
  puissance: string;
  service: string;

  constructor(matricule: string, puissance: string, service: string, type: string, dmc: string, id_voiture?: string, statut?: string,) {
    this.id_voiture = id_voiture;
    this.matricule = matricule;

    this.statut = statut;
    this.type = type;
    this.dmc = dmc;
    this.puissance = puissance;

    this.service = service;

  }

}
