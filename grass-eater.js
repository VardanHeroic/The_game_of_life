class GrassEater extends Living_Creature {
    constructor(x, y) {
        super(x, y)
        this.index = 2;
        this.energy = 5;
        this.age = 1
        this.deathage = Math.floor(random(5000, 40000));

    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    move() {
        this.multiplay++
        let newCell2 = random(this.chooseCell(0))
        if (newCell2 && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell2[1]][newCell2[0]] = 2
            this.x = newCell2[0]
            this.y = newCell2[1]
            this.energy--
            this.multiplay = 0
        }
    }

    eat(char) {
        this.multiplay++
        let newCell2 = random(this.chooseCell(char))
        if (newCell2 && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell2[1]][newCell2[0]] = 2
            this.x = newCell2[0]
            this.y = newCell2[1]
            this.energy++
            this.multiplay = 0
            for (let i in grassArr) {
                if (newCell2[0] == grassArr[i].x && newCell2[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            } return newCell2
        }
    }

    mul(char) {
        this.multiplay++
        let newCell2 = random(this.chooseCell(char))
        if (newCell2 && this.multiplay > delay) {
            matrix[newCell2[1]][newCell2[0]] = 2
            let gre = new GrassEater(newCell2[0], newCell2[1]);
            grasseaterArr.push(gre)
            this.energy = 3
            this.multiplay = 0
        }


    }

    die() {
        matrix[this.y][this.x] = 4
        let dgre = new Predator(this.x, this.y)
        DeadgrasseaterArr.push(dgre)
        for (let i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
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

    live() {
        this.age++
        if (this.chooseCell(1).length == 0) {
            this.move()
        }
        if (this.chooseCell(1).length > 0) {
            this.eat(1)
        }
        if (this.energy >= 5) {
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