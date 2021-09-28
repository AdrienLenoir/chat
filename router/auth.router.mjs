import express from "express"
import authController from '../controllers/auth.controller.mjs'

export default express.Router()
  .get('/signin', authController.signinShow)
  .post('/signin', authController.signinAction)
