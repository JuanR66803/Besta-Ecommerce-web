# Besta E-commerce Web 🛒

Una aplicación integral de comercio electrónico para **Fiera**, una empresa especializada en implementos deportivos. Esta plataforma proporciona una solución intuitiva para que clientes minoristas y mayoristas exploren productos, realicen compras y se contacten con el gerente de distribución para pedidos personalizados y al por mayor.

## 🌐 Aplicación en Vivo

**Frontend:** https://besta-ecommerce-web.onrender.com/

Experimenta la plataforma de comercio electrónico de Fiera. Explora nuestro catálogo de equipos deportivos, gestiona tu carrito de compras y completa transacciones con nuestro sistema de pagos integrado.

## 📋 Descripción del Proyecto

Besta E-commerce Web está diseñado para expandir el alcance digital de la marca Fiera proporcionando:

- **Gestión de Catálogo de Productos** - Explora y busca a través de categorías y subcategorías de equipos deportivos
- **Carrito de Compras y Lista de Deseos** - Agrega productos al carrito o guárdalos para después
- **Autenticación Segura** - Registro e inicio de sesión de usuarios con tokens JWT
- **Integración de Pagos** - Integrado con Mercado Pago para transacciones seguras
- **Perfiles de Usuario** - Gestiona direcciones, historial de pedidos e información personal
- **Panel de Administración** - Reportes y herramientas de gestión para administradores
- **Contacto y Soporte** - Sistema de preguntas frecuentes y formularios de contacto

## 📁 Estructura del Proyecto

```
Besta-Ecommerce-web/
├── Frontend/                 # Aplicación frontend con React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── Backend/                  # Servidor API con Express.js
│   ├── config/              # Configuración de base de datos
│   ├── controllers/         # Manejadores de solicitudes
│   ├── routes/              # Puntos finales de API
│   ├── models/              # Modelos de base de datos
│   ├── middlewares/         # Middlewares de Express
│   ├── services/            # Lógica de negocio
│   ├── index.js             # Punto de entrada del servidor
│   └── package.json
├── dbFiera.sql              # Esquema de base de datos
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

## 🔧 Stack Tecnológico

### Frontend
- **React 19.1.1** - Librería de UI moderna con Hooks
- **Vite 7.1.7** - Herramienta de construcción ultrarrápida
- **Tailwind CSS 4.1.17** - Framework CSS basado en utilidades
- **React Router 7.9.4** - Enrutamiento del lado del cliente
- **Axios 1.13.2** - Cliente HTTP para llamadas API
- **Lucide React** - Librería de iconos
- **React Hot Toast** - Notificaciones tipo toast
- **SDK de Mercado Pago** - Integración de pagos

**Lenguajes:** JavaScript (72%), CSS (27.9%), HTML (0.1%)

### Backend
- **Node.js** con **Express 5.1.0** - Framework de API REST
- **PostgreSQL (pg 8.16.3)** - Base de datos relacional
- **JWT (jsonwebtoken 9.0.2)** - Tokens de autenticación
- **Bcrypt/BcryptJS** - Hasheo de contraseñas
- **Multer 2.0.1** - Manejo de carga de archivos
- **Cloudinary** - Hosting y optimización de imágenes
- **SDK de Mercado Pago** - Procesamiento de pagos
- **CORS** - Intercambio de recursos entre orígenes
- **Dotenv** - Configuración de variables de entorno

## 🚀 Comenzar

### Requisitos Previos
- Node.js (v14+)
- Base de datos PostgreSQL
- Gestor de paquetes npm o yarn

### Instalación

#### Configuración del Backend
```bash
cd Backend
npm install
```

Crea un archivo `.env` en el directorio Backend:
```env
DATABASE_URI=postgresql://usuario:contraseña@localhost:5432/fiera
JWT_SECRET=tu_secreto_jwt_aqui
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
CLOUDINARY_URL=tu_url_cloudinary
MERCADOPAGO_ACCESS_TOKEN=tu_token
```

#### Configuración del Frontend
```bash
cd Frontend
npm install
```

### Ejecutar la Aplicación

#### Backend
```bash
cd Backend
npm run dev  # o el script de inicio correspondiente
```
La API estará disponible en `http://localhost:3000`

