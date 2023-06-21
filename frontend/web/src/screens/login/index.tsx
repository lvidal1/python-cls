import React from 'react'

import { Anchor, } from '@/components'
import Strings, { Routes, } from '@/constants'
import { LoginForm, } from '@/forms'

import styles from './styles.scss'

type StateProps = {
}

type DispatchProps = {
}

type LoginProps = StateProps & DispatchProps

type LoginState = any

export class LoginScreen extends React.Component<LoginProps, LoginState> {

  render(): React.ReactElement {
    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.formContainer}>
            <h4 className={styles.title}>{Strings.login.signIn}</h4>
            
            <LoginForm/>
            
            <div className={styles.loginDivider} />

            <div className={styles.signUpContainer}>
              <p>{Strings.login.dontHaveAnAccount}</p>
              <Anchor
                label={Strings.signUp.signUp}
                // className={styles.signUpButton}
                path={Routes.SignUp}
                ariaLabel={Strings.signUp.signUp}
              />
            </div>
          </div>
        </div>

        <div className={styles.rightContainer} />
      </div>
    )
  }
}


export default LoginScreen
