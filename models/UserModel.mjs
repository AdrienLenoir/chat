import CommonHelper from '../helpers/common.helper.mjs'
import JWTHelper from '../helpers/jwt.helper.mjs'
import HashHelper from '../helpers/hash.helper.mjs'
import bcrypt from "bcrypt";
import { query } from '../database/database.mjs'

class UserModel {
  constructor() {
    this.tableName = 'users'
  }

  async find(params = {}) {
    let sql = `SELECT * FROM ${this.tableName}`

    if (!Object.keys(params).length) {
      return await query(sql)
    }

    const { columnSet, values } = CommonHelper.multipleColumnSetWhere(params)
    sql += ` WHERE ${columnSet}`

    return await query(sql, [...values])
  }

  async findOne(params) {
    const { columnSet, values } = CommonHelper.multipleColumnSetWhere(params)

    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`

    const result = await query(sql, [...values])

    return result[0]
  }

  async exist(username) {
    const user = await this.findOne({ username })
    return user !== undefined
  }

  async create({ username, password }) {
    const sql = `INSERT INTO ${this.tableName} (username, password) VALUES (?,?)`
    password = await HashHelper.hash(password)

    const result = await query(sql, [username, password])
    const affectedRows = result ? result.affectedRows : 0

    return affectedRows > 0 ? result : null
  }


  async update(params, id) {
    const { columnSet, values } = CommonHelper.multipleColumnSet(params)

    const sql = `UPDATE ${this.tableName} SET ${columnSet}, update_at=NOW() WHERE id=?`

    const result = await query(sql, [...values, id])

    return result
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id=?`

    const result = await query(sql, [id])

    return result
  }

  async signin(userId, password, goodpassword) {
    return new Promise(async function (resolve) {
      const isEgal = await HashHelper.verify(password, goodpassword)

      if (isEgal) {
        return resolve({
          success: true,
          token: JWTHelper.generate(userId)
        })
      }

      return resolve({
        success: false,
        message: "Incorrect password"
      })
    });
  }

  async isLogged(authorization) {
    return await JWTHelper.verify(authorization)
  }
}

export default new UserModel()
