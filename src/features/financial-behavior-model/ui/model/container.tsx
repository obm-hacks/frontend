import React, { useState } from 'react';
import { Parameters } from '../parameters/component';
import { UserInfo, UserInfoProps } from '../user-info/component';

import classes from './styles.module.css';

export const FinancialModel = () => {
  const [data, setData] = useState<UserInfoProps>({});

  const onSubmit = () => {
    setData({ contributionPeriod: 30, contributionMoney: 1000 });
  };

  return <div className={classes.wrapper}>
    <Parameters onSubmit={onSubmit} />

    <UserInfo {...data} />
  </div>;
};