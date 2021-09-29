
export default {
  signinShow: async (req, res) => {
    res.render('auth/signin', { test: "lol" })
  },
  signinAction: async (req, res) => {
    console.log(req.body)
    return res.json({
      success: false,
      message: "Formulaire invalide"
    })
  }
}
