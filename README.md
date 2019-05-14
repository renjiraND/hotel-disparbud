# Installation

## Prerequisite

Python 3.7 (very important!)

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

## Run test
```
python manage.py test
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
Authorization: Token <TOKEN>
```

Example:
```
Authorization: Token f566e5cc736589103a1938de4fa059ad190f89b7
```


## Hotel
#### Get all hotels
```
GET '/hotels/'
```
Sample response
```
{
    "count": 2,
    "next": "http://localhost:8000/hotels/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Hotel Harris",
            "district": "Ciumbuleuit",
            "address": "Jl. Ciumbuleuit No. 32",
            "star": 3,
            "owner": "Halim",
            "cert_start": "2009-04-27",
            "cert_end": "2019-04-27"
        },
        {
            "id": 10,
            "name": "Padma6",
            "district": "Kota Bandung",
            "address": "-",
            "star": 4,
            "owner": "Podomoro",
            "cert_start": null,
            "cert_end": null
        }
    ]
}
```

#### Get one hotel
```
GET '/hotels/<id>/'
GET '/hotels/1/'
```
Sample response
```
{
    "id": 1,
    "name": "Hotel Harris",
    "district": "Ciumbuleuit",
    "address": "Jl. Ciumbuleuit No. 32",
    "star": 3,
    "owner": "Halim",
    "cert_start": "2009-04-27",
    "cert_end": "2019-04-27"
}
```

#### Add hotel
```
POST '/hotels/'
{
	"name": "Wisma 46",
	"district": "Kota Bandung",
	"address": "Rancaengklek",
	"star": 3,
	"owner": "Podomoro",
	"cert_start": "2019-05-01T00:00:00Z",
    "cert_end": "2019-05-24T00:00:00Z"
}
```
Sample response
```
{
    "id": 27,
    "name": "Wisma 46",
    "district": "Kota Bandung",
    "address": "Rancaengklek",
    "star": 3,
    "owner": "Podomoro",
    "cert_start": "2009-04-27",
    "cert_end": "2019-04-27"
}
```

#### Edit hotel
```
PUT '/hotel/<id>'
PUT '/hotel/27'
{
    "name": "Wisma Hotel Bahagia",
    "district": "Kota Medan",
}
```
Sample response
```
{
    "id": 27,
    "name": "Wisma Hotel Bahagia",
    "district": "Kota Medan",
    "address": "Rancaengklek",
    "star": 3,
    "owner": "Podomoro",
    "cert_start": "2019-05-01T00:00:00Z",
    "cert_end": "2019-05-10T00:00:00Z"
}
```

#### Search hotel
Available query param are name, district, star, page. Every query param is optional, for name field the search is case insensitive.
```
POST '/search/?star=5&page=1'
```
Sample response
```
{
    "max_pages": 1,
    "hotels": [
        {
            "id": 3,
            "name": "Hilton",
            "district": "Dago",
            "address": "Dago Asri X",
            "star": 5,
            "owner": "Ikhwan",
            "cert_start": "2019-05-01T00:00:00Z",
            "cert_end": "2019-05-01T00:00:00Z"
        }
    ]
}
```