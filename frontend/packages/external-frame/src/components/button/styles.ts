import { css } from '@emotion/core'
import { ButtonProps } from '.'
import styles from './styles.scss'

const { blue, green, faintBlue, peach, boxShadowGrey, white } = styles

const { inputHeight, standardFont, spacer, } = styles

const Styles = {
  button: (props: ButtonProps) => css`
      font-size: ${standardFont};
      padding: 0 ${spacer};
      height: ${inputHeight};
      ${!props.primary
      ? `
        background-color: ${white};
        border: none;
        color: ${blue};
  
        :hover {
          box-shadow: 0 8px 20px 0 ${boxShadowGrey};
          background-image: none;
          background-color: ${faintBlue};
          color: ${blue};
        }
        :active {
          box-shadow: 0 8px 20px 0 ${boxShadowGrey};
          background-image: none;
          background-color: ${faintBlue};
          color: ${white};
        }
      `: ''
    }
      ${props.imgUrls
      ? `
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              :active {
                .icon {
                  background-image: ${`url(${props.imgUrls.selected || props.imgUrls.default})`};
                  background-repeat: no-repeat;
                }
              }
            `
      : ''
    }
      .icon {
        background-image: ${props.imgUrls ? `url(${props.imgUrls.default})` : 'none'};
        height: 17px;
        width: 17px;
        display: inline-block;
        background-repeat: no-repeat;
        margin: 5px 5px 0 0px;
      }
    `
}

export default Styles
