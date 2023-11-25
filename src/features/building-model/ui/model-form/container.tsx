import React, { useState } from 'react';
import { Parameters, ParametersFormProps } from '../parameters/component';
import { BuildingInfoProps, BuildingInfo } from '../building-info/component';

import classes from './styles.module.css';
import axios from 'axios';
import { API_URL } from '@/constants';
import { Divider } from '@fluentui/react-components';
import { SubmitHandler } from 'react-hook-form';

type BuildingModelFormProps = {
  buildingId: string;
}

export const BuildingModelForm = ({ buildingId }: BuildingModelFormProps) => {
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfoProps>({});
  const [isRequestError, setIsRequestError] = useState(false);


  const onSubmit: SubmitHandler<ParametersFormProps> = (form) => {
    axios.post(`${API_URL}/buildings`, form).then(({ data }) => {
      setBuildingInfo(data);
    }).catch(() => {
      setIsRequestError(true);
      setTimeout(() => {
        setIsRequestError(false);
      }, 3000);
    });
  };


  return <div className={classes.wrapper}>
    <Parameters onSubmit={onSubmit} buildingId={buildingId} />

    <Divider vertical
             className={classes.divider} />

    <BuildingInfo isRequestError={isRequestError}
                  {...buildingInfo} />
  </div>;
};