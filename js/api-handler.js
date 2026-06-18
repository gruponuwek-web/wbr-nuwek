// ═══════════════════════════════════════════════════════════════════════════════
// API HANDLER - Conexión con Google Sheets via Apps Script
// ═══════════════════════════════════════════════════════════════════════════════

const GS_URL = "https://script.google.com/macros/s/AKfycbzEDNZzs6YLNF_DFPaxD_GWmYQ47d3LEbGrqdLbT8wB7WCvcvJTLa-pv8BRPfhhg2sW/exec";

async function callGS(action, data = {}) {
  try {
    const res = await fetch(GS_URL, {
      method: 'POST',
      body: new URLSearchParams({
        action,
        data: JSON.stringify(data)
      })
    });
    return await res.json();
  } catch (err) {
    console.error('Error en callGS:', err);
    return { ok: false, error: err.toString() };
  }
}

async function getClientes() { return callGS('getClientes'); }
async function getClienteById(id) { return callGS('getClienteById', { id }); }
async function createCliente(data) { return callGS('createCliente', data); }
async function updateCliente(data) { return callGS('updateCliente', data); }

async function getContactos() { return callGS('getContactos'); }
async function createContacto(data) { return callGS('createContacto', data); }
async function updateContacto(data) { return callGS('updateContacto', data); }
async function deleteContacto(id) { return callGS('deleteContacto', { id }); }

async function getUsuarios() { return callGS('getUsuarios'); }
async function createUsuario(data) { return callGS('createUsuario', data); }
async function updateUsuario(data) { return callGS('updateUsuario', data); }
async function deleteUsuario(id) { return callGS('deleteUsuario', { id }); }

async function getModulos() { return callGS('getModulos'); }
async function updateModulo(data) { return callGS('updateModulo', data); }

async function getWbrConfig() { return callGS('getWbrConfig'); }
async function updateWbrConfig(data) { return callGS('updateWbrConfig', data); }