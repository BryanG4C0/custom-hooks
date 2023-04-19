import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {    
    return JSON.parse(localStorage.getItem('todos')) || []; ;    
}

export const useTodos = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    //crear una 
    const handlNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        // usamos el dispatch para enviar la action al reducer
        dispatchTodo(action);
    };

    const handlDeleteTodo = (id) => {         
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id
        });        
     }

     const onToggleTodo = (id) => { 
        
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id
        });   
      }

    return {
        todos,
        todosCount: todos.length,
        pendinTodosCount: todos.filter(todo=> !todo.done).length,
        handlNewTodo,
        handlDeleteTodo,
        onToggleTodo
    }
}
