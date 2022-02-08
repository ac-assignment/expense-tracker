import Category from '#models/category.js'

export const setGlobalViewData = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
}
/* 支出類別下拉選單 */
export const setCategoryList = async (req, res, next) => {
  res.locals.categoryList = await Category.find().lean()
  next()
}
