import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';


const convenioQuery = gql`
query q {
  convenios(distinct_on: id) {
    id
    nome
  }
   prestadores_servicos {
    id
    nome
  }
  
  importacao_guias {
    id
    nomeBeneficiario
    valorTotal
    valorUnitario
    valorTotalGuia
  }
  importacao_convenios {
    id
    id_convenio
    numero_guia
    valor_pago
    valor_glosa
    valor_apresentado
  }
 
}
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  employees: any[] = [];

  public convenios: any[];
  public importacao_convenios: any[];
  public importacao_guias: any[];
  public prestadores_servicos: any[];

  public filtredImportcaoConvenios: any[];
  private query: QueryRef<any>;

  public convenioSelecionado = 1;

  public valorTotalGlosa = 0;

  public valorTotalApresentado = 0;

  constructor(private apollo: Apollo) {



  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };


  public filtraConvenio(id: number) {
    this.convenioSelecionado = id;
    this.filtredImportcaoConvenios = this.importacao_convenios.filter(x => x.id_convenio == id);

  }


  ngOnInit() {

    console.log("as");

    this.query = this.apollo.watchQuery({
      query: convenioQuery,
      variables: {}
    });


    this.query.valueChanges.subscribe(result => {
      this.employees = result.data;
      this.convenios = result.data.convenios;

      this.importacao_convenios = result.data.importacao_convenios;

      this.filtredImportcaoConvenios = this.importacao_convenios.filter(x => x.id_convenio == 1);
      this.convenioSelecionado = 1;

      this.importacao_guias = result.data.importacao_guias;

      this.prestadores_servicos = result.data.prestadores_servicos;

      this.valorTotalGlosa = 0;
      this.importacao_convenios.map(
        x => {
          if (parseInt(x.valor_glosa, 10)) {
            this.valorTotalGlosa = this.valorTotalGlosa + parseInt(x.valor_glosa, 10);
          }

        }
      )

      this.importacao_guias.map(
        x => {
          if (parseInt(x.valorTotalGuia, 10)) {
            this.valorTotalApresentado = this.valorTotalApresentado + parseInt(x.valorTotalGuia, 10);
          }

        }
      )




    });

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
