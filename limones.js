let canvas=document.getElementById ("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20
const ALTURA_PERSONAJE=50;
const ANCHO_PERSONAJE=20;
const ANCHO_LIMON=50;
const ALTO_LIMON=50;


let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;

function iniciar(){
    intervalo=setInterval(bajarLimon,velocidadCaida);//primerParametro: funcion, segundo parametro: tiempo en milisegundos
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle="purple";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow"
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE)
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}
//mover derecha
function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="#27F58B"
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON)
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();

}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX && 
        limonX < personajeX + ANCHO_PERSONAJE
        && limonY + ALTO_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE){
        
        aparecerLimon();
        puntaje = puntaje + 1;
        mostrarEnSpan("txtPuntaje", puntaje);
        
        if(puntaje == 3){
            velocidadCaida = 150;
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }
        
        if(puntaje == 6){
            velocidadCaida = 100;
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }
        
        if(puntaje == 10){
            clearInterval(intervalo);
            alert("¡YA CONSEGUISTE 10 LIMONES! AHORA A SACAR BUENA NOTA Y A CELEBRAR CON TEQUILA (BUENO, O CON UNA COCA-COLA)");
        }
    }
}

function detectarPiso(){
    if(limonY + ALTO_LIMON == canvas.height - ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);
        if(vidas==0){
            clearInterval(intervalo);
            alert("Fin Del Juego");
        }
    }
    
}


function aparecerLimon(){
    limonX = generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();

}

function reiniciar(){
    clearInterval(intervalo);
    puntaje = 0;
    vidas = 3;
    velocidadCaida = 200;
    personajeX = canvas.width/2;
    personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
    mostrarEnSpan("txtPuntaje",puntaje);
    mostrarEnSpan("txtVidas",vidas);
    iniciar();
}

function desaparecerPersonaje(){
    ctx.clearRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}
