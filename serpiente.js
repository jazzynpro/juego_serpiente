
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

    const SERPIENTE = [
      { x: ((canvas.width / 2) / TAMANIO_CELDA) + 2, y: ((canvas.height / 2) / TAMANIO_CELDA) + 1 }, //cabeza
      {x:(canvas.width/2)/TAMANIO_CELDA,y:(canvas.height/2)/TAMANIO_CELDA},
      {x:((canvas.width/2)/TAMANIO_CELDA)+1,y:(canvas.height/2)/TAMANIO_CELDA},
      {x:((canvas.width/2)/TAMANIO_CELDA)+2,y:(canvas.height/2)/TAMANIO_CELDA}
     
      ];

    function pintarSerpiente(){
        for(let i = 0; i < SERPIENTE.length; i++){
        if(i == 0){ //0 siempre va a ser la cabeza
            pintarParte(SERPIENTE[i].x, SERPIENTE[i].y, "#fefff6");
        } else {
            // Cuerpo fucsia por defecto
            pintarParte(SERPIENTE[i].x, SERPIENTE[i].y);
        }
    }
    }


    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero2();
    pintarSerpiente();
    
    }
    

    function dibujarTablero(){
      ctx.strokeStyle = "#ba2a2a"; //coloca un color de línea, similar a fillStyle
      ctx.beginPath(); //se invoca siempre para iniciar un trazo
      ctx.moveTo(0,0); //posición inicial de la figura, colocar cualquier
      ctx.lineTo(600,600); //dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que recibe como parámetro, colocar cualquier valor 
      ctx.moveTo(0,600);
      ctx.lineTo(600,300); 
      ctx.moveTo(600,0);
      ctx.lineTo(100,300);
      ctx.stroke(); //dibuja la línea
    }
    function dibujarTablero2(){
      for (let i=0; i<canvas.width; i+=TAMANIO_CELDA){
        ctx.strokeStyle = "#50df17";
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvas.height);
        ctx.stroke();
      }
      for (let i=0; i<canvas.height; i+=TAMANIO_CELDA){
        ctx.strokeStyle = "#50df17";
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(canvas.width,i);
        ctx.stroke();
      }
    }
function pintarParte(lineaX, lineaY, color = "#f036f0"){
    let valorX = lineaX * TAMANIO_CELDA;
    let valorY = lineaY * TAMANIO_CELDA;
    ctx.fillStyle= color;
    ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA);
    ctx.strokeStyle = "#ececec";
    ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA);
}

//clase 12 de mayo
function moverDerecha(){
    let cabezaActual = serpiente[0];
    let nuevaCabeza = {
      x:cabezaActual.x+1,
      y: cabezaActual.y
    };
    serpiente.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    serpiente.pop();
}
function moverIzquierda(){
    let cabezaActual = serpiente[0];
    let nuevaCabeza = {
      x:cabezaActual.x-1,
      y: cabezaActual.y
    };
    serpiente.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    serpiente.pop();
}




function cambiarDireccion(direccion){
    if(cambiarDireccion == "derecha"){
      return moverDerecha();
    }else if(cambiarDireccion == "izquierda"){
      return moverIzquierda();
    }
        dibujarTodo();
}