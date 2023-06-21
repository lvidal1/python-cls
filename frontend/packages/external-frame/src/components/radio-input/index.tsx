

import * as React from 'react'

import { joinStr } from '@clearsummit/carabiners'

import jsStyles from './styles'
import styles from './styles.scss'

type RadioInputProps = {
  ariaLabel: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  checked: boolean,
  id: string,
  label: string | React.ReactNode,
  error?: boolean,
  className?: string,
}

class RadioInput extends React.Component<RadioInputProps> {
  static defaultProps = {
    error: false,
    className: '',
  }

  render() {
    const { ariaLabel, id, name, label, checked, className, error, onChange } = this.props
    return (
      <div className={joinStr(styles.radio, className)}>
        <input
          aria-label={`${ariaLabel}-${id}`}
          id={id}
          name={name}
          type="radio"
          checked={checked}
          onChange={onChange}
        />
        <label
          css={jsStyles.label(this.props)}
          htmlFor={id}
          className={styles.radioLabel}
          // @ts-ignore
          checked={checked}
          error={error}
        >
          {label}
        </label>
      </div>
    )
  }
}

export default RadioInput
