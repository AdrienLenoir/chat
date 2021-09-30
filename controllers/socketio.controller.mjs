import cookie from "cookie";
import JWTHelper from '../helpers/jwt.helper.mjs'
import MessageModel from "../models/MessageModel.mjs";

class SocketioController {
  static users = []

  constructor(io) {
    this.io = io
  }

  getUserId(socket){
    const userToken = cookie.parse(socket.request.headers.cookie).token
    return JWTHelper.getUserId(userToken)
  }

  async onConnection(socket) {
    const userToken = cookie.parse(socket.request.headers.cookie).token
    const userId = JWTHelper.getUserId(userToken)

    SocketioController.users.push({id: userId, socketId: socket.id})
  }

  async onDisconnect(socket) {
    const userToken = cookie.parse(socket.request.headers.cookie).token
    const userId = JWTHelper.getUserId(userToken)

    SocketioController.users = SocketioController.users.filter(user => user.id !== userId)
  }

  async onSendMessage(socket, data) {
    const userToId = data.userToId
    const messageContent = data.message
    const userId = this.getUserId(socket)

    if(messageContent.trim().length === 0)
      return

    let message = await MessageModel.sendMessages(userId, userToId, messageContent)

    if (message && message.insertId) {
      const messageId = message.insertId
      message = await MessageModel.findOne({id: messageId})

      SocketioController.users.filter(user => user.id === userToId).forEach(user => {
        const userSocket = user.socketId
        this.io.to(userSocket).emit(`message_from_${userId}`, message)
      })

      socket.emit(`message_to_${userToId}`, message)
    }
  }
}

export default SocketioController
