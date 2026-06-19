let clienteActual = null;
let usuariosEditando = [];
let modulosEditando = [];
let wbrEditando = null;
let editMode = { info: false, redes: false, sistemas: false };
let contactoEditando = null;

function loadConfiguracionModule() {
  console.log('🔧 loadConfiguracionModule EJECUTÁNDOSE');
  const mainContent = document.getElementById('main-content');
  
  const html = `
    <div class="config-container" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h1>⚙️ Configuración</h1>
      <div class="progress-steps" style="display: flex; justify-content: space-around; margin: 40px 0; padding: 20px; border-bottom: 2px solid #ddd;">
        <div class="step active" data-step="1" onclick="goToStep(1)" style="text-align: center; cursor: pointer;">
          <div class="step-circle" style="width: 50px; height: 50px; background: #4a90e2; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold;">1</div>
          <div class="step-label" style="margin-top: 10px;">Cliente</div>
        </div>
        <div class="step" data-step="2" onclick="goToStep(2)" style="text-align: center; cursor: pointer;">
          <div class="step-circle" style="width: 50px; height: 50px; background: #ccc; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold;">2</div>
          <div class="step-label" style="margin-top: 10px;">Usuarios</div>
        </div>
        <div class="step" data-step="3" onclick="goToStep(3)" style="text-align: center; cursor: pointer;">
          <div class="step-circle" style="width: 50px; height: 50px; background: #ccc; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold;">3</div>
          <div class="step-label" style="margin-top: 10px;">Módulos</div>
        </div>
        <div class="step" data-step="4" onclick="goToStep(4)" style="text-align: center; cursor: pointer;">
          <div class="step-circle" style="width: 50px; height: 50px; background: #ccc; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold;">4</div>
          <div class="step-label" style="margin-top: 10px;">WBR</div>
        </div>
      </div>
      
      <div class="config-step active" id="step-1" data-step="1" style="display: block;">
        <h2>📋 Datos del Cliente</h2>
        
        <!-- INFORMACIÓN GENERAL EN DOS COLUMNAS -->
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Información General</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Nombre</label><input type="text" id="cliente-nombre" readonly style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Dirección</label><input type="text" id="cliente-direccion" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Sector</label><input type="text" id="cliente-sector" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Año de Fundación</label><input type="number" id="cliente-year" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          </div>
          <div style="margin-top: 20px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Página Web</label><input type="url" id="cliente-web" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
          </div>
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" id="btn-editar-info" onclick="toggleEdit('info')" style="padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-info" onclick="guardarCliente('info')" style="display:none; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar</button>
          </div>
        </div>

        <!-- REDES SOCIALES EN DOS COLUMNAS -->
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🔗 Redes Sociales</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Instagram</label><input type="text" id="cliente-instagram" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">Facebook</label><input type="text" id="cliente-facebook" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">LinkedIn</label><input type="text" id="cliente-linkedin" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">TikTok</label><input type="text" id="cliente-tiktok" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          </div>
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" id="btn-editar-redes" onclick="toggleEdit('redes')" style="padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-redes" onclick="guardarCliente('redes')" style="display:none; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar</button>
          </div>
        </div>

        <!-- SISTEMAS EN DOS COLUMNAS -->
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>💻 Sistemas y Herramientas</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">ERP</label><input type="text" id="cliente-erp" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">CRM</label><input type="text" id="cliente-crm" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          </div>
          <div style="margin-top: 20px;">
            <button class="btn btn-primary" id="btn-editar-sistemas" onclick="toggleEdit('sistemas')" style="padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-sistemas" onclick="guardarCliente('sistemas')" style="display:none; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar</button>
          </div>
        </div>

        <!-- CONTACTOS -->
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>👥 Contactos</h3>
          <div id="contactos-list" style="margin: 15px 0;"></div>
          <button class="btn btn-secondary" onclick="openModalContacto()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Agregar Contacto</button>
        </div>

        <div style="margin: 40px 0; display: flex; justify-content: flex-end;">
          <button class="btn btn-next" onclick="goToStep(2)" style="padding: 12px 24px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-2" data-step="2" style="display:none;">
        <h2>👥 Usuarios y Permisos</h2>
        <div id="usuarios-list" style="margin: 20px 0; background: white; padding: 20px; border-radius: 8px; overflow-x: auto;"></div>
        <button class="btn btn-secondary" onclick="openModalUsuario()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Agregar Usuario</button>
        <button class="btn btn-success" onclick="guardarUsuarios()" style="margin-left: 10px; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar Cambios</button>
        <div style="margin: 40px 0; display: flex; justify-content: space-between;">
          <button class="btn btn-prev" onclick="goToStep(1)" style="padding: 12px 24px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">← Anterior</button>
          <button class="btn btn-next" onclick="goToStep(3)" style="padding: 12px 24px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-3" data-step="3" style="display:none;">
        <h2>🎛️ Módulos</h2>
        <p style="color: #666; font-size: 14px;">Selecciona qué módulos activa para este cliente</p>
        <div id="modulos-list" style="margin: 20px 0; background: white; padding: 20px; border-radius: 8px;"></div>
        <button class="btn btn-success" onclick="guardarModulos()" style="margin-top: 20px; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar Módulos</button>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">💡 Nota: Acciones e Historial siempre están activos</p>
        <div style="margin: 40px 0; display: flex; justify-content: space-between;">
          <button class="btn btn-prev" onclick="goToStep(2)" style="padding: 12px 24px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">← Anterior</button>
          <button class="btn btn-next" onclick="goToStep(4)" style="padding: 12px 24px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-4" data-step="4" style="display:none;">
        <h2>📅 Estructura WBR</h2>
        <div id="wbr-list" style="margin: 20px 0; background: white; padding: 20px; border-radius: 8px;"></div>
        <button class="btn btn-success" onclick="guardarWbr()" style="margin-top: 20px; padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar Estructura</button>
        <div style="margin: 40px 0; display: flex; justify-content: flex-start;">
          <button class="btn btn-prev" onclick="goToStep(3)" style="padding: 12px 24px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">← Anterior</button>
        </div>
      </div>
    </div>

    <!-- MODAL: CONTACTO -->
    <div class="modal" id="modal-contacto" style="display:none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">
      <div class="modal-content" style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 id="modal-contacto-title" style="margin: 0;">➕ Agregar Contacto</h2>
          <button onclick="closeModal('contacto')" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="contacto-id">
          <div style="margin: 15px 0;"><label style="display: block; font-weight: bold; margin-bottom: 5px;">Nombre:*</label><input type="text" id="contacto-nombre" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          <div style="margin: 15px 0;"><label style="display: block; font-weight: bold; margin-bottom: 5px;">Puesto:*</label><input type="text" id="contacto-puesto" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          <div style="margin: 15px 0;"><label style="display: block; font-weight: bold; margin-bottom: 5px;">Teléfono:*</label><input type="tel" id="contacto-telefono" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          <div style="margin: 15px 0;"><label style="display: block; font-weight: bold; margin-bottom: 5px;">Correo:*</label><input type="email" id="contacto-correo" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
        </div>
        <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
          <button onclick="guardarContacto()" style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Guardar</button>
          <button onclick="closeModal('contacto')" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
        </div>
      </div>
    </div>
  `;
  
  mainContent.innerHTML = html;
  console.log('✅ HTML inyectado');
  setTimeout(() => { console.log('⏱️ Iniciando carga de datos...'); cargarConfiguracion(); }, 100);
}

