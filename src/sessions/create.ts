import { uuid } from 'uuidv4';
import {customAlphabet} from 'nanoid'

//@ts-ignore
import alphabet from 'alphabet'
import {FastifyInstance} from 'fastify'

interface session{
    id: string,
    users:string[]
}

export async function createSession(fastify: FastifyInstance, userId: string): Promise<string>{

    const nanoid = customAlphabet(alphabet.upper.join(''),4)
    const gameId = nanoid()

    const sessionKey = `session-${userId}`
    //@ts-ignore
    const {redis} = fastify

    const session: session = {
        id: gameId,
        users:[
            userId
        ]
    }

    redis.set(sessionKey, JSON.stringify(session))

    const value = await redis.get<session>(sessionKey)
    console.log("value", value)
    return value
}

//
/*{
    id: string,
    rooms:[

    ]
}
*/