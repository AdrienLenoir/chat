import { query } from '../database/database.mjs'
import HashHelper from "../helpers/hash.helper.mjs";

class MessageModel {
  constructor() {
    this.tableName = 'messages'
  }

  async getMessages(userId, userToId) {
    let sql = `SELECT user_to FROM ${this.tableName} WHERE user_from = ? AND user_to = ? OR user_from = ? AND user_to = ? ORDER BY created_at`

    return await query(sql, [userId, userToId, userToId, userId])
  }

  async sendMessages(userFromId, userToId, content) {
    const sql = `INSERT INTO ${this.tableName} (user_from, user_to, content, created_at) VALUES (?,?,?, NOW())`

    const result = await query(sql, [userFromId, userToId, content])
    const affectedRows = result ? result.affectedRows : 0

    return affectedRows > 0 ? result : null
  }
}

export default new MessageModel()
