const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const xhr = new XMLHttpRequest();
// app.set('port', (process.env.PORT || 4000));


app.use(express.static('client'))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))

// app.get('/', function (req,res) {
//   res.send(index.html)
// })

//POST Requests//
app.post('/', function (req, res) {

  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const cookie =req.body.cookie

  console.log(req.body)





  // Create the new request
  var xhr = new XMLHttpRequest();
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/4014783/a4bb5614-3d17-4777-b76c-3e1b6d792202'

  // Example request JSON:
  var data = {
    "submittedAt": "1565797980498",
    "fields": [
      {
        "name": "email",
        "value": email
      },
      {
        "name": "firstname",
        "value": firstname
      }
    ],
    "context": {
      "hutk":  cookie, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      // "pageUri": pageURL,
      "pageName": title
    },

    "skipValidation": true
  }

  var final_data = JSON.stringify(data)

  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');
  //
  xhr.onreadystatechange = function() {
          console.log("RESPONSE: " + xhr.status);
          console.log("RESPONSE MESSAGE: ");
          if(xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
          } else if (xhr.readyState == 4 && xhr.status == 400){
              console.log(xhr.responseText); // Returns a 400 error the submission is rejected.
          } else if (xhr.readyState == 4 && xhr.status == 403){
              console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
          } else if (xhr.readyState == 4 && xhr.status == 404){
              console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found
          }
         }


  // Sends the request

  xhr.send(final_data)



  res.send('form submitted')

})


// const port = process.env.PORT || 4000
.listen(process.env.PORT || 5000)
// app.listen(port, function(){
// console.log('We have lift off on port ' + port))
