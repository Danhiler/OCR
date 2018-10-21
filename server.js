var Tesseract = require('tesseract.js')
var cors = require('cors')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/getTextFromImage',(req,res)=>{
    try{
    const string64 = req.body.data
    if(!string64)
    res.status(300).send("Please send img based64 under data")
    var b64string = req.body.data
    var buffer = Buffer.from(b64string, 'base64');

    Tesseract.recognize(buffer)
      .progress(function  (p) { console.log('progress', p)  })
      .catch(err => res.status(300).send("error occurred with OCR engine"))
      .then(function (result) {
        console.log(result.text)
        res.status(200).json({text:result.text+" made by Dan Hilerowicz"})
        process.exit(0)
      })
    }catch(err){
        res.status(300).send("Unexpected error occurred")
    }

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))