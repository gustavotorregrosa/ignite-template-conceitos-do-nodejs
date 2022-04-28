import * as userRepository from './user.js'
import {v4} from 'uuid'

export const getAllTodosFromUser = async username => {
    const user = await userRepository.getUserPerName(username)
    return user.todos
}

export const createTodo = async (username, todoData) => {
    const {title, deadline} = todoData
    const todo = {
        id: v4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }

    return await saveTodo(username, todo)
}

export const updateTodo = async (username, todoId, todoData) => {
    const {title, deadline, done} = todoData 
    let todo = (await getAllTodosFromUser(username)).find(t => t.id == todoId)
    console.log({todo})

    if(title !== null){
        todo = {
            ...todo,
            title
        }
    }

    if(deadline !== null){
        todo = {
            ...todo,
            deadline: new Date(deadline)
        }
    }

    if(done !== null){
        todo = {
            ...todo,
            done
        }
    }

    return await saveTodo(username, todo)
}

export const saveTodo = async (username, todo) => {
    const user = await userRepository.getUserPerName(username)
    user.todos = user.todos.filter(_todo => _todo.id != todo.id)
    user.todos.push(todo)
    await userRepository.updateUser(user)
    return todo
}

export const deleteTodo = async (username, todoId) => {
    const user = await userRepository.getUserPerName(username)
    const todos = user.todos.filter(todo => todo.id != todoId)
    user.todos = todos
    await userRepository.updateUser(user)
    return todoId
}
