let alumnos = [];

// Cargar MOCK_DATA.json desde el servidor Express
async function cargarDatos() {
  try {
    const resp = await fetch("MOCK_DATA.json");
    alumnos = await resp.json();
    mostrarIDM(); // primera vista por defecto
  } catch (error) {
    console.error("Error al cargar MOCK_DATA.json", error);
    document.getElementById("tabla").innerHTML =
      "<tr><td>Error al cargar los datos</td></tr>";
  }
}

// Renderizar tabla en el HTML
function renderTabla(datos, modo) {
  const tabla = document.getElementById("tabla");
  const descripcion = document.getElementById("descripcion");
  let html = "";

  if (modo === "id_nombre") {
    descripcion.textContent =
      "Mostrando lista con id y nombre completo de todos los alumnos.";

    html += `
      <tr class="w3-dark-grey">
        <th>Id</th>
        <th>Nombre completo</th>
      </tr>
    `;

    datos.forEach(a => {
      const nombreCompleto = `${a.first_name} ${a.last_name}`;
      html += `
        <tr>
          <td>${a.id}</td>
          <td>${nombreCompleto}</td>
        </tr>
      `;
    });
  } else {
    descripcion.textContent =
      "Mostrando lista de alumnos con todos los campos.";

    html += `
      <tr class="w3-dark-grey">
        <th>Id</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Género</th>
        <th>Estado</th>
        <th>Carrera</th>
      </tr>
    `;

    datos.forEach(a => {
      html += `
        <tr>
          <td>${a.id}</td>
          <td>${a.first_name}</td>
          <td>${a.last_name}</td>
          <td>${a.Gender}</td>
          <td>${a.Estado}</td>
          <td>${a.Carrera}</td>
        </tr>
      `;
    });
  }

  tabla.innerHTML = html;
}

// a) Alumnos de IDM
function mostrarIDM() {
  const filtrados = alumnos.filter(a => a.Carrera === "IDM");
  renderTabla(filtrados, "completo");
}

// b) Alumnos de ISC de Yucatán
function mostrarISCYucatan() {
  const filtrados = alumnos.filter(
    a =>
      a.Carrera === "ISC" &&
      (a.Estado === "Yucatán" || a.Estado === "Yucatan")
  );
  renderTabla(filtrados, "completo");
}

// c) Todas las alumnas (Female)
function mostrarAlumnas() {
  const filtrados = alumnos.filter(a => a.Gender === "Female");
  renderTabla(filtrados, "completo");
}

// d) Id y nombre completo
function mostrarNombreCompleto() {
  renderTabla(alumnos, "id_nombre");
}

// Cargar datos al abrir la página
cargarDatos();