async function cargarConfiguracion() { await cargarCliente(); await cargarContactos(); await cargarUsuarios(); await cargarModulos(); await cargarWbr(); console.log('✅ Todos los datos cargados'); }

function goToStep(stepNum) { 
  document.querySelectorAll('.config-step').forEach(s => s.style.display = 'none'); 
  document.querySelectorAll('.step .step-circle').forEach(s => s.style.background = '#ccc'); 
  const step = document.getElementById(`step-${stepNum}`); 
  if (step) step.style.display = 'block'; 
  const bubble = document.querySelector(`.step[data-step="${stepNum}"] .step-circle`); 
  if (bubble) bubble.style.background = '#4a90e2'; 
}

async function cargarCliente() { const res = await getClientes(); if (res.ok && res.data.length > 0) { clienteActual = res.data[0]; document.getElementById('cliente-nombre').value = clienteActual.nombre || ''; document.getElementById('cliente-direccion').value = clienteActual.dirección || ''; document.getElementById('cliente-sector').value = clienteActual.sector || ''; document.getElementById('cliente-year').value = clienteActual.año_fundación || ''; document.getElementById('cliente-web').value = clienteActual.página_web || ''; document.getElementById('cliente-instagram').value = clienteActual.instagram || ''; document.getElementById('cliente-facebook').value = clienteActual.facebook || ''; document.getElementById('cliente-linkedin').value = clienteActual.linkedin || ''; document.getElementById('cliente-tiktok').value = clienteActual.tiktok || ''; document.getElementById('cliente-erp').value = clienteActual.erp || ''; document.getElementById('cliente-crm').value = clienteActual.crm || ''; console.log('✅ Cliente cargado'); } }

