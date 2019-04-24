# Installation

Using python 3.7 (very important!)

## First time run
```
pipenv shell
pipenv install
python manage.py migrate
```

## Run
```
pipenv shell
python manage.py runserver
```


# Sample APIs

### Base URL : localhost:8000

## User Authentication

## Register
```
POST '/register/'
{
    "name": "Hugo Hugi",
    "email": "hugo@ghugi.com",
    "password": "takitaki"
    "is_lsu": 1
}
```

## Login
```
POST '/login/'
{
    "email": "hugo@hugi.com",
    "password": "takitaki",
}
```

For every successful register/login, you will get something like this
```
{
    "token": "f566e5cc736589103a1938de4fa059ad190f89b7"
}
```

Use the token in header to use protected endpoints
```
Authentication: Token <TOKEN>
```

Example:
```
Authentication: Token f566e5cc736589103a1938de4fa059ad190f89b7
```


## Hotel
#### readmenya ntaran