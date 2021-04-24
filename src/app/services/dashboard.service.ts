import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

//Chefservice
  getNbChauffeursChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_chouffeur_act')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
      // .subscribe({
      //   next:(data)=>{
      //     resolve(data)
      //   },error:(err)=>{
      //     resolve(err)
      //   }
      // })
    });

  }

  getNbVoituresChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_voiture_act')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })     
    });

  }

  getNbVoituresAffectesChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_voiture_affecte')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })     
    });

  }

  getNbEntretiensChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_entritien_bay_year_naw')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })     
    });

  }
  getNbMissionAttenteChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_mission_en_attonte_admin')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })     
    });
  }

  getNbMissionTermineesChefservice(){
    return new Promise((resolve,reject)=>{
      this.httpClient.get('http://127.0.0.1/pfe_api/Charet/get_nombre_mission_terminer_admin')
      .forEach(data=>{
        resolve(data)
      }).catch((err) => {
        reject(err)
      })     
    });

  }




  //chauffeur
  getNbMissionAttenteChauffeur(id:string) {
   
    const body = { params: { 'id':id } };
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/Charet/get_nombre_mission_en_attonte_chouffeur`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }
   getNbMissionTermineesChauffeur(id:string) {
   
    const body = { params: { 'id':id } };
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/Charet/get_nombre_mission_terminer_admin`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }

   getNbCarnetDeBoardChauffeur(id:string) {
   
    const body = { params: { 'id':id } };
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/Charet/get_nombre_carnet_bored_chouffeur`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }


  getChefServiceCharet(payload) {
   
    const body = { params: payload };
    return new Promise((resolve, reject) => {
      this.httpClient.get(`http://127.0.0.1/pfe_api/Charet/get_data_for_mes_charet`, body)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        })
    });
  }

}





  // sub=({next:callback,err:errcallback},x:number)=>{
  //   if(x==1){
  //     callback(x)
  //   }else{
  //     errcallback(-1)
  //   }

  // }

  //  async sub(callback) {

  //   try {
  //     const { msg, erorer } = await this.dashboardService.sub({
  //       next:(data)=>{
  //       callback(data);
  //       },err:(errdata)=>{
  //       callback(errdata);
  //       }
  //     },1546) as any || [];
  //     // if (!erorer) {
  //     //   callback(msg);
  //     // }

  //   } catch (error) {
  //     return error;
  //   }

  // }