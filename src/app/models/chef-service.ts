export class ChefService {

  id_chefService: string;
  nomPrenom: string;
  matricule: string;
  email: string;
  password: string;
  tel: string;
  statut: string;
  region: string;
  dns: string;
  type: string;


  constructor(email: string, matricule: string, nomPrenom_chef: string, password: string, statut: string, tel: string, region: string, dns: string, id_chefService?: string) {
    this.id_chefService = id_chefService;
    this.nomPrenom = nomPrenom_chef;
    this.email = email;
    this.password = password;
    this.tel = tel;
    this.matricule = matricule;
    this.statut = statut;
    this.type = "chefService";
    this.dns = dns;
    this.region = region;

  }
}
