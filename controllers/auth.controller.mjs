
export default {
  signinShow: async (req, res) => {
    res.render('auth/signin', { test: "lol" })
  },
  signinAction: async (req, res) => {
    console.log(req.body)
    if(req.body.password === null || req.body.password === '' || req.body.username === null || req.body.username === '') {
      return res.json({
        success: false,
        message: "Empty field"
      }) 
    }
    // if() {
    //   return res.json({
    //     success: false,
    //     message: "Password not match"
    //   }) 
    // }
  },

//

  signupShow: async (req, res) => {
    res.render('auth/signup', { test: "lol" })
  },
  signupAction: async (req, res) => {
    console.log(req.body)
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
  }
}