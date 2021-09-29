import UserModel from "../models/UserModel.mjs";
import MessageModel from "../models/MessageModel.mjs";
import ThreadModel from "../models/ThreadModel.mjs";

export default {
  messagesShow: async (req, res) => {
    const userId = req.user.id
    const userToId = req.params?.userToId
    const userTo = userToId ? await UserModel.findOne({ id: parseInt(userToId) }) : null
    const messages = userTo ? await MessageModel.getMessages(userId, parseInt(userToId)) : []
    const threads = await ThreadModel.getUserThreads(userId)

    res.render('messages', { userTo, messages, threads })
  },

  messagesAction: async (req, res) => {
    if(req.body.message === null || req.body.message === '') {
      return res.json({
        success: false,
        message: "Empty field"
      })
    }
    if(req.body.message.trim().length === 0) {
      return res.json({
        success: false,
        message: "Contains only space"
      })
    }
    const userToId = req.params?.userToId
    const messageContent = req.body.message.trim();
    const userId = req.user.id

    let message = await MessageModel.sendMessages(userId, userToId, messageContent)

    if (message && message.insertId) {
      const messageId = message.insertId
      message = await MessageModel.findOne({ id: messageId })

      return res.json({
        success: true,
        message
      })
    } else {
      return res.json({
        success: false,
        message: "An error occured"
      })
    }

  }
}
