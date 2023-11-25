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
  return <YMaps>
    <Map
      defaultState={{ center: [buildingsMeta[0].latitude, buildingsMeta[0].longitude], zoom: 12 }}
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