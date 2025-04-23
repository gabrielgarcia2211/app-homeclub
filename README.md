<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# HomeClub API

API para gestionar apartamentos, tarifas y propiedades.


## Project setup

```bash
$ npm install
```

## Compilacion y ejecucion

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoint

Una vez que la aplicación esté en ejecución, puedes acceder a la documentación de la API generada por Swagger en:

👉 [http://127.0.0.1:3000/api](http://127.0.0.1:3000/api)

Esta documentación interactiva te permite explorar y probar los endpoints de la API directamente desde tu navegador.


### Configurar archivo de entorno

Copia el archivo de ejemplo `.env` y personaliza los valores:

```bash
cp .env.example .env
```

Ejemplo de configuración para MySQL:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=homeclub_db

DB2_HOST=127.0.0.1
DB2_PORT=3306
DB2_USERNAME=root
DB2_PASSWORD=
DB2_NAME=homeclub_propiedades_db
```

---

## Base de Datos

Antes de iniciar la aplicación, asegúrate de crear la base de datos ejecutando el script SQL proporcionado. 

1. Crea la base de datos `bd1` utilizando el script ubicado en 📄 [Script](./doc/homeclub.sql)
2. La tabla de la base de datos `bd2` se cargará de forma asíncrona al iniciar la aplicación.


## Endpoints

---

### 🏢 Apartamentos

| Método  | Ruta                                | Descripción                      |
|---------|-------------------------------------|----------------------------------|
| GET     | `http://127.0.0.1:3000/apartamentos`| Obtener lista de apartamentos    |
| POST    | `http://127.0.0.1:3000/apartamentos`| Crear nuevo apartamento          |
| PATCH   | `http://127.0.0.1:3000/apartamentos/2`| Actualizar apartamento con ID 2  |
| DELETE  | `http://127.0.0.1:3000/apartamentos/10`| Eliminar apartamento con ID 10  |

#### Ejemplo de creación (`POST`)
```json
{
  "nombre": "Nuevo apto",
  "direccion": "Calle 13",
  "id_tipo_apartamento": 1,
  "id_ciudad": 1,
  "latitud": 522.2,
  "longitud": 521.36,
  "estado": "activo"
}
```

---

### 💰 Tarifas

| Método  | Ruta                             | Descripción                  |
|---------|----------------------------------|------------------------------|
| GET     | `http://127.0.0.1:3000/tarifas`  | Obtener lista de tarifas     |
| POST    | `http://127.0.0.1:3000/tarifas`  | Crear nueva tarifa           |
| PATCH   | `http://127.0.0.1:3000/tarifas/2`| Actualizar tarifa con ID 2   |
| DELETE  | `http://127.0.0.1:3000/tarifas/2`| Eliminar tarifa con ID 2     |

#### Ejemplo de creación (`POST`)
```json
{
  "id_apartamento": 1,
  "fecha_inicio": "2025-03-01",
  "fecha_fin": "2025-03-31",
  "precio": 5000,
  "id_tipo_tarifa": 1
}
```

---

### 🏠 Propiedades

| Método  | Ruta                                | Descripción                        |
|---------|-------------------------------------|------------------------------------|
| GET     | `http://127.0.0.1:3000/propiedades` | Obtener lista de propiedades       |
| POST    | `http://127.0.0.1:3000/propiedades` | Crear nueva propiedad              |
| PATCH   | `http://127.0.0.1:3000/propiedades/{id}` | Actualizar propiedad con ID especificado |
| DELETE  | `http://127.0.0.1:3000/propiedades/10`| Eliminar propiedad con ID 10  |

#### Ejemplo de creación (`POST`)
**Content-Type:** `multipart/form-data`

| Campo        | Tipo   | Valor              |
|--------------|--------|--------------------|
| descripcion  | texto  | venta de muebles |
| imagen_url   | archivo| *(opcional)*       |
| codigo       | texto  | 1 (debe existir en apartamentos)           |

---

### 📊 Reportes

| Método  | Ruta                              | Descripción                     |
|---------|-----------------------------------|---------------------------------|
| GET     | `http://127.0.0.1:3000/reporte`   | Obtener lista de propiedades       |


#### Parámetros de consulta (`GET`)

| Parámetro      | Valor       | Descripción                     | Estado     |
|----------------|-------------|---------------------------------|------------|
| `latitud`      | `10`        | *(opcional)* Coordenada latitud | Deshabilitado |
| `longitud`     | `20`        | *(opcional)* Coordenada longitud| Deshabilitado |
| `tipos`        | `turistico` | *(opcional)* Tipo de reporte (`turistico | corporativo`) | Activo |
| `precioMinimo` | `5000`      | *(opcional)* Precio mínimo      | Deshabilitado |
| `precioMaximo` | `5000`      | *(opcional)* Precio máximo      | Deshabilitado |
| `pagina`       | `1`         | *(opcional)* Número de página   | Activo     |
| `limite`       | `20`        | *(opcional)* Límite de resultados por página | Activo |

---

## Notas

- Asegúrate de tener el servidor corriendo en el puerto 3000.
- Reemplaza `{id}` con el ID correspondiente del recurso que deseas modificar o eliminar.


## Descargar Documentación

Puedes descargar la documentación completa desde el siguiente enlace:

📄 [Descargar colección de Postman](./doc/HomeClub.postman_collection.json)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).