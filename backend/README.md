# Challenege Backend
This project uses Python3

## Setup
 - Install dependencies `pipenv install`
 - Run app `python manage.py runserver`

## Database

The database for this project is postgres. If you are running in a container the database is setup for you. If you are running the project locally using another database connection you may need to set the username and password in environment variables.

```
$ export DB_1_ENV_POSTGRES_USER=postgres
$ export DB_1_ENV_POSTGRES_PASSWORD=postgres
```

### Mocks

Mocks are located in the `api_mocks` directory. To write new mocks run the tests with the `WRITE_MOCKS` env set.

```
WRITE_MOCKS=true python ./manage.py test

```

## Static Typing

This project uses Python3 static typing. Third party types can be placed in the `stubs` directory.

Type checks can be run with the following command.

`$ export MYPYPATH=./stubs; mypy backend --ignore-missing-imports --config-file backend/mypy.ini`

## Tests

Run tests with `python manage.py test`. You can optionally pass the name of the app you'd like to test or dot notated path to a specific test to run.


## Code Quality

Before pushing, lint and test the project.

```
$ flake8 backend --ignore=migrations
# ptyhon manage.py test
```

## Deployment
  - Circle CI deploy to Heroku

## Management

This project includes `django_extensions`, which provides access to helpful commands, such as `shell_plus`,
which loads relevant models, utilities, and libraries.


## Documentation
The project is autodocumented by Swagger
- The JSON view is available at /swagger.json
- The YAML view is available at at /swagger.yaml
- The swagger-ui of the API specification is available at /swagger/
- The ReDoc view of the API specification is available at /redoc/
