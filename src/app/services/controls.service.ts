import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class ControlsService {
  constructor(private router: Router) {}

  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  validateEmailregex(input: HTMLInputElement): boolean {
    if (input.value) {
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailPattern.test(input.value.toString().toLowerCase());
    } else {
      return false;
    }
  }

  verifTel(tel: HTMLInputElement): boolean {
    if (tel.value) {
      const telephone = tel.value.toString();
      if (telephone.length != 8) {
        return true;
      } else if (
        telephone.charAt(0) === "7" ||
        telephone.charAt(0) === "2" ||
        telephone.charAt(0) === "5" ||
        telephone.charAt(0) === "9"
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  verifMatriculeExiste(input: HTMLInputElement, matList: string[]): boolean {
    if (input.value) {
      if (matList.length > 0)
        if (matList.includes(this.trimStr(input.value))) return true;

      return false;
    } else {
      return false;
    }
  }

  validateLength(input: HTMLInputElement): boolean {
    if (input.value) return input.value.trim().length <= 5;
    return false;
  }

  trimStr(value: string): string {
    let str: string = "";
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (element != " ") str += element;
    }
    return str;
  }

  containsAt(input: HTMLInputElement) {
    if (input.value) {
      const str = "&1234567890/*-_=+$*µ§!/:@#,.<>~{([|``^à}])ç^°";
      for (let index = 0; index < str.length; index++) {
        const char = str[index];
        if (input.value.indexOf(char) > -1) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  verifEmailExist(input: HTMLInputElement, emailList: string[]): boolean {
    if (input.value) {
      const arrayEmail = [...emailList];
      if (arrayEmail.length > 0)
        if (arrayEmail.includes(this.trimStr(input.value))) return true;

      return false;
    } else {
      return false;
    }
  }

  validateSelect(option: string): boolean {
    return option === "-1";
  }

  dateFormat(date: string, hour?: boolean): string {
    if (date)
      if (hour) {
        return moment(date).format("DD/MM/YYYY HH:mm:ss").toString();
      }

    return moment(date).format("DD/MM/YYYY").toString();
  }

  isEqual = (obj1, obj2) => {
    //not used
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    for (let index = 0; index < obj1Keys.length; index++) {
      const obj1element = obj1Keys[index];
      const obj2element = obj2Keys[index];

      if (obj1element != obj2element) return false;
    }

    for (let objKey of obj1Keys) {
      if (obj1[objKey] !== obj2[objKey]) {
        return false;
      }
    }

    return true;
  };

  dateDiff(a, b): boolean {
    if (a && b) {
      const dd = new Date(a) as any;
      const df = new Date(b) as any;

      return df < dd;
    } else {
      return false;
    }
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), "secretKey").toString();
    } catch (e) {
      return e;
    }
  }

  decryptData(data) {
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

  getAllMatriculeOrEmails(array, option: string): string[] {
    const List = new Array<string>();
    switch (option) {
      case "matricule":
        for (let index = 0; index < array.length; index++) {
          List.push(array[index].matricule);
        }
      case "email":
        for (let index = 0; index < array.length; index++) {
          List.push(array[index].email);
        }
    }
    return List;
  }

  formatFullName(type: string): string {
    if (type)
      return type.replace(type.charAt(0), type.charAt(0).toLocaleUpperCase());
    else return null;
  }

  getRegions(): string[] {
    return [
      "Ariana",
      "Béja",
      "Ben Arous",
      "Bizerte",
      "Gabes",
      "Gafsa",
      "Jendouba",
      "Kairouan",
      "Kasserine",
      "Kébili",
      "Kef",
      "Mahdia",
      "Manouba",
      "Médenine",
      "Monastir",
      "Nabeul",
      "Sfax",
      "Sidi Bouzid",
      "Siliana",
      "Sousse",
      "Tataouine",
      "Tozeur",
      "Tunis",
      "Zaghouan",
    ];
  }

  verifPass(
    password: HTMLInputElement,
    confirmpass: HTMLInputElement
  ): boolean {
    return password.value === confirmpass.value;
  }

  compare = (date_fin) => {
    const today = new Date() as any;
    return this.dateDiff(today, date_fin);
  };

  daysDiff = (date_fin) => {
    if (date_fin) {
      const today = moment(new Date()).format("MM/DD/YYYY").toString();
      const df = moment(date_fin).format("MM/DD/YYYY").toString();
      const date1 = new Date(today);
      const date2 = new Date(df);
      const Difference_In_Time = date2.getTime() - date1.getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      return Difference_In_Days;
    }
  };

  getMois() {
    return [
      { key: "01", value: "Janvier" },
      { key: "02", value: "Février" },
      { key: "03", value: "Mars" },
      { key: "04", value: "Avril" },
      { key: "05", value: "Mai" },
      { key: "06", value: "Juin" },
      { key: "07", value: "Juillet" },
      { key: "08", value: "Aout" },
      { key: "09", value: "Septembre" },
      { key: "10", value: "Octobre" },
      { key: "11", value: "Novembre" },
      { key: "12", value: "Décembre" },
    ];
  }

  getAnnee() {
    const year = new Date().getFullYear();

    const yearList: number[] = [];
    for (let index = 0; index < year - 2010; index++) {
      yearList.push(year - index);
    }
    return yearList;
  }

  verifLocalStorage() {
    const data = JSON.parse(localStorage.getItem("idConnexion"));

    if (data) {
      const role = this.decryptData(data.type);
      switch (role) {
        case "chauffeur":
          return "chauffeur";
        case "chefService":
          return "chefService";
      }
    } else {
      return null;
    }
  }

  navigateAndreload(navigateto: string) {
    this.router.navigate([navigateto]);
  }

  verifVF(role: string) {
    switch (this.verifLocalStorage()) {
      case role:
        this.navigateAndreload("/dashboard");
        break;

      case null:
        this.navigateAndreload("/accueil");
        break;
    }
  }

  verifLogin(userid?: string) {
    const idcnx = JSON.parse(localStorage.getItem("idConnexion"));
    if (idcnx) {
      const type = this.decryptData(idcnx.type);
      const { loggedin } = idcnx;
      if (loggedin) {
        this.navigateAndreload(`/dashboard/${type}`);
      }
    }
    // else if (userid) {
    //   this.navigateAndreload(`/user/${userid}`);
    // } else {
    //   this.navigateAndreload("/accueil");
    // }
  }

  verifProfile() {
    switch (this.verifLocalStorage()) {
      case "chauffeur":
        this.navigateAndreload("/dashboard/chauffeur/profil");
        break;
      case "chefService":
        this.navigateAndreload("/dashboard/chefService/profil");
        break;
      case null:
        this.navigateAndreload("/accueil");
        break;
    }
  }
}
