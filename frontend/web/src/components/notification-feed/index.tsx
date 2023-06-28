import React from 'react'
import { Notification, } from '@challenge/models'
import { connect, } from 'react-redux'
import { StoreState, } from '@/redux'
import selectors from '@/selectors'

import NotificationCard from './notification-card'
import styles from './styles.scss'


interface NotificationProps {
  notifications: Notification[]
}

type Props = NotificationProps

const NotificationFeed = (props: Props) => {
  const { notifications } = props

  return (
    <div className={styles.cards}>
      {notifications && notifications.map((notification: any) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  notifications: selectors.user.getNotifications(state),
})

export default connect(mapStateToProps)(NotificationFeed)