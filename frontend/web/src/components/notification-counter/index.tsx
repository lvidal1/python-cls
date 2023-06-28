import React from 'react'
import { Notification, } from '@challenge/models'
import { connect, } from 'react-redux'
import { StoreState, } from '@/redux'
import selectors from '@/selectors'

import styles from './styles.scss'

interface NotificationProps {
  notifications: Notification[]
}

type Props = NotificationProps

const NotificationCounter = (props: Props) => {
  const { notifications } = props

  return (
    <div className={styles.button}><span className={styles.badge}>{notifications.length ?? null}</span></div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  notifications: selectors.user.getNotifications(state),
})

export default connect(mapStateToProps)(NotificationCounter)

