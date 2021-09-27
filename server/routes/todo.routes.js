import express from 'express'
import todoCtrl from '../controllers/todo.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/todos') //todo
  .get(todoCtrl.list)
  .post(todoCtrl.create)


router.route('/api/todos/:todoId')
  .get(authCtrl.requireSignin, todoCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, todoCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, todoCtrl.remove)

// router.param('todoId', todoCtrl.todoByID)

export default router
