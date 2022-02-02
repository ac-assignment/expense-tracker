/* 設置router僅允許已登入使用者 */
export const allowAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warning_msg', '請先登入才能使用！')
  return res.redirect('/user/login')
}
/* 設置router僅允許未登入使用者 */
export const allowUnAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/')
}
