import { query } from '../database/database.mjs'
import HashHelper from "../helpers/hash.helper.mjs";
import CommonHelper from "../helpers/common.helper.mjs";
import ThreadModel from "./ThreadModel.mjs";

class MessageModel {
  constructor() {
    this.tableName = 'messages'
  }

  async getMessages(userId, userToId) {
    let sql = `SELECT ${this.tableName}.id, ${this.tableName}.content,  ${this.tableName}.created_at, users.username FROM ${this.tableName} LEFT JOIN users ON users.id = ${this.tableName}.user_from WHERE user_from = ? AND user_to = ? OR user_from = ? AND user_to = ? ORDER BY created_at`

    return await query(sql, [userId, userToId, userToId, userId])
  }

  async findOne(params) {
    const { columnSet, values } = CommonHelper.multipleColumnSetWhere(params, `${this.tableName}.`)

    const sql = `SELECT ${this.tableName}.id, ${this.tableName}.content,  ${this.tableName}.created_at, users.username FROM ${this.tableName} LEFT JOIN users ON users.id = ${this.tableName}.user_from WHERE ${columnSet}`

    const result = await query(sql, [...values])

    return result[0]
  }

  async sendMessages(userFromId, userToId, content) {
    const sql = `INSERT INTO ${this.tableName} (user_from, user_to, content, created_at) VALUES (?,?,?, NOW())`

    const result = await query(sql, [userFromId, userToId, content])
    const affectedRows = result ? result.affectedRows : 0

    await ThreadModel.createOrUpdate(userFromId, userToId)
    await ThreadModel.createOrUpdate(userToId, userFromId)

    return affectedRows > 0 ? result : null
  }
}

export default new MessageModel()
