import UserModel from "../models/UserModel.mjs";
import JWTHelper from "../helpers/jwt.helper.mjs"

export default {
  signinShow: async (req, res) => {
    res.render('auth/signin', { test: "lol" })
  },
  signinAction: async (req, res) => {
    if(req.body.password === null || req.body.password === '' || req.body.username === null || req.body.username === '') {
      return res.json({
        success: false,
        message: "Empty field"
      })
    }

    const { username, password } = req.body
    const user = await UserModel.findOne({ username: username })

    if (user) {
      const login = await UserModel.signin(user.id, password, user.password)
      return res.json(login)
    } else {
      return res.json({
        success: false,
        message: "User not found"
      })
    }
  },

//

  signupShow: async (req, res) => {
    res.render('auth/signup', { test: "lol" })
  },
  signupAction: async (req, res) => {
    if(req.body.password === null || req.body.password === '' || req.body.username === null || req.body.username === ''
      || req.body.passwordAgain === null || req.body.passwordAgain === '') {
        return res.json({
          success: false,
          message: "Empty field"
        })
    }
    if(req.body.password.length < 3) {
      return res.json({
        success: false,
        message: "Password to short"
      })
    }
    if(req.body.passwordAgain !== req.body.password) {
      return res.json({
        success: false,
        message: "Password not match"
      })
    }

    const { username, password } = req.body
    const usernameAlreadyExist = await UserModel.exist(username)

    if (usernameAlreadyExist) {
      return res.json({
        success: false,
        message: "Username already exist"
      })
    }

    const createUser = await UserModel.create({ username, password })

    if (createUser) {
      return res.json({
        success: true,
        token: JWTHelper.generate(createUser.insertId),
        user: {
          id: createUser.insertId,
          username
        }
      })
    } else {
      return res.json({
        success: false,
        message: "An error occured"
      })
    }
  }
}
