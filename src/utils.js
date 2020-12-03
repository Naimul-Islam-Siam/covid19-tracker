import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import './Map.css';


const casesTypeColors = {
   cases: {
      hex: "#DE3700",
      rgb: "rgb(222, 55, 0)",
      half_op: "rgba(222, 55, 0, 0.5)",
      multiplier: 800 // size of circle
   },
   recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200
   },
   deaths: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 2000
   },
};


export const proxy = "https://cors-anywhere.herokuapp.com/";

export const numberWithCommas = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const showOneDecimalOnly = (number) => Math.round(number * 10) / 10;

export const sortData = (data) => data.sort((a, b) => b.cases - a.cases);

export const showDataOnMap = (countries, caseType = "cases") => (
   countries.map(country => (
      <Circle
         center={[country.countryInfo.lat, country.countryInfo.long]}
         fillOpacity={0.4}
         color={casesTypeColors[caseType].hex}
         fillColor={casesTypeColors[caseType].hex}
         radius={
            Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
         }
      >
         <Popup>
            <div className="popup-container">
               <div className="popup-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
               <div className="popup-country">{country.country}</div>
               <div className="popup-cases">
                  <div className="popup-marker popup-marker-cases"></div>
                  Cases: <span className="number">{numberWithCommas(country.cases)}</span>
               </div>
               <div className="popup-recovered">
                  <div className="popup-marker popup-marker-recovered"></div>
                  Recovered: <span className="number">{numberWithCommas(country.recovered)}</span>
               </div>
               <div className="popup-deaths">
                  <div className="popup-marker popup-marker-deaths"></div>
                  Deaths: <span className="number">{numberWithCommas(country.deaths)}</span>
               </div>
            </div>
         </Popup>
      </Circle>
   ))
);


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