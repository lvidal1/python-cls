import React, { useEffect } from 'react'
import { ApiPayload, reduxSet as apiAC, } from '@clearsummit/radio-dispatch'
import { Notification, } from '@challenge/models'

import { connect, } from 'react-redux'
import { Dispatch, } from 'redux'
import services from '@/helpers/services'
import { StoreState, } from '@/redux'
import { getNotificationPayload, } from '@/redux/api-payloads'
import selectors from '@/selectors'

import styles from './styles.scss'

interface NotificationProps {
  notifications: Notification[]
}

interface DispatchToProps {
  makeRequest: (payload: ApiPayload<typeof services>) => void,
}

type Props = NotificationProps & DispatchToProps

const NotificationCounter = (props: Props) => {
  const { makeRequest, notifications } = props

  useEffect(() => {
    const payload = getNotificationPayload({ count: 3 })
    makeRequest(payload)
  }, [])

  return (
    <div className={styles.button}><span className={styles.badge}>{notifications.length ?? null}</span></div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  notifications: selectors.user.getNotifications(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeRequest: (payload: ApiPayload<typeof services, unknown>) => dispatch(apiAC.makeRequest.dispatch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCounter)

