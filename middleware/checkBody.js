export const filterBlank = (req, res, next) => {
  const { body } = req
  for (const key in body) {
    if (body[key].includes(' ')) {
      return res.render('register', { body, error: '輸入請勿包含空白' })
    }
  }
  next()
}
export const trimBlank = (req, res, next) => {
  for (const key in req.body) {
    req.body[key] = req.body[key].trim()
  }
  next()
}