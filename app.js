const API = "https://jsonplaceholder.typicode.com"; // users, posts, comments. [web:3][web:10]

// ------------ TABS ------------
function openTab(name) {
  document.getElementById("tab-usuarios").style.display = "none";
  document.getElementById("tab-posts").style.display = "none";
  document.getElementById("tab-comentarios").style.display = "none";
  document.getElementById("tab-" + name).style.display = "block";
}

// ------------ REFERENCIAS DOM ------------
const usersTable = document.getElementById("usersTable");
const postsTable = document.getElementById("postsTable");
const commentsTable = document.getElementById("commentsTable");

const searchUserInput = document.getElementById("searchUser");
const searchPostInput = document.getElementById("searchPost");
const searchCommentInput = document.getElementById("searchComment");

const userSelect = document.getElementById("userSelect");

// formularios usuario
const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");

// formularios post
const postIdInput = document.getElementById("postId");
const postTitleInput = document.getElementById("postTitle");
const postBodyInput = document.getElementById("postBody");

// formularios comentario
const commentIdInput = document.getElementById("commentId");
const commentPostIdInput = document.getElementById("commentPostId");
const commentNameInput = document.getElementById("commentName");
const commentEmailInput = document.getElementById("commentEmail");
const commentBodyInput = document.getElementById("commentBody");

// modal
const commentModal = document.getElementById("commentModal");
const commentModalBody = document.getElementById("commentModalBody");

// botones
document.getElementById("btnLoadUsers").onclick = loadUsers;
document.getElementById("btnSaveUser").onclick = saveUser;
document.getElementById("btnDeleteUser").onclick = deleteUser;

document.getElementById("btnLoadPosts").onclick = loadPosts;
document.getElementById("btnSavePost").onclick = savePost;
document.getElementById("btnDeletePost").onclick = deletePost;

document.getElementById("btnLoadComments").onclick = loadComments;
document.getElementById("btnSaveComment").onclick = saveComment;
document.getElementById("btnDeleteComment").onclick = deleteComment;

searchUserInput.oninput = () => renderUsers(lastUsers);
searchPostInput.oninput = () => renderPosts(lastPosts);
searchCommentInput.oninput = () => renderComments(lastComments);

// estado
let lastUsers = [];
let lastPosts = [];
let lastComments = [];

// cargar datos iniciales
window.onload = () => {
  openTab("usuarios");
  loadUsers();
};

// ------------ USUARIOS ------------
async function loadUsers() {
  const res = await fetch(`${API}/users`);
  lastUsers = await res.json(); // lista de usuarios. [web:2]
  fillUserSelect();
  renderUsers(lastUsers);
}

function fillUserSelect() {
  userSelect.innerHTML = "";
  lastUsers.forEach(u => {
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = `${u.id} - ${u.name}`;
    userSelect.appendChild(opt);
  });
}

function renderUsers(data) {
  const term = searchUserInput.value.toLowerCase();
  const filtered = data.filter(u =>
    u.name.toLowerCase().includes(term) ||
    u.email.toLowerCase().includes(term)
  );

  let html = `
    <table class="w3-table w3-striped w3-bordered w3-small">
      <thead>
        <tr class="w3-light-grey">
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach(u => {
    html += `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>
          <button class="w3-button w3-green w3-small" onclick="selectUser(${u.id})">Editar</button>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  usersTable.innerHTML = html;
}

window.selectUser = function(id) {
  const u = lastUsers.find(x => x.id === id);
  if (!u) return;
  userIdInput.value = u.id;
  userNameInput.value = u.name;
  userEmailInput.value = u.email;
};

