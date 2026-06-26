// ====== MÓDULO ACCIONES ======
let accionesData = [];
let vistaActual = 'lista'; // lista, semana, mes
let fechaNavegacion = new Date();

function loadAccionesModule() {
  console.log('✏️ loadAccionesModule() ejecutando...');
  
  const mainContent = document.getElementById('main-content');
  
  const html = `
    <div class="acciones-container" style="padding: 20px; max-width: 1400px; margin: 0 auto;">
      <h1>✏️ Acciones</h1>
      
      <!-- Controles de vista y navegación -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px;">
        <div style="display: flex; gap: 10px;">
          <button onclick="cambiarVista('lista')" id="btn-vista-lista" style="padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">📋 Lista</button>
          <button onclick="cambiarVista('semana')" id="btn-vista-semana" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">📅 Semana</button>
          <button onclick="cambiarVista('mes')" id="btn-vista-mes" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">📆 Mes</button>
        </div>
        
        <div style="display: flex; gap: 10px; align-items: center;">
          <button onclick="navegarFecha(-1)" style="padding: 10px 15px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">← Anterior</button>
          <span id="fecha-navegacion" style="min-width: 150px; text-align: center; font-weight: bold;">Hoy</span>
          <button onclick="navegarFecha(1)" style="padding: 10px 15px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Siguiente →</button>
        </div>
        
        <button onclick="openModalAccion()" style="padding: 12px 24px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">➕ Nueva Acción</button>
      </div>
      
      <!-- Contenedor de vista -->
      <div id="acciones-vista" style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;"></div>
    </div>

    <!-- MODAL: NUEVA ACCIÓN -->
    <div class="modal" id="modal-accion" style="display:none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center; overflow-y: auto;">
      <div class="modal-content" style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 800px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); margin: 20px auto;">
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 id="modal-accion-title" style="margin: 0;">➕ Nueva Acción</h2>
          <button onclick="closeModal('accion')" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="accion-id">
          
          <!-- Fila 1: Sesión ID y Vendedor -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">SESIÓN ID</label><select id="accion-sesion" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar sesión...</option></select></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">VENDEDOR</label><select id="accion-vendedor" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar vendedor...</option></select></div>
          </div>
          
          <!-- Fila 2: Tipo de Acción y Clasificación -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">TIPO DE ACCIÓN:*</label><select id="accion-tipo" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar...</option><option value="Llamada">Llamada</option><option value="Whatsapp">Whatsapp</option><option value="Email">Email</option><option value="Reunión">Reunión</option><option value="Visita">Visita</option><option value="Capacitación">Capacitación</option><option value="Asesoría">Asesoría</option></select></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">CLASIFICACIÓN:*</label><select id="accion-clasificacion" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar...</option><option value="Prospección">Prospección</option><option value="Crecimiento BCG">Crecimiento BCG</option><option value="Fidelización">Fidelización</option><option value="Recuperación">Recuperación</option></select></div>
          </div>
          
          <!-- Fila 3: Prioridad y Resultado Esperado -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">PRIORIDAD:*</label><select id="accion-prioridad" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar...</option><option value="Alta">Alta</option><option value="Media">Media</option><option value="Baja">Baja</option></select></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">RESULTADO ESPERADO:*</label><select id="accion-resultado" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar...</option><option value="Cita agendada">Cita agendada</option><option value="Cotización enviada">Cotización enviada</option><option value="Contrato firmado">Contrato firmado</option><option value="Pedido realizado">Pedido realizado</option><option value="Acuerdo de continuidad">Acuerdo de continuidad</option><option value="Reactivación confirmada">Reactivación confirmada</option><option value="Capacitación completada">Capacitación completada</option><option value="Seguimiento pendiente">Seguimiento pendiente</option><option value="Presentación realizada">Presentación realizada</option><option value="Levantamiento completado">Levantamiento completado</option><option value="Avance administrativo">Avance administrativo</option><option value="Acuerdo administrativo/legal">Acuerdo administrativo/legal</option></select></div>
          </div>
          
          <!-- Fila 4: Cliente y Acompañamiento -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">CLIENTE:*</label><input type="text" id="accion-cliente" placeholder="Nombre del cliente" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">ACOMPAÑAMIENTO</label><select id="accion-acompañamiento" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"><option value="">Seleccionar...</option><option value="No aplica">No aplica</option></select></div>
          </div>
          
          <!-- Fila 5: Proveedor Externo y Fecha Compromiso -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">PROVEEDOR EXTERNO</label><input type="text" id="accion-proveedor" placeholder="Ej. Agencia de Marketing" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">FECHA COMPROMISO:*</label><input type="date" id="accion-fecha" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
          </div>
          
          <!-- Fila 6: Descripción -->
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">DESCRIPCIÓN (Opcional)</label>
            <textarea id="accion-descripcion" placeholder="Ej. Hablar para crear nueva campaña de marketing" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; min-height: 80px;"></textarea>
          </div>
        </div>
        <div class="modal-footer" style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
          <button onclick="guardarAccion()" style="padding: 12px 24px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">💾 Guardar</button>
          <button onclick="closeModal('accion')" style="padding: 12px 24px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
        </div>
      </div>
    </div>
  `;
  
  mainContent.innerHTML = html;
  console.log('✅ HTML inyectado');
  setTimeout(() => { cargarAcciones(); }, 100);
}

