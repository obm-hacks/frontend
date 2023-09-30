import React, { FC } from 'react';
import { Label } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface UserInfoProps {
  contributionMoney?: number;
  contributionPeriod?: number;
}

export const UserInfo: FC<UserInfoProps> = ({ contributionMoney, contributionPeriod }) => {
  if (!contributionMoney || !contributionPeriod) {
    return null;
  }


  return <div className={classes.wrapper}>
    <Label size='large'>
      {contributionMoney} рублей
    </Label>

    <Label size='large'>
      {contributionPeriod} дней
    </Label>
  </div>;
};