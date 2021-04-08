export class User {
  email: string;
  id_user?: string;
  matricule: string;
  nomPrenom: string;
  password: string;
  statut: string;
  tel: string;
  type: string;
  region: string;
  dns: string;


  constructor(email: string, matricule: string, nomPrenom: string, password: string, statut: string, tel: string, type: string, region: string, dns: string, id_user?: string) {
    this.id_user = id_user;
    this.matricule = matricule;
    this.nomPrenom = nomPrenom;
    this.email = email;
    this.tel = tel;
    this.password = password;
    this.type = type;
    this.statut = statut;
    this.region = region;
    this.dns = dns;

  }
}
