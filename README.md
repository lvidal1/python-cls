# codetest

- Please do not take more than 3 hours on this challenge.  
- Feel free to ask questions about our abstractions or if you need clarification.
- If you are unable to complete a porition it is OK.  We're looking to see how you work with and around challenges.
- When you're complete add a markdown file (PR.md) and include info like you would on a pull request.
- If there are items left outstanding / things you did not get to please note them in the PR.md.

# Quick Start

Docker:

```
docker-compose up -d
```

Frontend:
```
cd frontend
yarn
yarn start
open http://localhost:8080/
```

The JS code you'll be editing will be in `frontend/web/src`

Backend:
```
# access docker container
docker exec -ti <python-container-id> bash

pipenv install
pipenv run backend/manage.py migrate

# Create yourself a user
pipenv run backend/manage.py createsuperuser

# exit docker container
exit

# Open django backend admin url
open http://localhost:8000/admin/

# Open django backend api url
open http://127.0.0.1:8000/api/v1/


```

The Python code you'll be editing will be in `backend`

# Coding Challenge
- Add a notification feed screen to the frontend
- Give the notification model a `notification_type` that has two types - WELCOME and ALERT
- Generate a `WELCOME` notification whenever a user signs up
- Generate a `ALERT` notification whenever a user logs in
- Retrieve this notification feed from the backend and populate the page
- Give your notification feed a unique but basic style

## Things we will be assessing
- Eslint passing
- Using the model layer
- Structuring your code to match the patterns of our code
- Using redux and sagas
- Type definitions
- Pull request description and clarity

## Stretch Goals
- Adding a storybook for the notification feed


# Setup

### Frontend
Javascript dependencies are managed at the root so if the heroku nodejs buildpack is required it can be found. They are managed using yarn workspaces.
See [Frontend README](frontend/README.md)

### Backend
Python dependencies are managed at the root so if the heroku nodejs buildpack is required it can be found.
See [Backend README](backend/README.md)
