// Require the framework and instantiate it
var fs = require('fs')

const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('@fastify/static'), {
  root: require('path').join(__dirname, 'public'),
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.sendFile('index.html', __dirname)
})
fastify.get('/ls', function (request, reply) {
  var files = fs.readdirSync('./public/' + request.query.path, { withFileTypes: true }).map((f) => ({
    name: f.name,
    dir: f.isDirectory(),
  }))
  reply.send({ files: files })
})

// Run the server!
fastify.listen(3000, '::', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
