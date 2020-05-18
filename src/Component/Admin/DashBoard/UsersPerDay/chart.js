import {indigo} from "@material-ui/core/colors";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";


export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
  datasets: [
    {
      label: 'This year',
      backgroundColor: indigo,
      data: [18, 5, 19, 27, 29, 19, 20]
    },
    {
      label: 'Last year',
      backgroundColor: blue,
      data: [11, 20, 12, 29, 30, 25, 13]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: '#FFFFFF',
    titleFontColor: '#000000',
    bodyFontColor: '#000000',
    footerFontColor: '#000000'
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: blue
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: blue,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: grey,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: grey
        }
      }
    ]
  }
};
