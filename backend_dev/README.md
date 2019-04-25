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
#### Get all hotels
```
GET '/hotels/'
GET '/hotels/?page=1'
```
Sample response
```
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Hotel Harris",
            "district": "Coblog",
            "address": "Pokoknya di Coblong",
            "star": 5,
            "owner": "Ijuan",
            "cert_start": "12:12:00",
            "cert_end": "23:12:00"
        },
        {
            "id": 2,
            "name": "Hotel Fairmont",
            "district": "Coblong",
            "address": "Pokoknya di Coblong",
            "star": 2,
            "owner": "Ijuan",
            "cert_start": "12:12:00",
            "cert_end": "23:12:00"
        }
    ]
}
```

#### Get one hotel
```
GET '/hotels/<id>/'
```
Sample response
```
{
    "id": 1,
    "name": "Hotel Harris",
    "district": "Coblog",
    "address": "Pokoknya di Coblong",
    "star": 5,
    "owner": "Ijuan",
    "cert_start": "12:12:00",
    "cert_end": "23:12:00"
}
```

#### Add hotel
```
POST '/hotels/'
{
    "name": "Hotel Tralala",
    "district": "Cimbel",
    "address": "depan Unpar",
    "star": 1,
    "owner": "Felipe",
    "cert_start": "12:12:00",
    "cert_end": "23:12:00"
}
```
Sample response
```
{
    "id": 3,
    "name": "Hotel Tralala",
    "district": "Cimbel",
    "address": "depan Unpar",
    "star": 1,
    "owner": "Felipe",
    "cert_start": "12:12:00",
    "cert_end": "23:12:00"
}
```

#### Search hotel
Available query param are name, district, star, page. Every query param is optional, for name field the search is case insensitive.
```
POST '/search/?name=hotel&district=Coblog&star=5&page=1'
```
Sample response
```
{
	"max_pages": 1,
    "hotels": [
        {
            "name": "Hotel Harris",
            "address": "Pokoknya di Coblong",
            "star": 5,
            "owner": "Ijuan",
            "cert_start": "12:12:00",
            "cert_end": "23:12:00"
        }
    ]
}
```