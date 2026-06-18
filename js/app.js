// ═══════════════════════════════════════════════════════════════════════════════
// APP.JS - Orquestador Principal
// ═══════════════════════════════════════════════════════════════════════════════

let modulosActivos = [];
let paginaActual = 'dashboard';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 EVA+ Portal inicializando...');
  
  await cargarModulosActivos();
  renderNavbar();
  mostrarModulo('dashboard');
  
  console.log('✅ Portal listo');
});

async function cargarModulosActivos() {
  const res = await getModulos();
  if (res.ok) {
    modulosActivos = res.data.filter(m => m.activo === 'Sí').map(m => m.nombre_módulo);
    console.log('Módulos activos:', modulosActivos);
  }
}

function renderNavbar() {
  const menu = document.getElementById('navbar-menu');
  menu.innerHTML = '';
  
  const items = [
    { id: 'dashboard', label: '📊 Dashboard', siempre: true },
    { id: 'pipeline', label: '🚀 Pipeline', siempre: true },
    { id: 'wbr', label: '📅 WBR', siempre: true },
    { id: 'metas-ventas', label: '💰 Metas Ventas', config: 'Metas de Ventas' },
    { id: 'metas-marketing', label: '📢 Metas Marketing', config: 'Metas de Marketing' },
    { id: 'acciones', label: '✏️ Acciones', siempre: true },
    { id: 'configuracion', label: '⚙️ Configuración', siempre: true }
  ];
  
  items.forEach(item => {
    const visible = item.siempre || (item.config && modulosActivos.includes(item.config));
    
    if (visible) {
      const li = document.createElement('li');
      li.textContent = item.label;
      li.id = `nav-${item.id}`;
      li.addEventListener('click', () => mostrarModulo(item.id));
      menu.appendChild(li);
    }
  });
}

function mostrarModulo(moduloId) {
  // Actualizar navbar
  document.querySelectorAll('.navbar-menu li').forEach(li => li.classList.remove('active'));
  const navItem = document.getElementById(`nav-${moduloId}`);
  if (navItem) navItem.classList.add('active');
  
  // Cargar módulo
  switch(moduloId) {
    case 'dashboard':
      loadDashboardModule();
      break;
    case 'pipeline':
      loadPipelineModule();
      break;
    case 'wbr':
      loadWbrModule();
      break;
    case 'acciones':
      loadAccionesModule();
      break;
    case 'metas-ventas':
      loadMetasVentasModule();
      break;
    case 'metas-marketing':
      loadMetasMarketingModule();
      break;
    case 'configuracion':
      loadConfiguracionModule();
      break;
  }
  
  paginaActual = moduloId;
}
