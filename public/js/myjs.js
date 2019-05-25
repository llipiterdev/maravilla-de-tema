function UrlParse(JsonFile) {
  var url = "http://localhost:8080/"+JsonFile;
  return url;
}
function drawChart(JsonUrl,idChart) {  
  $.getJSON(JsonUrl, function (jsondata) {
    var chartData = {
      type: 'bar',
      data: {
        labels: [''],
        datasets: []
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
          display: true,
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
    console.log(chartData);
    return mychart;
  });
}
drawChart(UrlParse("gender"),"michart");
drawChart(UrlParse("age"),"michart2");
drawChart(UrlParse("generation"),"michart3");
drawChart(UrlParse("continent"),"michart4");