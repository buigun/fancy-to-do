# fancy-to-do

Ini adalah API untuk membuat todo list menggunakan Express,Sequelize, dan Postgres

## Todo Route:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/todos` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date Only` | **Success**<br>`201` New todo created<br>**Fail**<br>`400` Validation error messages<br>`500` Internal Server Error | Create a todo
`/todos` | GET | **Headers**<br>token: `String`<br>**Body**<br> not needed | **Success**<br>`200` All todos displayed<br>**Fail**<br>`500` Internal Server Error | Get all todos
`/todos/:id` | GET | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Todo displayed<br>**Fail**<br>`500` Internal Server Error | Get one todo
`/todos/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date Only` | **Success**<br>`200` Edited todo displayed<br>**Fail**<br>`404` Todo not found<br>`400` Validation error messages<br>`500` Internal Server Error | Update one todo
`/todos/:id` | DELETE | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Deleted todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Delete a todo

