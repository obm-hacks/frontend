import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@fluentui/react-components';

import classes from './styles.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BuildingMetaInfo } from '@/types';
import { API_URL } from '@/constants';

export interface ParametersFormProps {
  investments: number;
  latitude: string;
  longitude: string;
}

interface ParametersProps {
  onSubmit: SubmitHandler<ParametersFormProps>;
  buildingId: string;
}

export const Parameters: FC<ParametersProps> = ({ onSubmit, buildingId }) => {
  const { data } = useQuery(
    'buildings',
    () => axios.get<BuildingMetaInfo[]>(`${API_URL}/buildings`).then(({ data }) => data),
  );

  const buildingMetaInfo = data?.find?.(({ geocoderAddress }) => geocoderAddress === buildingId);

  const {
    handleSubmit,
    control,
  } = useForm<ParametersFormProps>({
    defaultValues: {
      latitude: buildingMetaInfo?.latitude?.toString?.(),
      longitude: buildingMetaInfo?.longitude?.toString?.(),
      investments: undefined,
    },
  });


  return <form onSubmit={handleSubmit(onSubmit)}
               className={classes.wrapper}>
    <Controller
      control={control}
      name='investments'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Investments'
                                     field={{
                                       ...field,
                                       size: 'large',
                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='latitude'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='text'
                                     label='Latitude'
                                     field={{
                                       ...field,
                                       size: 'large',
                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='longitude'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='text'
                                     label='Longitude'
                                     field={{
                                       ...field,
                                       size: 'large',
                                       required: true,
                                     }} />)}
    />

    <Button type='submit'
            size='large'
            appearance='primary'>
      Predict
    </Button>
  </form>;
};