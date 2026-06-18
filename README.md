# 📊 EVA+ Portal - Guía de Uso

## ✅ Qué acabas de recibir

Un portal completamente estructurado con:
- ✅ Cada módulo en su propio archivo .js
- ✅ Navbar dinámico (solo muestra módulos activos)
- ✅ Conectado a Google Sheets via Apps Script
- ✅ Diseño profesional (Syne + DM Sans)
- ✅ Placeholders "En construcción" para los módulos

---

## 📁 Estructura de Carpetas

```
eva-plus-portal/
├── index.html              ← Abre aquí (navegador)
├── README.md               ← Este archivo
├── css/
│   └── styles.css          ← Estilos globales
└── js/
    ├── app.js              ← Orquestador principal
    ├── api-handler.js      ← Conexión Google Sheets
    ├── dashboard.js        ← Módulo Dashboard
    ├── pipeline.js         ← Módulo Pipeline
    ├── wbr.js              ← Módulo WBR
    ├── acciones.js         ← Módulo Acciones
    ├── metas-ventas.js     ← Módulo Metas Ventas
    ├── metas-marketing.js  ← Módulo Metas Marketing
    └── configuracion.js    ← Módulo Configuración (pendiente)
```

---

## 🚀 Cómo Usar

### **1️⃣ Abre el Portal**
```
1. Descarga la carpeta eva-plus-portal
2. Abre index.html en tu navegador
3. ¡Listo! Conectado a tu Google Sheet
```

### **2️⃣ Navega por los Módulos**
- Todos los módulos tienen placeholders "🐧 En construcción"
- El navbar se actualiza dinámicamente según módulos activos
- Click en cualquier módulo lo carga

### **3️⃣ Próximos Pasos**
Ahora necesitamos implementar cada módulo:
1. **Configuración** (4 pasos: Cliente, Usuarios, Módulos, WBR)
2. **Dashboard** (KPIs, tarjetas, vendedoras)
3. **WBR** (4 pasos reales: Metas, Compromisos, Descubrimientos, Acciones)
4. **Pipeline** (Kanban funcional)
5. **Acciones** (Listado con filtros)
6. **Metas Ventas** (Gráficas y tracking)
7. **Metas Marketing** (Gráficas y tracking)

---

## 🔗 Conexión Google Sheets

Automática via:
```
https://script.google.com/macros/s/AKfycbxZPyLCZk5aFTIvEiI-BaIr9fGlvfRrcmQiOHUnBhJ3D6xCc-X_py5k6I2OZ2rO89wN/exec
```

---

## 📋 Patrón de Desarrollo

Cada módulo sigue este patrón:

**archivo.js:**
```javascript
function loadModuleNameModule() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="page active">
      <!-- HTML del módulo aquí -->
    </div>
  `;
}
```

**Uso en app.js:**
```javascript
case 'module-name':
  loadModuleNameModule();
  break;
```

---

## 🎯 Checklist

- [ ] Abre index.html en navegador
- [ ] Ve todos los módulos en navbar
- [ ] Click en cada módulo muestra "En construcción"
- [ ] Navbar dinámico funciona
- [ ] Consola sin errores (F12)

---

## 📞 Próximas Sesiones

1. Implementar **Configuración** (4 pasos completos)
2. Implementar **Dashboard** (KPIs reales)
3. Implementar **WBR** (sesiones semanales)
4. Etc...

---

**¿Listo?** ¡Dale a descargar y prueba! 🚀
