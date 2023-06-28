import React from 'react'

import styles from './styles.scss'
import NotificationFeed from '../../components/notification-feed'

export const NotificationspageScreen = () => (
  <div className={styles.container}>
    <h4>Notifications</h4>
    <NotificationFeed />
  </div>
)

export default NotificationspageScreen
