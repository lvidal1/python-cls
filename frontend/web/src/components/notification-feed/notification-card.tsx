import React from 'react'
import { Notification } from '@challenge/models';

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <div>
      <p>{notification.seen ? 'Seen' : 'Unseen'}</p>
      <p>{notification.type}</p>
      <p>{notification.created_at}</p>
    </div>
  );
};

export default NotificationCard