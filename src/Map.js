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
               url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataOnMap(countries, caseType)}
         </MapContainer>
      </div>
   );
};

export default React.memo(Map);
