import Animal from './animal.js'
import variables from "./variables.js";
let grassArr = variables.grassArr
let grasseaterArr = variables.grasseaterArr
let DeadgrasseaterArr = variables.DeadgrasseaterArr
let matrix = variables.matrix
let delay = variables.delay

class GrassEater extends Animal {
    constructor(x, y) {
        super(x, y)
        this.index = 2;
        this.energy = 5;
        this.deathage = Math.floor(Math.random() * 35000) + 5000;

    }


    eat(char) {
        this.multiplay++
        let empty = super.chooseCell(char)
        let newCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell[1]][newCell[0]] = this.index
            this.x = newCell[0]
            this.y = newCell[1]
            this.multiplay = 0
            this.energy++
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    mul(char) {
        this.multiplay++
        let empty = super.chooseCell(char)
        let newCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell && this.multiplay > delay) {
            matrix[newCell[1]][newCell[0]] = this.index
            let gre = new GrassEater(newCell[0], newCell[1]);
            grasseaterArr.push(gre)
            this.energy = 3
            this.multiplay = 0
            if (char == 1 ) {
                for (let i in grassArr) {
                    if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }


    }

    die() {
        matrix[this.y][this.x] = 4
        let dgre = new GrassEater (this.x, this.y)
        DeadgrasseaterArr.push(dgre)
        for (let i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
    }


    live() {
        this.age++
        if (this.energy >= 5) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                this.mul(1)
            }
            else if(this.chooseCell(0) > 0){
                this.mul(0)
            }
        }

        if (this.chooseCell(1).length == 0) {
            super.move(0)
        }

        if (this.chooseCell(1).length > 0) {
            this.eat(1)
        }

        

        if (this.energy == 0 || this.age >= this.deathage) {
            this.die()
            
        }
    }
}

export default GrassEater