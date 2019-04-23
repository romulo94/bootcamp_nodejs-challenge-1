const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verificationParams = (req, res, next) => {
  const { age } = req.query
  return !age ? res.redirect('/') : next()
}

app.get('/', (req, res) => {
  return res.render('root')
})
app.post('/check', (req, res) => {
  const { age } = req.body

  return res.redirect(`/${age >= 18 ? 'major' : 'minor'}?age=${age}`)
})

app.get('/major', verificationParams, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})
app.get('/minor', verificationParams, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.listen(3000)
