// ====== MÓDULO ACCIONES ======
let accionesData = [];
let vistaActual = 'lista'; // lista, semana, mes
let fechaNavegacion = new Date();

// ====== HELPERS ======
function formatearFechaTabla(fechaISO) {
  if (!fechaISO) return '-';
  try {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const año = fecha.getUTCFullYear();
    return `${dia}/${mes}/${año}`;
  } catch (e) {
    return fechaISO;
  }
}

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
            <div><label style="display: block; font-weight: bold; margin-bottom: 5px;">CLIENTE</label><input type="text" id="accion-cliente" placeholder="Nombre del cliente" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"></div>
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
  console.log('📡 Respuesta getAcciones:', res);
  if (res.ok) {
    accionesData = res.data;
    console.log('✅ Acciones cargadas:', accionesData.length);
    cargarVendedoresYAcompañamiento();
    renderizarVista();
  } else {
    console.error('❌ Error cargando acciones:', res.error);
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
        // Filtrar solo usuarios con rol "Vendedor"
        res.data.filter(u => u.rol === 'Vendedor').forEach(u => {
          const option = document.createElement('option');
          option.value = u.nombre;
          option.textContent = u.nombre + ' (' + (u.categoría || '-') + ')';
          selectVendedor.appendChild(option);
        });
      }
      
      if (selectAcompañamiento) {
        selectAcompañamiento.innerHTML = '<option value="">Seleccionar...</option><option value="No aplica">No aplica</option>';
        // Excluir SuperAdmin
        res.data.filter(u => u.rol !== 'SuperAdmin').forEach(u => {
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
      <td style="padding: 12px;">${formatearFechaTabla(a.fecha_compromiso)}</td>
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
  console.log('📅 Vista Semana - Diseño Kanban');
  
  // Calcular inicio de semana (lunes)
  const inicio = new Date(fechaNavegacion);
  const diferencia = inicio.getDay() === 0 ? -6 : 1 - inicio.getDay();
  inicio.setDate(inicio.getDate() + diferencia);
  
  // Generar array de 7 días
  const dias = [];
  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(inicio);
    d.setDate(d.getDate() + i);
    dias.push({
      fecha: d,
      numero: d.getDate(),
      nombre: nombresDias[i],
      mes: nombresMeses[d.getMonth()],
      año: d.getFullYear(),
      fechaISO: d.toISOString().split('T')[0]
    });
  }
  
  const mesActual = dias[0].mes + ' ' + dias[0].año;
  
  // Helper: verificar si acción está vencida
  function estaVencida(fechaAccion) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaAccion);
    fecha.setHours(0, 0, 0, 0);
    return fecha < hoy;
  }
  
  // Helper: obtener icono por tipo de acción
  function getIconoTipo(tipo) {
    const iconos = {
      'Llamada': '📞',
      'Whatsapp': '💬',
      'Email': '📧',
      'Reunión': '👥',
      'Visita': '🚗',
      'Capacitación': '📚',
      'Asesoría': '🎯'
    };
    return iconos[tipo] || '📌';
  }
  
  // Filtrar acciones de esta semana
  const accionesDelaSemana = accionesData.filter(a => {
    const fechaAccion = a.fecha_compromiso.split('T')[0];
    return fechaAccion >= dias[0].fechaISO && fechaAccion <= dias[6].fechaISO;
  });
  
  // Generar vista Kanban
  let kanbanHTML = `
    <div style="margin-bottom: 30px;">
      <div style="display: flex; gap: 16px; overflow-x: auto; padding: 20px 0; min-height: 400px;">
  `;
  
  dias.forEach(d => {
    const esFinDeSemana = d.nombre === 'Sábado' || d.nombre === 'Domingo';
    const accionesDia = accionesDelaSemana.filter(a => a.fecha_compromiso.split('T')[0] === d.fechaISO);
    const colorHeaderFondo = esFinDeSemana ? '#f0f0f0' : '#ffffff';
    const colorHeaderTexto = esFinDeSemana ? '#999' : '#333';
    
    let tarjetasHTML = '';
    
    if (accionesDia.length === 0) {
      tarjetasHTML = `
        <div style="padding: 30px 12px; text-align: center; color: #bbb; font-size: 12px;">
          Sin acciones
        </div>
      `;
    } else {
      accionesDia.forEach(a => {
        const vencida = estaVencida(a.fecha_compromiso);
        const colorPrioridad = a.prioridad === 'Alta' ? '#e74c3c' : a.prioridad === 'Media' ? '#f39c12' : '#27ae60';
        const colorTarjeta = vencida ? '#fce8e8' : '#ffffff';
        const colorBorde = vencida ? '#e74c3c' : '#ddd';
        const icono = getIconoTipo(a.tipo_accion);
        const vendedorCorto = a.vendedor ? a.vendedor.split(' ')[0] : 'N/A';
        const badge = vencida ? '🚨' : '';
        
        tarjetasHTML += `
          <div style="
            background: ${colorTarjeta};
            border: 1px solid ${colorBorde};
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            min-width: 140px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.2s;
          " onmouseover="this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'; this.style.transform='translateY(-2px)'" 
             onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'; this.style.transform='translateY(0)'">
            
            <!-- Header: Tipo + Badge -->
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-size: 18px; font-weight: bold;">
                ${icono} <span style="font-size: 11px; font-weight: bold; color: #333;">${a.tipo_accion || '-'}</span>
              </div>
              <span style="font-size: 12px;">${badge}</span>
            </div>
            
            <!-- Vendedor -->
            <div style="font-size: 11px; color: #666; margin-bottom: 6px;">
              👤 <strong>${vendedorCorto}</strong>
            </div>
            
            <!-- Fecha -->
            <div style="font-size: 10px; color: #999; margin-bottom: 8px;">
              📅 ${formatearFechaTabla(a.fecha_compromiso)}
            </div>
            
            <!-- Prioridad badge -->
            <div style="display: inline-block; background: ${colorPrioridad}; color: white; padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-bottom: 10px;">
              ${a.prioridad}
            </div>
            
            <!-- Botones -->
            <div style="display: flex; gap: 4px; margin-top: 10px;">
              <button onclick="editarAccion('${a.id_accion}')" style="
                flex: 1;
                padding: 5px 6px;
                background: #4a90e2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
              ">✏️</button>
              <button onclick="marcarConcluida('${a.id_accion}')" style="
                flex: 1;
                padding: 5px 6px;
                background: #27ae60;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
              ">✅</button>
            </div>
          </div>
        `;
      });
    }
    
    kanbanHTML += `
      <div style="min-width: 160px; flex-shrink: 0;">
        <div style="background: ${colorHeaderFondo}; padding: 12px; border-radius: 8px 8px 0 0; border-bottom: 2px solid #ddd; text-align: center;">
          <div style="font-size: 12px; font-weight: bold; color: ${colorHeaderTexto};">${d.nombre}</div>
          <div style="font-size: 20px; font-weight: bold; color: ${colorHeaderTexto}; margin: 4px 0;">${d.numero}</div>
          <div style="font-size: 10px; color: #999;">${d.mes.substring(0, 3)}</div>
        </div>
        <div style="
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 12px;
          min-height: 350px;
          overflow-y: auto;
          max-height: 500px;
        ">
          ${tarjetasHTML}
        </div>
      </div>
    `;
  });
  
  kanbanHTML += `
      </div>
    </div>
  `;
  
  // Separar acciones vencidas y activas
  const accionesVencidas = accionesDelaSemana.filter(a => estaVencida(a.fecha_compromiso));
  const accionesActivas = accionesDelaSemana.filter(a => !estaVencida(a.fecha_compromiso));
  
  // Lista de acciones resumida
  let listaHTML = `
    <div style="margin-top: 30px;">
  `;
  
  // VENCIDAS
  if (accionesVencidas.length > 0) {
    listaHTML += `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #e74c3c; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e74c3c;">🚨 Acciones Vencidas (${accionesVencidas.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
    `;
    
    accionesVencidas.forEach(a => {
      const colorPrioridad = a.prioridad === 'Alta' ? '#e74c3c' : a.prioridad === 'Media' ? '#f39c12' : '#27ae60';
      const icono = getIconoTipo(a.tipo_accion);
      listaHTML += `
        <div style="
          background: #fff5f5;
          border: 1px solid #e74c3c;
          border-radius: 8px;
          padding: 12px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div>
              <div style="font-size: 14px; font-weight: bold; color: #e74c3c;">
                ${icono} ${a.tipo_accion}
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">
                👤 ${a.vendedor || 'N/A'}
              </div>
            </div>
            <span style="background: ${colorPrioridad}; color: white; padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
              ${a.prioridad}
            </span>
          </div>
          <div style="font-size: 12px; color: #999; margin-bottom: 10px;">
            📅 ${formatearFechaTabla(a.fecha_compromiso)} | 🎯 ${a.cliente || '-'}
          </div>
          <div style="display: flex; gap: 6px;">
            <button onclick="editarAccion('${a.id_accion}')" style="flex: 1; padding: 6px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
            <button onclick="marcarConcluida('${a.id_accion}')" style="flex: 1; padding: 6px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✅ Concluida</button>
          </div>
        </div>
      `;
    });
    
    listaHTML += `
        </div>
      </div>
    `;
  }
  
  // ACTIVAS
  if (accionesActivas.length > 0) {
    listaHTML += `
      <div>
        <h3 style="color: #27ae60; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #27ae60;">✓ Acciones Activas (${accionesActivas.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
    `;
    
    accionesActivas.forEach(a => {
      const colorPrioridad = a.prioridad === 'Alta' ? '#e74c3c' : a.prioridad === 'Media' ? '#f39c12' : '#27ae60';
      const icono = getIconoTipo(a.tipo_accion);
      listaHTML += `
        <div style="
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
        ">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div>
              <div style="font-size: 14px; font-weight: bold; color: #333;">
                ${icono} ${a.tipo_accion}
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">
                👤 ${a.vendedor || 'N/A'}
              </div>
            </div>
            <span style="background: ${colorPrioridad}; color: white; padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
              ${a.prioridad}
            </span>
          </div>
          <div style="font-size: 12px; color: #999; margin-bottom: 10px;">
            📅 ${formatearFechaTabla(a.fecha_compromiso)} | 🎯 ${a.cliente || '-'}
          </div>
          <div style="display: flex; gap: 6px;">
            <button onclick="editarAccion('${a.id_accion}')" style="flex: 1; padding: 6px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
            <button onclick="marcarConcluida('${a.id_accion}')" style="flex: 1; padding: 6px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">✅ Concluida</button>
          </div>
        </div>
      `;
    });
    
    listaHTML += `
        </div>
      </div>
    `;
  }
  
  if (accionesVencidas.length === 0 && accionesActivas.length === 0) {
    listaHTML += '<p style="color: #999; padding: 20px; text-align: center;">No hay acciones esta semana</p>';
  }
  
  listaHTML += '</div>';
  
  contenedor.innerHTML = kanbanHTML + listaHTML;
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
    cliente: document.getElementById('accion-cliente').value || '',
    acompañamiento: document.getElementById('accion-acompañamiento').value || '',
    proveedor_externo: document.getElementById('accion-proveedor').value || '',
    fecha_compromiso: document.getElementById('accion-fecha').value,
    descripcion: document.getElementById('accion-descripcion').value || '',
    estado: 'Pendiente'
  };
  
  console.log('💾 Datos a guardar:', datos);
  
  // Validación: Cliente NO es obligatorio
  if (!datos.tipo_accion || !datos.clasificacion || !datos.prioridad || !datos.resultado_esperado || !datos.fecha_compromiso) {
    alert('❌ Completa campos requeridos (marcados con *)');
    return;
  }
  
  let res;
  if (id) {
    console.log('✏️ Actualizando acción...');
    res = await updateAccion(datos);
  } else {
    console.log('✨ Creando acción nueva...');
    res = await createAccion(datos);
  }
  
  console.log('📡 Respuesta del servidor:', res);
  
  if (res.ok) {
    alert('✅ Acción guardada');
    closeModal('accion');
    cargarAcciones();
  } else {
    alert('❌ Error: ' + (res.error || 'Error desconocido'));
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