var currentdisplayNo = 0;
var display1 = document.getElementById("display-1");
var display2 = document.getElementById("display-2");
var display3 = document.getElementById("display-3");
var display4 = document.getElementById("display-4");
var display5 = document.getElementById("display-5");
var display6 = document.getElementById("display-6");
var display7 = document.getElementById("display-7");
var display8 = document.getElementById("display-8");
var DISPLAY = "________";
function setdisplays(s) {
  s = s.toString().toUpperCase();
  if (s.length > 8) {
    s = "ERROR"
    console.error("La longitud de la cadena no puede ser mayor a 8");
};
  s = s.padStart(8, "_");
  DISPLAY = s;
  actualizaDisplay();
}
function actualizaDisplay() {
  var baseClass = "display-container display-size-12 display-";

  display1.className = baseClass + (DISPLAY[0] || "_");
  display2.className = baseClass + (DISPLAY[1] || "_");
  display3.className = baseClass + (DISPLAY[2] || "_");
  display4.className = baseClass + (DISPLAY[3] || "_");
  display5.className = baseClass + (DISPLAY[4] || "_");
  display6.className = baseClass + (DISPLAY[5] || "_");
  display7.className = baseClass + (DISPLAY[6] || "_");
  display8.className = baseClass + (DISPLAY[7] || "_");

  //document.body.style.backgroundColor = '#' + (s + m + h).toString(16);
}
actualizaDisplay();
function displayClear() {
  setdisplays("________");
}
function ledOn(number) {
  var display = document.getElementById("display-" + number);
  display.className = "display-container display-size-12 display-_";
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toggleLed(index, turnOn) {
  // Comprueba que el índice esté en el rango permitido
  if (index < 0 || index > 7) {
    console.error("El índice del LED debe estar entre 0 y 7.");
    setdisplays("ERROR");
  } else {
    // Construye el ID del LED correspondiente
    var ledId = "led" + (index + 1);

    // Obtén el elemento LED por su ID
    var led = document.getElementById(ledId);

    // Asegúrate de que el elemento LED exista
    if (led) {
      if (turnOn) {
        // Añade la clase 'turnon' al LED correspondiente
        led.classList.add("on");
      } else {
        // Elimina la clase 'turnon' del LED correspondiente
        led.classList.remove("on");
      }
    }
  }
}

//API
function tm1638_DisplayClear() {
  displayClear();
}
//Position: 0-7
//state: 0-1 o true-false
function tm1638_Led(position, state) {
  if (position < 0 || position > 7) {
    setdisplays("ERROR");
    console.error("El índice del LED debe estar entre 0 y 7.");
  } else {
    toggleLed(position, state);
  }
}
function tm1638_DisplayTxt(text) {
  setdisplays(text);
}
const botones = document.querySelectorAll(".boton");

function tm1638_ScanButtons() {
  let buttons = document.querySelectorAll(".boton");
  let byte = 0;
  buttons.forEach((button, index) => {
    if (button.classList.contains("pressed")) {
      // Asumimos que la clase 'pressed' indica que el botón está presionado
      byte |= 1 << index;
    }
  });
  return byte;
}

function tm1638_ReadKey() {
  let byte = tm1638_ScanButtons();
  for (let i = 0; i < 8; i++) {
    if (byte & (1 << i)) {
      return i; // Devolver el número del botón (1-indexed)
    }
  }
  return null; // Si no hay ningún botón presionado
}

function logActivity() {
  console.log("Botones", tm1638_ScanButtons());
  console.log("DISPLAY", DISPLAY.replace(/_/g, ""));
  //console.log("LEDS");
}
function tm1638_KeyState(buttons, position) {
  return (buttons & (1 << position)) !== 0;
}

// Ejemplo de uso
botones.forEach((boton, index) => {
  boton.addEventListener("mousedown", () => {
    boton.classList.add("pressed"); // Agregar la clase 'pressed' al presionar
    const estadoBotones = tm1638_ScanButtons();
    console.log(
      `Estado de los botones: ${estadoBotones.toString(2).padStart(8, "0")}`
    );
    console.log(`Botón leído: ${tm1638_ReadKey(estadoBotones)}`);
    console.log(`Estado del botón 3: ${tm1638_KeyState(estadoBotones, 3)}`);
    //logActivity();
  });

  boton.addEventListener("mouseup", () => {
    boton.classList.remove("pressed"); // Remover la clase 'pressed' al soltar
    const estadoBotones = tm1638_ScanButtons();
    console.log(
      `Estado de los botones: ${estadoBotones.toString(2).padStart(8, "0")}`
    );
    console.log(`Botón leído: ${tm1638_ReadKey(estadoBotones)}`);
    console.log(`Estado del botón 3: ${tm1638_KeyState(estadoBotones, 3)}`);
    //logActivity();
  });

  boton.addEventListener("mouseleave", () => {
    boton.classList.remove("pressed"); // Remover la clase 'pressed' si el mouse sale del botón
    const estadoBotones = tm1638_ScanButtons();
    console.log(
      `Estado de los botones: ${estadoBotones.toString(2).padStart(8, "0")}`
    );
    //console.log(`Botón leído: ${tm1638_ReadKey(estadoBotones)}`);
    //console.log(`Estado del botón 3: ${tm1638_KeyState(estadoBotones, 3)}`);
    //logActivity();
  });
});
function tm1638_DisplayChar(pos, char) {
  if (pos < 0 || pos > 7) {
    setdisplays("ERROR");
    console.error("tm1638_DisplayChar: El índice del display debe estar entre 0 y 7.");
}
  else{setdisplays(DISPLAY.slice(0, pos) + char + DISPLAY.slice(pos + 1));
  }
}
function HAL_GetTick() {
  return Date.now();
}
//SE USA ASÍ "AWAIT HAL_Delay(1000);" para esperar 1 segundo ES IMPORANTE EL AWAIT
async function HAL_Delay(ms) {
  await sleep(ms);
}
let statusLed = true;
let statusDisplay = 0;
