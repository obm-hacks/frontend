import React, { FC } from 'react';
import {
  Checkbox,
  CheckboxProps, Field,
  Input as FluentInput,
  InputProps as FluentInputProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';

type InputProps = ({
  type: 'text';
  label?: string;
  field: FluentInputProps
}) | ({
  type: 'number';
  label?: string;
  field: Omit<FluentInputProps, 'value' | 'onChange'> & { value: number, onChange?: (data: number) => void }
}) | ({
  type: 'date',
  label?: string;
  field: Omit<DatePickerProps, 'onChange'> & { onChange: DatePickerProps['onSelectDate'] }
}) | {
  type: 'radio',
  label?: string;
  field: RadioGroupProps & { options: string[] },
} | {
  type: 'checkbox',
  label?: string,
  field: Omit<CheckboxProps, 'value'> & { value: boolean },
};

export const Input: FC<InputProps> = ({ type, field, label }: InputProps) => {
  if (type === 'date') {
    const { onChange, ...rest } = field;
    return <Field label={label}>
      <DatePicker
        onSelectDate={
          onChange
        }
        {...rest}
      />
    </Field>;
  }

  if (type === 'radio') {
    const { options, ...rest } = field;
    return <Field label={label}>
      <RadioGroup
        id={field.name}
        layout='horizontal'
        {...rest}>
        {
          options.map((option: string) =>
            <Radio
              key={option}
              label={option}
              value={option} />)
        }
      </RadioGroup>
    </Field>;
  }

  if (type === 'checkbox') {
    const { value, ...rest } = field;
    return <Checkbox
      id={field.name}
      label={label}
      checked={value}
      {...rest}
    />;
  }

  if (type === 'number') {
    const { value, onChange, ...rest } = field;
    return <Field label={label}>
      <FluentInput
        type={type}
        value={String(value)}
        onChange={(event) => onChange?.(parseInt(event.target.value, 10))}
        {...rest} />
    </Field>;
  }

  return <Field label={label}>
    <FluentInput
      type={type}
      {...field} />
  </Field>;
};