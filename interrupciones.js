
let botonesInterrupcion = document.querySelectorAll('.boton');

botonesInterrupcion.forEach((boton, index) => {
    boton.addEventListener('mousedown', botonPresionadoInterrupcion);

});














/*
POR AHORA SOLO ESTA IMPLEMENTADA LA INTERRUPCION DE PRESIONAR UN BOTON Y ES LA SIGUIENTE FUNCION
*/
function botonPresionadoInterrupcion() {
    console.log('botonPresionadoInterrupcion');
    globalBotonSeleccionado = tm1638_ReadKey(tm1638_ScanButtons());
}
