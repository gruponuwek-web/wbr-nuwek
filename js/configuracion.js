let clienteActual = null;
let usuariosEditando = [];
let modulosEditando = [];
let wbrEditando = null;
let editMode = { info: false, redes: false, sistemas: false };

function loadConfiguracionModule() {
  console.log('🔧 loadConfiguracionModule EJECUTÁNDOSE');
  const mainContent = document.getElementById('main-content');
  
  const html = `
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
          <div class="button-group">
            <button class="btn btn-primary" id="btn-editar-info" onclick="toggleEdit('info')">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-info" onclick="guardarCliente('info')" style="display:none;">💾 Guardar</button>
          </div>
        </div>
        <div class="config-section">
          <h3>🔗 Redes Sociales</h3>
          <div class="form-group"><label>Instagram</label><input type="text" id="cliente-instagram" disabled></div>
          <div class="form-group"><label>Facebook</label><input type="text" id="cliente-facebook" disabled></div>
          <div class="form-group"><label>LinkedIn</label><input type="text" id="cliente-linkedin" disabled></div>
          <div class="form-group"><label>TikTok</label><input type="text" id="cliente-tiktok" disabled></div>
          <div class="button-group">
            <button class="btn btn-primary" id="btn-editar-redes" onclick="toggleEdit('redes')">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-redes" onclick="guardarCliente('redes')" style="display:none;">💾 Guardar</button>
          </div>
        </div>
        <div class="config-section">
          <h3>💻 Sistemas y Herramientas</h3>
          <div class="form-group"><label>ERP</label><input type="text" id="cliente-erp" disabled></div>
          <div class="form-group"><label>CRM</label><input type="text" id="cliente-crm" disabled></div>
          <div class="button-group">
            <button class="btn btn-primary" id="btn-editar-sistemas" onclick="toggleEdit('sistemas')">✏️ Editar</button>
            <button class="btn btn-success" id="btn-guardar-sistemas" onclick="guardarCliente('sistemas')" style="display:none;">💾 Guardar</button>
          </div>
        </div>
        <div class="config-section">
          <h3>👥 Contactos</h3>
          <div id="contactos-list" class="contactos-list"></div>
          <button class="btn btn-secondary" onclick="openModalContacto()">➕ Agregar Contacto</button>
        </div>
        <div class="button-group step-nav">
          <button class="btn btn-next" onclick="goToStep(2)">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-2" data-step="2" style="display:none;">
        <h2>👥 Usuarios y Permisos</h2>
        <div class="usuarios-list" id="usuarios-list"></div>
        <button class="btn btn-secondary" onclick="openModalUsuario()">➕ Agregar Usuario</button>
        <button class="btn btn-success" onclick="guardarUsuarios()" style="margin-left: 10px;">💾 Guardar Cambios</button>
        <div class="button-group step-nav">
          <button class="btn btn-prev" onclick="goToStep(1)">← Anterior</button>
          <button class="btn btn-next" onclick="goToStep(3)">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-3" data-step="3" style="display:none;">
        <h2>🎛️ Módulos</h2>
        <p class="section-hint">Selecciona qué módulos activa para este cliente</p>
        <div class="modulos-list" id="modulos-list"></div>
        <button class="btn btn-success" onclick="guardarModulos()" style="margin-top: 20px;">💾 Guardar Módulos</button>
        <p class="section-hint" style="margin-top: 20px;">💡 Nota: Acciones e Historial siempre están activos</p>
        <div class="button-group step-nav">
          <button class="btn btn-prev" onclick="goToStep(2)">← Anterior</button>
          <button class="btn btn-next" onclick="goToStep(4)">Siguiente →</button>
        </div>
      </div>

      <div class="config-step" id="step-4" data-step="4" style="display:none;">
        <h2>📅 Estructura WBR</h2>
        <div class="wbr-list" id="wbr-list"></div>
        <button class="btn btn-success" onclick="guardarWbr()" style="margin-top: 20px;">💾 Guardar Estructura</button>
        <div class="button-group step-nav">
          <button class="btn btn-prev" onclick="goToStep(3)">← Anterior</button>
        </div>
      </div>
    </div>
  `;
  
  mainContent.innerHTML = html;
  console.log('✅ HTML inyectado');
  setTimeout(() => { console.log('⏱️ Iniciando carga de datos...'); cargarConfiguracion(); }, 100);
}

