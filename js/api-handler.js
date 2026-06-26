// ====== API HANDLER ======
// URLs y configuración
const GS_URL = "https://script.google.com/macros/s/AKfycbzEDNZzs6YLNF_DFPaxD_GWmYQ47d3LEbGrqdLbT8wB7WCvcvJTLa-pv8BRPfhhg2sW/exec";

// ====== CLIENTES ======
async function getClientes() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getClientes', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getClientes:', error);
    return { ok: false, error: error.message };
  }
}

async function updateCliente(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateCliente', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateCliente:', error);
    return { ok: false, error: error.message };
  }
}

// ====== CONTACTOS ======
async function getContactos() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getContactos', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getContactos:', error);
    return { ok: false, error: error.message };
  }
}

async function createContacto(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'createContacto', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error createContacto:', error);
    return { ok: false, error: error.message };
  }
}

async function updateContacto(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateContacto', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateContacto:', error);
    return { ok: false, error: error.message };
  }
}

async function deleteContacto(id) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'deleteContacto', data: JSON.stringify({ id_contacto: id }) })
    });
    return res.json();
  } catch (error) {
    console.error('Error deleteContacto:', error);
    return { ok: false, error: error.message };
  }
}

// ====== USUARIOS ======
async function getUsuarios() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getUsuarios', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getUsuarios:', error);
    return { ok: false, error: error.message };
  }
}

async function createUsuario(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'createUsuario', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error createUsuario:', error);
    return { ok: false, error: error.message };
  }
}

async function updateUsuario(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateUsuario', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateUsuario:', error);
    return { ok: false, error: error.message };
  }
}

async function deleteUsuario(id) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'deleteUsuario', data: JSON.stringify({ id_usuario: id }) })
    });
    return res.json();
  } catch (error) {
    console.error('Error deleteUsuario:', error);
    return { ok: false, error: error.message };
  }
}

// ====== MÓDULOS ======
async function getModulos() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getModulos', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getModulos:', error);
    return { ok: false, error: error.message };
  }
}

async function updateModulo(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateModulo', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateModulo:', error);
    return { ok: false, error: error.message };
  }
}

// ====== WBR CONFIG ======
async function getWbrConfig() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getWbrConfig', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getWbrConfig:', error);
    return { ok: false, error: error.message };
  }
}

async function updateWbrConfig(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateWbrConfig', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateWbrConfig:', error);
    return { ok: false, error: error.message };
  }
}

// ====== ACCIONES ======
async function getAcciones() {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'getAcciones', data: JSON.stringify({}) })
    });
    return res.json();
  } catch (error) {
    console.error('Error getAcciones:', error);
    return { ok: false, error: error.message };
  }
}

async function createAccion(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'createAccion', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error createAccion:', error);
    return { ok: false, error: error.message };
  }
}

async function updateAccion(datos) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'updateAccion', data: JSON.stringify(datos) })
    });
    return res.json();
  } catch (error) {
    console.error('Error updateAccion:', error);
    return { ok: false, error: error.message };
  }
}

async function deleteAccion(id) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({ action: 'deleteAccion', data: JSON.stringify({ id_accion: id }) })
    });
    return res.json();
  } catch (error) {
    console.error('Error deleteAccion:', error);
    return { ok: false, error: error.message };
  }
}