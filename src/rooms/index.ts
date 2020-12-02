import {character} from '../characters'
import {item} from '../items'

export interface room{
    name: string,
    characters: character[],
    players: character[],
    items: item[]
    doors: portal[]
}

export interface portal{
    name: string
    room: string
}