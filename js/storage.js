// Persistencia en localStorage
const KEY = 'finanzasone.transactions.v1';

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTransactions(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
