import * as React from 'react'
import { Link } from 'react-router-dom'
import { joinStr } from '@clearsummit/carabiners'

import jsStyles from './styles'
import styles from './styles.scss'

interface RequiredProps {
  ariaLabel: string,
}

interface DefaultProps {
  title: string,
  primary: boolean,
  onClick: string | undefined | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
  imgUrls: { default: string, selected: string } | null,
  className: string,
  type: 'button' | 'reset' | 'submit',
  disabled: boolean,
  children: React.ReactNode | null | undefined,
}

export type ButtonProps = Partial<DefaultProps> & RequiredProps

class ButtonComponent extends React.Component<ButtonProps> {
  static defaultProps: DefaultProps = {
    imgUrls: null,
    primary: true,
    title: '',
    className: '',
    onClick: undefined,
    type: 'button',
    disabled: false,
    children: null,
  }

  getButtonProps = () => {
    const btnProps = { ...this.props }
    // Delete unused non DOM props
    delete btnProps.primary
    return btnProps
  }

  renderIcon = () => {
    const { imgUrls } = this.props
    return imgUrls ? <span className="icon" /> : null
  }

  render() {
    const {
      ariaLabel,
      children,
      onClick,
      title,
      className,
      type,
      ...rest
    } = this.getButtonProps()

    if (typeof onClick === 'string') {
      return (
        <Link
          to={onClick}
          aria-label={ariaLabel}
          className={joinStr(styles.button, styles.link, className)}
          {...rest}
        >
          {this.renderIcon()}
          {title}
        </Link>
      )
    }
    delete rest.imgUrls
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        {...rest}
        onClick={onClick}
        aria-label={ariaLabel}
        className={joinStr(styles.button, className)}
        css={jsStyles.button(this.props)}
      >
        {this.renderIcon()}
        {title}
        {children}
      </button>
    )
  }
}

export const SecondaryButton = (props: ButtonProps) => <ButtonComponent primary={false} {...props} />

export default ButtonComponent
