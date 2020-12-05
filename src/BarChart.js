import React, { useState, useEffect } from 'react';
import { proxy, buildChartData, chartOptions } from './utils';
import { Bar } from 'react-chartjs-2';


const BarChart = ({ caseType }) => {
   const [data, setData] = useState([]);

   let bgColor;
   let bdColor;

   if (caseType === 'cases') {
      bgColor = "rgba(222, 55, 0, 0.5)";
      bdColor = "rgb(222, 55, 0)";
   }

   if (caseType === 'recovered') {
      bgColor = "rgba(125, 215, 29, 0.5)";
      bdColor = "rgb(125, 215, 29)";
   }

   if (caseType === 'deaths') {
      bgColor = "rgba(204, 16, 52, 0.5)";
      bdColor = "rgb(204, 16, 52)";
   }

   useEffect(() => {
      const fetchData = async () => {
         await fetch(`${proxy}https://disease.sh/v3/covid-19/historical/all?lastdays=60`)
            .then(res => res.json())
            .then(data => {
               let chartData = buildChartData(data, caseType);

               setData(chartData);
            });
      };

      fetchData();
   }, [caseType]);

   return (
      <div style={{ marginTop: "15px" }}>
         {data?.length > 0 && (
            <Bar
               data={{
                  datasets: [
                     {
                        backgroundColor: bgColor,
                        borderColor: bdColor,
                        borderWidth: 1,
                        data: data,
                     },
                  ],
               }}
               options={chartOptions}
            />
         )}
      </div>
   );
};

export default BarChart;