import express from "express"
import messagesController from '../controllers/messages.controller.mjs'

export default express.Router()
  .get('/', messagesController.messagesShow)
