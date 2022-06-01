let delay = 1000;

class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 1;
        this.multiplay = 0;
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

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);

                }
            }
        } return found;
    }

    mul(char) {
        this.multiplay++;
        let newCell = random(this.chooseCell(char))
        if (newCell && this.multiplay > delay) {
            matrix[newCell[1]][newCell[0]] = 1
            let gr = new Grass(newCell[0], newCell[1]);
            grassArr.push(gr)
            this.multiplay = 0
        }
    }





    live() {
        this.age++
        if (this.chooseCell(0).length == 0 && this.chooseCell(4).length > 0) {
            this.mul(4)
        }
        else if (this.chooseCell(9).length > 0) {
            this.mul(9)
        }
        else {
            this.mul(0)
        }

    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 2;
        this.multiplay = 0;
        this.energy = 5;
        this.age = 1
        this.deathage = Math.floor(random(5000, 40000));
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

    chooseCell(character) {
        this.getNewCoordinates()
        let found = [];
        for (var i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);

                }
            }
        } return found;
    }

    move() {
        this.multiplay++
        let newCell2 = random(this.chooseCell(0))
        if (newCell2 && this.multiplay > delay) {
            matrix[this.y][this.x] = 0
            matrix[newCell2[1]][newCell2[0]] = 2
            this.x = newCell2[0]
            this.y = newCell2[1]
            this.energy -= 1
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
        if (this.chooseCell(1).length == 0 && this.energy > 0 || this.chooseCell(9).length > 0) {
            this.move()
        }
        if (this.chooseCell(1).length > 0 || this.chooseCell(5).length > 0) {
            if (this.chooseCell(5).length > 0 && this.chooseCell(1).length == 0) {
                this.eat(5)
            }
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

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.index = 3;
        this.multiplay = 0;
        this.energy = 6;
        this.age = 1
        this.deathage = Math.floor(random(10000, 35000));
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

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);

                }
            }
        } return found;
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
        if (this.chooseCell(2).length == 0 && this.energy > 0 || this.chooseCell(9).length > 0) {
            if (this.chooseCell(0).length == 0 && this.chooseCell(1).length > 0) {
                this.move(1)
            }
            else {
                this.move(0)
            }
        }
        if (this.chooseCell(2).length > 0) {
            if (this.chooseCell(4).length > 0) {
                this.eat(4)
                this.deathage += 10
            }
            else {
                this.eat(2)
            }
        }
        if (this.energy >= 7) {
            this.mul()
        }
        if (this.energy == 0 || this.age >= this.deathage) {
            this.die()
        }
    }
}