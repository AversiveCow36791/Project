import React, { useState,useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
      const response = await axios.get(API);
      setTodos(response.data);
    };

    const removeTodo = async (todo: { id: any; title?: string; }) => {
      const response = await axios
        .get(`${API}/${todo.id}/delete`);
      setTodos(response.data);
    };

    const fetchTodoById = async (id: any) => {
      const response = await axios.get(`${API}/${id}`);
      setTodo(response.data);
    };
  

    const createTodo = async () => {
      const response = await axios.get(`${API}/create`);
      setTodos(response.data);
    };
  
    const updateTitle = async () => {
      const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
      console.log(response.data);
      setTodos([...todos, response.data]);
    };
    
    const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
    };


    const deleteTodo = async (todo: { id: any; }) => {
      try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }

    };
  
    const updateTodo = async () => {
      try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      } catch (error: any) {
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    };
  


    useEffect(() => {
      fetchTodos();
    }, []);
  
    return (
        <div>
            <h3>Working With Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>




            <h4>Retrieving an Item from an Array by ID</h4>
      <input value={todo.id}
        onChange={(e) => setTodo({ ...todo,
          id: parseInt(e.target.value) })}/>
      <a href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        <h3>Creating new Items in an Array</h3>
        <a href={`${API}/create`}>
            Create Todo
        </a>
        <h3>Deleting from an Array</h3>
        <a href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a><br/>
        
      <h3>Updating an Item in an Array</h3>



      <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/> <br/>
      <a href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a> <br/>
        <input type="text" value={todo.description}
        onChange={(e) => setTodo({
          ...todo, description: e.target.value })}/> <br/>
        <a href={`${API}/${todo.id}/description/${todo.description}`} >
        Update Description to {todo.description}
        </a> <br/>
        <input type="checkbox" checked={todo.completed}
        onChange={(e) => setTodo({
          ...todo, completed: e.target.checked })}/>
        <a href={`${API}/${todo.id}/completed/${todo.completed}`} >
        Update Completed to {todo.completed.toString()}
        </a> <br/>

        <textarea value={todo.description}
        onChange={(e) => setTodo({...todo,description: e.target.value})} /><br/>
        <input value={todo.due} type="date" onChange={(e) => setTodo({...todo,due: e.target.value})} /><br/>
        <label>
          Completed
          <input checked={todo.completed} type="checkbox" onChange={(e) => setTodo({...todo,completed: e.target.checked})} />
        </label> <br/>
        
        <button className="btn btn-warning" onClick={postTodo}> Post Todo </button>
        <br/>

        <button onClick={updateTodo}>
        Update Todo
        </button>
        <br/>

          <button className="btn btn-primary" onClick={createTodo} >
          Create Todo
          </button> <br/>
          <button className="btn btn-success" onClick={updateTitle} >
            Update Title
            </button>


            {errorMessage && (
            <div className="alert alert-danger mb-2 mt-2">
                  {errorMessage}
                </div>
              )}


                <ul style={{listStyleType: "none"}}>

                {todos.map((todo: { id: number, title: string, completed: boolean, description: string, due: string }) => (
                    <li className="border" key={todo.id}>
                      <input checked={todo.completed}
                        type="checkbox" readOnly />
                         {todo.title}
                      <p>{todo.description}</p>
                      <p>{todo.due}</p>
                      <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => removeTodo(todo)} >
                        Remove
                      </button>

                      <button onClick={() => deleteTodo(todo)}
                        className="btn btn-danger float-end ms-2">
                          Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default WorkingWithArrays;