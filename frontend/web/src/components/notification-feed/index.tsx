import React from 'react'
// import NotificationCard from "./notification-card"

const NotificationFeed = () => {

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
    <div>
      {notifications?.length}
      {/* {notifications.map((notification: any) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))} */}
    </div>
  )
}

export default NotificationFeed