//EXAMEN UNIDAD 2
//ALUMNO:EMMANUEL KUGUE TAPIZ
//IDS T.V
//MATERIA:GRAFICACION Y MULTIMEDIA
//MAESTRO:JESUS ZUÑIGA

let numPartes = 1;
let diametro = 90;
let centerX, centerY;
let radio;
function setup() {
    createCanvas(300, 300);
    centerX = width / 2;
    centerY = height / 2;
    radio = diametro / 2;
    let inputPartes = createInput(numPartes, 'number');
    inputPartes.position(20, 20);
    inputPartes.input(() => {
        numPartes = inputPartes.value();
        dibujarCirculos();
    });
    dibujarCirculos();
}
function dibujarCirculos() {

    background(255);
    noFill();

    stroke(0);

    strokeWeight(2);
    text("PuntoPendiente", centerX - 40, centerY - 50);
    text("DDA", centerX - 110, centerY - 50);
    text("Bresenham", centerX + 70, centerY - 50);

    circle(centerX, centerY, diametro);
    circle(centerX - 100, centerY - 50 + 50, diametro);
    circle(centerX + 100, centerY + 50 - 50, diametro);
    let angulo = 0;
    let anguloPorcion = TWO_PI / numPartes;
    for (let i = 0; i < numPartes; i++) {
        let punto1 = calcularPuntoEnCirculo(angulo);
        let punto2 = calcularPuntoEnCirculo(angulo + anguloPorcion);

        dibujarLineaPuntoPendiente(centerX, centerY, punto1.x, punto1.y);
        dibujarLineaDDA(centerX - 100, centerY, punto1.x - 100, punto1.y);
        dibujarLinebresenham(centerX + 100, centerY, punto1.x + 100, punto1.y);
        angulo += anguloPorcion;
    }
}
function calcularPuntoEnCirculo(angulo) {
    let x = centerX + radio * cos(angulo);
    let y = centerY + radio * sin(angulo);
    return { x, y };
}
function dibujarLineaPuntoPendiente(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let m = dy / dx;
    let b = y1 - m * x1;
    let x, y;

    if (dx > dy) {
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
        }
        for (x = x1; x <= x2; x++) {
            y = round(m * x + b);
            point(x, y);
        }
    } else {
        if (y1 > y2) {
            [y1, y2] = [y2, y1];
        }
        for (y = y1; y <= y2; y++) {
            x = round((y - b) / m);
            point(x, y);
        }
    }
}
function dibujarLineaDDA(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;
    let x = x1;
    let y = y1;
    for (let i = 0; i <= steps; i++) {
        point(x, y);
        x += xIncrement;
        y += yIncrement;
    }
}
function dibujarLinebresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let maxIteraciones = 45;
    let iteraciones = 0;
    while ((x0 !== x1 || y0 !== y1) && iteraciones < maxIteraciones) {
        point(x0, y0);
        let e2 = 3 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
        iteraciones++;
    }
}