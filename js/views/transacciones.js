import { loadTransactions, saveTransactions } from '../storage.js';
import { validateTransaction } from '../validators.js';

function row(t, i) {
  return `
  <tr>
    <td>${t.fecha}</td>
    <td><span class="badge ${t.tipo==='ingreso'?'badge-income':'badge-expense'}">${t.tipo}</span></td>
    <td>${t.categoria}</td>
    <td>${t.descripcion}</td>
    <td class="text-end">S/ ${Number(t.monto).toFixed(2)}</td>
    <td class="actions text-end">
      <button class="btn btn-outline-secondary btn-sm" data-action="edit" data-index="${i}">Editar</button>
      <button class="btn btn-outline-danger btn-sm" data-action="delete" data-index="${i}">Eliminar</button>
    </td>
  </tr>`;
}

export async function render() {
  const txs = loadTransactions();
  const rows = txs.map((t,i)=>row(t,i)).join('');

  return `
  <section class="two-col">
    <div class="form-section">
      <h2>Registrar transacción</h2>
      <form id="tx-form" novalidate>
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Fecha</label>
            <input type="date" name="fecha" class="form-control" required>
            <div class="form-text"></div>
          </div>
          <div class="col-md-4">
            <label class="form-label">Tipo</label>
            <select name="tipo" class="form-select" required>
              <option value="">Selecciona...</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
            <div class="form-text"></div>
          </div>
          <div class="col-md-4">
            <label class="form-label">Categoría</label>
            <input type="text" name="categoria" class="form-control" placeholder="Sueldo, Comida, Transporte..." required>
            <div class="form-text"></div>
          </div>
          <div class="col-12">
            <label class="form-label">Descripción</label>
            <input type="text" name="descripcion" class="form-control" placeholder="Detalle" required>
            <div class="form-text"></div>
          </div>
          <div class="col-12">
            <label class="form-label">Monto (S/)</label>
            <input type="number" name="monto" class="form-control" step="0.01" min="0" required>
            <div class="form-text"></div>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary" type="reset">Limpiar</button>
        </div>
        <input type="hidden" name="editIndex" value="-1">
      </form>
    </div>

    <div class="table-wrap">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2 class="h5 m-0">Todas las transacciones</h2>
        <div class="input-group" style="max-width:320px">
          <span class="input-group-text">Filtrar</span>
          <input type="text" id="filter" class="form-control" placeholder="Buscar por descripción o categoría">
        </div>
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
              <th class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody id="tx-body">${rows || '<tr><td colspan="6" class="text-center text-muted">Sin datos</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Modal de confirmación de eliminación -->
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar eliminación</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">¿Seguro que deseas eliminar esta transacción?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="confirmDelete">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function afterRender() {
  const form = document.getElementById('tx-form');
  const tbody = document.getElementById('tx-body');
  const filter = document.getElementById('filter');

  let txs = loadTransactions();
  let deleteIndex = -1;

  // Helpers
  const redraw = () => {
    tbody.innerHTML = txs.map((t,i)=>`$${"{"}row(t,i)${"}"}`).join('') || '<tr><td colspan="6" class="text-center text-muted">Sin datos</td></tr>';
  };

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const tx = {
      fecha: data.fecha,
      tipo: data.tipo,
      categoria: (data.categoria||'').trim(),
      descripcion: (data.descripcion||'').trim(),
      monto: data.monto
    };
    const { ok, errors } = validateTransaction(tx);

    // limpiar mensajes
    for (const el of form.querySelectorAll('.form-text')) el.textContent = '';

    if (!ok) {
      for (const [field, msg] of Object.entries(errors)) {
        const help = form.querySelector(`[name="${field}"]`)?.closest('.col-md-4, .col-12')?.querySelector('.form-text');
        if (help) help.textContent = msg;
      }
      return;
    }

    const idx = Number(data.editIndex || -1);
    if (idx >= 0) {
      txs[idx] = tx;
      form.editIndex.value = -1;
    } else {
      txs.push(tx);
    }
    saveTransactions(txs);
    form.reset();
    redraw();
  });

  // Edit/Delete actions
  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    if (btn.dataset.action === 'edit') {
      const t = txs[idx];
      form.fecha.value = t.fecha;
      form.tipo.value = t.tipo;
      form.categoria.value = t.categoria;
      form.descripcion.value = t.descripcion;
      form.monto.value = t.monto;
      form.editIndex.value = idx;
      form.scrollIntoView({ behavior:'smooth', block:'start' });
    } else if (btn.dataset.action === 'delete') {
      deleteIndex = idx;
      const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
      modal.show();
      document.getElementById('confirmDelete').onclick = () => {
        txs.splice(deleteIndex,1);
        saveTransactions(txs);
        redraw();
        modal.hide();
      };
    }
  });

  // Filter
  filter.addEventListener('input', () => {
    const q = filter.value.toLowerCase();
    const filtered = txs.filter(t => t.descripcion.toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q));
    tbody.innerHTML = filtered.map((t,i)=>`$${"{"}row(t,i)${"}"}`).join('') || '<tr><td colspan="6" class="text-center text-muted">Sin resultados</td></tr>';
  });
}
