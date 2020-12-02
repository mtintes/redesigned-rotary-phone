import {item} from '../items'

export interface quest{
    title: string
    description: string
    reward: item[]
    stages: stage[]
}

export interface stage {
    goal: string
    
}