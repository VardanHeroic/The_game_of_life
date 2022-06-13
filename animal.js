import Living_Creature from './living-creature.js'
import variables from "./variables.js";
let delay = variables.delay
let matrix = variables.matrix

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
        if (newCell && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell[1]][newCell[0]] = this.index
            this.x = newCell[0]
            this.y = newCell[1]
            this.energy--
            this.multiplay = 0
        }
    }
}

export default Animal