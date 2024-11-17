# Simulador STM1638

Este proyecto es un simulador de la placa STM1638, creado como parte de la asignatura de Sistemas Digitales. El simulador proporciona una interfaz para simular todas las funciones que se enseñan en la asignatura para manejar la placa. 

## Cómo utilizar el simulador

Sigue estos pasos para utilizar el simulador:

1. Descarga el proyecto desde el repositorio de GitHub.
2. Abre el archivo `index.html` en tu navegador web.
3. El proyecto contará con un código de ejemplo el cúal simula la práctica del reloj 
4. En el archivo `main.js`, encontrarás un bloque de código donde puedes escribir el código que deseas simular. Modifica este bloque según tus necesidades.
5. Guarda los cambios en el archivo `main.js`.
6. Actualiza la página en tu navegador para ver los resultados de la simulación.

## Modificar el main.js

Ya que es una simulacion en javascript y no ejecuta c tendrás que seguir los siguientes pasos con tu codigo:

1. Reemplaza las declaraciones de variables int,char,char[] por let.
2. Reemplaza las declaraciones de arrays {1,2,3} por [1,2,3].
3. Elimina los tipos de datos en los parámetros de las funciones es decir pintar(int num) pasa a pintar(num).
4. Quitar de las funciones la referencia al TM es decir de ```tm1638_DisplayChar(&TM ,7, "a")``` pasaría a ```tm1638_DisplayChar(7, "a");```


El archivo main.js se estructura de la siguiente manera para simular el main.c
1. DECLARACION DE VARIABLES
2. DECLARACION DE FUNCIONES DE USUARIO 
3. [CODIGO QUE SE EJECUTA 1 VEZ] -> equivalente a la función ```exec_1_time```
    Util para inicializar valores o por ejemplo limpiar el display o poner un mensaje de bienvenida
4. [While(1)] -> equivalente a la función ```while1```
    Codigo que se está ejecutando constantemente con un delay minimo de 55ms ≃ 18Hz entre ejecuciones
5. Una vez se este ejecutando el código podrás ver si tiene algún error en la consola del navegador es decir pulsar F12 o clicl derecho inspeccionar página
 
 
 *Si se quieren crear variables globales para interrupciones o lo que fuera se tendría que hacer en el index.html

Estas funciones que el usuario puede modificar a su conveniencia respetan la sincronizidad del ST1638 es decir no se puede ejecutar una iteración del while sin que la anterior haya finalizado de ejecutarse.