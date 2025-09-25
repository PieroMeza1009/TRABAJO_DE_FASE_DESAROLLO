import { loadTransactions } from '../storage.js';

export async function render() {
  const txs = loadTransactions();
  const ingresos = txs.filter(t => t.tipo === 'ingreso').reduce((a,b) => a + Number(b.monto), 0);
  const gastos = txs.filter(t => t.tipo === 'gasto').reduce((a,b) => a + Number(b.monto), 0);
  const balance = ingresos - gastos;

  const rows = txs.slice(-5).reverse().map(t => `
    <tr>
      <td>${t.fecha}</td>
      <td><span class="badge ${t.tipo==='ingreso'?'badge-income':'badge-expense'}">${t.tipo}</span></td>
      <td>${t.categoria}</td>
      <td>${t.descripcion}</td>
      <td class="text-end">S/ ${Number(t.monto).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
  <section class="grid-cards">
    <div class="kpi">
      <div class="kpi-value">S/ ${ingresos.toFixed(2)}</div>
      <div class="kpi-label">Ingresos</div>
    </div>
    <div class="kpi">
      <div class="kpi-value">S/ ${gastos.toFixed(2)}</div>
      <div class="kpi-label">Gastos</div>
    </div>
    <div class="kpi">
      <div class="kpi-value">S/ ${balance.toFixed(2)}</div>
      <div class="kpi-label">Balance</div>
    </div>
  </section>

  <section class="table-wrap mt-3">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="h5 m-0">Últimas transacciones</h2>
      <a class="btn btn-primary btn-sm" href="#/transacciones">Ver todo</a>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th class="text-end">Monto</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="5" class="text-center text-muted">Sin datos todavía</td></tr>'}</tbody>
      </table>
    </div>
  </section>
  `;
}

export function afterRender() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
