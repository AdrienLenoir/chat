const jwt = require("jsonwebtoken")
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

module.exports = {
  generate: (userId) => {
    return jwt.sign(
      { id: userId },
      JWT_SIGN_SECRET,
      { expiresIn: "24h", }
    )
  },
  verify: (token) => {
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)

        return jwtToken != null && jwtToken.id != null
      } catch (error) {}
    }

    return false
  },
  getUserId: (token) => {
    return token ? jwt.verify(token, JWT_SIGN_SECRET)?.id : false
  }
}
