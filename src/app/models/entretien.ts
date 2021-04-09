export class Entretien {
    id_entretien: string;
    id_voiture: string;
    date: string;
    description: string;

    constructor(id_voiture: string, date: string, desc: string, id_entretien?: string) {
        this.id_voiture = id_voiture;
        this.date = date;
        this.description = desc;
        this.id_entretien = id_entretien;

    }
}
