export function validateTransaction(tx) {
  const errors = {};
  if (!tx.fecha) errors.fecha = 'La fecha es obligatoria';
  if (!tx.tipo || !['ingreso','gasto'].includes(tx.tipo)) errors.tipo = 'Tipo inválido';
  if (!tx.categoria || tx.categoria.trim().length < 3) errors.categoria = 'Categoría (min 3 letras)';
  if (!tx.descripcion || tx.descripcion.trim().length < 3) errors.descripcion = 'Descripción (min 3 letras)';
  if (tx.monto === '' || isNaN(Number(tx.monto)) || Number(tx.monto) <= 0) errors.monto = 'Monto debe ser número > 0';
  return { ok: Object.keys(errors).length === 0, errors };
}
