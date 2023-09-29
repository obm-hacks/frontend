import React from 'react';
import { Parameters } from '../parameters/component';
import { UserInfo } from '../user-info/component';

import classes from './styles.module.css';

export const FinancialModel = () => {
  return <div className={classes.wrapper}>
    <Parameters />

    <UserInfo />
  </div>;
};