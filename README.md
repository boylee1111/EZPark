# EZPark

EZPark is a solution for conveniently reserving parking lots to resolve parking difficulty in daily life.

## Frontend

Frontend solution is based on iOS platform, which proivide user signup, login, reserve, cancel functionalities for parking.

### Installation

1. Install npm
2. `npm install -g ionic` [IONIC](https://ionicframework.com/getting-started/)
3. `npm install`
4. `ionic serve`

### Libraries

- [Google Map: Javascript](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Facebook Authentication](https://developers.facebook.com/docs/facebook-login)
- [Google+ Platform](https://developers.google.com/+/)

## Backend

Backend solution is implemented with Java that processes parking lots information from garage system and provides RESTful API services to frontend mobile.

### Database Schema

[SQL](https://github.com/mikeYng/IOT_finalProject/blob/master/ezpark-backend/ezpark.sql)

### Database Environment Setting

```
export $sqlusername=<sql username>
export $sqlpassword=<sql password>
```

### Installation

- Install [Maven](https://maven.apache.org)
- `mvn clean package`
- `mvn exec:java`

## Built With

- [Maven](https://maven.apache.org) - Dependency Management (backend)
- [NPM](https://www.npmjs.com) - Dependency Management (frontend)
- [IONIC](https://ionicframework.com) - Web-based Cross-platform Mobile Framework
- [MySQL](https://www.mysql.com) - Database Storage Solution

## Authors
- Boyi Li
- Linxuan Yang
- Ting Pan

See also the list of [contributors](https://github.com/mikeYng/IOT_finalProject/graphs/contributors) who participated in this project.
