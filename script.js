// import variables from './variables.js';
// let matrix = variables.matrix;
// let side = variables.side;
// let socket = io();



// function setup() {
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#646464');
//     strokeWeight(0);
// }

// function produce() {
//     for (let y in matrix) {
//         for (let x in matrix[y]) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill('yellow')
//             }
//             else if (matrix[y][x] == 3) {
//                 fill('red')
//             }
//             else if (matrix[y][x] == 9) {
//                 fill('#780800')
//             }
//             else if (matrix[y][x] == 4) {
//                 fill('#787800')
//             }
//             else {
//                 fill('#646464')
//             }
//             rect(x * side, y * side, side, side);
//         }
//     }

// }

// function reset(){
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

// let button = document.querySelector('button')
// button.onclick = reset

// setup()
// setInterval(
//     function () {
//     socket.on('send matrix', produce)
//     },1000
// )