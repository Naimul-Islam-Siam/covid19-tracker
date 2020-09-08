import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, total, todayCases }) {
   return (
      <Card className="infoBox">
         <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
               {title}
            </Typography>

            <h4 className="infoBox__todayCases">{todayCases}</h4>

            <Typography className="infoBox__total" color="textSecondary">
               {total} Total
            </Typography>
         </CardContent>
      </Card>
   )
};

export default InfoBox;
