import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, total, cases }) {
   return (
      <Card className="infoBox">
         <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
               {title}
            </Typography>

            <Typography className="infoBox__total" color="textSecondary">
               {total} Total
            </Typography>

            <h4 className="infoBox__cases">{cases}</h4>
         </CardContent>
      </Card>
   )
};

export default InfoBox;
