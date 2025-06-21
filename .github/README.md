# GitHub Actions Workflows

Este directorio contiene los workflows de CI/CD para el proyecto ChatBot.

## Requisitos del Sistema

- **Node.js**: >=20.0.0 (requerido por las dependencias)
- **npm**: >=10.0.0

## Workflows Disponibles

### 1. `ci-cd.yml` - Pipeline de CI y Preview
**Trigger:** Pull Requests a `main`/`develop`

**Jobs:**
- **CI (Continuous Integration):**
  - Instalación de dependencias (npm ci con fallback a npm install)
  - Linting (si está configurado)
  - Tests unitarios
  - Build del proyecto
  - Subida de artifacts

- **Preview:**
  - Deploy de preview para Pull Requests
  - Disponible en `gh-pages/preview/{PR_NUMBER}`

### 2. `deploy-production.yml` - Deploy a Producción
**Trigger:** Push directo a `main` (después de merge de PR)

**Jobs:**
- **Deploy Production:**
  - Tests finales
  - Build optimizado
  - Deploy a GitHub Pages (producción)

### 3. `security.yml` - Escaneo de Seguridad
**Trigger:** Semanal (domingos 2 AM UTC), Pull Requests a `main`

**Funciones:**
- Auditoría de dependencias (`npm audit`)
- Verificación de dependencias obsoletas
- Reporte de vulnerabilidades conocidas

### 4. `performance.yml` - Tests de Rendimiento
**Trigger:** Pull Requests a `main`

**Funciones:**
- Análisis del tamaño del bundle
- Detección de archivos grandes (>1MB)
- Reporte de métricas de rendimiento

### 5. `deploy-pages.yml` - Deploy Manual a GitHub Pages
**Trigger:** Push a `main` y manual

**Funciones:**
- Build optimizado para GitHub Pages
- Deploy automático con configuración de Pages
- URLs de preview automáticas

### 6. `codeql.yml` - Análisis de Seguridad del Código
**Trigger:** Pull Requests a `main`, semanal

**Funciones:**
- Análisis estático de código
- Detección de vulnerabilidades
- Escaneo semanal automático

## Configuración Requerida

### 1. GitHub Pages
1. Ve a Settings > Pages en tu repositorio
2. Source: "GitHub Actions"
3. Branch: `gh-pages` (se creará automáticamente)

### 2. Secrets (Opcional - para Vercel)
Si quieres usar Vercel, agrega estos secrets:
- `VERCEL_TOKEN`: Token de Vercel
- `ORG_ID`: ID de tu organización en Vercel
- `PROJECT_ID`: ID del proyecto en Vercel

### 3. Permisos
Los workflows requieren estos permisos:
- `contents: read`
- `pages: write`
- `id-token: write`

## Flujo de Trabajo

### Desarrollo con Pull Requests (Recomendado):
1. Crea una rama desde `develop` o `main`
2. Haz tus cambios
3. Crea un Pull Request
4. Los workflows se ejecutarán automáticamente:
   - ✅ Tests y build
   - ✅ Análisis de seguridad
   - ✅ Tests de rendimiento
   - ✅ Deploy de preview
5. Revisa los resultados en la pestaña "Actions"
6. Una vez aprobado, haz merge del PR
7. El deploy a producción se ejecutará automáticamente

### Deploy a Producción:
- **Automático:** Se ejecuta cuando se hace merge a `main`
- **Manual:** Ve a Actions > Deploy to GitHub Pages > Run workflow

## URLs

- **Producción:** `https://{username}.github.io/{repo-name}/`
- **Preview PR:** `https://{username}.github.io/{repo-name}/preview/{PR_NUMBER}/`

## Ventajas de este Enfoque

### ✅ Optimización de Recursos
- Los workflows solo se ejecutan cuando es necesario
- Evita ejecuciones en pushes directos a ramas de desarrollo
- Reduce el consumo de minutos de GitHub Actions

### ✅ Mejor Control de Calidad
- Todos los cambios pasan por Pull Requests
- Tests obligatorios antes del merge
- Preview automático para revisión

### ✅ Seguridad
- Análisis de seguridad en cada PR
- Auditoría semanal de dependencias
- Escaneo de código con CodeQL

### ✅ Flujo de Trabajo Profesional
- Separación clara entre desarrollo y producción
- Deploy automático solo después de merge
- Preview para validación antes de producción

### ✅ Compatibilidad
- Node.js 20+ para compatibilidad con dependencias modernas
- Estrategia robusta de instalación de dependencias
- Fallback automático si hay problemas de sincronización

## Troubleshooting

### Build Fails en PR
1. Revisa los logs en Actions
2. Verifica que `npm run build` funcione localmente
3. Asegúrate de que todas las dependencias estén en `package.json`
4. Verifica que estés usando Node.js >=20.0.0

### Problemas de Instalación de Dependencias
1. Los workflows usan `npm ci || npm install` como fallback
2. Si persisten los problemas, ejecuta `npm install` localmente
3. Commit y push del `package-lock.json` actualizado

### Deploy Fails
1. Verifica que GitHub Pages esté habilitado
2. Revisa los permisos del repositorio
3. Asegúrate de que el directorio `dist/` se genere correctamente

### Tests Fails
1. Ejecuta `npm test` localmente
2. Verifica que todos los tests pasen
3. Revisa la configuración de Vitest

### Preview No Se Genera
1. Verifica que el PR esté abierto (no draft)
2. Revisa los logs del job "preview"
3. Asegúrate de que el build sea exitoso

## Personalización

### Agregar ESLint
1. Instala ESLint: `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
2. Crea `.eslintrc.js`
3. Agrega script `"lint": "eslint src/**/*.{js,ts,jsx,tsx}"` en `package.json`

### Cambiar Node.js Version
Modifica `NODE_VERSION` en los workflows:
```yaml
env:
  NODE_VERSION: '22'  # Cambia a la versión deseada
```

### Agregar Más Tests
1. Crea tests en `tests/`
2. Los workflows ejecutarán `npm test` automáticamente
3. Considera agregar tests de integración y E2E

### Configurar Branch Protection
1. Ve a Settings > Branches
2. Agrega regla para `main`
3. Requiere:
   - Status checks to pass before merging
   - Require branches to be up to date before merging
   - Require pull request reviews before merging

## Monitoreo

### Badges
Agrega estos badges a tu README principal:

```markdown
![CI/CD](https://github.com/{username}/{repo-name}/workflows/CI/CD%20Pipeline/badge.svg)
![Security](https://github.com/{username}/{repo-name}/workflows/Security%20Scan/badge.svg)
![Deploy](https://github.com/{username}/{repo-name}/workflows/Deploy%20to%20Production/badge.svg)
```

### Notificaciones
Configura notificaciones en Settings > Notifications para:
- Workflow runs
- Security alerts
- Deployment status
- Pull request reviews 