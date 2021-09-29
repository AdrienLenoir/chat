import bcrypt from 'bcrypt'

export default {
  hash: (password) => {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        resolve(hashedPassword)
      })
    })
  },
  verify: (password, hashedPassword) => {
    return new Promise( (resolve) => {
      bcrypt.compare(password, hashedPassword, (err, isEgal) => {
        resolve(isEgal)
      })
    })
  }
}
