import React, { useEffect } from 'react'
import { ApiPayload, reduxSet as apiAC, } from '@clearsummit/radio-dispatch'
import { connect, } from 'react-redux'
import { Dispatch, } from 'redux'

import services, { endpoints, } from '@/helpers/services'
import { getNotificationPayload, } from '@/redux/api-payloads'

import styles from './styles.scss'
import { makeRequest } from '@clearsummit/radio-dispatch/lib/api-redux'


interface DispatchToProps {
  /** Dispatch request payload */
  makeRequest: (payload: ApiPayload<typeof services>) => void,
}

type Props = DispatchToProps

const NotificationCounter = (props: Props) => {
  const { makeRequest, } = props

  useEffect(() => {
    const payload = getNotificationPayload({ count: 3 })
    makeRequest(payload)
  })

  const notifications: any = [{
    "id": "3",
    "created_at": "2022-01-14T21:38:19.948287Z",
    "seen": false,
    "type": "alert"
  },
  {
    "id": "2",
    "created_at": "2022-01-14T21:38:02.821390Z",
    "seen": false,
    "type": "alert"
  },
  {
    "id": "1",
    "created_at": "2022-01-14T21:37:56.138788Z",
    "seen": false,
    "type": "welcome"
  }]

  return (
    <div className={styles.button}><span className={styles.badge}>{notifications?.length ?? null}</span></div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeRequest: (payload: ApiPayload<typeof services, unknown>) => dispatch(apiAC.makeRequest.dispatch(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCounter)

