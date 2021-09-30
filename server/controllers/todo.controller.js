import Todo from '../models/todo.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  const todo = new Todo(req.body)
  try {
    await todo.save()
    return res.status(200).json({
      message: "Successfully saved todo!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
} 
   
const todoByID = async (req, res, next, id) => {
  try {
    let todo = await Todo.findById(id)
    if (!todo)
      return res.status('400').json({
        error: "Todo not found"
      })
    req.profile = todo
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve todo"
    })
  }
}

const read = (req, res) => {
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    let todos = await Todo.find()
    res.json(todos)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let todo = req.profile
    todo = extend(todo, req.body)
    todo.updated = Date.now() 
    await todo.save()
    res.json(todo)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let todo = req.profile
    let deletedTodo = await todo.remove()
    res.json(deletedTodo)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  read,
  list,
  remove,
  update,
  todoByID
}