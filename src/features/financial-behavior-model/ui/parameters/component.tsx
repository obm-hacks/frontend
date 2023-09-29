import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';


interface ParametersFormProps {
  gender: 'Male' | 'Female',
  age: number;
  birthYear: Date;
  postalCode: string;
  isCityInhabitant: boolean;
}


export const Parameters = () => {
  const onSubmit: SubmitHandler<ParametersFormProps> = (data) => console.log(data);
  const {
    handleSubmit,
    control,
  } = useForm<ParametersFormProps>({
    defaultValues: {
      age: 18,
      postalCode: '124534',
      birthYear: new Date(),
      gender: 'Male',
      isCityInhabitant: false,
    },
  });


  return <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
      control={control}
      name='age'
      rules={{
        required: true,

      }}
      render={({ field }) => (<Input type='number'
                                     field={field} />)}
    />

    <Controller
      control={control}
      name='birthYear'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='date'
                                     field={field} />)}
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
          field={field} />)}
    />

    <Controller
      control={control}
      name='gender'
      rules={{
        required: true,
      }}
      render={({ field }) => (<Input type='radio'
                                     field={{ ...field, options: ['Male', 'Female'] }} />)}
    />

    <Controller
      control={control}
      name='isCityInhabitant'
      render={({ field }) => (<Input type='checkbox'
                                     field={{ ...field, label: 'isCityInhabitant' }} />)}
    />

    <button type='submit'>
      submit
    </button>
  </form>;
};