const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({ // Membuat Hapi server
    // Server Options
    port: 4444,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}
init()
