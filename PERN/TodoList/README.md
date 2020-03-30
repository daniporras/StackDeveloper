# A PERN TodoList example

This is an example of PERN (PostgreSQL, Express, React and Node) and Docker Container.

![Image description](https://github.com/daniporras/StackDeveloper/blob/master/PERN/TodoList/TodoList.png)

At first, we need to check our node and react version with the following commands:

node: `node -v` at least  `v11.10.0`
react: `npm view react version`  at least `16.13.1`

So if we do not have react, node, nodemon, express, we should have installed with this commands:

For node: `sudo apt-get install npm` and then react with `npm install -g react`
Also is required nodemon: `npm install -g nodemon`.



## Creating a REST service with node server

A simple REST service uses CRUD operatons for work with json from database. In this case we use PostgreSQL for the operations. Create, Read, Update, Delete are operations that we use with our client in React.

#### PostgreSQL

PostgreSQL can be installed with `sudo apt-get install postgresql` or using a Docker container with postgresql image.
`docker container run -p 5432:5432 -d --name my_postgres postgres:11.5` and then `docker exec -it my_postgres bash`.

#### The schema

```SQL
create database pertodo;
postgres=# \c perntodo
CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
description VARCHAR(255)
);
```
#### The node sever

Node is the very useful for this example also cors and pg is necesary for the perfect funcionally, so, to start we 
`npm i express pg cors`



The file db.js 
 ```javascript
 const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
   // password: "",
   password: "postgres",
    //host: "localhost",
    // host with Docker container
    host: "192.168.1.107", 
    port: 5432,
    database: "perntodo"
});

module.exports = pool;
 
 ```
The file index.js contains
```javascript
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json()); // req.body
```
And then the server is listen 
```javascript
app.listen(5000, () =>{
    console.log("Server has started on port 5000")
});
```
##### CRUD operations

GET ALL 
```javascript

app.get("/todos", async(req,res)=>{
    try{
    const allTodos = await pool.query("SELECT * FROM  todo");
    res.json(allTodos.rows);
    }catch(err)
    {
        console.error(err.message);
    }
});

```
GET ID
```javascript

app.get("/todos/:id", async(req, res)=>{

    try{

        //console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);

    }catch(err)
    {
        console.log(err.message);
    }
});
```

POST
```javascript
//Create a todo
app.post("/todos", async(req, res) =>{
try{
    const{ description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
    console.log(req.body);

}catch(err){
    console.error(err.message);
}
});
````
PUT 
```javascript

app.put("/todos/:id", async(req, res)=>{

    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was update!");
    }catch(err)
    {
        console.log(err.message);
    }
});

```

DELETE
```javascript
app.delete("/todos/:id", async(req,res) =>{
    try{

        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 ", [id]);
        res.json("Todo was deleted!");
    }catch(err)
    {
        console.log(err.message);
    }
});
```
Start with `nodemon server`


#### The client React

Inside Visual Studio Code bash `npx create-react-app client` delete files likea and this directory will be work

![Image description](https://github.com/daniporras/StackDeveloper/blob/master/PERN/TodoList/Directory.png)

#### Create three components with new file

For this example, is necessary create three components to recover info from node server. The info is in json format

##### ListTodos.js
```javascript
import React, {Fragment, useEffect, useState} from "react";

import EditTodo from "./EditTodo";

const ListTodos = () =>{

    //delete todo function

    const deleteTodo = async (id) =>{

        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });

           // console.log(deleteTodo);
           setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const [todos, setTodos] = useState([]);

    const getTodos = async () =>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(()=>{
        getTodos();
    }, []);

    
    return (
    <Fragment>{""}
    <table class="table mt-5 text-center">
        <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td> <EditTodo todo = {todo}/> </td>
                    <td> 
                        <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)} >Delete</button>

                    </td>
                </tr>
            ))}

        </tbody>


    </table>
    </Fragment>);
    
    

};

export default ListTodos;
```
##### EditTodo.js
```javascript
import React, {Fragment, useState} from "react";

const EditTodo = ({ todo}) =>{
    const [description, setDescription ] = useState(todo.description);

    //edit updateDescription
    const updateDescription = async e =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //console.log(response);
            window.location="/";
        } catch (err) {
            console.error(err.message);
        }
    }



    return <Fragment> 
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
  Edit
</button>
{/*
id 

<div class="modal" id={`id${todo.todo_id}`}>
*/}
<div class="modal" id={`id${todo.todo_id}`} onClick={()=>setDescription(todo.description)}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit Todo</h4>
        {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
        <button type="button" class="close" data-dismiss="modal" onClick={() =>
        setDescription(todo.description)}>&times;</button>
      </div>

      <div class="modal-body">
       <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick = { e => updateDescription(e)}>Edit</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() =>
        setDescription(todo.description)}>Close</button>
        {/*       <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
      </div>

    </div>
  </div>
</div>
    </Fragment>;
};

export default EditTodo;
```

##### InputTodo.js
````javascript
import React, {Fragment, useState} from "react";



const InputTodo= () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        try{
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
              method: "POST",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify(body)  
            });
            //console.log(response);
            window.location = "/";
        }catch(err){
            console.error(err.message);
        }
    };

    return (<Fragment>
    <h1 className="text-center mt-5">
    Pern Todo List
    </h1>
    <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input type="text" className="form-control" value={description} onChange={e =>setDescription(e.target.value)}/>
        <button className= "btn btn-success">Add</button>
    </form>

    </Fragment>);
    };

export default InputTodo;
````

##### index.js
In this file the components are called:
```javascript
function App() {
  return (
    <Fragment>
      <div class="container">
      <InputTodo />
      <ListTodos />
      </div>
      </Fragment>
  );
}
```

#### index.html
Css from bootrap
![Image description](https://github.com/daniporras/StackDeveloper/blob/master/PERN/TodoList/Bootstrap.png)

```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
   

At the end of `</body>`
```javascript
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
```

#### Finally

`npm start`






