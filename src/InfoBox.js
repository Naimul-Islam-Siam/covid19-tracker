import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { numberWithCommas, showOneDecimalOnly } from './utils';
import { styleInfoBox, styleInfoBoxTitle, styleTotalFunc, percentageStyle } from './InfoBox.styles';
import './InfoBox.css';


function InfoBox({ title, total, todayCases, percentage, active, ...props }) {
   if (total) {
      total = numberWithCommas(total);
   }

   if (todayCases) {
      todayCases = numberWithCommas(todayCases);
   }

   if (percentage) {
      percentage = showOneDecimalOnly(percentage);
   }

   let styleTotal = styleTotalFunc(title);

   return (
      <Card onClick={props.onClick} className={`infoBox ${active && `infoBox--selected-${title.toLowerCase()}`}`}>
         <CardContent style={styleInfoBox}>
            <h2 className="infoBox__title" style={styleInfoBoxTitle}>
               {title} Cases
            </h2>

            <div className="infoBox__content" style={styleInfoBox}>
               <h3 className="infoBox__total" style={styleTotal}>{total} {percentage && (<span style={percentageStyle}>({percentage}%)</span>)}</h3>

               <Typography className="infoBox__todayCases" color="textSecondary">
                  +{todayCases}
               </Typography>
            </div>
         </CardContent>
      </Card>
   );
};

export default InfoBox;
