export async function render() {
  return `
  <section class="cardy">
    <h1 class="h4">Acerca de la app</h1>
    <p>FinanzasOne es una SPA educativa construida con HTML5 semántico, SASS, Bootstrap 5 y JavaScript puro. 
    Demuestra formularios con validación básica, manipulación del DOM, y una tabla de datos con edición y eliminación usando <code>localStorage</code> para persistencia.</p>
    <ul>
      <li>HTML5 semántico: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code></li>
      <li>Form con 5+ campos, validaciones y feedback</li>
      <li>Tabla con <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code></li>
      <li>CSS responsivo (Grid + Flexbox)</li>
      <li>SASS (variables, anidación, mixin)</li>
      <li>Bootstrap 5 (botones, modales, utilidades)</li>
      <li>SPA con enrutamiento por hash</li>
    </ul>
  </section>`;
}
