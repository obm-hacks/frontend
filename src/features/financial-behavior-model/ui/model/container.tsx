import React, { useState } from 'react';
import { Parameters, ParametersFormProps } from '../parameters/component';
import { UserInfo, UserInfoProps } from '../user-info/component';

import classes from './styles.module.css';
import axios from 'axios';
import { API_URL } from '@/constants';
import { Divider } from '@fluentui/react-components';
import { SubmitHandler } from 'react-hook-form';

export const FinancialModel = () => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({});
  const [isRequestError, setIsRequestError] = useState(false);

  const onSubmit: SubmitHandler<ParametersFormProps> = (form) => {
    setIsRequestError(false);
    axios.post(`${API_URL}/predict`, form).then(({ data }) => {
      setUserInfo({ contributionMoney: data.param1, contributionPeriod: data.param2 });
    }).catch(() => {
      setIsRequestError(true);
      setTimeout(() => {
        setIsRequestError(false);
      }, 3000);
    });
  };

  return <div className={classes.wrapper}>
    <Parameters onSubmit={onSubmit} />

    <Divider vertical
             className={classes.divider} />

    <UserInfo isRequestError={isRequestError}
              {...userInfo} />
  </div>;
};