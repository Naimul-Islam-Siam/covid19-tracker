import numeral from "numeral";


export const proxy = "https://cors-anywhere.herokuapp.com/";

export const sortData = (data) => data.sort((a, b) => b.cases - a.cases);

export const buildChartData = data => {
   const chartData = [];
   let lastDataPoint;

   for (let date in data.cases) {
      if (lastDataPoint) {
         const newDataPoint = {
            x: date,
            y: data['cases'][date] - lastDataPoint
         };

         chartData.push(newDataPoint);
      }

      lastDataPoint = data['cases'][date];
   };

   return chartData;
};

export const chartOptions = {
   legend: {
      display: false,
   },
   elements: {
      point: {
         radius: 0,
      },
   },
   maintainAspectRatio: false,
   tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
         label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
         },
      },
   },
   scales: {
      xAxes: [
         {
            type: "time",
            time: {
               format: "MM/DD/YY",
               tooltipFormat: "ll",
            },
         },
      ],
      yAxes: [
         {
            gridLines: {
               display: true,
            },
            ticks: {
               // Include a dollar sign in the ticks
               callback: function (value, index, values) {
                  return numeral(value).format("0a");
               },
            },
         },
      ],
   },
};