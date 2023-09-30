import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@fluentui/react-components';

import classes from './styles.module.css';


interface ParametersFormProps {
  gender: 'Male' | 'Female',
  age: number;
  birthDate: Date;
  postalCode: string;
  isCityInhabitant: boolean;
}

interface ParametersProps {
  onSubmit: () => void;
}

export const Parameters: FC<ParametersProps> = (props) => {
  const onSubmit: SubmitHandler<ParametersFormProps> = (data) => {
    console.log(data);
    props.onSubmit();
  };
  const {
    handleSubmit,
    control,
  } = useForm<ParametersFormProps>({
    defaultValues: {
      age: undefined,
      postalCode: '',
      birthDate: new Date(),
      gender: 'Male',
      isCityInhabitant: false,
    },
  });


  return <form onSubmit={handleSubmit(onSubmit)}
               className={classes.wrapper}>
    <Controller
      control={control}
      name='age'
      rules={{
        required: true,

      }}
      render={({ field }) => (<Input type='number'
                                     label='Age'
                                     field={{ ...field, size: 'large' }} />)}
    />

    <Controller
      control={control}
      name='birthDate'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='date'
                                     label="Birth Date"
                                     field={{ ...field, size: 'large' }} />)}
    />

    <Controller
      control={control}
      name='postalCode'
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <Input
          type='text'
          label='Postal Code'
          field={{ ...field, size: 'large' }} />)}
    />

    <Controller
      control={control}
      name='gender'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='radio'
                                     label='Gender'
                                     field={{ ...field, options: ['Male', 'Female'] }} />)}
    />

    <Controller
      control={control}
      name='isCityInhabitant'
      render={({ field }) => (<Input type='checkbox'
                                     label='isCityInhabitant'
                                     field={{ ...field, size: 'large' }} />)}
    />

    <Button type='submit'
            size='large'
            appearance='primary'>
      Predict
    </Button>
  </form>;
};