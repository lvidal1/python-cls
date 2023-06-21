import { css } from '@emotion/core'

export default {
  visibility: (hidden: boolean) => css`
    ${hidden ? 'visibility: hidden' : 'visibility: visible'}
  `,
  size: (props: { fullScreen?: boolean, width?: string }) => css`
    width: ${props.width || 'auto'};
    ${props.fullScreen &&
      `
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
    `}
  `,
}
