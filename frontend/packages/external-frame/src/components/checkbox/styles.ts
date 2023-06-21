import { css } from '@emotion/core'
import styles from './styles.scss'

const Styles = {
  span: (props: any) => css`
    ${props.error
      ? `
          border: 1px solid ${styles.red};
        `
      : `
          border: 1px solid ${styles.lightGrey};
        `};
  `,
}

export default Styles