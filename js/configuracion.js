let clienteActual = null;
let usuariosEditando = [];
let modulosEditando = [];
let wbrEditando = null;
let editMode = { info: false, redes: false, sistemas: false };

function loadConfiguracionModule() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <link rel="stylesheet" href="css/configuracion.css">
    <div class="config-container">
      <h1>⚙️ Configuración</h1>
      <div class="progress-steps">
        <div class="step active" data-step="1" onclick="goToStep(1)"><div class="step-circle">1</div><div class="step-label">Cliente</div></div>
        <div class="step" data-step="2" onclick="goToStep(2)"><div class="step-circle">2</div><div class="step-label">Usuarios</div></div>
        <div class="step" data-step="3" onclick="goToStep(3)"><div class="step-circle">3</div><div class="step-label">Módulos</div></div>
        <div class="step" data-step="4" onclick="goToStep(4)"><div class="step-circle">4</div><div class="step-label">WBR</div></div>
      </div>
      
      <div class="config-step active" id="step-1" data-step="1">
        <h2>📋 Datos del Cliente</h2>
        <div class="config-section">
          <h3>Información General</h3>
          <div class="form-group"><label>Nombre</label><input type="text" id="cliente-nombre" readonly></div>
          <div class="form-group"><label>Dirección</label><input type="text" id="cliente-direccion" disabled></div>
          <div class="form-group"><label>Sector</label><input type="text" id="cliente-sector" disabled></div>
          <div class="form-group"><label>Año de Fundación</label><input type="number" id="cliente-year" disabled></div>
          <div class="form-group"><label>Página Web</label><input type="url" id="cliente-web" disabled></div>
          <div class="button-group"><button class="btn btn-primary" id="btn-editar-info" onclick="toggleEdit('info')">✏️ Editar</button><button class="btn btn-success" id="btn-guardar-info" onclick="guardarCliente('info')" style="display:none;">💾 Guardar</button></div>
        </div>
        <div class="config-section">
          <h3>🔗 Redes Sociales</h3>
          <div class="form-group"><label>Instagram</label><input type="text" id="cliente-instagram" disabled></div>
          <div class="form-group"><label>Facebook</label><input type="text" id="cliente-facebook" disabled></div>
          <div class="form-group"><label>LinkedIn</label><input type="text" id="cliente-linkedin" disabled></div>
          <div class="form-group"><label>TikTok</label><input type="text" id="cliente-tiktok" disabled></div>
          <div class="button-group"><button class="btn btn-primary" id="btn-editar-redes" onclick="toggleEdit('redes')">✏️ Editar</button><button class="btn btn-success" id="btn-guardar-redes" onclick="guardarCliente('redes')" style="display:none;">💾 Guardar</button></div>
        </div>
        <div class="config-section">
          <h3>💻 Sistemas y Herramientas</h3>
          <div class="form-group"><label>ERP</label><input type="text" id="cliente-erp" disabled></div>
          <div class="form-group"><label>CRM</label><input type="text" id="cliente-crm" disabled></div>
          <div class="button-group"><button class="btn btn-primary" id="btn-editar-sistemas" onclick="toggleEdit('sistemas')">✏️ Editar</button><button class="btn btn-success" id="btn-guardar-sistemas" onclick="guardarCliente('sistemas')" style="display:none;">💾 Guardar</button></div>
        </div>
        <div class="config-section"><h3>👥 Contactos</h3><div id="contactos-list" class="contactos-list"></div><button class="btn btn-secondary" onclick="openModalContacto()">➕ Agregar Contacto</button></div>
        <div class="button-group step-nav"><button class="btn btn-next" onclick="goToStep(2)">Siguiente →</button></div>
      </div>

      <div class="config-step" id="step-2" data-step="2" style="display:none;">
        <h2>👥 Usuarios y Permisos</h2>
        <div class="usuarios-list" id="usuarios-list"></div>
        <button class="btn btn-secondary" onclick="openModalUsuario()">➕ Agregar Usuario</button>
        <button class="btn btn-success" onclick="guardarUsuarios()" style="margin-left: 10px;">💾 Guardar Cambios</button>
        <div class="button-group step-nav"><button class="btn btn-prev" onclick="goToStep(1)">← Anterior</button><button class="btn btn-next" onclick="goToStep(3)">Siguiente →</button></div>
      </div>

      <div class="config-step" id="step-3" data-step="3" style="display:none;">
        <h2>🎛️ Módulos</h2>
        <p class="section-hint">Selecciona qué módulos activa para este cliente</p>
        <div class="modulos-list" id="modulos-list"></div>
        <button class="btn btn-success" onclick="guardarModulos()" style="margin-top: 20px;">💾 Guardar Módulos</button>
        <p class="section-hint" style="margin-top: 20px;">💡 Nota: Acciones e Historial siempre están activos</p>
        <div class="button-group step-nav"><button class="btn btn-prev" onclick="goToStep(2)">← Anterior</button><button class="btn btn-next" onclick="goToStep(4)">Siguiente →</button></div>
      </div>

      <div class="config-step" id="step-4" data-step="4" style="display:none;">
        <h2>📅 Estructura WBR</h2>
        <div class="wbr-list" id="wbr-list"></div>
        <button class="btn btn-success" onclick="guardarWbr()" style="margin-top: 20px;">💾 Guardar Estructura</button>
        <div class="button-group step-nav"><button class="btn btn-prev" onclick="goToStep(3)">← Anterior</button></div>
      </div>
    </div>

    <div class="modal" id="modal-contacto"><div class="modal-content"><div class="modal-header"><h2>➕ Agregar Contacto</h2><button class="modal-close" onclick="closeModal('contacto')">&times;</button></div><div class="modal-body"><div class="form-group"><label>Nombre:*</label><input type="text" id="contacto-nombre"></div><div class="form-group"><label>Puesto:*</label><input type="text" id="contacto-puesto"></div><div class="form-group"><label>Teléfono:*</label><input type="tel" id="contacto-telefono"></div><div class="form-group"><label>Correo:*</label><input type="email" id="contacto-correo"></div></div><div class="modal-footer"><button class="btn btn-success" onclick="guardarContacto()">💾 Guardar</button><button class="btn btn-secondary" onclick="closeModal('contacto')">Cancelar</button></div></div></div>

    <div class="modal" id="modal-usuario"><div class="modal-content"><div class="modal-header"><h2>➕ Agregar Usuario</h2><button class="modal-close" onclick="closeModal('usuario')">&times;</button></div><div class="modal-body"><div class="form-group"><label>Nombre:*</label><input type="text" id="usuario-nombre"></div><div class="form-group"><label>Correo:*</label><input type="email" id="usuario-correo"></div><div class="form-group"><label>Teléfono:*</label><input type="tel" id="usuario-telefono"></div><div class="form-group"><label>Rol:*</label><select id="usuario-rol"><option value="">Seleccionar...</option><option value="SuperAdmin">SuperAdmin</option><option value="Dirección">Dirección</option><option value="Gerencia">Gerencia</option><option value="Coordinación Comercial">Coordinación Comercial</option><option value="Coordinación Marketing">Coordinación Marketing</option><option value="Vendedor">Vendedor</option><option value="Marketing">Marketing</option><option value="Atención a Clientes">Atención a Clientes</option></select></div><div class="form-group"><label>Categoría</label><select id="usuario-categoria"><option value="">-</option><option value="Ruta">Ruta</option><option value="Comercial">Comercial</option><option value="Marketing">Marketing</option><option value="Atención en Piso">Atención en Piso</option><option value="General">General</option></select></div><div class="form-group"><label>Cumpleaños (DD/MM)</label><input type="text" id="usuario-cumpleanos" placeholder="15/03"></div><div class="form-group"><label>Fecha de Ingreso:*</label><input type="text" id="usuario-fecha-ingreso" placeholder="15/03/2023"></div><div class="form-group"><label>Estado</label><div class="checkbox-group"><label><input type="radio" name="usuario-activo" value="Sí" checked> Activo</label><label><input type="radio" name="usuario-activo" value="No"> Inactivo</label></div></div></div><div class="modal-footer"><button class="btn btn-success" onclick="guardarUsuario()">💾 Guardar</button><button class="btn btn-secondary" onclick="closeModal('usuario')">Cancelar</button></div></div></div>

    <div class="modal" id="modal-wbr-config"><div class="modal-content"><div class="modal-header"><h2 id="modal-wbr-title">⚙️ Configurar WBR</h2><button class="modal-close" onclick="closeModal('wbr-config')">&times;</button></div><div class="modal-body"><div class="form-group"><label>¿Activar este paso?</label><div class="checkbox-group"><label><input type="radio" name="wbr-activo" value="Sí" checked> Activo</label><label><input type="radio" name="wbr-activo" value="No"> Apagado</label></div></div><div class="form-group"><label>Descripción</label><textarea id="wbr-descripcion" rows="3"></textarea></div><div class="form-group" id="wbr-metas-group" style="display:none;"><label>Metas a incluir</label><div class="checkbox-list" id="wbr-metas-list"></div></div><div class="form-group" id="wbr-compromisos-group" style="display:none;"><label>Compromisos a incluir</label><div class="checkbox-list" id="wbr-compromisos-list"></div></div></div><div class="modal-footer"><button class="btn btn-success" onclick="guardarWbrPaso()">💾 Guardar</button><button class="btn btn-secondary" onclick="closeModal('wbr-config')">Cancelar</button></div></div></div>
  `;
  setTimeout(() => cargarConfiguracion(), 100);
}

async function cargarConfiguracion() { await cargarCliente(); await cargarContactos(); await cargarUsuarios(); await cargarModulos(); await cargarWbr(); }
function goToStep(stepNum) { document.querySelectorAll('.config-step').forEach(s => s.classList.remove('active')); document.querySelectorAll('.step').forEach(s => s.classList.remove('active')); const step = document.getElementById(`step-${stepNum}`); if (step) step.classList.add('active'); const bubble = document.querySelector(`.step[data-step="${stepNum}"]`); if (bubble) bubble.classList.add('active'); }
async function cargarCliente() { const res = await getClientes(); if (res.ok && res.data.length > 0) { clienteActual = res.data[0]; document.getElementById('cliente-nombre').value = clienteActual.nombre || ''; document.getElementById('cliente-direccion').value = clienteActual.dirección || ''; document.getElementById('cliente-sector').value = clienteActual.sector || ''; document.getElementById('cliente-year').value = clienteActual.año_fundación || ''; document.getElementById('cliente-web').value = clienteActual.página_web || ''; document.getElementById('cliente-instagram').value = clienteActual.instagram || ''; document.getElementById('cliente-facebook').value = clienteActual.facebook || ''; document.getElementById('cliente-linkedin').value = clienteActual.linkedin || ''; document.getElementById('cliente-tiktok').value = clienteActual.tiktok || ''; document.getElementById('cliente-erp').value = clienteActual.erp || ''; document.getElementById('cliente-crm').value = clienteActual.crm || ''; } }
function toggleEdit(section) { editMode[section] = !editMode[section]; const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; inputs.forEach(id => { document.querySelector(id).disabled = !editMode[section]; }); const editBtn = document.getElementById(`btn-editar-${section}`); const saveBtn = document.getElementById(`btn-guardar-${section}`); if (editMode[section]) { editBtn.style.display = 'none'; saveBtn.style.display = 'inline-flex'; } else { editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; } }
async function guardarCliente(section) { if (!clienteActual) return; const datos = { nombre: clienteActual.nombre, dirección: document.getElementById('cliente-direccion').value, sector: document.getElementById('cliente-sector').value, año_fundación: document.getElementById('cliente-year').value, página_web: document.getElementById('cliente-web').value, instagram: document.getElementById('cliente-instagram').value, facebook: document.getElementById('cliente-facebook').value, linkedin: document.getElementById('cliente-linkedin').value, tiktok: document.getElementById('cliente-tiktok').value, erp: document.getElementById('cliente-erp').value, crm: document.getElementById('cliente-crm').value }; const res = await updateCliente(datos); if (res.ok) { alert('✅ Guardado'); editMode[section] = false; const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; inputs.forEach(id => { document.querySelector(id).disabled = true; }); const editBtn = document.getElementById(`btn-editar-${section}`); const saveBtn = document.getElementById(`btn-guardar-${section}`); editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; cargarCliente(); } }
async function cargarContactos() { const res = await getContactos(); if (res.ok) { const lista = document.getElementById('contactos-list'); lista.innerHTML = res.data.map(c => `<div class="contacto-item"><div class="contacto-info"><h4>${c.nombre}</h4><p><strong>Puesto:</strong> ${c.puesto}</p><p><strong>Tel:</strong> ${c.teléfono}</p><p><strong>Email:</strong> ${c.correo}</p></div><button class="btn btn-danger" onclick="eliminarContacto('${c.id_contacto}')">❌</button></div>`).join(''); } }
function openModalContacto() { document.getElementById('contacto-nombre').value = ''; document.getElementById('contacto-puesto').value = ''; document.getElementById('contacto-telefono').value = ''; document.getElementById('contacto-correo').value = ''; document.getElementById('modal-contacto').classList.add('active'); }
async function guardarContacto() { const datos = { id_contacto: 'C' + Date.now(), nombre: document.getElementById('contacto-nombre').value, puesto: document.getElementById('contacto-puesto').value, teléfono: document.getElementById('contacto-telefono').value, correo: document.getElementById('contacto-correo').value }; if (!datos.nombre || !datos.puesto || !datos.teléfono || !datos.correo) { alert('❌ Completa todos'); return; } const res = await createContacto(datos); if (res.ok) { closeModal('contacto'); cargarContactos(); } }
async function eliminarContacto(id) { if (confirm('¿Eliminar?')) { await deleteContacto(id); cargarContactos(); } }
async function cargarUsuarios() { const res = await getUsuarios(); if (res.ok) { usuariosEditando = JSON.parse(JSON.stringify(res.data)); const lista = document.getElementById('usuarios-list'); if (lista) { lista.innerHTML = `<table class="usuarios-table"><thead><tr><th>Nombre</th><th>Rol</th><th>Categoría</th><th>Estado</th></tr></thead><tbody>${usuariosEditando.map(u => `<tr><td>${u.nombre}</td><td>${u.rol}</td><td>${u.categoría || '-'}</td><td>${u.activo || 'Activo'}</td></tr>`).join('')}</tbody></table>`; } } }
function openModalUsuario() { document.getElementById('usuario-nombre').value = ''; document.getElementById('usuario-correo').value = ''; document.getElementById('usuario-telefono').value = ''; document.getElementById('usuario-rol').value = ''; document.getElementById('usuario-categoria').value = ''; document.getElementById('usuario-cumpleanos').value = ''; document.getElementById('usuario-fecha-ingreso').value = ''; document.querySelector('input[name="usuario-activo"][value="Sí"]').checked = true; document.getElementById('modal-usuario').classList.add('active'); }
async function guardarUsuario() { const datos = { id_usuario: 'U' + Date.now(), nombre: document.getElementById('usuario-nombre').value, correo: document.getElementById('usuario-correo').value, teléfono: document.getElementById('usuario-telefono').value, rol: document.getElementById('usuario-rol').value, categoría: document.getElementById('usuario-categoria').value || '-', cumpleaños: document.getElementById('usuario-cumpleanos').value || '', fecha_ingreso: document.getElementById('usuario-fecha-ingreso').value, activo: document.querySelector('input[name="usuario-activo"]:checked').value }; if (!datos.nombre || !datos.correo || !datos.teléfono || !datos.rol || !datos.fecha_ingreso) { alert('❌ Completa requeridos'); return; } const res = await createUsuario(datos); if (res.ok) { closeModal('usuario'); cargarUsuarios(); } }
async function guardarUsuarios() { alert('✅ Guardado'); }
async function cargarModulos() { const res = await getModulos(); if (res.ok) { modulosEditando = JSON.parse(JSON.stringify(res.data)); const lista = document.getElementById('modulos-list'); if (lista) { lista.innerHTML = modulosEditando.map(m => `<div class="modulo-item"><input type="checkbox" ${m.activo === 'Sí' ? 'checked' : ''} onchange="toggleModulo('${m.id_módulo}', this.checked)"><div class="modulo-info"><h4>${m.nombre_módulo}</h4></div></div>`).join(''); } } }
function toggleModulo(id, checked) { const m = modulosEditando.find(x => x.id_módulo === id); if (m) m.activo = checked ? 'Sí' : 'No'; }
async function guardarModulos() { for (const m of modulosEditando) await updateModulo(m); alert('✅ Guardado'); }
async function cargarWbr() { const res = await getWbrConfig(); if (res.ok) { wbrEditando = JSON.parse(JSON.stringify(res.data)); const lista = document.getElementById('wbr-list'); if (lista) { lista.innerHTML = wbrEditando.map(p => `<div class="wbr-item"><div class="wbr-info"><h4>Paso ${p.paso}: ${p.nombre}</h4><p>${p.descripción}</p><div class="wbr-status ${p.activo !== 'Sí' ? 'inactive' : ''}">${p.activo === 'Sí' ? '✅ Activo' : '⏸️ Apagado'}</div></div><button class="btn btn-primary" onclick="openWbrConfigModal(${p.paso})">⚙️ Configurar</button></div>`).join(''); } } }
function openWbrConfigModal(paso) { const pasoConfig = wbrEditando.find(p => p.paso === paso); if (!pasoConfig) return; wbrEditando.currentPaso = paso; document.getElementById('modal-wbr-title').textContent = `⚙️ Paso ${paso}: ${pasoConfig.nombre}`; document.querySelector(`input[name="wbr-activo"][value="${pasoConfig.activo}"]`).checked = true; document.getElementById('wbr-descripcion').value = pasoConfig.descripción || ''; document.getElementById('modal-wbr-config').classList.add('active'); }
async function guardarWbrPaso() { const paso = wbrEditando.currentPaso; const pasoConfig = wbrEditando.find(p => p.paso === paso); pasoConfig.activo = document.querySelector('input[name="wbr-activo"]:checked').value; pasoConfig.descripción = document.getElementById('wbr-descripcion').value; const res = await updateWbrConfig(pasoConfig); if (res.ok) { closeModal('wbr-config'); cargarWbr(); } }
async function guardarWbr() { alert('✅ Guardado'); }
function closeModal(name) { const modal = document.getElementById(`modal-${name}`); if (modal) modal.classList.remove('active'); }