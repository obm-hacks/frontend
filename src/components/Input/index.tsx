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

type UIInputProps = {
  label?: string;
  placeholder?: string;
  appearance?: FluentInputProps['appearance']
}

type InputProps = ({
  type: 'text';
  field: FluentInputProps
}) & UIInputProps | ({
  type: 'number';
  field: Omit<FluentInputProps, 'value' | 'onChange'> & { value: number | undefined, onChange?: (data: number) => void }
}) & UIInputProps | ({
  type: 'date',
  field: Omit<DatePickerProps, 'onChange'> & { onChange: DatePickerProps['onSelectDate'] }
}) & UIInputProps | {
  type: 'radio',
  field: RadioGroupProps & { options: string[] },
} & UIInputProps | {
  type: 'checkbox',
  field: Omit<CheckboxProps, 'value'> & { value: boolean },
} & UIInputProps;

export const Input: FC<InputProps> = ({ type, field, label, placeholder, appearance }: InputProps) => {
  if (type === 'date') {
    const { onChange, ...rest } = field;
    return <Field label={label}>
      <DatePicker
        onSelectDate={
          onChange
        }
        appearance={appearance}
        placeholder={placeholder}
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
        appearance={appearance}
        placeholder={placeholder}
        type={type}
        value={String(value)}
        onChange={(event) => onChange?.(parseInt(event.target.value, 10))}
        {...rest} />
    </Field>;
  }

  return <Field label={label}>
    <FluentInput
      appearance={appearance}
      placeholder={placeholder}
      type={type}
      {...field} />
  </Field>;
};