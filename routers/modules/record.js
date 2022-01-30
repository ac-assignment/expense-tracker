import express from 'express'
import Record from '#models/record.js'
const router = express.Router()

router.get('/create', (req, res) => {
  res.render('create')
})

export default router
