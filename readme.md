# Dashboard

## Installation

#### For first time, run

```
npm run firstrun
```

which will install React inside folder "client".

#### For Re-installations only

```
npm run installAll
```

### Run

```
npm start
```

## APIs

| API           | Method | Parameters | Result |
| ------------- | ------ | ---------- | ------ |
| /api/register | POST   | {username: string, email: string, password: string, gender: enum(Male, Female), dob: date, mobile: string, address: string, city: string, state: string, country: string, maritalstatus: string } | String |
| /api/login | POST | {username: string, password: string} | {success: boolean, token: string} |
| /api/userinfo | GET | | object array |
