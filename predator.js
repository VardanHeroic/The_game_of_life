import Animal from './animal.js'
import variables from "./variables.js";
let grasseaterArr = variables.grasseaterArr
let predatorArr = variables.predatorArr
let DeadpredatorArr = variables.DeadpredatorArr
let matrix = variables.matrix
let delay = variables.delay


class Predator extends Animal { 
    constructor(x, y) {
        super(x,y)
        this.index = 3;
        this.energy = 6;
        this.deathage = Math.floor(Math.random() * 25000) + 10000;
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
            this.energy += 3
            for (let i in grasseaterArr) {
                if (newCell[0] == grasseaterArr[i].x && newCell[1] == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
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
            let pred = new Predator(newCell[0], newCell[1]);
            predatorArr.push(pred)
            this.energy = 3
            this.multiplay = 0
        }
    }

    die() {
        matrix[this.y][this.x] = 9;
        let dpred = new Predator(this.x, this.y)
        DeadpredatorArr.push(dpred)
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);

                break;
            }
        }

    }


    live() {
        this.age++

        if (this.chooseCell(2).length == 0) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                super.move(1)
            }
            else {
                super.move(0)
            }
        }

        if (this.chooseCell(4).length > 0) {    
            this.eat(4);
        }
        else if(this.chooseCell(2).length > 0){
            this.eat(2);
        }

        if (this.energy >= 7) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                    this.mul(1)
            }
            else {
                    this.mul(0)
            }
        }
        
        if (this.energy == 0 || this.age >= this.deathage) {
            this.die()
        }
    }
}

export default Predator 