// ==============================
//  Importar datos
// ==============================

import fs from "fs";

// Leemos el archivo JSON de forma síncrona
const data = fs.readFileSync("./MOCK_DATA.json", "utf-8");

// Parseamos el string JSON a un array de objetos JavaScript
const alumnos = JSON.parse(data);

// 1) Alumnos de IDM
const alumnosIDM = alumnos.filter(a => a.Carrera === "IDM");
console.log("🎓 Alumnos de IDM:");
console.table(alumnosIDM);

// 2) Alumnos de ISC de Yucatán
const alumnosISCYucatan = alumnos.filter(
  a => a.Carrera === "ISC" && (a.Estado === "Yucatán" || a.Estado === "Yucatan")
);
console.log("\n📍 Alumnos de ISC en Yucatán:");
console.table(alumnosISCYucatan);

// 3) Todas las alumnas (Female)
const alumnas = alumnos.filter(a => a.Gender === "Female");
console.log("\n👩‍🎓 Todas las alumnas:");
console.table(alumnas);

// 4) Solo id y nombre completo
const nombresCompletos = alumnos.map(a => ({
  id: a.id,
  nombre_completo: `${a.first_name} ${a.last_name}`
}));
console.log("\n🪪 Lista con id y nombre completo:");
console.table(nombresCompletos);

