class Predator extends Living_Creature { 
    constructor(x, y) {
        super(x,y)
        this.index = 3;
        this.energy = 6;
        this.age = 1
        this.deathage = Math.floor(random(10000, 35000));
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    move(char) {
        this.multiplay++
        let newCell3 = random(this.chooseCell(char));
        if (newCell3 && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell3[1]][newCell3[0]] = 3
            this.x = newCell3[0]
            this.y = newCell3[1]
            this.energy--
            this.multiplay = 0
        }


    }


    eat(char) {
        this.multiplay++
        let newCell3 = random(this.chooseCell(char))
        if (newCell3 && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell3[1]][newCell3[0]] = 3
            this.x = newCell3[0]
            this.y = newCell3[1]
            this.energy += 3
            this.multiplay = 0
            for (let i in grasseaterArr) {
                if (newCell3[0] == grasseaterArr[i].x && newCell3[1] == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    mul() {
        this.multiplay++
        let newCell3 = random(this.chooseCell(0))
        if (newCell3 && this.multiplay > delay) {
            matrix[newCell3[1]][newCell3[0]] = 3
            let pred = new Predator(newCell3[0], newCell3[1]);
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

        if (this.chooseCell(2).length == 0) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                this.move(1)
            }
            else {
                this.move(0)
            }
        }

        if (this.chooseCell(4).length > 0) {    
            this.eat(4);
        }
        else if(this.chooseCell(2).length > 0){
            this.eat(2);
        }

        if (this.energy >= 7) {
            this.mul()
        }
        
        if (this.energy == 0 || this.age >= this.deathage) {
            this.die()
        }
    }
}