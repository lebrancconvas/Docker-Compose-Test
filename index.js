const express = require('express')
const redis = require('redis')
const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: 6379,
})
const PORT = 8091

client.set('visits', 0)

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of Visits is ${visits}\nThis Website is running on Docker ENV.`)
        client.set('visits', parseInt(visits) + 1)
    })
})

app.listen(PORT, () => {
    console.log(`Port: ${PORT} is opening.`)
})