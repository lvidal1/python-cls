

import * as React from 'react'
import { generateUUID } from '@clearsummit/carabiners'

import jsStyles from './styles'
import styles from './styles.scss'

interface RequiredProps {
  ariaLabel: string,
  checked: boolean,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

interface DefaultProps {
  label: string | React.ReactNode,
  onBlur: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  error: boolean,
  disabled: boolean,
}

type CheckboxProps = Partial<DefaultProps> & RequiredProps

class Checkbox extends React.Component<CheckboxProps> {
  id: string = ''

  static defaultProps: DefaultProps = {
    label: '',
    error: false,
    disabled: false,
    onBlur: undefined,
  }

  componentDidMount() {
    this.id = this.getId()
  }

  getId = (): string => generateUUID()

  render() {
    const { ariaLabel, name, label, error, disabled, checked, onBlur, onChange } = this.props
    const { id } = this

    return (
      <label className={styles.checkbox} htmlFor={id}>
        <span>{label}</span>
        <input
          type="checkbox"
          name={name}
          aria-label={ariaLabel}
          id={id}
          disabled={disabled}
          checked={checked}
          onBlur={onBlur}
          onChange={onChange}
        />
        <span css={jsStyles.span(this.props)} className={styles.checkmark} />
      </label>
    )
  }
}

export default Checkbox
