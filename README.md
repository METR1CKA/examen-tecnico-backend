# Examen Técnico Backend

- Correr el comando `npm install` para instalar las dependencias.

- Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=m96eREXNl8jW46xtB-DFGSmXX-7H4mYl
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DB_NAME=
API_URL=https://apigloma.xentra.com.mx
API_KEY=API_c656762a1b91e60f2d581325b1fb63398e060d9b
```

- Crear una base de datos con el nombre asignado en la variable de entorno `MYSQL_DB_NAME`

- Correr el script `npm run mysql:ref` para crear las tablas de las migraciones.

- Correr el script de `bd_examen_dev.sql` en el gestor de mysql, este se encuentra en la carpeta docs del proyecto.

- Correr el comando `npm run dev` para iniciar el servidor.

- En la carpeta docs se encuentra el archivo `Insomnia_2024-01-15.json` que contiene las peticiones de insomnia para probar el proyecto.