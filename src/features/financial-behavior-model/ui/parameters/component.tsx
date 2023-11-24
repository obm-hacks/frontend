import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface ParametersFormProps {
  latitude: string;
  longitude: string;
}

interface ParametersProps {
  onSubmit: SubmitHandler<ParametersFormProps>;
}

export const Parameters: FC<ParametersProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
  } = useForm<ParametersFormProps>({
    defaultValues: {
      latitude: undefined,
      longitude: undefined,
    },
  });


  return <form onSubmit={handleSubmit(onSubmit)}
               className={classes.wrapper}>
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