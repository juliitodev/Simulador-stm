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
async function while1_help(){
    await while1();
    setTimeout(while1_help, 50);
}
async function exec_1_time_help(){
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



//FIN FUNCIONES DE USUARIO




//CODIGO QUE SE EJECUTA ANTES DEL WHILE(1)
async function exec_1_time() {
//EJEMPLO DE CODIGO
    for (let i = 0; i < 8; i++) {
        tm1638_Led(i, 1);
        await HAL_Delay(100);
    }
    for (let i = 0; i < 8; i++) {
        tm1638_Led(7-i, 0);
        await HAL_Delay(100);
    }
    tm1638_DisplayChar(0, "a");
    tm1638_DisplayChar(7, "a");
  
  await HAL_Delay(2000);
  tm1638_DisplayTxt("HOLA");
  await HAL_Delay(1000);
  //SE ESPERA QUE MUESTRE ERROR DADO QUE LA LONGITUD DE LA CADENA ES MAYOR A 8
  //tm1638_DisplayTxt("AAAAAAAAAAAAAA");
  await HAL_Delay(1000);
//FIN DE EJEMPLO
}
//BUCLE INFINITO
async function while1() {
//EJEMPLO DE CODIGO
    tm1638_Led(0, statusLed);
    statusLed = !statusLed;
  
    tm1638_DisplayTxt(statusDisplay++);
  
    if (tm1638_KeyState(tm1638_ScanButtons(), 1) == true) {
      statusDisplay += 1000;
    }
    await HAL_Delay(100);
//FIN EJEMPLO CODIGO
  }













