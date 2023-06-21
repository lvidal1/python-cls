import React from 'react'

import styles from './styles.scss'

const NotificationCounter = () => {

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


export default NotificationCounter
