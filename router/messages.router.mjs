import express from "express"
import messagesController from '../controllers/messages.controller.mjs'
import authUserMiddleware from '../middleware/auth.user.middleware.mjs'

export default express.Router()
  .get('/', authUserMiddleware, messagesController.messagesShow)
  .get('/:userToId', authUserMiddleware, messagesController.messagesShow)
  .post('/:userToId', authUserMiddleware, messagesController.messagesAction)
