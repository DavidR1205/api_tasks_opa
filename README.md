# Proyecto: Gestor de Tareas

Aplicación web para gestionar tareas, permitiendo crear, editar, eliminar y marcar tareas como completadas. 
Desarrollada con React en el frontend y Node.js/Express en el backend.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Configurar Backend](#1configurar-backend)
- [Configurar FrontEnd](#2-configurar-frontend)
- [Uso](#uso)
- [Decisiones Técnicas](#decisiones-técnicas)



## Instalación
Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:
    ```bash
   git clone https://github.com/DavidR1205/api_tasks_opa.git

2. Navega al directorio:
    ```bash
    cd api_task_opa

3. Este proyecto se divide en 2 partes su API en la carpeta backend y su FrontEnd en la carpeta frontEnd:

    ## 1.Configurar Backend

    1. Realizaremos lo siguiente para vincular el backend a una bd:
        * Iremos a nuestro gestor de Base de Datos favorito y crearemos una BD de MySQL, el nombre sera a nuestra elección.

        * Luego iremos a la carpeta llamada backend y dentro, crearemos un archivo llamado .env

        * Dentro de este archivo .env, crearemos las siguientes variables (DEBEN DE TENER ESTE MISMO NOMBRE)
            DB_HOST = //pondremos el host donde se encuentra nuestra BD, predeterminado localhost
            DB_USER = //pondremos el usuario con el cual ingresamos a nuestra BD
            DB_PASSWORD = //pondremos la contraseña con la que ingresamos a nuestra BD
            DB_NAME = //Nombre que le dimos a la base de datos que acabos de crear

            - Guardamos los cambios y cerramos el archivo

    2. Ejecutamos una nueva terminal y nos iremos a la carpeta donde se encuentra el backend
        ```bash
        cd backend
    
    3. Una vez aqui ejecutaremos el siguiente comando para cargar las dependencias del proyecto
        ```bash
        npm install

    ## 2. Configurar FrontEnd

    1. Dentro de la carpeta llamada frontend crearemos un archivo llamado .env

    2. Dentro de este archivo crearemos una variable con el siguiente nombre (DEBE DE SER EL MISMO NOMBRE):
        VITE_API_URL = //Ponemos la url con la cual corre nuestra API o Backend, predeterminado http://localhost:3000

        Guardamos y cerramos el archivo

    3. Abriremos una nueva terminal en la carpeta raiz del proyecto (api_prueba_opa)

    4. Luego nos iremos a la carpeta donde se encuentra nuestro FronEnd
        ```bash
        cd frontend

    5. Una vez aqui ejecutaremos el siguiente comando para cargar las dependencias del proyecto
        ```bash
        npm install


## Uso

* Ejecutar Backend
    1. Abrimos una terminal en la carpeta raiz del proyecto (api_prueba_opa)
    
    2. Luego nos iremos a la carpeta donde se encuentra nuestro backend
        ```bash
        cd backend

    3. Luego ejecutamos el siguiente comando para iniciar el API
        ```bash
        node --watch app.js

* Ejecutar FrontEnd
    1. Abriremos una nueva terminal en la carpeta raiz del proyecto (api_prueba_opa)

    2. Luego nos iremos a la carpeta donde se encuentra nuestro FronEnd
        ```bash
        cd frontend

    3. Luego ejecutamos el siguiente comando para iniciar el FrontEnd
        ```bash
        npm run dev

- NOTA IMPORTANTE: Ambas terminales deben de estar corriendo al tiempo para que la App funcione


## Decisiones Técnicas

- React con React Router Dom: Facilita la navegación entre vistas y permite componentes reutilizables

- Bootstrap y React Icons: Proporcionan estilos rápidos, responsivos y consistentes.

- SweetAlert2: Mejora la experiencia de usuario en alertas y confirmaciones.

- Uso de dotenv: Permite configurar variables de entorno para la conexión a la base de datos y otros parámetros sensibles (puerto, URL, credenciales).

- CORS (cors middleware): Habilita la comunicación segura entre el frontend (React) y el backend, evitando bloqueos de política de mismo origen.

- MySQL como base de datos: Permite almacenar tareas de manera estructurada, con relaciones claras y consultas eficientes.

 