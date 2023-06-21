import { css } from '@emotion/core'
import styles from './styles.scss'

const Styles = {
  input: (props: { success?: boolean, error?: string }) => css`
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${styles.lightGrey};
    ${props.success ? `border-bottom-color: ${styles.green};` : ''} ${props.error
      ? `border-bottom-color: ${styles.red};`
      : ''};
  `,
}

export default Styles
