let side = 20;
let socket = io();
let inputData = {
    matLen: document.getElementById('matLen').value,
    gr: document.getElementById('gr').value,
    grEat: document.getElementById('grEat').value,
    pred: document.getElementById('pred').value,
}
let button = document.querySelector('button')


function setup() {
    createCanvas(20 * side, 20 * side);
    background('#646464');
    strokeWeight(0);
}

function produce(matrix) {
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
            else {
                fill('#646464')
            }
            rect(x * side, y * side, side, side);
        }
    }

}

function restart() {
    inputData = {
        matLen: document.getElementById('matLen').value,
        gr: document.getElementById('gr').value,
        grEat: document.getElementById('grEat').value,
        pred: document.getElementById('pred').value,
    }
    socket.emit("button pressed", inputData);
}

button.onclick = restart 


setInterval(
    () => { socket.on('send matrix', produce) },1000
)