const express = require('express')
const serverless = require("serverless-http");

const app = express()
const router = express.Router();

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

router.get('/', (req, res) => {
    res.json({
        hello: 'world'
    })
})

router.post('/olark', (req, res) => {
    try {
        const reqData = JSON.parse(req.body.data)
        for(let item of reqData.items) {
            if(item.body.toLowerCase().includes("pizza") && reqData.visitor.countryCode == 'US' && reqData.visitor.region == 'NY') {
                return res.end(JSON.stringify({
                    status: 'pizza',
                    integrationUrl: undefined
                }))
            }
        }
    } catch(err) {
        return res.end(JSON.stringify({
            status: 'no pizza',
            integrationUrl: undefined
        }));
    }

    res.end(JSON.stringify({
        status: 'no pizza',
        integrationUrl: undefined
    }));
})

app.use(`/.netlify/functions/api`, router)

module.exports = app
module.exports.handler = serverless(app)