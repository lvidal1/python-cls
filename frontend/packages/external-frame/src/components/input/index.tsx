import { joinStr } from '@clearsummit/carabiners'
import * as React from 'react'

import jsStyles from './styles'
import styles from './styles.scss'

interface RequiredProps {
  name: string,
  placeholder: string | undefined,
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
}

type DefaultProps = {
  requestClose: () => void,
  ariaLabel: string,
  error: string,
  success: boolean,
  clean: ((value: string) => void) | null,
  type:
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | 'name',
  visible: boolean,
  className: string | null,
  accessory: string | null,
  dropdown: React.ReactNode | null,
  onFocus: ((e: React.FocusEvent<any>) => void) | undefined,
  onBlur: ((e: React.FocusEvent<any>) => void) | undefined,
  label: string,
  successImage: string | null,
  errorImage: string | null,
}

type InputProps = RequiredProps & Partial<DefaultProps>

type InputState = any

class Input extends React.Component<InputProps, InputState> {
  inputRef: HTMLInputElement | null | undefined

  static defaultProps: DefaultProps = {
    ariaLabel: '',
    type: 'text',
    dropdown: null,
    visible: false,
    error: '',
    success: false,
    clean: null,
    onFocus: undefined,
    onBlur: undefined,
    className: null,
    accessory: null,
    label: '',
    requestClose: () => { },
    successImage: null,
    errorImage: null,
  }

  onFocus = (e: React.FocusEvent<any>) => {
    const { onFocus } = this.props
    if (onFocus) {
      onFocus(e)
    }
  }

  onBlur = (e: React.FocusEvent<any>) => {
    const { onBlur } = this.props
    if (onBlur) {
      onBlur(e)
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    onChange(e)
  }

  focus = () => {
    if (this.inputRef) {
      this.inputRef.focus()
    }
  }

  renderDropdown = () => {
    const { dropdown, visible } = this.props
    if (visible && dropdown) {
      return dropdown
    }
    return null
  }

  renderAccessory = () => {
    const { accessory, success, error, successImage, errorImage } = this.props
    let imgSrc = null
    let alt = ''
    if (accessory) {
      imgSrc = accessory
      alt = 'accessory'
    } else if (success) {
      imgSrc = successImage
      alt = 'success'
    } else if (error) {
      imgSrc = errorImage
      alt = 'error'
    }
    if (imgSrc) {
      return (
        <button type="button" onClick={this.focus} className={styles.accessory}>
          <img className={styles.accessory} src={imgSrc} alt={alt} />
        </button>
      )
    }
    return null
  }

  renderError = () => {
    const { error } = this.props
    if (error) {
      return error
    }
    return null
  }

  render() {
    const { className, label, name, ariaLabel, success, error, ...rest } = this.props
    // Delete props that shouldn't be passed to the dom
    delete rest.visible
    delete rest.errorImage
    delete rest.successImage
    delete rest.requestClose
    return (
      <div>
        <label id={label} className={styles.inputLabel} htmlFor={name}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <input
            ref={ref => {
              this.inputRef = ref
            }}
            aria-label={ariaLabel}
            id={name}
            name={name}
            className={joinStr(styles.baseInput, className)}
            css={jsStyles.input({ success, error })}
            {...rest}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          <span className={styles.error}>{this.renderError()}</span>
          {this.renderAccessory()}
          {this.renderDropdown()}
        </div>
      </div>
    )
  }
}

export default Input
