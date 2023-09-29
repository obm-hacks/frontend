import React from 'react';
import { FinancialModel } from '@/features/financial-behavior-model/ui/model/container';

import classes from './styles.module.css';

export const MainPage = () => {
  return <div className={classes.wrapper}>
    <FinancialModel />
  </div>;
};