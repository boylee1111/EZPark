# API specifications

**Response format**: application/json

<br />

## Sign up

**URL**: /user/sign-up

**Method**: POST


**Parameters**:
- username
- password
- email (optional)
- phone (optional)

**Responses**:
```
{
    "succeess": "true"
}
```
<br />

## Login

**URL**: /user/login

**Method**: POST

**Parameters**:
- username
- password

**Responses**:
```
{
    "succeess": "true"
}
```

<br />

## Get Available Spots (fake one)

**URL**: /spots/list

**Method**: GET

**Parameters**:
- coordinate

**Reponses**:
```
{
    "spots": [{
        "location": "Carnegie Mellon University",
        "available_pots": 32,
        "price_per_hour": 2.5
    },
    {
        "location": "Carnegie Library of Pittsburgh",
        "available_pots": 64,
        "price_per_hour", 1.5
    }]
}
```

<br />

## List Reservations

**URL**: /reservations/list

**Method**: GET

**Parameters**:
- username

**Reponses**:
```
{
    "reservations": [{
        "reservation_id": "1",
        "location": "Carnegie Mellon University",
        "reservation_date": "2018/02/28 07/43", // "yyyy/MM/dd HH:mm"
        "reservation_space_hold": 30, // 30 minutes
    },
    {
        "reservation_id": "2",
        "location": "Carnegie Mellon University",
        "reservation_date": "2018/02/29 19:43", // "yyyy/MM/dd HH:mm"
        "reservation_space_hold": 60, // 60 minutes
    }]
}
```

<br />

## Get Reservations

**URL**: /reservations/get

**Method**: GET

**Parameters**:
- id

**Reponses**:
```
{
    "reservation": {
        "reservation_id": "1",
        "location": "Carnegie Mellon University",
        "reservation_date": "2018/02/28 07/43", // "yyyy/MM/dd HH:mm"
        "reservation_space_hold": 30, // 30 minutes
    }
}
```

<br />

## Create Reservations

**URL**: /reservations/create

**Method**: POST

**Parameters**:
- username
- location
- reservation_date
- reservations_space_hold

**Responses**:
```
{
    "succeess": "true",
    "reservations_id": 3
}
```

<br />

## Cancel Reservations

**URL**: /reservations/cancel

**Method**: GET

**Parameters**:
- id

**Reponses**:
```
{
    "succeess": "true"
}
```