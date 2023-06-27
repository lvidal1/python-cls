import React, { useCallback } from 'react'
import { Notification, NOTIFICATION_TYPE_WELCOME, NOTIFICATION_TYPE_ALERT, } from '@challenge/models';

import styles from './styles.scss'

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {

  const isWelcome = (type: string) => type === NOTIFICATION_TYPE_WELCOME;
  const isAlert = (type: string) => type === NOTIFICATION_TYPE_ALERT;

  const getDate = useCallback((dateString) => {
    const date = new Date(dateString);

    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);

    return formattedDate.replace(',', ' -')
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.type}>
        {isWelcome(notification.type) && <span title="Welcome" className={`${styles.badge} ${styles["badge--welcome"]}`}><span>W</span></span>}
        {isAlert(notification.type) && <span title="Alert" className={`${styles.badge} ${styles["badge--alert"]}`}><span>A</span></span>}
      </div>
      <div className={styles.content}>
        <p className={styles.title}># Notification: {notification.id}</p>
        <p>{getDate(notification.created_at)}</p>
      </div>
    </div>
  );
};

export default NotificationCard