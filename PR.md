# Description
This project introduces a new feature - a notification system, designed to enhance the user experience by providing important notifications and improving communication within the app. The changes include the addition of several components and models to facilitate the notification functionality.

## Preview

https://github.com/lvidal1/python-cls/assets/6495076/6a8764d3-15ec-4492-89e9-ab34d8335ffb

## Features
The notification feature includes the following features:

- `Notification Model`: A new model has been implemented in the frontend to handle different types of notifications. The model includes the following attributes:

  - Unique ID: Each notification is assigned a unique identifier.
  - Creation Date: The date and time when the notification was generated.
  - Seen Status: Tracks whether the notification has been seen by the user.
  - Notification Type: Identifies the type of notification, such as welcome messages or alerts.

- `NotificationCounter Component`: This component displays a small badge indicating the number of unread notifications. It provides users with a quick overview of their pending notifications.

- `NotificationFeed Component`: The NotificationFeed component presents users with a list of all notifications. It allows users to view their notifications in a clear and organized manner.

- `Notifications Screen`: A new screen has been added to the app to house the notification system. This screen provides users with a dedicated space to manage their notifications.

## Side changes
- Update dependencies version to fix app initialization

## TODOs:
- Add Storybook to showcase Notification Page
- Switch notification endpoint URL