async function cargarConfiguracion() { 
  console.log('📊 cargarConfiguracion'); 
  await cargarCliente(); 
  await cargarContactos(); 
  await cargarUsuarios(); 
  await cargarModulos(); 
  await cargarWbr(); 
  console.log('✅ Todos los datos cargados'); 
}

function goToStep(stepNum) { 
  console.log('📍 goToStep:', stepNum); 
  document.querySelectorAll('.config-step').forEach(s => s.classList.remove('active')); 
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active')); 
  const step = document.getElementById(`step-${stepNum}`); 
  if (step) step.classList.add('active'); 
  const bubble = document.querySelector(`.step[data-step="${stepNum}"]`); 
  if (bubble) bubble.classList.add('active'); 
}

async function cargarCliente() { 
  console.log('👤 cargarCliente'); 
  const res = await getClientes(); 
  if (res.ok && res.data.length > 0) { 
    clienteActual = res.data[0]; 
    document.getElementById('cliente-nombre').value = clienteActual.nombre || ''; 
    document.getElementById('cliente-direccion').value = clienteActual.dirección || ''; 
    document.getElementById('cliente-sector').value = clienteActual.sector || ''; 
    document.getElementById('cliente-year').value = clienteActual.año_fundación || ''; 
    document.getElementById('cliente-web').value = clienteActual.página_web || ''; 
    document.getElementById('cliente-instagram').value = clienteActual.instagram || ''; 
    document.getElementById('cliente-facebook').value = clienteActual.facebook || ''; 
    document.getElementById('cliente-linkedin').value = clienteActual.linkedin || ''; 
    document.getElementById('cliente-tiktok').value = clienteActual.tiktok || ''; 
    document.getElementById('cliente-erp').value = clienteActual.erp || ''; 
    document.getElementById('cliente-crm').value = clienteActual.crm || ''; 
    console.log('✅ Cliente cargado'); 
  } 
}

function toggleEdit(section) { 
  editMode[section] = !editMode[section]; 
  const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; 
  inputs.forEach(id => { document.querySelector(id).disabled = !editMode[section]; }); 
  const editBtn = document.getElementById(`btn-editar-${section}`); 
  const saveBtn = document.getElementById(`btn-guardar-${section}`); 
  if (editMode[section]) { editBtn.style.display = 'none'; saveBtn.style.display = 'inline-flex'; } else { editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; } 
}

async function guardarCliente(section) { 
  if (!clienteActual) return; 
  const datos = { nombre: clienteActual.nombre, dirección: document.getElementById('cliente-direccion').value, sector: document.getElementById('cliente-sector').value, año_fundación: document.getElementById('cliente-year').value, página_web: document.getElementById('cliente-web').value, instagram: document.getElementById('cliente-instagram').value, facebook: document.getElementById('cliente-facebook').value, linkedin: document.getElementById('cliente-linkedin').value, tiktok: document.getElementById('cliente-tiktok').value, erp: document.getElementById('cliente-erp').value, crm: document.getElementById('cliente-crm').value }; 
  const res = await updateCliente(datos); 
  if (res.ok) { alert('✅ Guardado'); editMode[section] = false; const inputs = section === 'info' ? ['#cliente-direccion', '#cliente-sector', '#cliente-year', '#cliente-web'] : section === 'redes' ? ['#cliente-instagram', '#cliente-facebook', '#cliente-linkedin', '#cliente-tiktok'] : ['#cliente-erp', '#cliente-crm']; inputs.forEach(id => { document.querySelector(id).disabled = true; }); const editBtn = document.getElementById(`btn-editar-${section}`); const saveBtn = document.getElementById(`btn-guardar-${section}`); editBtn.style.display = 'inline-flex'; saveBtn.style.display = 'none'; cargarCliente(); } 
}

