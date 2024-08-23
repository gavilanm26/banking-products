<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Microservicio de Productos Bancarios

## Características

- Creación de producto préstamo personal.
- Validación de autenticación mediante tokens JWT generados por el microservicio de `OAuth`.
- Uso de arquitectura hexagonal para la separación de responsabilidades.
- Integración con MongoDB para la persistencia de datos.
- Configuración lista para desplegarse en un contenedor Docker.

## Requisitos Previos

- Node.js (última versión recomendada)
- MongoDB
- Docker (opcional para despliegue en contenedores)
- Microservicio de `OAuth`: Debes tener configurado y en funcionamiento el microservicio de OAuth para la generación de tokens JWT, los cuales son necesarios para la autenticación en este microservicio.

## Instalación

### 1. Instala las dependencias:

```bash
npm install
```

### 2. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y copia las variables del archivo `.env.example` proporcionado.

Nota: Si estás usando Docker, no necesitas configurar el archivo `.env` manualmente, ya que las variables de entorno se configuran en el `docker-compose.yml`.

## Uso

### 1. Ejecutar el microservicio localmente

Para iniciar el microservicio en un entorno local:

```bash
 npm run start:dev
```

El servicio estará disponible en \`http://localhost:3001\`.

### 2. Despliegue con Docker

Si prefieres ejecutar el microservicio dentro de un contenedor Docker, puedes usar el archivo \`docker-compose.yml\` proporcionado.

Para desplegar el microservicio utilizando Docker:

```bash
 docker-compose up -d
```

El servicio estará disponible en \`http://localhost:3001\` y MongoDB en \`mongodb://localhost:27020/products\`.

### 3. Pruebas

#### Creación de Producto

- **URL**: `http://localhost:3001/products/create`
- **Método**: `POST`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **Body**:

  ```json
  {
    "documentType": "CC",
    "documentNumber": "123456787",
    "loanAmount": 50000,
    "loanTerm": "12 months",
    "interestRate": "33.02",
    "status": "active",
    "productName": "Personal Loan"
  }
  ```

#### Consultar todos los Productos

- **URL**: `http://localhost:3001/products/all`
- **Método**: `GET`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```

#### Consultar Producto por CustomerKey o ID

- **URL**: `http://localhost:3001/products/{customerKey}`
- **Método**: `GET`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```

#### Actualizar Producto

- **URL**: `http://localhost:3001/products/{customerKey}`
- **Método**: `PATCH`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```
- **Body**:
  ```json
  {
    "nameProduct": "Updated Product Name"
  }
  ```

#### Eliminar Producto (Lógica)

- **URL**: `http://localhost:3001/products/{customerKey}`
- **Método**: `DELETE`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token}"
  }
  ```

## Estructura del Proyecto

El proyecto sigue una arquitectura hexagonal, organizada de la siguiente manera:

- **src/products/domain**: Entidades y lógica de negocio.
- **src/products/application**: Casos de uso, DTOs.
- **src/products/infrastructure**: Implementaciones de infraestructura (repositorios, esquemas, controladores).

## Despliegue y Uso con Docker

1. **Construir y ejecutar el contenedor**:

   ```bash
   docker-compose up -d
   ```

2. **Verificar los contenedores en ejecución**:

   ```bash
   docker ps
   ```

   Esto mostrará los contenedores \`products-service\` y \`products-mongo\` en ejecución.
