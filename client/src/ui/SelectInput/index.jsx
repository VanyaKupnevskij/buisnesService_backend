import styles from './style.module.scss';
import arrowImage from '../images/Arrow.svg';
import { useState } from 'react';

function SelectInput({
  style,
  className = '',
  options = [],
  name,
  initValue,
  placeholder = '',
  label,
  onChange = () => {},
}) {
  const _className = `${styles.root} ${className}`;
  const [value, setValue] = useState(initValue);

  function handleChange(value) {
    setValue(value);

    onChange(value);
  }

  return (
    <div style={style} className={_className}>
      <select
        className={styles.input}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        id={name}
        name={name}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <img className={styles.arrow} src={arrowImage} alt="arrow" />
    </div>
  );
}

export default SelectInput;
