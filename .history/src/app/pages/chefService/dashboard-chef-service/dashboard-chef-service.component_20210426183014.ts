

import { Component, OnInit } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import { UserService } from "../../../services/user.service";
import { VoitureService } from "../../../services/voiture.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chauffeur } from "../../../models/chauffeur";
import { ControlsService } from "../../../services/controls.service";
import { LoginErrorComponent } from '../../auth/login-error/login-error.component';
import { DashboardService } from "../../../services/dashboard.service";


declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-chef-service',
  templateUrl: './dashboard-chef-service.component.html',
  styleUrls: [
    './dashboard-chef-service.component.scss',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardChefServiceComponent implements OnInit {


  nbChauffeurs: number = 0;
  // chauffeursInactif: number = 0;
  nbVoitures: number = 0;
  nbVoituresAffectees: number = 0;
  nbMissionsTerminees:number=0;
  nbMissionsAttente:number=0;
  nbEntretiens:number=0;

  chauffeursAll: Chauffeur[] = [];
  listMois: any[] = [];
  listYears: any[] = [];
  list: any[] = [];
  displayCard:boolean;

  constructor(private userServ: UserService,
    private voitureService: VoitureService,
    public controls: ControlsService,
    private modalService: NgbModal,
    private dashboardService:DashboardService) {
    this.listMois = this.controls.getMois();
    this.listYears = this.controls.getAnnee();
    this.displayCard=false;
  }

  ngOnInit() {
    this.controls.verifVF('chauffeur');
    
    this.getChauffeursAndNumbers(res => {
      this.nbChauffeurs=res[0];
      this.chauffeursAll = [...res[1]];
    }, true);
      // this.getChauffeursAndNumbers(result => {
      //   this.chauffeursAll = [...res[1]].concat(result[1]);
      // }, false);

    this.getNbVoitures(res => {
      this.nbVoitures = res;
      this.getNbVoituresAffectees(result => {
        this.nbVoituresAffectees = result;
      });
    });

    this.getNbMissionAttente(res => {
      this.nbMissionsAttente = res;
      
    });

    this.getNbMissionTerminees(res => {
      this.nbMissionsTerminees = res;
      
    });

    this.getNbEntretiens(res => {
      this.nbEntretiens = res;
    });


    //end OnInit
  }

  getDataFromDb(results){
    const values:any[]=[];
    for (let index = 0; index < results.length; index++) {
      const obj = {year:"SEMAINE "+(index+1).toString(),value:results[index].consomation};
      values.push(obj);
    }
    return values;
  }

  makeChart(results) {

  

    AmCharts.makeChart('statistics-chart', {
      type: 'serial',
      marginTop: 0,

      marginRight: 0,
      dataProvider: this.getDataFromDb(results),

      valueAxes: [{
        axisAlpha: 0,
        dashLength: 6,
        gridAlpha: 0.1,
        position: 'left'
      }],
      graphs: [{
        id: 'g1',
        bullet: 'round',
        bulletSize: 9,
        lineColor: '#4680ff',
        lineThickness: 2,
        negativeLineColor: '#4680ff',
        type: 'smoothedLine',
        valueField: 'value'
      }],
      chartCursor: {
        cursorAlpha: 0,
        valueLineEnabled: false,
        valueLineBalloonEnabled: true,
        valueLineAlpha: false,
        color: '#fff',
        cursorColor: '#FC6180',
        fullWidth: true
      },
      categoryField: 'year',
      categoryAxis: {
        gridAlpha: 0,
        axisAlpha: 0,
        fillAlpha: 1,
        fillColor: '#FAFAFA',
        minorGridAlpha: 0,
        minorGridEnabled: true
      },
      'export': {
        enabled: true
      }
    });

  }

  onTaskStatusChange(event) {
    const parentNode = (event.target.parentNode.parentNode);
    parentNode.classList.toggle('done-task');
  }


  async getChauffeursAndNumbers(callback, actif: boolean) {
    let res:any[]=[]
    try {
      const { nbChauffeur, err } = await this.dashboardService.getNbChauffeursChefservice() as any || [];
        res.push(nbChauffeur);      
      
      const { msg, erorer } = await this.userServ.getAllUsers(actif) as any || [];
      if (!erorer) {
        res.push(msg)
      }
        callback(res);

    } catch (error) {
      return error;
    }

  }

  async getNbVoitures(callback) {

    try {
      const { nbVoitures, err } = await this.dashboardService.getNbVoituresChefservice() as any || [];       
      callback(nbVoitures);
    } catch (error) {
      return error;
    }
  }

async getNbVoituresAffectees(callback) {

    try {
      const { msg, erorer} = await this.dashboardService.getNbVoituresAffectesChefservice() as any || [];       
      callback(msg);
    } catch (error) {
      return error;
    }
  }
  
async getNbMissionAttente(callback) {

    try {
      const { msg, erorer} = await this.dashboardService.getNbMissionAttenteChefservice() as any || [];       
      callback(msg);
    } catch (error) {
      return error;
    }
  }


  async getNbMissionTerminees(callback) {

    try {
      const { msg, erorer} = await this.dashboardService.getNbMissionTermineesChefservice() as any || [];       
      callback(msg);
    } catch (error) {
      return error;
    }
  }


  async getNbEntretiens(callback) {

    try {
      const { msg, erorer} = await this.dashboardService.getNbEntretiensChefservice() as any || [];       
      callback(msg);
    } catch (error) {
      return error;
    }
  }
  





  submit(chauffeur: string, moi: string, annee: string) {
    const array: string[] = [chauffeur,moi, annee];

    if (array.includes("-1")) {
      const modalRef = this.modalService.open(LoginErrorComponent);
      return modalRef.componentInstance.message = "Saisir toutes les valeurs !";
      
    } 

        const payload= { 'id_chouffeur':array[0],'mois':array[1],'anne':array[2], };
        this.getChefServiceCharet((results)=>{
          if(results.length>0){
          this.displayCard=true;
          this.makeChart(results);
          }else{
            alert("Pas de données pour ce chauffeur !")
            //message no data
            //  const modalRef = this.modalService.open(LoginErrorComponent);
            //  return modalRef.componentInstance.message = "Saisir toutes les valeurs !";
          }
        },payload)



  }

  async getChefServiceCharet(callback,payload) {

    try {
      const { msg, erorer} = await this.dashboardService.getChefServiceCharet(payload) as any || [];   
      if(!erorer){

      callback(msg);
      }    
    } catch (error) {
      return error;
    }
  }
  


}//end class

function getRandomData() {
  let data = [];
  const totalPoints = 300;
  if (data.length > 0) {
    data = data.slice(1);
  }

  while (data.length < totalPoints) {
    const prev = data.length > 0 ? data[data.length - 1] : 50;
    let y = prev + Math.random() * 10 - 5;
    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    data.push(y);
  }

  const res = [];
  for (let i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }
  return res;
}

function buildChartJS(a, b, f, c) {
  if (f == null) {
    f = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [{
      label: '',
      borderColor: a,
      borderWidth: 2,
      hitRadius: 30,
      pointHoverRadius: 4,
      pointBorderWidth: 50,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: c,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: a,
      pointHoverBorderColor: 'rgba(0,0,0,0.5)',
      fill: true,
      backgroundColor: f,
      data: b,
    }]
  };

}

function buildChartOption() {
  return {
    title: {
      display: false
    },
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 12
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }
  };


}

