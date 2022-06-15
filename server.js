import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from 'fs'

import variables from './variables.js'
import Grass from './grass.js';
import GrassEater from './grass-eater.js';
import Predator from './predator.js';

let app = express();
let server = http.createServer(app);
let io = new Server(server);

let matrix = variables.matrix;
let matLen = 20;
let gr = 40;
let grEat = 35 ;
let pred = 20;
let grassArr = variables.grassArr;
let grasseaterArr = variables.grasseaterArr;
let predatorArr = variables.predatorArr;
let DeadgrasseaterArr = variables.DeadgrasseaterArr
let DeadpredatorArr = variables.DeadpredatorArr
let stats = {
    maxGrass: grassArr.length,
    maxGrasseater:grasseaterArr.length,
    maxPredator: predatorArr.length,
    maxDeadgrassater: DeadgrasseaterArr.length,
    maxDeadpredator: DeadpredatorArr.length,
}
let i = 0

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
console.log('Port: 3000');

function findObj(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grasseaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
                let pred = new Predator(x,y)
                predatorArr.push(pred)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
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
    io.sockets.emit('send matrix', matrix)
    return matrix;
}

function play() {
    i++

    for (let i in matrix) { console.log(`${matrix[i]}`) }
    console.log('\n');

    for (let i in grassArr) { grassArr[i].live() }
    for (let i in grasseaterArr) { grasseaterArr[i].live() }
    for (let i in predatorArr) { predatorArr[i].live() }
    
    io.sockets.emit("send matrix", matrix);

    if (grassArr.length > stats.maxGrass) { stats.maxGrass = grassArr.length }
    if (grasseaterArr.length > stats.maxGrasseater) { stats.maxGrasseater = grasseaterArr.length }
    if (predatorArr.length > stats.maxPredator) { stats.maxPredator = predatorArr.length }
    if (DeadgrasseaterArr.length > stats.maxDeadgrassater) { stats.maxDeadgrassater = DeadgrasseaterArr.length }
    if (DeadpredatorArr.length > stats.maxDeadpredator) { stats.maxDeadpredator = DeadpredatorArr.length }

    console.log(grassArr.length);
    console.log(grasseaterArr.length)
    console.log(predatorArr.length);

    if(i == 60){ 
        let JSONstats = JSON.stringify(stats); 
        fs.writeFileSync('stats.json',JSONstats)
    }
    
}   


function restart(inputData){
        
        grassArr = [];
        grasseaterArr = [];
        predatorArr = [];
        DeadgrasseaterArr = [];
        DeadpredatorArr = [];
    
        // matLen = inputData.matLen
        // gr = inputData.gr
        // grEat = inputData.grEat
        // pred = inputData.pred
    
        // if (matLen < 0) { matLen = 20 }
        // if (gr < 0) { gr = 40 }
        // if (grEat < 0) { grEat = 36 }
        // if (pred < 0) { pred = 20 } 
        
        generateMatrix(matLen, gr, grEat, pred);
        console.log(matLen);
        findObj(matrix);
        io.sockets.emit("send matrix", matrix);
        
    }


generateMatrix(matLen, gr, grEat, pred);
findObj(matrix)
// io.on('connection', (socket) => {
//     io.sockets.emit("send matrix", matrix);
//     
//     socket.on("button pressed",(inputData) =>{
//         restart(inputData)
      

//     })
// }) 
setInterval(play, 250)





