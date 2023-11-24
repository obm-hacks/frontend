import React from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';


import classes from './styles.module.css';
import { BuildingMetaInfo } from '@/types';

interface YandexMapProps {
  buildingsMeta: BuildingMetaInfo[];
}

export const YandexMap = ({ buildingsMeta }: YandexMapProps) => {
  return <YMaps>
    <Map
      defaultState={{ center: [buildingsMeta[0].latitude, buildingsMeta[0].longitude], zoom: 12 }}
      className={classes.map_container}
      options={{}}
    >

      {buildingsMeta.map(({ longitude, latitude }) =>
        <Placemark key={`${latitude}${longitude}`}
                   defaultGeometry={[latitude, longitude]}
                   onClick={console.log} />)}
    </Map>
  </YMaps>;
};