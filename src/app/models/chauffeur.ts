export class Chauffeur {
    id_chauffeur: string;
    nomPrenom: string;
    matricule: string;
    email: string;
    password: string;
    tel: string;
    statut: string;
    region: string;
    dns: string;
    type: string;


    constructor(email: string, matricule: string, nomPrenom: string, tel: string, region: string, dns: string, id_chauffeur?: string, statut?: string, password?: string) {
        this.id_chauffeur = id_chauffeur;
        this.matricule = matricule;
        this.nomPrenom = nomPrenom;
        this.email = email;
        this.tel = tel;
        this.password = password;
        this.type = "chauffeur";
        this.statut = statut;
        this.region = region;
        this.dns = dns;

    }


}