async function cargarAcciones() {
  console.log('📋 Cargando acciones...');
  const res = await getAcciones();
  if (res.ok) {
    accionesData = res.data;
    cargarVendedoresYAcompañamiento();
    renderizarVista();
    console.log('✅ Acciones cargadas:', accionesData.length);
  }
}

function cargarVendedoresYAcompañamiento() {
  // Cargar vendedores desde usuarios
  getUsuarios().then(res => {
    if (res.ok) {
      const selectVendedor = document.getElementById('accion-vendedor');
      const selectAcompañamiento = document.getElementById('accion-acompañamiento');
      
      if (selectVendedor) {
        selectVendedor.innerHTML = '<option value="">Seleccionar vendedor...</option>';
        res.data.forEach(u => {
          const option = document.createElement('option');
          option.value = u.nombre;
          option.textContent = u.nombre;
          selectVendedor.appendChild(option);
        });
      }
      
      if (selectAcompañamiento) {
        selectAcompañamiento.innerHTML = '<option value="">Seleccionar...</option><option value="No aplica">No aplica</option>';
        res.data.forEach(u => {
          const option = document.createElement('option');
          option.value = u.nombre + ' (' + u.rol + ')';
          option.textContent = u.nombre + ' (' + u.rol + ')';
          selectAcompañamiento.appendChild(option);
        });
      }
    }
  });
}

function cambiarVista(vista) {
  vistaActual = vista;
  document.querySelectorAll('[id^="btn-vista-"]').forEach(btn => btn.style.background = '#95a5a6');
  document.getElementById(`btn-vista-${vista}`).style.background = '#4a90e2';
  renderizarVista();
}

function navegarFecha(dias) {
  fechaNavegacion.setDate(fechaNavegacion.getDate() + dias);
  renderizarVista();
}

function renderizarVista() {
  const contenedor = document.getElementById('acciones-vista');
  
  if (vistaActual === 'lista') {
    renderVistaPorLista(contenedor);
  } else if (vistaActual === 'semana') {
    renderVistaPorSemana(contenedor);
  } else if (vistaActual === 'mes') {
    renderVistaPorMes(contenedor);
  }
  
  actualizarFechaNavegacion();
}

function renderVistaPorLista(contenedor) {
  console.log('📋 Vista Lista');
  const hoy = new Date().toISOString().split('T')[0];
  
  const accionesOrdadas = accionesData
    .filter(a => a.estado !== 'Concluida')
    .sort((a, b) => {
      const prioridad = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
      return (prioridad[a.prioridad] || 999) - (prioridad[b.prioridad] || 999);
    });
  
  let html = '<table style="width: 100%; border-collapse: collapse;"><thead><tr style="background: #f0f0f0; border-bottom: 2px solid #ddd;"><th style="padding: 12px; text-align: left;">Fecha</th><th style="padding: 12px; text-align: left;">Tipo</th><th style="padding: 12px; text-align: left;">Cliente</th><th style="padding: 12px; text-align: left;">Prioridad</th><th style="padding: 12px; text-align: left;">Estado</th><th style="padding: 12px; text-align: center;">Acciones</th></tr></thead><tbody>';
  
  accionesOrdadas.forEach((a, idx) => {
    const prioridadColor = a.prioridad === 'Alta' ? '#e74c3c' : a.prioridad === 'Media' ? '#f39c12' : '#27ae60';
    html += `<tr style="border-bottom: 1px solid #eee; ${idx % 2 === 0 ? 'background: #f9f9f9;' : ''}">
      <td style="padding: 12px;">${a.fecha_compromiso}</td>
      <td style="padding: 12px;">${a.tipo_accion}</td>
      <td style="padding: 12px;">${a.cliente}</td>
      <td style="padding: 12px;"><span style="background: ${prioridadColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${a.prioridad}</span></td>
      <td style="padding: 12px;">${a.estado || 'Pendiente'}</td>
      <td style="padding: 12px; text-align: center;">
        <button onclick="editarAccion('${a.id_accion}')" style="padding: 6px 12px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;">✏️ Editar</button>
        <button onclick="marcarConcluida('${a.id_accion}')" style="padding: 6px 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✅ Concluida</button>
      </td>
    </tr>`;
  });
  
  html += '</tbody></table>';
  contenedor.innerHTML = html;
}

