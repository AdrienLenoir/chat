import { createPool } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const HttpStatusCodes = Object.freeze({
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
  ER_DUP_ENTRY: 409,
})

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CON_LIMIT,
  port: process.env.DB_PORT,
})

const query = async (sql, values) => {
  return new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    }
    pool.query(sql, values, callback)
  }).catch((err) => {
    const mysqlErrorList = Object.keys(HttpStatusCodes)

    err.status = mysqlErrorList.includes(err.code)
      ? HttpStatusCodes[err.code]
      : err.status

    throw err
  })
}

export { pool, query }
