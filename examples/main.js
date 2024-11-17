/*
ESTE ARCHIVO ES EL QUE INTENTA SUBSTITUIR AL main.c LA ESTRUCTURA DEL ARCHIVO ES LA SIGUIENTE
1.- DECLARACION DE VARIABLES
2.- DECLARACION DE FUNCIONES DE USUARIO 
3.- [CODIGO QUE SE EJECUTA 1 VEZ] - exec_1_time
    Util para inicializar valores o por ejemplo limpiar el display o poner un mensaje de bienvenida
4.- [While(1)] - while1
    Codigo que se está ejecutando constantemente con un delay minimo de 55ms ≃ 18Hz entre ejecuciones

PARA EJECUTAR EL HAL_DELAY HACERLO ASI:
await HAL_Delay(2000); //2 segundos
*/

//NO TOCAR
//NO TOCAR
//NO TOCAR
//NO TOCAR
async function while1_help() {
    await while1();
    setTimeout(while1_help, 50);
  }
  async function exec_1_time_help() {
    await exec_1_time();
    await while1_help();
  }
  try {
    exec_1_time_help();
  } catch (e) {
    console.error(e);
    while1();
  }
  //FIN NO TOCAR
  //FIN NO TOCAR
  //FIN NO TOCAR
  //FIN NO TOCAR
  
  //DECLARACION DE VARIABLES
  
  let tiempo = [0, 0, 0, 0];
  
  //FIN DECLARACION DE VARIABLES
  
  // FUNCIONES DE USUARIO
  /*
          IMPORTANTE NO OLVIDARSE DE LO SIGUIENTE SI NO VA A FALLAR EL CODIGO
          SE CREAN CON ASYNC Y SE EJECUTAN CON AWAIT
              
              EJEMPLO
              async function gestionarBotones(ms) {
                  //CODIGO
              }
  
              await gestionarBotones();
  
  */
  function showDisplays() {
    for (let i = 0; i < 4; i++) {
      tm1638_DisplayChar(i, tiempo[i]);
    }
  }
  
  function detenerContador() {
    showDisplays();
  }
  
  function reiniciarContador() {
    for (let i = 0; i < 4; i++) {
      tiempo[i] = 0;
    }
    showDisplays();
  }
  function contarHaciaDelante() {
    tiempo[3]++;
  
    for (let i = 3; i > 0; i--) {
      if (tiempo[i] > 9) {
        tiempo[i - 1]++;
  
        tiempo[i] = 0;
      }
    }
  
    if (tiempo[0] > 9) {
      tiempo[0] = 0;
    }
  
    showDisplays();
  }
  function contarHaciaAtras() {
    tiempo[3]--;
  
    for (let i = 3; i > 0; i--) {
      if (tiempo[i] < 0) {
        tiempo[i - 1]--;
  
        tiempo[i] = 9;
      }
    }
    if (tiempo[0] < 0) {
      tiempo[0] = 9;
    }
  
    showDisplays();
  }
  
  function iniciarContador() {
    for (let i = 0; i < 4; i++) {
      tiempo[i] = 0;
    }
    globalBotonSeleccionado = 3;
  }
  
  function cambiarOperacion(botonSeleccionado) {
    switch (botonSeleccionado) {
      case 0:
        detenerContador();
        break;
      case 1:
        reiniciarContador();
        break;
      case 2:
        contarHaciaDelante();
        break;
      case 3:
        contarHaciaAtras();
        break;
      case 4:
        iniciarContador();
        break;
    }
  }
  //FIN FUNCIONES DE USUARIO
  
  //CODIGO QUE SE EJECUTA ANTES DEL WHILE(1)
  async function exec_1_time() {
    tm1638_DisplayClear();
  
  }
  //BUCLE INFINITO
  async function while1() {
      cambiarOperacion(globalBotonSeleccionado);
      await HAL_Delay(100);
    //FIN EJEMPLO CODIGO
  }
  
  
  