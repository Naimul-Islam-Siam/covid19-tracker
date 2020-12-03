import React from 'react';
import './Table.css';
import { numberWithCommas } from './utils';

const Table = ({ countries }) => {
   return (
      <div className="table">
         {countries.map(({ country, cases }) => (
            <tr>
               <td><strong>{country}</strong></td>
               <td>{numberWithCommas(cases)}</td>
            </tr>
         ))}
      </div>
   );
};

export default Table;
