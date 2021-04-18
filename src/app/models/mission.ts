export class Mission {
  id_mission: string;
  id_chefService: string;
  id_chauffeur: string;
  description: string;
  date_debut: string;
  date_fin: string;
  etat: string;
  date_fin_real: string

  constructor(description: string, date_debut: string, date_fin: string, idchefService?: string, id_chauffeur?: string,
    id_mission?: string, etat?: string, date_fin_real?: string) {

    this.description = description;
    this.date_debut = date_debut;
    this.date_fin = date_fin;
    this.etat = etat;
    this.id_mission = id_mission;
    this.id_chauffeur = id_chauffeur;
    this.id_chefService = idchefService;
    this.date_fin_real = date_fin_real;

  }
}