async function saveUser() {
  const id = userIdInput.value;
  const body = {
    name: userNameInput.value,
    email: userEmailInput.value
  };
  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/users/${id}` : `${API}/users`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json(); // JSONPlaceholder devuelve objeto con id simulado. [web:10]
  alert(`${method} usuario, id devuelto: ${data.id}`);
}

async function deleteUser() {
  const id = userIdInput.value;
  if (!id) return alert("Selecciona un usuario");
  await fetch(`${API}/users/${id}`, { method: "DELETE" });
  alert("DELETE usuario enviado (no se borra realmente porque la API es fake)."); // [web:2]
}

// ------------ POSTS ------------
async function loadPosts() {
  const userId = userSelect.value || 1;
  const res = await fetch(`${API}/posts?userId=${userId}`); // filtro por usuario. [web:2]
  lastPosts = await res.json();
  renderPosts(lastPosts);
}

function renderPosts(data) {
  const term = searchPostInput.value.toLowerCase();
  const filtered = data.filter(p =>
    p.title.toLowerCase().includes(term)
  );

  let html = `
    <table class="w3-table w3-striped w3-bordered w3-small">
      <thead>
        <tr class="w3-light-grey">
          <th>ID</th>
          <th>Título</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach(p => {
    html += `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>
          <button class="w3-button w3-green w3-small" onclick="selectPost(${p.id})">Editar</button>
          <button class="w3-button w3-blue w3-small" onclick="loadCommentsForPost(${p.id})">Ver comentarios</button>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  postsTable.innerHTML = html;
}

window.selectPost = function(id) {
  const p = lastPosts.find(x => x.id === id);
  if (!p) return;
  postIdInput.value = p.id;
  postTitleInput.value = p.title;
  postBodyInput.value = p.body;
  commentPostIdInput.value = p.id;
};

window.loadCommentsForPost = function(id) {
  commentPostIdInput.value = id;
  openTab("comentarios");
  loadComments();
};

async function savePost() {
  const id = postIdInput.value;
  const body = {
    userId: Number(userSelect.value),
    title: postTitleInput.value,
    body: postBodyInput.value
  };
  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/posts/${id}` : `${API}/posts`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json(); // responde con id simulado. [web:10]
  alert(`${method} post, id devuelto: ${data.id}`);
}

async function deletePost() {
  const id = postIdInput.value;
  if (!id) return alert("Selecciona un post");
  await fetch(`${API}/posts/${id}`, { method: "DELETE" });
  alert("DELETE post enviado (no se borra realmente)."); // [web:2]
}

// ------------ COMENTARIOS ------------
async function loadComments() {
  const postId = commentPostIdInput.value;
  let url;
  if (postId) {
    url = `${API}/posts/${postId}/comments`; // nested route. [web:2][web:30]
  } else {
    url = `${API}/comments`;
  }
  const res = await fetch(url);
  lastComments = await res.json();
  renderComments(lastComments);
}

function renderComments(data) {
  const term = searchCommentInput.value.toLowerCase();
  const filtered = data.filter(c =>
    c.email.toLowerCase().includes(term) ||
    c.body.toLowerCase().includes(term)
  );

  let html = `
    <table class="w3-table w3-striped w3-bordered w3-small">
      <thead>
        <tr class="w3-light-grey">
          <th>Post ID</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  filtered.forEach(c => {
    html += `
      <tr>
        <td>${c.postId}</td>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>
          <button class="w3-button w3-blue w3-small" onclick="viewComment(${c.id})">Ver</button>
          <button class="w3-button w3-amber w3-small" onclick="selectComment(${c.id})">Editar</button>
          <button class="w3-button w3-red w3-small" onclick="deleteCommentFromList(${c.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  commentsTable.innerHTML = html;
}

window.viewComment = function(id) {
  const c = lastComments.find(x => x.id === id);
  if (!c) return;
  commentModalBody.innerHTML = `
    <p><b>Post ID:</b> ${c.postId}</p>
    <p><b>ID:</b> ${c.id}</p>
    <p><b>Nombre:</b> ${c.name}</p>
    <p><b>Email:</b> ${c.email}</p>
    <p><b>Comentario:</b> ${c.body}</p>
  `;
  commentModal.style.display = "block";
};

window.closeCommentModal = function() {
  commentModal.style.display = "none";
};

window.selectComment = function(id) {
  const c = lastComments.find(x => x.id === id);
  if (!c) return;
  commentIdInput.value = c.id;
  commentPostIdInput.value = c.postId;
  commentNameInput.value = c.name;
  commentEmailInput.value = c.email;
  commentBodyInput.value = c.body;
};

async function saveComment() {
  const id = commentIdInput.value;
  const body = {
    postId: Number(commentPostIdInput.value) || 1,
    name: commentNameInput.value,
    email: commentEmailInput.value,
    body: commentBodyInput.value
  };
  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/comments/${id}` : `${API}/comments`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  alert(`${method} comentario, id devuelto: ${data.id}`); // operación simulada. [web:10]
}

async function deleteComment() {
  const id = commentIdInput.value;
  if (!id) return alert("Selecciona un comentario");
  await fetch(`${API}/comments/${id}`, { method: "DELETE" });
  alert("DELETE comentario enviado (simulado)."); // [web:2]
}

// eliminar solo de la tabla en memoria
window.deleteCommentFromList = function(id) {
  lastComments = lastComments.filter(c => c.id !== id);
  renderComments(lastComments);
};
