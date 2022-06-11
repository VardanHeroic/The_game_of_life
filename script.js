let variables =  require('./variables')
let matrix = variables.matrix;
let grassArr = variables.grassArr;
let grasseaterArr = variables.grasseaterArr;
let predatorArr = variables.predatorArr;
let matLen = variables.matLen;
let gr = variables.gr;
let grEat = variables.grEat;
let pred = variables.pred;
let Grass = require('./grass')
let GrassEater = require('./grass-eater')
let Predator = require('./predator')

function findObj(value, Arr, object, ) {
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

function draw() {
    let display = matrix

    for (let i in display) {
        for (let j in  display[i]) {
           String(display[i][j])
           if(display[i][j] == 0)  {
            display[i][j] =' '
           }
           if (display[i][j] == 1) {
            display[i][j] = '!'
           }
           if (display[i][j] == 2) {
            display[i][j] = '#'
           }
           if (display[i][j] == 3) {
            display[i][j] = '@'
           }
           if (display[i][j] == 2 ** 2) {
            display[i][j] = '+'
           }
           if (display[i][j] == 3 ** 2) {
            display[i][j] = '-'
           }          
        }
        display[i].join(' ')
        console.log(`${display[i]}`)
    }
    console.log('\n');

    for (let i in grassArr) { grassArr[i].live() }
    for (let i in grasseaterArr) { grasseaterArr[i].live() }
    for (let i in predatorArr) { predatorArr[i].live() }
}


    

generateMatrix(matLen, gr, grEat, pred);
findObj(1, grassArr, Grass);
findObj(2, grasseaterArr, GrassEater);
findObj(3, predatorArr, Predator)
for (let i = 0; i < 1000; i++) { draw()}
console.log(grassArr.length);
console.log(grasseaterArr.length);
console.log(predatorArr.length)
