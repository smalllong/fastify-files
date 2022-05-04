const fastify = require('fastify')({
    logger: true,
  }),
  fs = require('fs')

fastify.register(require('@fastify/static'), {
  root: require('path').join(__dirname, 'public'),
})

fastify.get('/', function (request, reply) {
  reply.sendFile('index.html', __dirname)
})
fastify.get('/ls', function (request, reply) {
  reply.send({
    files: fs.readdirSync('./public/' + request.query.path, { withFileTypes: true }).map((f) => ({
      name: f.name,
      dir: f.isDirectory(),
    })),
  })
})

fastify.listen(3000, '::', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
