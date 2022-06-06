class GrassEater extends Animal {
    constructor(x, y) {
        super(x, y)
        this.index = 2;
        this.energy = 5;
        this.deathage = Math.floor(random(5000, 40000));
    }




    die() {
        matrix[this.y][this.x] = (this.index)**2;
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

        if (this.chooseCell(1).length == 0) {
            super.move(0)
        }

        if (this.chooseCell(1).length > 0) {
            this.eat(1, 1, grassArr)
        }

        if (this.energy >= 6) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                this.mul(1,GrassEater,grasseaterArr)
            }
            else {
                this.mul(0,GrassEater,grasseaterArr)
            }
        }

        if (this.energy == 0 || this.age >= this.deathage) {
            this.die()
        }
    }
}