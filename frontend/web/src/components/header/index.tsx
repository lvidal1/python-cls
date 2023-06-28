import { User, } from '@challenge/models'
import React, { useEffect } from 'react'
import { connect, } from 'react-redux'
import { withRouter, } from 'react-router'
import { Dispatch, } from 'redux'
import { Link } from 'react-router-dom'

import { SecondaryButton, NotificationCounter, } from '@/components'
import { ActionCreators, StoreState, } from '@/redux'
import selectors from '@/selectors'

import Strings, { Images, Routes, } from '@/constants'
import styles from './styles.scss'
import { ApiPayload, reduxSet as apiAC } from '@clearsummit/radio-dispatch'
import services from '../../helpers/services/api'
import { getNotificationPayload, } from '@/redux/api-payloads'


interface Props {
  user: User
  logOut: () => void
  makeRequest: (payload: ApiPayload<typeof services>) => void,
}

export const Header = ({ user, logOut, makeRequest, }: Props) => {

  useEffect(() => {
    if (user?.id) {
      const payload = getNotificationPayload({ count: 3 })
      makeRequest(payload)
    }

  }, [user?.id])


  return (
    <header className={styles.header} >
      <Link to={Routes.Home}>
        <div className={styles.title}>
          <img className={styles.logo} src={Images.logo} alt={Strings.general.clearsummit} />
          <h2>{Strings.general.clearsummit}</h2>
        </div>
      </Link>
      <div className={styles.buttons}>
        {user?.id ?
          <>
            <Link to={Routes.Notifications}>
              <NotificationCounter />
            </Link>
            <SecondaryButton
              ariaLabel={Strings.login.logout}
              title={Strings.login.logout}
              onClick={logOut}
            />
          </>
          : null
        }
      </div>
    </header >
  )
}

const mapStateToProps = (state: StoreState) => ({
  user: selectors.user.getUser(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut: () => dispatch(ActionCreators.user.logOut.dispatch()),
  makeRequest: (payload: ApiPayload<typeof services, unknown>) => dispatch(apiAC.makeRequest.dispatch(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
