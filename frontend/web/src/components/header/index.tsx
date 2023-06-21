import { User, } from '@challenge/models'
import React from 'react'
import { connect, } from 'react-redux'
import { withRouter, } from 'react-router'
import { Dispatch, } from 'redux'

import { SecondaryButton, NotificationCounter, } from '@/components'
import { ActionCreators, StoreState, } from '@/redux'
import selectors from '@/selectors'

import Strings, { Images, } from '../../constants'
import styles from './styles.scss'

interface Props {
  user: User
  logOut: () => void
}

export const Header = ({ user, logOut, }: Props) => (
  <header className={styles.header}>
    <div className={styles.title}>
      <img className={styles.logo} src={Images.logo} alt={Strings.general.clearsummit} />
      <h2>{Strings.general.clearsummit}</h2>
    </div>
    <div className={styles.buttons}>
      <NotificationCounter />
      {user?.id ?
        <>
          <SecondaryButton
            ariaLabel={Strings.login.logout}
            title={Strings.login.logout}
            onClick={logOut}
          />
        </>
        : null
      }
    </div>
  </header>
)

const mapStateToProps = (state: StoreState) => ({
  user: selectors.user.getUser(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut: () => dispatch(ActionCreators.user.logOut.dispatch()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
