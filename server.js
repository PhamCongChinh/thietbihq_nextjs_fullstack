const express = require('express') // Sử dụng framework express
const next = require('next') // Include module next

//const port = parseInt(process.env.PORT, 10) || 3000
const PORT = 3000
const HOSTNAME='localhost'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname: HOSTNAME, port: PORT })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.get('/a', (req, res) => {
        return app.render(req, res, '/a', req.query)
    })
    server.all('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(PORT, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})