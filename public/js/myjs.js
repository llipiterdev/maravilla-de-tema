function UrlParse(JsonFile) {
    var url = "http://localhost:8080/" + JsonFile;
    return url;
}
function DrawBarChart(JsonUrl, idChart) {
  $.getJSON(JsonUrl, function (jsondata) {
    var chartData = {
      type: 'bar',
      data: {
        labels: [''],
        datasets: []
      },
      options: {
        responsive: false,
        legend:{
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (label) { return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); },
            },
          }],
        },
        title: {
          display: true,
          text: 'Suicidios por genero'
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
          },
        }
      }
    }
    var color = [];
    var dinamicColors = function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + " ," + g + " ," + b + ", 0.4)";
    }
    labels = jsondata.data.map(function (item) {
      return item.label;
    });
    var value = jsondata.data.map(function (item) {
      return item.valor;
    });
    var count = Object.keys(jsondata.data).length;
    for (var j = 0; j < 20; j++) {
      color.push(dinamicColors());
    }
    for (var i = 0; i < count; i++) {
      chartData.data.datasets.push({
        label: [labels[i]],
        data: [value[i]],
        backgroundColor: color[i],
        borderColor: 'black',
        borderWidth: 1,
      });
    }
    var ctx = document.getElementById(idChart).getContext('2d');
    var mychart = new Chart(ctx, chartData);
    //console.log(chartData);
    return mychart;
  });
}


function DrawLineChart(JsonUrl, idChart) {
  $.getJSON(JsonUrl, function (jsondata) {
    var chartData = {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Suicidos por año',
          backgroundColor: 'red',
          borderColor: 'black',
          showLine: true,
          data: [],
          fill: false,
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (label) { return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); },
            },
          }],
        },
        title: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            },
          },
        }
      }
    }

    var label = jsondata.data.map(function (item) {
      return item.label;
    });
    var value = jsondata.data.map(function (item) {
      return item.valor;
    });
    var count = Object.keys(jsondata.data).length;

    for (var i = 0; i < count; i++) {
      chartData.data.labels.push(label[i]);
      chartData.data.datasets[0].data.push(value[i]);
    }
    var ctx = document.getElementById(idChart).getContext('2d');
    var myLineChart= new Chart(ctx, chartData);
    console.log(chartData);
    return myLineChart;
  });

}
DrawBarChart(UrlParse("gender"),"michart");
DrawBarChart(UrlParse("age"),"michart2");
DrawBarChart(UrlParse("generation"),"michart3");
DrawBarChart(UrlParse("continent"),"michart4");
DrawLineChart(UrlParse("yearper100k"),"michart5");
DrawLineChart(UrlParse("yearper100kco"),"michart6");
