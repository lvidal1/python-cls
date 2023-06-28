import React from 'react'
import { Notification, NOTIFICATION_TYPE_WELCOME, NOTIFICATION_TYPE_ALERT, } from '@challenge/models';

import styles from './styles.scss'
import { formatDate } from '@/helpers';

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {

  const isWelcome = (type: string) => type === NOTIFICATION_TYPE_WELCOME;
  const isAlert = (type: string) => type === NOTIFICATION_TYPE_ALERT;

  return (
    <div className={styles.card}>
      <div className={styles.type}>
        {isWelcome(notification.type) && <span title="Welcome" className={`${styles.badge} ${styles["badge--welcome"]}`}><span>W</span></span>}
        {isAlert(notification.type) && <span title="Alert" className={`${styles.badge} ${styles["badge--alert"]}`}><span>A</span></span>}
      </div>
      <div className={styles.content}>
        <p className={styles.title}># Notification: {notification.id}</p>
        <p>{formatDate(notification.created_at)}</p>
      </div>
    </div>
  );
};

export default NotificationCard