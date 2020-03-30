import { MINIMUM_LIFE } from './constants'

export default class Pokemon {
    name: string
    speed: number
    life: number
    atq: number
    level: number
    off_stat: number
    def_stat: number

    constructor(name: string, speed: number, life: number, atq: number, off_stat: number, def_stat: number, level = 1) {
        this.name = name
        this.speed = speed
        this.life = life
        this.atq = atq
        this.off_stat = off_stat
        this.def_stat = def_stat
        this.level = level
    }

    attack(target: Pokemon): void {
        const damage = this.calculAtq(target)
        console.log(`${this.name} attaque ${target.name} et inflige ${damage} damage`)
        target.updateLife(damage)
    }

    updateLife(damage: number): void {
        const life = this.life - damage
        this.life = life < MINIMUM_LIFE ? MINIMUM_LIFE : this.life - damage
    }

    isFasterThan(pokemon: Pokemon): boolean {
        return this.speed > pokemon.speed
    }

    private calculAtq(target: Pokemon): number {
        return Math.floor(Math.floor(Math.floor(2 * target.level / 5 + 2) * target.def_stat * this.atq / target.def_stat) / 50) + 2
    }
}