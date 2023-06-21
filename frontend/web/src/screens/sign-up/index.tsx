import { User, } from '@challenge/models'
import React from 'react'
import { connect, } from 'react-redux'

import Strings, { Routes, } from '@/constants'
import { SignUpForm, } from '@/forms'
import history from '@/helpers/history'
import { ActionCreators, StoreState, } from '@/redux'
import type { SignUpPayload, } from '@/redux/api-payloads'
import { signUpPayload, } from '@/redux/api-payloads'
import selectors from '@/selectors'

import styles from './styles.scss'

type StateProps = {
  user: User | null | undefined
  error: string
}

type DispatchProps = {
  makeRequest: (data: SignUpPayload) => void
}

type HomepageProps = StateProps & DispatchProps

type HomeState = any

export class SignUpScreen extends React.Component<HomepageProps, HomeState> {
  signup = (data: SignUpPayload) => {
    const { makeRequest, } = this.props
    makeRequest(data)
  }

  onBack = () => {
    history.push(Routes.Login)
  }

  render(): React.ReactElement {

    return (
      <div className={styles.container}>
        <div className={styles.leftContainer} />

        <div className={styles.rightContainer}>
          <div className={styles.formContainer}>
            <h4 className={styles.title}>{Strings.signUp.createAccount}</h4>
            <p className={styles.description}>{Strings.signUp.signUpToGet}</p>
            <SignUpForm onBack={this.onBack}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState): StateProps => ({
  user: selectors.user.getUser(state),
  error: state.user.error,
})

const mapDispatchToProps = {
  makeRequest: (data: SignUpPayload) =>
    ActionCreators.api.makeRequest.dispatch(signUpPayload(data)),
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
