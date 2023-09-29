import React, { FC } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Input as FluentInput,
  InputProps as FluentInputProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';


type InputProps = ({
  type: 'text';
  field: FluentInputProps
}) | ({
  type: 'number';
  field: Omit<FluentInputProps, 'value' | 'onChange'> & { value: number, onChange?: (data: number) => void }
}) | ({
  type: 'date',
  field: Omit<DatePickerProps, 'onChange'> & { onChange: DatePickerProps['onSelectDate'] }
}) | {
  type: 'radio',
  field: RadioGroupProps & { options: string[] },
} | {
  type: 'checkbox',
  field: Omit<CheckboxProps, 'value'> & { label: string, value: boolean },
};

export const Input: FC<InputProps> = ({ type, field }: InputProps) => {
  if (type === 'date') {
    const { onChange, ...rest } = field;
    return <DatePicker
      onSelectDate={
onChange
}
      {...rest}
    />;
  }

  if (type === 'radio') {
    const { options, ...rest } = field;
    return <RadioGroup layout='horizontal'
{...rest}>
      {
options.map((option: string) =>
  <Radio
        key={
option
}
        label={
option
}
        value={
option
} />)
    }
    </RadioGroup>;
  }

  if (type === 'checkbox') {
    const { label, value, ...rest } = field;

    return <Checkbox label={
label
}
checked={
value
}
{...rest} />;
  }

  if (type === 'number') {
    const { value, onChange, ...rest } = field;
    return <FluentInput
      type={
type
}
      value={
String(value)
}
      onChange={
(event) => onChange?.(parseInt(event.target.value, 10))
}
      {...rest} />;
  }

  return <FluentInput type={
type
}
{...field} />;
};