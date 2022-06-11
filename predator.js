let Animal = require('./animal.js')
let grasseaterArr = require('./variables').grasseaterArr
let DeadgrasseaterArr = require('./variables').DeadgrasseaterArr
let predatorArr = require('./variables').predatorArr
let DeadpredatorArr = require('./variables').DeadpredatorArr
let matrix = require('./variables').matrix

class Predator extends Animal { 
    constructor(x, y) {
        super(x,y)
        this.index = 3;
        this.energy = 6;
        this.deathage = Math.floor(Math.random() * 25000) + 10000;
    }

    die() {
        matrix[this.y][this.x] = (this.index)**2;
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
            this.eat(4, 2,DeadgrasseaterArr);
        }
        else if(this.chooseCell(2).length > 0){
            this.eat(2, 3,grasseaterArr);
        }

        if (this.energy >= 7) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                    this.mul(1,Predator,predatorArr)
            }
            else {
                    this.mul(0,Predator,predatorArr)
            }
        }
        
        return super.live()
    }

}

module.exports = Predator   