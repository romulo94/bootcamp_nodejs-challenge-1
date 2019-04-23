const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const verificationParams = (req, res, next) => {
  return req.query.age === undefined ? res.redirect('/') : next()
}

app.get('/', (req, res) => {
  return res.render('root')
})
app.post('/check', (req, res) => {
  const age = req.body.age
  return age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})
app.get('/major', verificationParams, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})
app.get('/minor', verificationParams, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)
