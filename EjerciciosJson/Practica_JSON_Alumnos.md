# Práctica: Consulta de datos en JSON con Node.js

## Objetivo

Trabajar con un archivo JSON que contiene información de 200 alumnos y aplicar operaciones con JavaScript (Node.js) para obtener diferentes consultas.  
Se aprovechan métodos como `filter` y `map` para generar subconjuntos de datos y mostrarlos en forma de tabla desde la consola.

---

## Estructura del proyecto

Carpeta de trabajo:

practica_json_alumnos/
│
├── app.js
├── MOCK_DATA.json
└── package.json



- `MOCK_DATA.json`: archivo con los 200 alumnos, cada registro con:
  - `id`
  - `first_name`
  - `last_name`
  - `Gender`
  - `Estado` → [Yucatán, Campeche, Chiapas, Tabasco]
  - `Carrera` → [ISC, ICO, ITCC, IDM]
- `app.js`: script principal donde se realizan las consultas.
- `package.json`: configuración básica del proyecto Node y activación de módulos ES.

---

## Configuración inicial

1. Crear carpeta del proyecto y entrar en ella:

mkdir practica_json_alumnos
cd practica_json_alumnos



2. Inicializar proyecto Node:

npm init -y



3. Editar `package.json` para indicar que se usan módulos ES:

{
"name": "practica_json_alumnos",
"version": "1.0.0",
"main": "app.js",
"type": "module",
"scripts": {
"start": "node app.js"
}
}



4. Copiar dentro de la carpeta:
   - El archivo `MOCK_DATA.json` (con los 200 registros).
   - El archivo `app.js` con el código descrito más adelante.

---

## Código principal (`app.js`)

import fs from "fs";

// Leer el contenido de MOCK_DATA.json como texto
const data = fs.readFileSync("./MOCK_DATA.json", "utf-8");

// Convertir el texto JSON a un arreglo de objetos
const alumnos = JSON.parse(data);

// 1) Alumnos de la carrera IDM
const alumnosIDM = alumnos.filter(a => a.Carrera === "IDM");
console.log("🎓 Alumnos de IDM:");
console.table(alumnosIDM);

// 2) Alumnos de ISC que son del estado de Yucatán
const alumnosISCYucatan = alumnos.filter(
a => a.Carrera === "ISC" && (a.Estado === "Yucatán" || a.Estado === "Yucatan")
);
console.log("\n📍 Alumnos de ISC en Yucatán:");
console.table(alumnosISCYucatan);

// 3) Todas las alumnas (género femenino)
const alumnas = alumnos.filter(a => a.Gender === "Female");
console.log("\n👩‍🎓 Todas las alumnas:");
console.table(alumnas);

// 4) Lista con id y nombre completo
const nombresCompletos = alumnos.map(a => ({
id: a.id,
nombre_completo: ${a.first_name} ${a.last_name}
}));
console.log("\n🪪 Lista con id y nombre completo:");
console.table(nombresCompletos);



### Descripción de las consultas

- **Consulta 1:** filtra todos los registros donde la propiedad `Carrera` es exactamente `"IDM"`.  
- **Consulta 2:** combina dos condiciones: que la `Carrera` sea `"ISC"` y que el `Estado` corresponda a Yucatán (considerando posibles variantes de acento).  
- **Consulta 3:** selecciona únicamente los registros donde `Gender` es `"Female"`, es decir, todas las alumnas.  
- **Consulta 4:** transforma cada objeto de alumno en uno nuevo con solo dos campos: `id` y `nombre_completo`, que es la unión de `first_name` + `last_name`.

---

## Ejecución del programa

Desde la carpeta del proyecto:

node app.js

o, usando el script definido en `package.json`:

npm start


En la terminal se mostrarán cuatro tablas consecutivas:

1. Tabla con todos los alumnos de **IDM**.  
2. Tabla con los alumnos de **ISC** cuyo estado es **Yucatán**.  
3. Tabla con todas las **alumnas** (género `Female`).  
4. Tabla con solo el **id** y el **nombre completo** de cada alumno.

---

## Conclusiones

Con esta práctica se reforzó el uso de:

- Lectura de archivos JSON en Node.js mediante el módulo `fs`.
- Conversión del contenido a estructuras JavaScript con `JSON.parse`.
- Uso de `Array.prototype.filter` para aplicar distintos criterios de selección sobre un mismo conjunto de datos.
- Uso de `Array.prototype.map` para proyectar solo los campos necesarios.
- Presentación de resultados de manera clara utilizando `console.table`, lo que facilita la revisión de la información en consola.
