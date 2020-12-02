export interface item {
    name: string,
    count: number
}

export interface weapon extends item{
    strength: number
}

export interface armor extends item{
    strength: number
}

export interface equipment{
    weapons: weapon[],
    armor: armor
}