import React, { FC } from 'react';
import { Body2, Subtitle1, Title3 } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface UserInfoProps {
  contributionMoney?: number;
  contributionsNumber?: number;
  isRequestError?: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({ contributionMoney, contributionsNumber, isRequestError }) => {
  if (isRequestError) {
    return <div className={classes.wrapper}
                style={{ color: '#c50f1f' }}>
      <Title3>No Client Found</Title3>
    </div>;
  }

  if (!contributionMoney || !contributionsNumber) {
    return <div className={classes.wrapper}>
      <Title3>Enter client ID for prediction</Title3>
    </div>;
  }


  return <div className={classes.wrapper}>
    <div className={classes.title}>
      <Title3>
        Prediction for next quater
      </Title3>
    </div>

    <Body2>
      Contribution money
      {': '}

      <Subtitle1>
        {contributionMoney}

        {' '}
        ₽
      </Subtitle1>
    </Body2>

    <Body2>
      Contribution count
      {': '}

      <Subtitle1>
        {contributionsNumber}

        {' '}

        {contributionsNumber === 1 ? 'time' : 'times'}
      </Subtitle1>
    </Body2>
  </div>;
};