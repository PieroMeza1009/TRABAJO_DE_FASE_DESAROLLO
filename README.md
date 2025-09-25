# FinanzasOne — SPA (Vanilla JS + SASS + Bootstrap 5)

Aplicación web de finanzas personales que cumple los requisitos del proyecto: SPA, HTML5 semántico, CSS responsivo con Grid/Flexbox, SASS (variables, anidación, mixin), Bootstrap 5, formulario con 5+ campos y validaciones, manipulación dinámica del DOM y tabla de datos.

## Requisitos previos
- **Node.js** y **npm**
- Editor (VS Code recomendado)
- Extensión **Live Server** (opcional) o servidor estático

## Estructura
```
/assets
  /css          ← CSS compilado
  /scss         ← SASS fuente (variables, mixins, layout, components)
/data           ← datos de ejemplo
/js
  /views        ← vistas de la SPA
  main.js
  router.js
index.html
package.json
README.md
```

## Scripts
Instalar dependencias y compilar SASS:
```bash
npm i -D sass
npm run sass      # compilado único
npm run dev       # ver cambios en tiempo real (watch)
```

Scripts definidos en `package.json`:
```json
{
  "scripts": {
    "sass": "sass --no-source-map assets/scss/styles.scss assets/css/styles.css",
    "sass:watch": "sass --watch assets/scss/styles.scss:assets/css/styles.css --no-source-map",
    "dev": "npm run sass:watch"
  }
}
```

## Cómo ejecutar en local
1. Abre el proyecto en VS Code.
2. Ejecuta `npm i -D sass` y luego `npm run dev` para vigilar SASS.
3. Abre `index.html` con Live Server o tu navegador.

## Despliegue
### GitHub Pages
1. Crea un repo y sube el código.
2. En **Settings → Pages**, selecciona la rama `main` y carpeta `/root`.
3. La URL pública se generará automáticamente.

### Netlify / Vercel
- Conecta tu repo y despliega como sitio estático (no requiere build).

## Cumplimiento del enunciado
- **HTML5 semántico**: header/nav/main/section/footer + formulario y tabla.
- **CSS3 Responsivo**: 20+ reglas personalizadas, Flexbox (cards/acciones) y Grid (layout y cards).
- **SASS**: variables, anidación y mixin (`_variables.scss`, `_mixins.scss`, etc.).
- **Bootstrap 5**: botones, modales y utilidades incluidas por CDN.
- **JavaScript**: captura/validación de formulario, eventos, DOM dinámico, SPA con hash router y persistencia en `localStorage`.

## Trabajo en equipo (3–4 integrantes sugerido)
- **Front UI/Accesibilidad**: maquetación semántica, Grid/Flex, componentes Bootstrap.
- **Lógica JS/Validaciones**: router, form, tabla, filtros, edición.
- **Estilos SASS**: variables, mixins, tema, responsive; integra Bootstrap donde convenga.
- **DevOps/Entrega**: Git/GitHub, README, deployment (Pages/Netlify), QA.

¡Éxitos!
