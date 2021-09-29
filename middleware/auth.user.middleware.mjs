import JWTHelper from "../helpers/jwt.helper.mjs"
import UserModel from "../models/UserModel.mjs"

export default async (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    let token = req.cookies.token
    let userId = JWTHelper.getUserId(token)

    if (userId && userId > 0) {
      req.user = await UserModel.findOne({id: userId})
      req.user.token = token
    }
  }

  if (!req.user) {
    return res.redirect('/auth/signin')
  }

  next()
}
