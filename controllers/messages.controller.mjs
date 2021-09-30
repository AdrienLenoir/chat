import UserModel from "../models/UserModel.mjs";
import MessageModel from "../models/MessageModel.mjs";
import ThreadModel from "../models/ThreadModel.mjs";
import SocketioController from "./socketio.controller.mjs";
import moment from 'moment'

export default {
  messagesShow: async (req, res) => {
    const userId = req.user.id
    const userToId = req.params?.userToId
    const userTo = userToId ? await UserModel.findOne({ id: parseInt(userToId) }) : null
    const messages = userTo ? await MessageModel.getMessages(userId, parseInt(userToId)) : []
    const threads = await ThreadModel.getUserThreads(userId)

    threads.map(thread => {
      thread.isOnline = SocketioController.users.filter(user => user.id === thread.id).length !== 0
    })

    messages.map(message => message.created_at = moment(message.created_at))

    res.render('messages', { userId, userTo, messages, threads })
  }
}
