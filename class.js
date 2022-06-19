import variables from "./variables.js";
let matrix = variables.matrix

class Cell {
    constructor(x, y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiplay = 1;
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

  change() {
    switch (this.index) {
        case 1:
            this.index = 0;
            break;

        case 0:
            this.index = 1;
            break; 

    }
}
    findIndex() {
        matrix[this.y][this.x] = this.index
    }
    
    live() {
        this.multiplay++
        switch (this.index) {
            case 0:
                if(this.chooseCell(1).length == 3){
                    this.change();
                }
                break;
            
            case 1:
                if (this.chooseCell(1).length > 3 || this.chooseCell(1).length < 2) {    
                    this.change();
                }
                break;
        }  
    }
}
 
export default Cell
