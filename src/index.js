import express from 'express';
import cors from 'cors'
import * as userRepository from './repositories/user.js'
import * as todoRepository from './repositories/posts.js'

const app = express();

app.use(cors());
app.use(express.json());

// const users = [];

async function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers
  const user = await userRepository.getUserPerName(username)
  if(!user){
    return response.status(401).json({
      message: 'user not found'
    })
  }
  next()
}

app.post('/users', async (request, response) => {
  const {name, username} = request.body
  let user = await userRepository.createUser({name, username})
  response.json(user)
});

app.get('/todos', checksExistsUserAccount, async (request, response) => {
  const { username } = request.headers
  const user = await userRepository.getUserPerName(username)
  response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, async (request, response) => {
  const {title, deadline} = request.body
  const {username} = request.headers
  const todo = await todoRepository.createTodo(username, {title, deadline})
  response.json(todo)

});

app.put('/todos/:id', checksExistsUserAccount, async (request, response) => {
    const {id} = request.params
    const {username} = request.headers
    const {title, deadline} = request.body
    const done = null
    const todo = await todoRepository.updateTodo(username, id, {title, deadline, done})
    response.json(todo)

});

app.patch('/todos/:id/done', checksExistsUserAccount, async (request, response) => {
    const {id} = request.params
    const {username} = request.headers
    const title = null
    const deadline = null
    const done = true
    const todo = await todoRepository.updateTodo(username, id, {title, deadline, done})
    response.json(todo)
});

app.delete('/todos/:id', checksExistsUserAccount, async (request, response) => {
    const {id} = request.params
    const {username} = request.headers
    const todo = await todoRepository.deleteTodo(username, id)
    response.json(todo)

});

export default app