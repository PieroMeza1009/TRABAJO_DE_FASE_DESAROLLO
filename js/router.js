// Enrutador SPA muy simple con hash (#/ruta)
export const routes = {
  '/dashboard': () => import('./views/dashboard.js'),
  '/transacciones': () => import('./views/transacciones.js'),
  '/acerca': () => import('./views/acerca.js'),
};

async function renderRoute(path) {
  const mount = document.getElementById('app');
  const loader = `<div class="flex-center" style="min-height:40vh"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></div>`;
  mount.innerHTML = loader;
  try {
    const mod = await (routes[path] || routes['/dashboard'])();
    mount.innerHTML = await mod.render();
    if (mod.afterRender) mod.afterRender();
  } catch (err) {
    mount.innerHTML = `<div class="alert alert-danger">Error al cargar la vista.</div>`;
    console.error(err);
  }
}

function navigate() {
  const hash = window.location.hash || '#/dashboard';
  const path = hash.replace('#', '');
  renderRoute(path);
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
