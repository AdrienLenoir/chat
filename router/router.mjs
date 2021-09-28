import express from "express"
import authRouter from './auth.router.mjs'
import messagesRouter from './messages.router.mjs'

export default express.Router()
  .use('/auth', authRouter)
  .use('/messages', messagesRouter)
