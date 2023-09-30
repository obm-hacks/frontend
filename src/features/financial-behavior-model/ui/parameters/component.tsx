import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@fluentui/react-components';

import classes from './styles.module.css';

export interface ParametersFormProps {
  clientId: number;
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
      clientId: undefined,
    },
  });


  return <form onSubmit={handleSubmit(onSubmit)}
               className={classes.wrapper}>
    <Controller
      control={control}
      name='clientId'
      rules={{
        required: true,

      }}
      render={({ field }) => (<Input type='number'
                                     label='Client ID'
                                     field={{ ...field, size: 'large' }} />)}
    />

    <Button type='submit'
            size='large'
            appearance='primary'>
      Predict
    </Button>
  </form>;
};