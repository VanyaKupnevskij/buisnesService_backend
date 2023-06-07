import { useEffect, useState } from 'react';

import styles from './style.module.scss';
import panelGlobalStyle from '../panelGlobalStyle.module.scss';

import TextInput from '../../ui/TextInput';
import SelectInput from '../../ui/SelectInput';
import DatePicker from '../../ui/DatePicker';
import Button, { SecondaryButton } from '../../ui/Button';

import closeImage from '../images/close.svg';

function Modal({
  title = '',
  datas = [],
  onClose = () => {},
  onClickDelete = () => {},
  isInput = false,
  hasDelete = false,
  onChange = () => {},
}) {
  const classNameRoot = `${styles.root} ${panelGlobalStyle.panel}`;
  const [values, setValues] = useState(datas);

  useEffect(() => {
    setValues(datas);
  }, []);

  function handleChangeInput(name, newValue) {
    const tempValues = [...values];

    for (let i = 0; i < tempValues.length; i++) {
      if (tempValues[i].name === name) {
        tempValues[i].value = newValue;
      }
    }

    setValues(tempValues);
  }

  function handleSumbit() {
    onChange([...values]);
  }

  return (
    <>
      <div className={classNameRoot}>
        <h6 className={styles.title}>{title}</h6>
        <button className={styles.close_button} onClick={onClose}>
          <img src={closeImage} alt="close" />
        </button>
        <dl className={styles.content}>
          {values.map((data) => {
            if (
              (!data.value && !isInput) ||
              data.type_display === 'none' ||
              (data.type_display === 'readonly' && isInput)
            )
              return;

            return (
              <div key={data.title} className={styles.row}>
                <dt className={styles.row_title}>
                  {data.type === 'number' ? data.title + ' (грн)' : data.title}
                </dt>
                <dd className={styles.row_value}>
                  {isInput ? renderInput(data, handleChangeInput) : <>{data.value}</>}
                </dd>
              </div>
            );
          })}
        </dl>
        <div className={styles.controls}>
          {hasDelete && (
            <SecondaryButton
              onClick={() => onClickDelete(values.find((value) => value.name === 'id').value)}>
              Видалити
            </SecondaryButton>
          )}
          {isInput && (
            <Button className={styles.button_submit} onClick={handleSumbit}>
              Зберегти
            </Button>
          )}
        </div>
      </div>
      <div className={styles.back_panel}></div>
    </>
  );
}

function renderInput(data, onChange) {
  switch (data.type) {
    case 'text':
      return (
        <TextInput
          label={data.title.split(' ')[0]}
          name={data.name}
          value={data.value}
          type={data.type}
          placeholder={`Уведіть ${data.title.toLowerCase().split(' ')[0]} ...`}
          multiple={data.multiple}
          onChange={(value) => onChange(data.name, value)}
        />
      );
    case 'number':
      return (
        <TextInput
          label={data.title.split(' ')[0]}
          name={data.name}
          value={data.value}
          type={data.type}
          placeholder={`Уведіть ${data.title.toLowerCase().split(' ')[0]} ...`}
          onChange={(value) => onChange(data.name, value)}
        />
      );
    case 'select':
      return (
        <SelectInput
          label={data.title.split(' ')[0]}
          name={data.name}
          initValue={data.value}
          type={data.type}
          placeholder={`Уведіть ${data.title.toLowerCase().split(' ')[0]} ...`}
          options={data.options}
          onChange={(value) => onChange(data.name, value)}
        />
      );
    case 'date':
      return (
        <DatePicker
          label={data.title.split(' ')[0]}
          name={data.name}
          value={data.value}
          onChange={(value) => onChange(data.name, value)}
        />
      );
  }
}

export default Modal;
