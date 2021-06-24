
var turno = 1;
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
var turnoAlert = document.getElementById("turnoAlert");

var cuadroTam = 100;

canvas.height = 300;
canvas.width = 300;

var matrix = [];
for(var i=0; i<3; i++) {
    matrix[i] = new Array(3);
}

/*Dibujar el gato en el canvas*/

ctx.lineWidth = 10;
ctx.strokeStyle = "black";
canvas.style.cursor = "pointer";

ctx.moveTo(100,0);
ctx.lineTo(100,300);
ctx.moveTo(200,0);
ctx.lineTo(200,300);
ctx.moveTo(0,100);
ctx.lineTo(300,100);
ctx.moveTo(0,200);
ctx.lineTo(300,200);
ctx.stroke();


/*Identificar cuando el usuario da click*/

canvas.addEventListener("click", function(event){
    var mousePos = getMouseRespectoCanvas(event);

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            var xBordeInf = x * 100;
            var yBordeInf = y * 100;
            var xBordeSup = xBordeInf + cuadroTam;
            var yBordeSup = yBordeInf + cuadroTam;

            if(mousePos.x > xBordeInf && mousePos.y > yBordeInf
                && mousePos.x < xBordeSup && mousePos.y < yBordeSup
                && matrix[xBordeInf/100][yBordeInf/100] == undefined){
                    if(turno == 1) {
                        dibujarX(xBordeInf, yBordeInf);
                        matrix[xBordeInf/100][yBordeInf/100] = 1;
                        cambiarTurno();
                    } else{
                        dibujarO(xBordeInf, yBordeInf);
                        matrix[xBordeInf/100][yBordeInf/100] = 2;
                        cambiarTurno();
                    }
                    if(yaGano()){
                        dibujarLinea();
                        canvas.style.pointerEvents = "none";
                        turnoAlert.style.color = "Red";
                        turnoAlert.innerHTML = "¡Ganó el J" + matrix[xBordeInf/100][yBordeInf/100];
                    }
            }

        }
    }

});

function getMouseRespectoCanvas(evt) {
    var rect = canvas.getBoundingClientRect();
    
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

/*Dibujar Figuras*/

function dibujarX(xInf, yInf){
    var margen = 25;

    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#e84118";

    ctx.beginPath();

    ctx.moveTo(xInf + margen, yInf + margen);
    ctx.lineTo(xInf+cuadroTam-margen, yInf+cuadroTam-margen);
    ctx.moveTo(xInf + cuadroTam - margen, yInf + margen);
    ctx.lineTo(xInf+margen, yInf+ cuadroTam-margen);
    ctx.stroke();
}

function dibujarO(xInf, yInf){
    var mitadCuadro = cuadroTam/2;
    var xCentro = xInf + mitadCuadro;
    var yCentro = yInf + mitadCuadro;
    var radio = cuadroTam/4;

    ctx.strokeStyle = "#273c75";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(xCentro, yCentro, radio, 0, 2*Math.PI);
    ctx.stroke();

}

// cambiar turno

function cambiarTurno(){
    var colorTurno;

    if(turno == 1) {
        turno = 2;
        colorTurno = "#273c75";
    }
    else {
        turno = 1;
        colorTurno =  "#e84118";  
    }
    turnoAlert.innerHTML = "Le toca al J" + turno;
    turnoAlert.style.color = colorTurno;
}


/*Refrescar Página*/
function refrescar(){
    location.reload();
}

/*checar si ganó*/
function yaGano(){
    if (matrix[0][0] == matrix[0][1] && matrix[0][0] == matrix[0][2] && matrix[0][0] != undefined) return 1;      
    else if (matrix[1][0] == matrix[1][1] && matrix[1][0] == matrix[1][2] && matrix[1][0] != undefined) return 2; 
    else if (matrix[2][0] == matrix[2][1] && matrix[2][0] == matrix[2][2] && matrix[2][0] != undefined) return 3; 
    else if (matrix[0][0] == matrix[1][0] && matrix[0][0] == matrix[2][0] && matrix[0][0] != undefined) return 4; 
    else if (matrix[0][1] == matrix[1][1] && matrix[0][1] == matrix[2][1] && matrix[0][1] != undefined) return 5;    
    else if (matrix[0][2] == matrix[1][2] && matrix[0][2] == matrix[2][2] && matrix[0][2] != undefined) return 6; 
    else if (matrix[0][0] == matrix[1][1] && matrix[0][0] == matrix[2][2] && matrix[0][0] != undefined) return 7; 
    else if (matrix[2][0] == matrix[1][1] && matrix[2][0] == matrix[0][2] && matrix[2][0] != undefined) return 8; 
    else return false;

}

function dibujarLinea(){
    var caso = yaGano();
    var mitadCuadro = cuadroTam/2;
    ctx.strokeStyle = "#44bd32";
    ctx.beginPath();

    switch(caso){
        case 1:
            ctx.moveTo(mitadCuadro, mitadCuadro);
            ctx.lineTo(mitadCuadro, cuadroTam*3-mitadCuadro);
            break;
        case 2:
            ctx.moveTo(cuadroTam*1+mitadCuadro, mitadCuadro);
            ctx.lineTo(cuadroTam*1+mitadCuadro, cuadroTam*3-mitadCuadro);
            break;
        case 3:
            ctx.moveTo(cuadroTam*2+mitadCuadro, mitadCuadro);
            ctx.lineTo(cuadroTam*2+mitadCuadro, cuadroTam*3-mitadCuadro);
            break;
        case 4:
            ctx.moveTo(mitadCuadro, mitadCuadro);
            ctx.lineTo(cuadroTam*2+mitadCuadro, mitadCuadro);
            break;
        case 5:
            ctx.moveTo(mitadCuadro, cuadroTam+mitadCuadro);
            ctx.lineTo(cuadroTam*2+mitadCuadro, cuadroTam+mitadCuadro);
            break;
        case 6:
            ctx.moveTo(mitadCuadro, cuadroTam*2+mitadCuadro);
            ctx.lineTo(cuadroTam*2+mitadCuadro, cuadroTam*2+mitadCuadro);
            break;
        case 7:
            ctx.moveTo(mitadCuadro, mitadCuadro);
            ctx.lineTo(cuadroTam*2+mitadCuadro, cuadroTam*2+mitadCuadro);
            break;
        case 8:
            ctx.moveTo(cuadroTam*2+mitadCuadro, mitadCuadro);
            ctx.lineTo(mitadCuadro, cuadroTam*3-mitadCuadro);
            break;
    }
    ctx.stroke();

}