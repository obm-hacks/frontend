import React, { FC } from 'react';
import { Title1 } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface UserInfoProps {
  contributionMoney?: number;
  contributionPeriod?: number;
  isRequestError?: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({ contributionMoney, contributionPeriod, isRequestError }) => {
  if (isRequestError) {
    return <div className={classes.wrapper}
                style={{ color: '#c50f1f' }}>
      <Title1>No Client Found</Title1>
    </div>;
  }

  if (!contributionMoney || !contributionPeriod) {
    return <div className={classes.wrapper}>
      <Title1>Enter client ID for prediction</Title1>
    </div>;
  }


  return <div className={classes.wrapper}>
    <Title1>
      {contributionMoney}

      {' '}
      рублей
    </Title1>

    <Title1>
      {contributionPeriod}

      {' '}
      дней
    </Title1>
  </div>;
};