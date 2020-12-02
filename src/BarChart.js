import React, { useState, useEffect } from 'react';
import { buildChartData, chartOptions } from './utils';
import { Bar } from 'react-chartjs-2';


const BarChart = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=60`)
         .then(res => res.json())
         .then(data => {
            let chartData = buildChartData(data);

            setData(chartData);
         });
   }, []);

   return (
      <div style={{ marginTop: "15px" }}>
         {data?.length > 0 && (
            <Bar
               data={{
                  datasets: [
                     {
                        backgroundColor: "#ff926e",
                        borderColor: "#DE3700",
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