

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


  chauffeursActif: number = 0;
  chauffeursInactif: number = 0;
  voituresActif: number = 0;
  voituresInActif: number = 0;
  chauffeursAll: Chauffeur[] = [];
  list: any[] = [];
  listMois: any[] = [];
  listYears: any[] = [];

  constructor(private userServ: UserService,
    private voitureService: VoitureService,
    public controls: ControlsService,
    private modalService: NgbModal,) {
    this.listMois = this.controls.getMois();
    this.listYears = this.controls.getAnnee();

  }

  ngOnInit() {

    this.getUsers(res => {
      this.chauffeursActif = res.length;
      // this.chauffeurs = res || [];

      this.getUsers(result => {
        this.chauffeursInactif = result.length;
        this.chauffeursAll = [...res].concat(result);
      }, false);

    }, true);

    this.getVoitures(res => {
      this.voituresActif = res.length;
      this.getVoitures(result => {
        this.voituresInActif = result.length;
      }, false);
    }, true);



    //end OnInit
  }

  makeChart() {


    AmCharts.makeChart('statistics-chart', {
      type: 'serial',
      marginTop: 0,

      marginRight: 0,
      dataProvider: [{
        year: 'SEMAINE 1',
        value: 0.2
      }, {
        year: 'SEMAINE 2',
        value: 15
      }, {
        year: 'SEMAINE 3',
        value: 29
      }, {
        year: 'SEMAINE 4',
        value: 28
      }],

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
  async getUsers(callback, actif: boolean) {

    try {
      const { msg, erorer } = await this.userServ.getAllUsers(actif) as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }

  }

  async getVoitures(callback, actif: boolean) {
    try {
      const { msg, erorer } = await this.voitureService.getAllVoitures(actif) as any || [];
      if (!erorer) {
        callback(msg);
      }

    } catch (error) {
      return error;
    }
  }





  submit(annee: string, moi: string, chauffeur: string) {
    const array: string[] = [annee, moi, chauffeur];
    if (array.includes("-1")) {
      console.log("condd")
      const modalRef = this.modalService.open(LoginErrorComponent);
      modalRef.componentInstance.message = "Saisir toutes les valeurs !";
      return;
    } else
      if (this.list.length > 0) {
        this.makeChart();
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

