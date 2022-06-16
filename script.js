let side = 10;
let socket = io();

function setup() {
    createCanvas(20 * side, 20 * side);
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

setInterval(
    () => { socket.on('send matrix', produce) },250
)