import fastify, { RouteShorthandOptions } from 'fastify'
import { Session } from 'inspector'
import { createConnection } from 'net'
import {createSession} from './sessions/create'
import ajv from 'ajv'

const server = fastify()

server.register(require('fastify-redis'), {  host: 'localhost', port: 6379 })

server.register(require('fastify-websocket'))

server.register(require('fastify-cors'), {
  origin: '*'
})


// @ts-ignore
server.get('/ws', { websocket: true }, (connection, req) => {
  connection.socket.on('message', message => {
    // message === 'hi from client'
    console.log("message", message)
    // @ts-ignore
    connection.socket.send(new Date())
    // connection.socket.send('hi from server')
  })
})

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const bodyJsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' }
  }
}

const opts = {
  schema: {
    type: 'object',
    properties:{
      body:{
        type: 'object',
        properties: {
          id: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.post('/session',{schema: {body: bodyJsonSchema}}, async (request, reply) =>{
  const body = request.body

  //@ts-ignore
  const id: string = body.id

  reply.send(await createSession(server, id))
})

// server.post('/command', async (request, reply) => {
  
// })

// server.post('/session', async (request, reply) => {
  
//   const sessionId = await createSession(request);
//   reply.send(sessionId).code(200);

// })

server.listen(3005, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})