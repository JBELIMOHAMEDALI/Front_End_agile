export class Carnetdeboard {
  id_carnet_bord: string;
  klm: string;
  consomation: string;
  date: string;
  id_choufer: string;
  constructor(klm: string, consomation: string, id_choufer?: string, id_carnet_bord?: string, date?: string) {
    this.id_carnet_bord = id_carnet_bord;
    this.klm = klm;
    this.consomation = consomation;
    this.date = date;
    this.id_choufer = id_choufer;
  }
}