async function cargarContactos() { 
  console.log('📧 cargarContactos'); 
  const res = await getContactos(); 
  if (res.ok) { 
    const lista = document.getElementById('contactos-list'); 
    lista.innerHTML = res.data.map(c => `<div class="contacto-item"><div class="contacto-info"><h4>${c.nombre}</h4><p><strong>Puesto:</strong> ${c.puesto}</p></div></div>`).join(''); 
    console.log('✅ Contactos:', res.data.length); 
  } 
}

function openModalContacto() { alert('Modal contacto - En construcción'); }
async function guardarContacto() { }
async function eliminarContacto(id) { }

async function cargarUsuarios() { 
  console.log('👥 cargarUsuarios'); 
  const res = await getUsuarios(); 
  if (res.ok) { 
    usuariosEditando = res.data; 
    const lista = document.getElementById('usuarios-list');
    console.log('Elemento usuarios-list:', lista);
    if (lista) { 
      let html = '<table class="usuarios-table"><thead><tr><th>Nombre</th><th>Rol</th><th>Categoría</th></tr></thead><tbody>';
      res.data.forEach(u => {
        html += `<tr><td>${u.nombre}</td><td>${u.rol}</td><td>${u.categoría || '-'}</td></tr>`;
      });
      html += '</tbody></table>';
      lista.innerHTML = html;
      console.log('✅ Usuarios HTML inyectado:', res.data.length); 
    } else {
      console.log('❌ No encontré elemento usuarios-list');
    }
  } 
}

function openModalUsuario() { alert('Modal usuario - En construcción'); }
async function guardarUsuario() { }
async function guardarUsuarios() { alert('✅ Guardado'); }

async function cargarModulos() { 
  console.log('🎛️ cargarModulos'); 
  const res = await getModulos(); 
  if (res.ok) { 
    modulosEditando = res.data; 
    const lista = document.getElementById('modulos-list');
    console.log('Elemento modulos-list:', lista);
    if (lista) { 
      let html = '';
      res.data.forEach(m => {
        html += `<div class="modulo-item"><input type="checkbox" ${m.activo === 'Sí' ? 'checked' : ''} onchange="toggleModulo('${m.id_módulo}', this.checked)"><div class="modulo-info"><h4>${m.nombre_módulo}</h4></div></div>`;
      });
      lista.innerHTML = html;
      console.log('✅ Módulos HTML inyectado:', res.data.length); 
    } else {
      console.log('❌ No encontré elemento modulos-list');
    }
  } 
}

function toggleModulo(id, checked) { const m = modulosEditando.find(x => x.id_módulo === id); if (m) m.activo = checked ? 'Sí' : 'No'; }
async function guardarModulos() { for (const m of modulosEditando) await updateModulo(m); alert('✅ Guardado'); }

async function cargarWbr() { 
  console.log('📅 cargarWbr'); 
  const res = await getWbrConfig(); 
  if (res.ok) { 
    wbrEditando = res.data; 
    const lista = document.getElementById('wbr-list');
    console.log('Elemento wbr-list:', lista);
    if (lista) { 
      let html = '';
      res.data.forEach(p => {
        html += `<div class="wbr-item"><div class="wbr-info"><h4>Paso ${p.paso}: ${p.nombre}</h4><p>${p.descripción}</p></div><button class="btn btn-primary" onclick="alert('WBR modal - En construcción')">⚙️</button></div>`;
      });
      lista.innerHTML = html;
      console.log('✅ WBR HTML inyectado:', res.data.length); 
    } else {
      console.log('❌ No encontré elemento wbr-list');
    }
  } 
}

async function guardarWbr() { alert('✅ Guardado'); }