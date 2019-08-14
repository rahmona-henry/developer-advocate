const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(express.static('client'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



//POST Requests//
app.post('https://api.hsforms.com/submissions/v3/integration/submit/6272961/5c48da10-a032-4aac-9a84-3e1ab646e066', (req, res) => {
  console.log(req.body.firstname)
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email

  res.send("response")
})

app.get('/', (req, res) => res.send('Hello Developer Advocate Team!'))
app.listen(port, () => console.log(`Developer advocate app listening on ${port}!`))
