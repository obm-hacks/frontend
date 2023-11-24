import React, { useId, useState } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import { BuildingMetaInfo } from '@/types';
import { API_URL } from '@/constants';

import { YandexMap } from './ui/yandex-map';

import classes from './styles.module.css';
import {  Select, Title3 } from '@fluentui/react-components';
import { Table } from '@/features/buildings/ui/table';

export const Buildings = () => {
  const [view, setView] = useState<'Map' | 'Table'>('Table');
  const selectId = useId();
  const { data, isError, isLoading } = useQuery('buildings', () =>
    axios.get<BuildingMetaInfo[]>(`${API_URL}/buildings`).then(({ data }) => data),
  );

  if (isLoading) {
    return <Title3>Loading...</Title3>;
  }

  if (isError) {
    return <Title3>Error while loading buildings info</Title3>;
  }

  return <div className={classes.container}>
    <div className={classes.select_container}>
      <label htmlFor={selectId}>View</label>

      <Select
        id={selectId}
        value={view}
        onChange={(_, data) => setView(data.value as 'Table' | 'Map')}>
        <option>Map</option>

        <option>Table</option>
      </Select>
    </div>

    {view === 'Map' ?
      (<div className={classes.map}>
        <YandexMap buildingsMeta={data!} />
      </div>) :
      <Table buildingsMeta={data!} />
    }

  </div>;


};