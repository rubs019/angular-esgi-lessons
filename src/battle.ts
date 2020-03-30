import Pokemon from './Pokemon'
import { MINIMUM_LIFE } from './constants'

export default class Battle {

    opponent: Pokemon
    secondOpponent: Pokemon
    lastDefender: Pokemon
    lastAttacker: Pokemon
    nbRound = 0

    constructor(opponent: Pokemon, secondOpponent: Pokemon) {
        this.opponent = opponent
        this.secondOpponent = secondOpponent
    }

    start(): Promise<Pokemon> {
        return new Promise(resolve => {

            let fasterPokemon, slowestPokemon

            if (this.opponent.isFasterThan(this.secondOpponent)) {
                fasterPokemon = this.opponent
                slowestPokemon = this.secondOpponent
            } else {
                fasterPokemon = this.opponent
                slowestPokemon = this.secondOpponent
            }

            const scope = this
            const round = setInterval(() => {
                if (scope.opponent.life < MINIMUM_LIFE || scope.secondOpponent.life < MINIMUM_LIFE) {
                    clearInterval(round)
                    return resolve(scope.opponent)
                }

                if (scope.nbRound === 0) {
                    fasterPokemon.attack(slowestPokemon)
                    scope.lastDefender = slowestPokemon
                    scope.lastAttacker = fasterPokemon
                    scope.nbRound++
                    return
                }

                scope.lastDefender.attack(scope.lastAttacker)
                if (scope.lastAttacker.life === 0) {
                    console.log('the winner is', scope.lastDefender.name)
                    clearInterval(round)
                    return resolve(scope.lastDefender)
                }
                let tempAttacker = scope.lastAttacker
                scope.lastAttacker = scope.lastDefender
                scope.lastDefender = tempAttacker
                scope.nbRound++

            }, 500)
        })
    }


}