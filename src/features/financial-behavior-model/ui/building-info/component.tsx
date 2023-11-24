import React, { FC } from 'react';
import { Title3 } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface BuildingInfoProps {
  isRequestError?: boolean;
}

export const BuildingInfo: FC<BuildingInfoProps> = ({ isRequestError }) => {
  if (isRequestError) {
    return <div className={classes.wrapper}
                style={{ color: '#c50f1f' }}>
      <Title3>No Building Found</Title3>
    </div>;
  }

  return <div className={classes.wrapper}>
    <Title3>Enter building coordinates</Title3>
  </div>;
};