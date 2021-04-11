import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  constructor(private router: Router) { }



  reloadComponent() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }


  validateEmailregex(input: HTMLInputElement): boolean {
    if (input.value) {
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailPattern.test(input.value.toString().toLowerCase());
    } else {
      return false
    }
  }

  verifTel(tel: HTMLInputElement): boolean {
    if (tel.value) {
      const telephone = tel.value.toString();
      if (telephone.length != 8) {
        return true;
      } else
        if (telephone.charAt(0) === '7' || telephone.charAt(0) === '2' || telephone.charAt(0) === '5' || telephone.charAt(0) === '9') {
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
        if (matList.includes(this.trimStr(input.value)))
          return true;

      return false;
    } else {
      return false;
    }

  }

  validateLength(input: HTMLInputElement): boolean {
    if (input.value)
      return input.value.trim().length < 5;
    return false
  }

  trimStr(value: string): string {
    let str: string = "";
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (element != " ")
        str += element;

    }
    return str;
  }

  containsAt(input: HTMLInputElement) {
    if (input.value) {
      const str = "&1234567890/*-_=+$*µ§!/:@#,.<>~{([|``\^à}])ç^°";
      for (let index = 0; index < str.length; index++) {
        const char = str[index];
        if (input.value.indexOf(char) > -1) {
          return true
        }
      }
      return false;
    } else {
      return false;

    }

  }

  verifEmailExist(input: HTMLInputElement, emailList: string[]): boolean {
    if (input.value) {

      const arrayEmail = [...emailList]
      if (arrayEmail.length > 0)
        if (arrayEmail.includes(this.trimStr(input.value)))
          return true;

      return false;
    } else {
      return false;
    }
  }

  validateSelect(option: string): boolean {
    return option === '-1';
  }


  isEqual = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);

    for (let objKey of obj1Keys) {
      if (obj1[objKey] !== obj2[objKey]) {

        return false;
      }
    }

    return true;
  }
}
