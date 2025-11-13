🧪 QA Automation Project (Cypress + JSON Server)
👤 Autor

Hugo Martínez Iglesias
📧 hmartineziglesias@gmail.com
🔗 LinkedIn — (www.linkedin.com/in/hugo-martinez-iglesias-)
🐙 GitHub — hugo-qa-automation

📘 Descripción del Proyecto

Proyecto de automatización QA desarrollado con Cypress, que incluye pruebas UI (interfaz de usuario) y API (endpoints JSON Server), simulando el flujo completo de una aplicación de e-commerce.

Este proyecto valida tanto los casos positivos como los negativos, garantizando la estabilidad de funcionalidades clave como:

Gestión de productos
-Carrito de compras
-Aplicación de cupones de descuento
-Validaciones de login
-Pruebas de API con peticiones GET, POST, PUT, DELETE

⚙️ Tecnologías Utilizadas

-Cypress 15 – Framework principal de testing
-JSON Server – Simulación de API REST local
-Mochawesome Reporter – Generación de reportes HTML profesionales
-Live Server – Entorno local para UI
-Node.js / npm – Entorno de ejecución

🚀 Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/hugo-qa-automation/qa-automation-cypress.git
cd qa-automation-cypress

2️⃣ Instalar dependencias
npm install

3️⃣ Iniciar los servidores
npm run start:all
UI: http://127.0.0.1:5501/app/index.html
API: http://localhost:4000/products

🧩 Scripts Disponibles
Script	Descripción
-npm run api	Inicia el servidor JSON (API REST)
-npm run start	Inicia el servidor de la UI con Live Server
-npm run start:all	Inicia API + UI simultáneamente
-npm run cypress:open	Abre Cypress en modo interactivo
-npm run cypress:run	Ejecuta todos los tests en modo headless
-npm run report:view	Abre el reporte HTML de Mochawesome
-npm run test:api	Ejecuta solo los tests de API

🧪 Tipos de Tests

🔹 API Tests (api-negative.cy.js)

Verifica peticiones HTTP (GET, POST, PUT, DELETE) a endpoints del servidor local.

🔹 UI Tests (carrito.cy.js)

Simula interacciones de usuario sobre la interfaz del e-commerce:
-Añadir productos al carrito
-Aplicar descuentos
-Eliminar artículos
-Validar mensajes de error

🔹 Negative UI Tests (ui-negative.cy.js)

Comprueba validaciones y errores esperados en:
-Login con credenciales inválidas o vacías
-Cupones de descuento vacíos o inválidos
-Productos sin stock

📊 Reportes Automáticos

Después de ejecutar los tests, se generan automáticamente los reportes HTML en:
cypress/reports/index.html

Puedes abrirlos directamente con:
npx live-server cypress/reports

🧹 Comandos Útiles:
-npm run reset:db       # Reinicia la base de datos db.json
-npm run report:view    # Abre el reporte Mochawesome
-npm run test:api       # Ejecuta solo pruebas de API

💡 Objetivo del Proyecto

Este proyecto ha sido desarrollado como práctica profesional de QA Automation, demostrando habilidades en:
-Creación de suites de testing automatizado
-Validación de APIs REST
T-esting end-to-end con Cypress
-Integración de reportes automáticos
-Buenas prácticas en la estructura de tests y entorno local

🏁 Resultado Final

✅ 36 tests ejecutados con éxito
✅ Cobertura completa en UI y API
✅ Reportes profesionales generados automáticamente






