import React, { useEffect, useId, useState } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import { BuildingMetaInfo, TBuildingInfo } from '@/types';
import { API_URL } from '@/constants';

import { YandexMap } from './ui/yandex-map';

import classes from './styles.module.css';
import { Select, Title2, Title3 } from '@fluentui/react-components';
import { Table } from '@/features/buildings/ui/table';
import { BuildingGraphs } from '@/features/building-graphs';

type BuildingsProps = {
  buildingId: string;
  onBuildingIdChange: (id: string) => void;
}

export const Buildings = ({ buildingId, onBuildingIdChange }: BuildingsProps) => {
  const [view, setView] = useState<'Map' | 'Table'>('Map');
  const selectId = useId();
  const { data, isError, isLoading } = useQuery(
    'buildings',
    () => axios.get<BuildingMetaInfo[]>(`${API_URL}/buildings`).then(({ data }) => data),
  );

  const { isLoading: isBuildingLoading, isError: isBuildingError, data: buildingInfo, refetch } = useQuery({
      queryKey: ['building', buildingId],
      queryFn: () => axios.get<TBuildingInfo[]>(`${API_URL}/buildings/${buildingId}`).then(({ data }) => data),
      enabled: false,
    },
  );

  useEffect(() => {
    if (buildingId) {
      refetch();
    }
  }, [buildingId]);


  if (isLoading) {
    return <Title3>Loading...</Title3>;
  }

  if (isError || !data) {
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

    {buildingId && <div className={classes.building_title}>
      <Title2>
        {buildingId}
      </Title2>
    </div>}

    {view === 'Map' ?
      (<div className={classes.map}>
        <YandexMap
          buildingId={buildingId}
          buildingsMeta={data}
          onBuildingSelect={onBuildingIdChange} />
      </div>) :
      <div className={classes.table_container}>
        <Table
          buildingId={buildingId}
          buildingsMeta={data}
          onBuildingSelect={onBuildingIdChange}
        />
      </div>
    }

    <BuildingGraphs isLoading={isBuildingLoading} isError={isBuildingError}
                    emptyText='Choose building' data={buildingInfo} />

  </div>;
};