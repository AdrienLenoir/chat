
export default {
  error404: (req, res) => {
    res.status(404).render('error/404')
  }
}
