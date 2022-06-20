let side = 20;
let socket = io();
let inputData = {
    matLen: 30,
    cellCol: 450,
}
let button = document.querySelector('button')

function setup() {
    createCanvas(inputData.matLen * side, inputData.matLen * side);
    background('#646464');
}

function produce(matrix) {
    for (let y in matrix) {
        for (let x in matrix[y]) {
            if (matrix[y][x] == 1) {
                fill("#fff");
            }
            else {
                fill('#646464')
            }
            rect(x * side, y * side, side, side);
        }
    }
}

function restart() {
    socket.emit("button pressed", inputData);
}
button.onclick = restart

setInterval( () => { socket.on('send matrix', produce) },500 )