function toggleEdit(section) { editMode[section] = !editMode[section]; const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; inputs.forEach(id => { document.querySelector(id).disabled = !editMode[section]; }); const editBtn = document.getElementById(`btn-editar-${section}`); const saveBtn = document.getElementById(`btn-guardar-${section}`); if (editMode[section]) { editBtn.style.display = 'none'; saveBtn.style.display = 'inline-block'; } else { editBtn.style.display = 'inline-block'; saveBtn.style.display = 'none'; } }

async function guardarCliente(section) { if (!clienteActual) return; const datos = { nombre: clienteActual.nombre, dirección: document.getElementById('cliente-direccion').value, sector: document.getElementById('cliente-sector').value, año_fundación: document.getElementById('cliente-year').value, página_web: document.getElementById('cliente-web').value, instagram: document.getElementById('cliente-instagram').value, facebook: document.getElementById('cliente-facebook').value, linkedin: document.getElementById('cliente-linkedin').value, tiktok: document.getElementById('cliente-tiktok').value, erp: document.getElementById('cliente-erp').value, crm: document.getElementById('cliente-crm').value }; const res = await updateCliente(datos); if (res.ok) { alert('✅ Guardado'); editMode[section] = false; const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; inputs.forEach(id => { document.querySelector(id).disabled = true; }); const editBtn = document.getElementById(`btn-editar-${section}`); const saveBtn = document.getElementById(`btn-guardar-${section}`); editBtn.style.display = 'inline-block'; saveBtn.style.display = 'none'; cargarCliente(); } }

async function cargarContactos() { 
  const res = await getContactos(); 
  if (res.ok) { 
    const lista = document.getElementById('contactos-list'); 
    lista.innerHTML = res.data.map(c => `
      <div style="padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin: 8px 0; background: #fafafa; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${c.nombre}</strong><br>
          <small style="color: #666;">${c.puesto} | ${c.teléfono} | ${c.correo}</small>
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="editarContacto('${c.id_contacto}')" style="padding: 6px 12px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
          <button onclick="eliminarContacto('${c.id_contacto}')" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Eliminar</button>
        </div>
      </div>
    `).join(''); 
  } 
}

function openModalContacto() { 
  contactoEditando = null;
  document.getElementById('contacto-id').value = '';
  document.getElementById('contacto-nombre').value = '';
  document.getElementById('contacto-puesto').value = '';
  document.getElementById('contacto-telefono').value = '';
  document.getElementById('contacto-correo').value = '';
  document.getElementById('modal-contacto-title').textContent = '➕ Agregar Contacto';
  document.getElementById('modal-contacto').style.display = 'flex';
}

function editarContacto(id) {
  const res = getContactos();
  res.then(r => {
    if (r.ok) {
      const contacto = r.data.find(c => c.id_contacto === id);
      if (contacto) {
        contactoEditando = contacto;
        document.getElementById('contacto-id').value = contacto.id_contacto;
        document.getElementById('contacto-nombre').value = contacto.nombre;
        document.getElementById('contacto-puesto').value = contacto.puesto;
        document.getElementById('contacto-telefono').value = contacto.teléfono;
        document.getElementById('contacto-correo').value = contacto.correo;
        document.getElementById('modal-contacto-title').textContent = '✏️ Editar Contacto';
        document.getElementById('modal-contacto').style.display = 'flex';
      }
    }
  });
}