function renderVistaPorSemana(contenedor) {
  console.log('📅 Vista Semana');
  contenedor.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Vista Semana - En construcción 🚀</p>';
}

function renderVistaPorMes(contenedor) {
  console.log('📆 Vista Mes');
  contenedor.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Vista Mes - En construcción 🚀</p>';
}

function actualizarFechaNavegacion() {
  const label = document.getElementById('fecha-navegacion');
  if (label) {
    if (vistaActual === 'lista') {
      label.textContent = 'Todas las acciones';
    } else if (vistaActual === 'semana') {
      const inicio = new Date(fechaNavegacion);
      inicio.setDate(inicio.getDate() - inicio.getDay());
      label.textContent = `Semana ${inicio.toLocaleDateString()}`;
    } else {
      label.textContent = `${fechaNavegacion.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
    }
  }
}

function openModalAccion() {
  document.getElementById('accion-id').value = '';
  document.getElementById('accion-sesion').value = '';
  document.getElementById('accion-vendedor').value = '';
  document.getElementById('accion-tipo').value = '';
  document.getElementById('accion-clasificacion').value = '';
  document.getElementById('accion-prioridad').value = '';
  document.getElementById('accion-resultado').value = '';
  document.getElementById('accion-cliente').value = '';
  document.getElementById('accion-acompañamiento').value = '';
  document.getElementById('accion-proveedor').value = '';
  document.getElementById('accion-fecha').value = '';
  document.getElementById('accion-descripcion').value = '';
  document.getElementById('modal-accion-title').textContent = '➕ Nueva Acción';
  document.getElementById('modal-accion').style.display = 'flex';
}

function editarAccion(id) {
  const accion = accionesData.find(a => a.id_accion === id);
  if (accion) {
    document.getElementById('accion-id').value = accion.id_accion;
    document.getElementById('accion-sesion').value = accion.sesion_id || '';
    document.getElementById('accion-vendedor').value = accion.vendedor || '';
    document.getElementById('accion-tipo').value = accion.tipo_accion || '';
    document.getElementById('accion-clasificacion').value = accion.clasificacion || '';
    document.getElementById('accion-prioridad').value = accion.prioridad || '';
    document.getElementById('accion-resultado').value = accion.resultado_esperado || '';
    document.getElementById('accion-cliente').value = accion.cliente || '';
    document.getElementById('accion-acompañamiento').value = accion.acompañamiento || '';
    document.getElementById('accion-proveedor').value = accion.proveedor_externo || '';
    document.getElementById('accion-fecha').value = accion.fecha_compromiso || '';
    document.getElementById('accion-descripcion').value = accion.descripcion || '';
    document.getElementById('modal-accion-title').textContent = '✏️ Editar Acción';
    document.getElementById('modal-accion').style.display = 'flex';
  }
}

async function guardarAccion() {
  const id = document.getElementById('accion-id').value;
  const datos = {
    id_accion: id || 'A' + Date.now(),
    sesion_id: document.getElementById('accion-sesion').value || '',
    vendedor: document.getElementById('accion-vendedor').value,
    tipo_accion: document.getElementById('accion-tipo').value,
    clasificacion: document.getElementById('accion-clasificacion').value,
    prioridad: document.getElementById('accion-prioridad').value,
    resultado_esperado: document.getElementById('accion-resultado').value,
    cliente: document.getElementById('accion-cliente').value,
    acompañamiento: document.getElementById('accion-acompañamiento').value || '',
    proveedor_externo: document.getElementById('accion-proveedor').value || '',
    fecha_compromiso: document.getElementById('accion-fecha').value,
    descripcion: document.getElementById('accion-descripcion').value || '',
    estado: 'Pendiente'
  };
  
  if (!datos.tipo_accion || !datos.clasificacion || !datos.prioridad || !datos.resultado_esperado || !datos.cliente || !datos.fecha_compromiso) {
    alert('❌ Completa campos requeridos (marcados con *)');
    return;
  }
  
  let res;
  if (id) {
    res = await updateAccion(datos);
  } else {
    res = await createAccion(datos);
  }
  
  if (res.ok) {
    closeModal('accion');
    cargarAcciones();
  }
}

async function marcarConcluida(id) {
  const accion = accionesData.find(a => a.id_accion === id);
  if (!accion) return;
  
  // Modal con 3 opciones
  const opcion = prompt('¿Qué deseas hacer?\n1. Marcar como Concluida\n2. Marcar como Concluida y crear nueva\n0. Cancelar');
  
  if (opcion === '1') {
    accion.estado = 'Concluida';
    await updateAccion(accion);
    cargarAcciones();
  } else if (opcion === '2') {
    accion.estado = 'Concluida';
    await updateAccion(accion);
    setTimeout(() => openModalAccion(), 500);
    cargarAcciones();
  }
}

function closeModal(name) {
  const modal = document.getElementById(`modal-${name}`);
  if (modal) modal.style.display = 'none';
}
