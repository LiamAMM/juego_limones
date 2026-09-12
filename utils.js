function generarAleatorio(min,max){
    let random=Math.random();//0-1
    let numero=random*(max-min);//0-max
    let numeroEntero = Math.ceil(numero);
    numeroEnteero = numeroEntero + min;
    return numeroEntero;
}

function mostrarEnSpan(idSpan, valor){
    let componente=document.getElementById(idSpan);
        componente.textContent=valor;
}