import { useState, type ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';
import styles from './Input.module.scss';

interface IInput {
  placeholder: string;
  type?: 'text' | 'email' | 'calendar' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  isValid?: boolean;
  icon?: ReactNode;
}

const Input = ({
  placeholder = '',
  value,
  type = 'text',
  onChange,
  isValid = true,
  icon,
}: IInput) => {
  const [open, setOpen] = useState(false);
  const inputWrapperClass = classNames(styles.inputWrapper, {
    [styles.isValid]: isValid,
    [styles.withValue]: !!value,
    [styles.withIcon]: !!icon,
  });

  const renderInput = (inputProps: any) => (
    <div className={inputWrapperClass}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {inputProps}
    </div>
  );

  if (type === 'textarea') {
    return renderInput(
      <textarea
        className={classNames(styles.input, !!icon && styles.withIcon)}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (type === 'calendar') {
    const selectedDate = value ? new Date(value) : null;

    return (
      <div className={inputWrapperClass}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            if (date) onChange(date.toISOString().split('T')[0]);
          }}
          onClickOutside={() => setOpen(false)}
          onSelect={() => setOpen(false)}
          open={open}
          onInputClick={() => setOpen(true)}
          placeholderText={placeholder}
          dateFormat="yyyy-MM-dd"
          calendarStartDay={1}
          customInput={
            <div className={styles.dateInputWrapper} onClick={() => setOpen(true)}>
              <input
                className={classNames(styles.input, !!icon && styles.withIcon)}
                value={value}
                disabled
              />
            </div>
          }
          locale={enUS}
        />
      </div>
    );
  }

  return renderInput(
    <input
      className={styles.input}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;