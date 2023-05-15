# Instrucciones para correr el proyecto

- Tener instalado node.js
- Tener instalado docker ya que proyecto utiliza un archivo docker-compose para correr un contenedor con la base de datos Postgresql
- Instalar dependencia con el comando npm install
- correr el archivo docker-compose con el comando "docker compose up -d" para levantar el contenedor con la image de postgresql
- Correr el proyecto con el comando "npm run satrt:dev"

## Nota:

- El proyecto esta corriendo en el puerto 3001
- La base de datos esta corriendo en el puerto 5435

## Documentacion del proyecto:

- http://localhost:3001/api/v1/meta/docs/
