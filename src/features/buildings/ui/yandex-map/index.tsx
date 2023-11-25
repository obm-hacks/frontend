import React from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';


import classes from './styles.module.css';
import { BuildingMetaInfo } from '@/types';

interface YandexMapProps {
  buildingsMeta: BuildingMetaInfo[];
  onBuildingSelect: (id: string) => void;
  buildingId: string;
}

export const YandexMap = ({ buildingsMeta, onBuildingSelect, buildingId }: YandexMapProps) => {
  return <YMaps query={{ apikey: '5091a209-95f3-4dd4-a66d-b271fbb83f47' }}>
    <Map
      defaultState={{ center: [53.595724, 142.957607], zoom: 4 }}
      className={classes.map_container}
    >

      {buildingsMeta.map(({ longitude, latitude, geocoderAddress }) =>
        <Placemark key={`${latitude}${longitude}`}
                   defaultGeometry={[latitude, longitude]}
                   options={{
                     preset: geocoderAddress === buildingId ? 'islands#redIcon' : 'islands#blueIcon',
                   }}
                   onClick={() => onBuildingSelect(geocoderAddress)} />)}
    </Map>
  </YMaps>;
};