#### Frontend
```bash
cd Frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📚 Puntos Finales de API

El backend proporciona puntos finales de API RESTful para:

- **Autenticación** - `/api/auth` - Login y registro de usuarios
- **Usuarios** - `/api/user` - Gestión de perfil de usuario
- **Categorías** - `/api/category` - Categorías de productos
- **Subcategorías** - `/api/subCategory` - Subdivisiones de categorías
- **Productos** - `/api/productDetails`, `/api/product` - Información de productos
- **Carrito de Compras** - `/api/shoppingCar` - Gestión del carrito
- **Lista de Deseos** - `/api/wishListProduct` - Productos guardados
- **Pedidos** - `/api/saleOrder`, `/api/saleOrderItem` - Órdenes de compra
- **Pagos** - `/api/paymentMethod` - Métodos de pago
- **Direcciones de Usuario** - `/api/userAddressItem` - Direcciones de entrega
- **Reportes** - `/api/reports` - Analítica de administrador
- **Preguntas Frecuentes** - `/api/faq` - Preguntas frecuentes
- **Contacto** - `/api/contact` - Formularios de contacto

## 🛠️ Características Principales

### Características para Usuarios
✅ Explorar catálogo de equipos deportivos  
✅ Búsqueda y filtrado avanzado de productos  
✅ Gestión del carrito de compras  
✅ Funcionalidad de lista de deseos  
✅ Autenticación segura de usuarios  
✅ Seguimiento del historial de pedidos  
✅ Múltiples direcciones de entrega  
✅ Integración de pagos con Mercado Pago  
✅ Reseñas y calificaciones de productos  
✅ Contacto con equipo de soporte  

### Características para Administradores
✅ Gestión de productos  
✅ Gestión de pedidos  
✅ Reportes y análisis de ventas  
✅ Gestión de usuarios  
✅ Gestión de preguntas frecuentes  
✅ Gestión de categorías  

## 📋 Base de Datos

La aplicación utiliza PostgreSQL con el esquema definido en `dbFiera.sql`. Las tablas principales incluyen:

- Usuarios
- Categorías
- Subcategorías
- Productos (Detalles de Productos)
- Pedidos (Orden de Venta)
- Elementos de Pedido (Artículos de Orden de Venta)
- Artículos del Carrito de Compras
- Artículos de Lista de Deseos
- Direcciones de Usuario
- Métodos de Pago
- Preguntas Frecuentes

## 🔐 Seguridad

- Hasheo de contraseñas con bcrypt
- Autenticación basada en JWT
- Configuración de CORS para solicitudes seguras entre orígenes
- Protección de variables de entorno para datos sensibles
- Consulta `SECURITY.md` para políticas de seguridad detalladas

## 📞 Contribuciones

¡Nos encantaría tu contribución! Por favor, revisa [CONTRIBUTING.md](CONTRIBUTING.md) para conocer las pautas sobre cómo contribuir a este proyecto.

## 👥 Colaboradores

Consulta [CONTRIBUTORS.md](CONTRIBUTORS.md) para una lista de colaboradores.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta [LICENSE](LICENSE) para más detalles.

## 📖 Código de Conducta

Por favor, revisa [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de contribuir.

## 🤝 Soporte

Para problemas, solicitudes de características o preguntas generales:
- Abre un issue en el repositorio de GitHub
- Contáctanos a través del formulario de contacto en el sitio web
- Consulta la sección de preguntas frecuentes para preguntas comunes

---

**Hecho con ❤️ para Fiera Implementos Deportivos**
