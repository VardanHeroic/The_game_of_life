class Grass extends Living_Creature {
    constructor(x, y) {
        super(x,y)
        this.index = 1;
    }

    mul(char) {
        this.multiplay++;
        let newCell = random(super.chooseCell(char))
        if (newCell && this.multiplay > delay*1.5) {
            matrix[newCell[1]][newCell[0]] = 1
            let gr = new Grass(newCell[0], newCell[1]);
            grassArr.push(gr)
            this.multiplay = 0
        }
    }

    live() {
        this.age++
        if (this.chooseCell(4).length > 0) {
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