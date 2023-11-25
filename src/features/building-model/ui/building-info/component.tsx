import React, { FC } from 'react';
import { Title3 } from '@fluentui/react-components';

import classes from './styles.module.css';
import { TBuildingInfo } from '@/types';
import { BuildingGraphs } from '@/features/building-graphs';

export interface BuildingInfoProps {
  isRequestError?: boolean;
  buildingInfo?: TBuildingInfo[];
}

export const BuildingInfo: FC<BuildingInfoProps> = ({ isRequestError, buildingInfo }) => {
  if (isRequestError) {
    return <div className={classes.wrapper}
                style={{ color: '#c50f1f' }}>
      <Title3>No Building Found</Title3>
    </div>;
  }

  return <BuildingGraphs isError={false} isLoading={false} data={buildingInfo}
                         emptyText='Send form to see prediction with your params' />;
};