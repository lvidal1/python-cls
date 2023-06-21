import { css } from '@emotion/core'
import styles from './styles.scss'

const Styles = {
  label: (props: any) => css`
    :before {
      border: 1px solid ${styles.grey};
    }
    ${props.error
      ? `
    :before {
      border: 1px solid ${styles.red};
    }
  `
      : ''};
  `,
}

export default Styles
