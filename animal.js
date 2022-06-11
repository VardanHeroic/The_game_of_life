let Living_Creature = require('./living-creature')
let delay = require('./variables').delay
let matrix = require('./variables').matrix

class Animal extends Living_Creature{
    constructor(x,y){
        super(x,y)
        this.age = 1
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    move(char) {
        this.multiplay++
        let empty = super.chooseCell(char)
        let newCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell) {
            matrix[this.y][this.x] = 0
            matrix[newCell[1]][newCell[0]] = this.index
            this.x = newCell[0]
            this.y = newCell[1]
            this.energy--
            this.multiplay = 0
        }
    }

    mul(char, name, Arr) {
        this.multiplay++
        let empty = super.chooseCell(char)
        let newCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = this.index
            let animal = new name(newCell[0], newCell[1]);
            Arr.push(animal)
            this.energy = 3
            this.multiplay = 0
        }
    }

    eat(char, newEnergy, victimArr) {
        this.multiplay++
        let empty = super.chooseCell(char)
        let newCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell) {
            matrix[this.y][this.x] = 0
            matrix[newCell[1]][newCell[0]] = this.index
            this.x = newCell[0]
            this.y = newCell[1]
            this.multiplay = 0
            this.energy + newEnergy
            for (let i in victimArr) {
                if (newCell[0] == victimArr[i].x && newCell[1] == victimArr[i].y) {
                    victimArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    live() {

        if (this.energy <= 0 || this.age >= this.deathage) {
            this.die()
        }
    }
}

module.exports = Animal