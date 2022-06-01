let side = 40;
let matrix = [];
let grassArr = [];
let grasseaterArr = [];
let predatorArr = [];
let DeadgrasseaterArr = [];
let DeadpredatorArr = [];
let matLen = +prompt('Map length')

if (matLen == 0) {
    matLen = 20
}

function findObj(value, Arr, name, object, ) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == value) {
                let name = new object(x, y);
                Arr.push(name)

            }
        }
    }
}


function generateMatrix(matLen, gr, grEat, pred, ) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    return matrix;
}



function setup() {
    frameRate(30);
    generateMatrix(matLen, 40, 36, 20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#646464');
    strokeWeight(0)
    findObj(1, grassArr, 'gr', Grass);
    findObj(2, grasseaterArr, 'gre', GrassEater);
    findObj(3, predatorArr, ' pred', Predator)



}
function draw() {

    for (let y in matrix) {
        for (let x in matrix[y]) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill('yellow')
            }
            else if (matrix[y][x] == 3) {
                fill('red')
            }
            else if (matrix[y][x] == 9) {
                fill('#780800')
            }
            else if (matrix[y][x] == 4) {
                fill('#787800')
            }
            else if (matrix[y][x] == 5) {
                fill('#1f3000')
            }
            else {
                fill('#646464')
            }
            rect(x * side, y * side, side, side);

            for (let i in grassArr) {
                grassArr[i].live()
            }
            for (let i in grasseaterArr) {
                grasseaterArr[i].live()
            }
            for (let i in predatorArr) {
                predatorArr[i].live()
            }

        }

    }
}

