# fancy-to-do

Fancy Todo is an application to manage your todo list. 

This app is created using :
* REST API
* ExpressJS
* Postgres
* Sequelize

This app has :
* RESTful endpoint for todo's CRUD operation
* JSON formatted response


## REST Endpoints Table:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/todos` | GET | **Headers**<br>token: `String`<br>**Body**<br> not needed | **Success**<br>`200` All todos displayed<br>**Fail**<br>`500` Internal Server Error | Get all todos
`/todos` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`201` New todo created<br>**Fail**<br>`400` Validation error messages<br>`500` Internal Server Error | Create a todo
`/todos/:id` | GET | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Get one todo
`/todos/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`200` Edited todo displayed<br>**Fail**<br>`404` Todo not found<br>`400` Validation error messages<br>`500` Internal Server Error | Update one todo
`/todos/:id` | DELETE | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Deleted todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Delete a todo

### GET /todos
> Get all Todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "Belajar Rest API",
            "description": "Materi baru REST API",
            "status": false,
            "due_date": "2020-03-30T00:00:00.000Z",
            "createdAt": "2020-03-30T11:04:24.354Z",
            "updatedAt": "2020-03-30T11:04:24.354Z"
        },
        {
            "id": 2,
            "title": "Makan siang",
            "description": "Makan siang di warteg",
            "status": false,
            "due_date": "2020-03-30T00:00:00.000Z",
            "createdAt": "2020-03-30T11:04:55.855Z",
            "updatedAt": "2020-03-30T11:04:55.855Z"
        }
    ]
}
```

### POST /todos
> Create a Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Todo Title",
  "description": "Todo Description",
  "status": "true/false",
  "due_date": "2020-03-30",
}
```

_Response (201 - CREATED)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": false,
        "due_date": "2020-03-30T00:00:00.000Z",
        "updatedAt": "2020-03-30T11:04:55.855Z",
        "createdAt": "2020-03-30T11:04:55.855Z"
    }
}
```

_Response (400 - BAD REQUEST)_
```
{
    "message": "Title must be filled, Date must be filled"
}
```

### GET /todos/:id
> Get one Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": false,
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T11:04:55.855Z",
        "updatedAt": "2020-03-30T11:04:55.855Z"
    }
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```

### PUT /todos/:id
> Update one Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "Todo Title",
  "description": "Todo Description",
  "status": "true/false",
  "due_date": "2020-03-30",
}
```

_Response (201 - CREATED)_
```
{
    "hasil": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": true,
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T11:04:55.855Z",
        "updatedAt": "2020-03-30T11:23:15.249Z"
    }
}
```

_Response (400 - BAD REQUEST)_
```
{
    "message": "Title must be filled, Date must be filled"
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```

### DELETE /todos/:id
> Get one Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "todo": {
        "id": 2,
        "title": "Makan siang",
        "description": "Makan siang di warteg",
        "status": false,
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T11:04:55.855Z",
        "updatedAt": "2020-03-30T11:04:55.855Z"
    }
}
```

_Response (404 - NOT FOUND)_
```
{
    "message": "To Do not found"
}
```




