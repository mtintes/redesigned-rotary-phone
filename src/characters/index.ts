import {item, equipment} from '../items'

export interface character {
    name: string,
    description: string,
    health: number,
    maxhealth: number,
    inventory: item[],
    equipment: equipment,
    dialog: dialog[]
}

export interface dialog {

}