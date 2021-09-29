import { query } from '../database/database.mjs'
import CommonHelper from "../helpers/common.helper.mjs";

class ThreadModel {
  constructor() {
    this.tableName = 'threads'
  }

  async getUserThreads(userId) {
    let sql = `SELECT user_to FROM ${this.tableName} WHERE user_id = ?`

    return await query(sql, [userId])
  }

  async getUserThreadsWithOther(userId, userToId) {
    let sql = `SELECT * FROM ${this.tableName} WHERE user_id = ? AND user_to = ?`

    return await query(sql, [userId, userToId])
  }

  async createOrUpdate(userFromId, userToId) {
    const threadExist = this.threadExist(userFromId, userToId)
    if (threadExist) {
      await this.update(userFromId, userToId)
    } else {
      await this.create(userFromId, userToId)
    }
  }

  async create(userId, userToId) {
    const sql = `INSERT INTO ${this.tableName} (user_id, user_to, updated_at) VALUES (?,?, NOW())`

    const result = await query(sql, [userId, userToId])
    const affectedRows = result ? result.affectedRows : 0

    return affectedRows > 0 ? result : null
  }

  async update(userId, userToId) {
    const sql = `UPDATE ${this.tableName} SET update_at=NOW() WHERE user_id = ? AND user_to = ? OR user_id = ? AND user_to = ?`

    const result = await query(sql, [userId, userToId, userToId, userId])

    return result
  }

  async threadExist(userFromId, userToId) {
    const thread = await this.getUserThreadsWithOther(userFromId, userToId)
    return thread !== undefined
  }
}

export default new ThreadModel()
