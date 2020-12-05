import React from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import './Map.css';
import { showDataOnMap } from './utils';

const ChangeLocationInMap = ({ center, zoom }) => {
   const map = useMap();
   map.setView(center, zoom);
   return null;
};

const Map = ({ countries, caseType, center, zoom }) => {
   return (
      <div className="map">
         <MapContainer>
            <ChangeLocationInMap center={center} zoom={zoom} />
            <TileLayer
               url="https://api.mapbox.com/styles/v1/naimul-islam-siam/ckchv9xlx2gce1iphjiuz58m9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFpbXVsLWlzbGFtLXNpYW0iLCJhIjoiY2tjaHVxZmYwMGUxYjJxbnZvOXpxYjVteiJ9.ClSugxDI-zJB0t0RyhkOuQ"
               attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors'
            />
            {showDataOnMap(countries, caseType)}
         </MapContainer>
      </div>
   );
};

export default React.memo(Map);
