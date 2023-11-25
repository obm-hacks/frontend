import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@fluentui/react-components';

import classes from './styles.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BuildingMetaInfo } from '@/types';
import { API_URL } from '@/constants';

export type ParametersFormProps = Omit<BuildingMetaInfo, 'geocoderAddress'>

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
    defaultValues: buildingMetaInfo,
  });


  return <form onSubmit={handleSubmit(onSubmit)}
               className={classes.wrapper}>

    <Controller
      control={control}
      name='krValue'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Major renovation'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='ksValue'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Capital construction'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='trValue'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Current renovation'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='residualValue'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Residual'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='balanceValue'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Balance'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='buildingAge'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Building age'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='buildingSquare'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Building square'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='technicalConditions'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='text'
                                     label='Technical conditions'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='latitude'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Latitude'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Controller
      control={control}
      name='longitude'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='number'
                                     label='Longitude'
                                     field={{
                                       ...field,

                                       required: true,
                                     }} />)}
    />

    <Button
      className={classes.button}
      type='submit'
      size='large'
      appearance='primary'>
      Predict
    </Button>
  </form>;
};