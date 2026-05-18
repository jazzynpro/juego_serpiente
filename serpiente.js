  let intervaloSerpiente;
  let direccionActual= "derecha";
  let comidaX = 0;
  let comidaY = 0;
  let puntaje = 0;
    
    
    
    
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

    const SERPIENTE = [
      {x:10,y:0}, //cabeza
      {x:11,y:0},
      {x:12,y:0},
      {x:13,y:0}
     
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
    generarComida();
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
    pintarComida();
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
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
      x:cabezaActual.x+1,
      y: cabezaActual.y
    };
    SERPIENTE.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    SERPIENTE.pop();
}
function moverIzquierda(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
      x:cabezaActual.x-1,
      y: cabezaActual.y
    };
    SERPIENTE.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    SERPIENTE.pop();
}

function moverArriba(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
      x:cabezaActual.x,
      y: cabezaActual.y-1
    };
    SERPIENTE.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    SERPIENTE.pop();
}

function moverAbajo(){
    let cabezaActual = SERPIENTE[0];
    let nuevaCabeza = {
      x:cabezaActual.x,
      y: cabezaActual.y+1
    };
    SERPIENTE.unshift(nuevaCabeza);
    
    //Eliminamos la ultima parte para simular el movimiento
    SERPIENTE.pop();
}



function cambiarDireccion(direccion){
    direccionActual = direccion;
}

function iniciarJuego(){
  intervaloSerpiente = setInterval(moverSerpiente, 1000);
}

function moverSerpiente(){
  console.log("moviendo");

  if(direccionActual == "derecha"){
    moverDerecha();
  }else if(direccionActual == "izquierda"){
    moverIzquierda();
  }else if(direccionActual == "arriba"){
    moverArriba();
  }else if(direccionActual == "abajo"){
    moverAbajo();
  }
   if(atrapaComida() == true){
        puntaje = puntaje + 1;
        actualizarPuntaje();
        crecerSerpiente();
        generarComida();

}
  dibujarTodo();
  
}

function pausarJuego(){
  clearInterval(intervaloSerpiente);
}

function pintarComida(){
     pintarParte(
        comidaX,
        comidaY,
        "#00ffff"
    );

  }

  function atrapaComida(){

    let cabeza = SERPIENTE[0];

    if(cabeza.x == comidaX && cabeza.y == comidaY){
      let puntaje = document.getElementById("puntaje");
        puntaje.innerHTML= ("");
        return true;
    }else{
        return false;
    }

}

  function generarComida(){

    let totalColumnas = canvas.width / TAMANIO_CELDA;

    let totalFilas = canvas.height / TAMANIO_CELDA;

    comidaX = Math.floor(Math.random() * totalColumnas);

    comidaY = Math.floor(Math.random() * totalFilas);

}

function crecerSerpiente(){

    let cola = SERPIENTE[SERPIENTE.length - 1];

    let nuevoSegmento;

    if(direccionActual == "derecha"){
        nuevoSegmento = {
            x: cola.x - 1,
            y: cola.y
        };

    }else if(direccionActual == "izquierda"){
        nuevoSegmento = {
            x: cola.x + 1,
            y: cola.y
        };

    }else if(direccionActual == "arriba"){
        nuevoSegmento = {
            x: cola.x,
            y: cola.y + 1
        };

    }else if(direccionActual == "abajo"){
        nuevoSegmento = {
            x: cola.x,
            y: cola.y - 1
        };
    }
    SERPIENTE.push(nuevoSegmento);
}

function actualizarPuntaje(){
    let componente = document.getElementById("puntaje");
    componente.innerText = puntaje;
}