async function guardarContacto() { 
  const id = document.getElementById('contacto-id').value;
  const datos = {
    id_contacto: id || 'C' + Date.now(),
    nombre: document.getElementById('contacto-nombre').value,
    puesto: document.getElementById('contacto-puesto').value,
    teléfono: document.getElementById('contacto-telefono').value,
    correo: document.getElementById('contacto-correo').value
  };
  if (!datos.nombre || !datos.puesto || !datos.teléfono || !datos.correo) { alert('❌ Completa todos'); return; }
  
  let res;
  if (id) {
    res = await updateContacto(datos);
  } else {
    res = await createContacto(datos);
  }
  if (res.ok) { closeModal('contacto'); cargarContactos(); }
}

async function eliminarContacto(id) { if (confirm('¿Eliminar contacto?')) { await deleteContacto(id); cargarContactos(); } }

function closeModal(name) { 
  const modal = document.getElementById(`modal-${name}`);
  if (modal) modal.style.display = 'none';
}

function openModalUsuario() { alert('Modal usuario - En construcción'); }
async function guardarUsuario() { }
async function guardarUsuarios() { alert('✅ Guardado'); }

async function cargarUsuarios() { 
  const res = await getUsuarios(); 
  if (res.ok) { 
    usuariosEditando = res.data; 
    const lista = document.getElementById('usuarios-list');
    if (lista) { 
      let html = '<table style="width: 100%; border-collapse: collapse;"><thead><tr style="background: #f0f0f0; border-bottom: 2px solid #ddd;"><th style="padding: 12px; text-align: left;">Nombre</th><th style="padding: 12px; text-align: left;">Rol</th><th style="padding: 12px; text-align: left;">Categoría</th></tr></thead><tbody>';
      res.data.forEach((u, idx) => {
        html += `<tr style="border-bottom: 1px solid #eee; ${idx % 2 === 0 ? 'background: #f9f9f9;' : ''}"><td style="padding: 12px;">${u.nombre}</td><td style="padding: 12px;">${u.rol}</td><td style="padding: 12px;">${u.categoría || '-'}</td></tr>`;
      });
      html += '</tbody></table>';
      lista.innerHTML = html;
    }
  } 
}

async function cargarModulos() { 
  const res = await getModulos(); 
  if (res.ok) { 
    modulosEditando = res.data; 
    const lista = document.getElementById('modulos-list');
    if (lista) { 
      let html = '';
      res.data.forEach(m => {
        html += `<div style="padding: 12px; border: 1px solid #eee; border-radius: 4px; margin: 8px 0; display: flex; align-items: center;"><input type="checkbox" ${m.activo === 'Sí' ? 'checked' : ''} onchange="toggleModulo('${m.id_módulo}', this.checked)" style="margin-right: 10px;"><label style="cursor: pointer; flex: 1;">${m.nombre_módulo}</label></div>`;
      });
      lista.innerHTML = html;
    }
  } 
}

function toggleModulo(id, checked) { const m = modulosEditando.find(x => x.id_módulo === id); if (m) m.activo = checked ? 'Sí' : 'No'; }
async function guardarModulos() { for (const m of modulosEditando) await updateModulo(m); alert('✅ Guardado'); }

async function cargarWbr() { 
  const res = await getWbrConfig(); 
  if (res.ok) { 
    wbrEditando = res.data; 
    const lista = document.getElementById('wbr-list');
    if (lista) { 
      let html = '';
      res.data.forEach(p => {
        html += `<div style="padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin: 10px 0; background: #fafafa; display: flex; justify-content: space-between; align-items: center;"><div><h4 style="margin: 0 0 5px 0;">Paso ${p.paso}: ${p.nombre}</h4><p style="margin: 0; color: #666; font-size: 13px;">${p.descripción}</p></div><button onclick="alert('WBR config - En construcción')" style="padding: 8px 16px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer;">⚙️</button></div>`;
      });
      lista.innerHTML = html;
    }
  } 
}

async function guardarWbr() { alert('✅ Guardado'); }