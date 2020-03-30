import Pokemon from  '../src/Pokemon'
import Battle from '../src/battle'
import { getFasterPokemon } from '../src/utils'


describe('Pokemon test', () => {
    test('Should return the fastest pokemon', () => {
        const pikachu = new Pokemon('Pikachu', 15, 100, 20, 90, 2, 2)
        const salameche = new Pokemon('Salameche', 5, 100, 30,  90, 2, 2)
        expect(getFasterPokemon(pikachu, salameche)).toBe(pikachu);
    })

    test('Should reduce the life of the pokemon attacked', () => {
        const bulbizarre = new Pokemon('Bulbizarre', 15, 100, 20,  90, 2, 2)
        const dracaufeu = new Pokemon('Dracaufeu', 5, 100, 50,  90, 2, 2)

        dracaufeu.attack(bulbizarre)

        expect(bulbizarre.life).toBe(96);
    })

    test('Should reduce the life below 0', () => {
        const bulbizarre = new Pokemon('Bulbizarre', 15, 100, 20,  90, 2, 2)
        const dracaufeu = new Pokemon('Dracaufeu', 5, 100, 1000000000,  90, 2, 2)

        dracaufeu.attack(bulbizarre)

        expect(bulbizarre.life).toBe(0);
    })
})

describe('Battle test', () => {
    test('Should simulate a fight between two pokemons', () => {
        const bulbizarre = new Pokemon('Bulbizarre', 15, 20, 100,  90, 2, 2)
        const dracaufeu = new Pokemon('Dracaufeu', 5, 20, 200,  90, 2, 2)

        const battle = new Battle(bulbizarre, dracaufeu)

        return expect(battle.start()).resolves.toBe(dracaufeu)
    })
})