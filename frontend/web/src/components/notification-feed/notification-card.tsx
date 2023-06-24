import React from 'react'

type Notification = {
  created_at: string;
  seen: boolean;
  type: string;
  id: string;
};

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <div>
      <p>{notification.created_at}</p>
      <p>{notification.seen ? 'Seen' : 'Unseen'}</p>
      <p>{notification.type}</p>
      <p>{notification.id}</p>
    </div>
  );
};

export default NotificationCard