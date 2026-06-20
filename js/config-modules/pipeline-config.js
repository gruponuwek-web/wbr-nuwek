// ====== PIPELINE CONFIG ======
// Función principal para cargar la interfaz de configuración del Pipeline

function loadPipelineConfig() {
  console.log('🚀 loadPipelineConfig() ejecutando...');
  
  const mainContent = document.getElementById('main-content');
  
  const html = `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h2>🚀 Configuración Pipeline</h2>
      <p style="color: #666; margin-bottom: 20px;">Aquí irá la configuración de etapas del pipeline</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">
        <h3>🚀 Próximamente</h3>
        <p style="font-size: 18px; color: #666;">¡Hecho con amor! ❤️</p>
      </div>
      
      <div style="margin-top: 20px;">
        <button onclick="cerrarConfiguracion()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
      </div>
    </div>
  `;
  
  mainContent.innerHTML = html;
}

function cerrarConfiguracion() {
  console.log('❌ Cerrando configuración...');
  location.reload();
}
