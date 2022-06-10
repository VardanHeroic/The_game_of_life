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
    console.log(matrix);
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


generateMatrix(matLen, gr, grEat, pred);
findObj(1, grassArr, Grass);
findObj(2, grasseaterArr, GrassEater);
findObj(3, predatorArr, Predator)
for (let i = 0; i < 49; i++) { draw()}


// let button = document.querySelector('button')
// button.onclick = function(){
//     matrix = [];
//     grassArr = [];
//     grasseaterArr = [];
//     predatorArr = [];
//     DeadgrasseaterArr = [];
//     DeadpredatorArr = [];

//     matLen = document.getElementById('matLen').value
//     gr = document.getElementById('gr').value
//     grEat = document.getElementById('grEat').value
//     pred = document.getElementById('pred').value

//     if (matLen <= 0) { matLen = 20 }
//     if (gr <= 0) { gr = 40 }
//     if (grEat <= 0) { grEat = 36 }
//     if (pred <= 0) { pred = 20 } 

//     generateMatrix(matLen, gr, grEat, pred);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     strokeWeight(0);
//     findObj(1, grassArr, 'gr', Grass);
//     findObj(2, grasseaterArr, 'gre', GrassEater);
//     findObj(3, predatorArr, ' pred', Predator)
   
// }

console.log(grassArr.length);
console.log(grasseaterArr.length);
console.log(predatorArr.length)