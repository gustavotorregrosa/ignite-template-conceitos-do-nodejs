import * as dao from '../misc/dao.js'
import {v4} from 'uuid'

export const getAllUsers = async () => await dao.getObjectArray('users')

export const getUserPerId = async id => (await getAllUsers()).find(user => user.id == id)

export const getUserPerName = async username => (await getAllUsers()).find(user => user.username == username)

export const updateUser = async (userData) => {
    const {id, name, username, todos} = userData
    let user = await getUserPerId(id)
    user = {
        ...user,
        name,
        username,
        todos
    }

    return await saveUser(user)
}

export const createUser = async userData => {
    const {name, username} = userData
    const user = {
        id: v4(),
        name,
        username,
        todos: []
    }
    await saveUser(user)
    return user
}

export const saveUser = async user => {
    const users = (await getAllUsers()).filter(u => u.id != user.id)
    users.push(user)
    return await dao.overwriteObject('users', users)
}

export const deleteUser = async id => {
    const users = (await getAllUsers()).filter(u => u.id != id)
    return await dao.overwriteObject('users', users)
}

