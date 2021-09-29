export default {
  messagesShow: async (req, res) => {
    res.render('messages', {})
  },
  messagesAction: async (req, res) => {
    if(req.body.message === null || req.body.message === '') {
      return res.json({
        success: false,
        message: "Empty field"
      }) 
    }
    if(req.body.message.trim().length === 0) {
      return res.json({
        success: false,
        message: "Contains only space"
      })
    }
    const messageUser = req.body.message.trim();
    console.log(messageUser);
  }
}
