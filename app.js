/**
 * PROYECTO FINAL – Aplicación de Consola (Fundamentos JS)
 * Requisitos:
 * - Ejecuta en consola del navegador
 * - Entrada por prompt / salida por console.log y alert
 * - Funciones (3+ operaciones) + modularización
 * - Condicionales (if/switch) y bucles (while/for)
 * - Arreglos y objetos (historial + usuario)
 * - Validaciones (números, cancelación, división por cero)
 */

// =========================
// Estado (objetos y arreglos)
// =========================
const usuario = {
  nombre: "Invitado",
  operacionesRealizadas: 0,
  registrarOperacion() {
    this.operacionesRealizadas += 1;
  }
};

const historial = []; // arreglo de objetos

// =========================
// Utilidades (validación / UI)
// =========================
function mostrarTitulo() {
  console.clear();
  console.log("=======================================");
  console.log("   App Consola - Fundamentos JavaScript");
  console.log("=======================================");
  console.log(`Usuario: ${usuario.nombre} | Operaciones: ${usuario.operacionesRealizadas}`);
  console.log("---------------------------------------");
}

function pedirTexto(mensaje) {
  const entrada = prompt(mensaje);
  if (entrada === null) return null;
  return entrada.trim();
}

function pedirNumero(mensaje) {
  while (true) {
    const entrada = prompt(mensaje);
    if (entrada === null) return null;

    const numero = Number(entrada.replace(",", "."));
    if (Number.isFinite(numero)) return numero;

    alert("Entrada inválida. Ingresa un número válido.");
  }
}

function pausaConsola() {
  alert("Revisa la consola para ver resultados.\nPresiona Aceptar para continuar.");
}

// =========================
// Funciones matemáticas
// =========================
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }
function dividir(a, b) { return b === 0 ? null : a / b; }

// =========================
// Historial (arreglo de objetos)
// =========================
function registrarEnHistorial(tipo, a, b, resultado) {
  const registro = {
    id: historial.length + 1,
    tipo,
    a,
    b,
    resultado,
    fecha: new Date().toLocaleString()
  };

  historial.push(registro);
  usuario.registrarOperacion();
}

function verHistorial() {
  console.log("----- HISTORIAL (forEach) -----");

  if (historial.length === 0) {
    console.log("Aún no hay operaciones registradas.");
    return;
  }

  historial.forEach((op) => {
    console.log(`#${op.id} | ${op.tipo} | ${op.a} y ${op.b} => ${op.resultado} | ${op.fecha}`);
  });
}

function verResumen() {
  console.log("----- RESUMEN (map) -----");

  if (historial.length === 0) {
    console.log("No hay datos para resumir.");
    return;
  }

  const resumen = historial.map((op) => `${op.tipo}: ${op.resultado}`);
  console.log(resumen);
}

function filtrarHistorialPorTipo() {
  if (historial.length === 0) {
    alert("Aún no hay historial. Realiza una operación primero.");
    return;
  }

  const tipo = pedirTexto("Filtrar por tipo (ej: suma, resta, multiplicación, división):");
  if (tipo === null) return;

  if (tipo === "") {
    alert("Debes ingresar un texto para filtrar.");
    return;
  }

  const filtro = tipo.toLowerCase();
  const filtrados = historial.filter((op) => op.tipo.toLowerCase().includes(filtro));

  console.log(`----- FILTRO POR: "${tipo}" -----`);
  if (filtrados.length === 0) {
    console.log("No se encontraron coincidencias.");
    return;
  }

  filtrados.forEach((op) => {
    console.log(`#${op.id} | ${op.tipo} => ${op.resultado}`);
  });
}

function demoRecorridoArreglo() {
  const temas = ["JavaScript", "Condicionales", "Bucles", "Funciones", "Arreglos", "Objetos"];

  console.log("----- DEMO RECORRIDO DE ARREGLO -----");

  console.log("Recorrido con for:");
  for (let i = 0; i < temas.length; i++) {
    console.log(`(${i}) ${temas[i]}`);
  }

  console.log("Recorrido con while:");
  let i = 0;
  while (i < temas.length) {
    console.log(`(${i}) ${temas[i]}`);
    i++;
  }
}

// =========================
// Flujos principales
// =========================
function configurarNombre() {
  const nombre = pedirTexto("Ingresa tu nombre (o deja vacío para Invitado):");
  if (nombre === null) return;

  usuario.nombre = nombre === "" ? "Invitado" : nombre;
  alert(`Nombre configurado: ${usuario.nombre}`);
}

function calculadora() {
  const a = pedirNumero("Ingresa el primer número:");
  if (a === null) return;

  const b = pedirNumero("Ingresa el segundo número:");
  if (b === null) return;

  const opcion = pedirTexto(
    "Elige una operación:\n" +
    "1) Suma\n" +
    "2) Resta\n" +
    "3) Multiplicación\n" +
    "4) División"
  );
  if (opcion === null) return;

  let tipo = "";
  let resultado = null;

  // switch requerido
  switch (opcion) {
    case "1":
      tipo = "Suma";
      resultado = sumar(a, b);
      break;
    case "2":
      tipo = "Resta";
      resultado = restar(a, b);
      break;
    case "3":
      tipo = "Multiplicación";
      resultado = multiplicar(a, b);
      break;
    case "4":
      tipo = "División";
      resultado = dividir(a, b);
      break;
    default:
      alert("Opción inválida. Debes elegir 1, 2, 3 o 4.");
      return;
  }

  // if requerido (validación)
  if (resultado === null) {
    alert("No se puede dividir por 0.");
    console.log("División inválida: divisor = 0");
    return;
  }

  registrarEnHistorial(tipo, a, b, resultado);

  console.log(`Operación: ${tipo}`);
  console.log(`Valores: ${a} y ${b}`);
  console.log(`Resultado: ${resultado}`);

  alert(`Resultado de ${tipo}: ${resultado}`);
}

// =========================
// Menú principal (while)
// =========================
function iniciarApp() {
  alert("Bienvenido/a. Esta app se ejecuta en la consola del navegador (F12).");

  let salir = false;

  while (!salir) {
    mostrarTitulo();

    const opcion = pedirTexto(
      "MENÚ PRINCIPAL:\n" +
      "1) Configurar nombre\n" +
      "2) Calculadora (operaciones básicas)\n" +
      "3) Ver historial\n" +
      "4) Filtrar historial por tipo\n" +
      "5) Ver resumen (map)\n" +
      "6) Demo recorrido de arreglo (for/while)\n" +
      "0) Salir"
    );

    if (opcion === null) {
      // cancelar => salir (validación)
      salir = true;
      continue;
    }

    switch (opcion) {
      case "1":
        configurarNombre();
        break;
      case "2":
        calculadora();
        pausaConsola();
        break;
      case "3":
        verHistorial();
        pausaConsola();
        break;
      case "4":
        filtrarHistorialPorTipo();
        pausaConsola();
        break;
      case "5":
        verResumen();
        pausaConsola();
        break;
      case "6":
        demoRecorridoArreglo();
        pausaConsola();
        break;
      case "0":
        salir = true;
        break;
      default:
        alert("Opción inválida. Intenta nuevamente.");
    }
  }

  console.log("Aplicación finalizada.");
  alert("Aplicación finalizada. Revisa la consola para el registro final.");
}

// Ejecutar
iniciarApp();
