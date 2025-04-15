## README - BACKEND
## Características principales

- CRUD de clientes (crear, leer, actualizar y eliminar).
- Operaciones específicas para gestionar el crédito del cliente (aumentar crédito, listar clientes por crédito ordenado por credito).
- Test unitarios para cada uno de los casos de uso, test de integración y smoke test.
- API desplegada de forma serverless en AWS utilizando MONGODB Atlas.(No terminada)

## Tecnologias y dependencias

- Node.js con TypeScript
- Express para la API REST
- MongoDB para la persistencia de datos (usamos MongoDB Atlas en producción)
- Mongoose ORM para la interacción con MongoDB
- Serverless Framework para el despliegue en AWS Lambda
- Jest (framework de testing) y Supertest para pruebas de integración de la API
- Winston para logging
- Swagger para documentación La documentación de la API se genera en el endpoint /api-docs.
- Class-validator para la validación en los commands de los use cases

  
### Capturas de pantalla de la API

![<img width="939" alt="Captura de pantalla 15 04 2025 a 17 01 16 p  m" src="https://github.com/user-attachments/assets/53b7c6db-057e-4f71-b157-65d54cc21715" />
Captura de pantalla de la API en local con base de datos en local de MongoDB]
<img width="865" alt="Captura de pantalla 15 04 2025 a 17 03 38 p  m" src="https://github.com/user-attachments/assets/de823ad9-33f6-4488-81f8-d1222e385762" />
<img width="868" alt="Captura de pantalla 15 04 2025 a 17 03 48 p  m" src="https://github.com/user-attachments/assets/610e1d90-d9ca-44d7-addf-a3cf62355aa6" />
<img width="925" alt="Captura de pantalla 15 04 2025 a 17 04 09 p  m" src="https://github.com/user-attachments/assets/9b6a74ec-6fbc-4789-a7d7-aed3d76a5193" />
<img width="908" alt="Captura de pantalla 15 04 2025 a 17 04 39 p  m" src="https://github.com/user-attachments/assets/de42f22c-501e-4027-abb2-8440b05f9cb7" />
<img width="902" alt="Captura de pantalla 15 04 2025 a 17 04 57 p  m" src="https://github.com/user-attachments/assets/ce1b1f51-544c-4ae5-8107-ca7cc3bbb987" />
<img width="911" alt="Captura de pantalla 15 04 2025 a 17 05 16 p  m" src="https://github.com/user-attachments/assets/a1c21d3b-a98b-4fca-bd7e-079901d0c63b" />

![En MongoDB, ejecutando consulta directamente desde la terminal de mongo] 
<img width="707" alt="Captura de pantalla 15 04 2025 a 17 05 43 p  m" src="https://github.com/user-attachments/assets/075dbba4-0b29-4686-8c28-926eb1c6181b" />

![TEST pasados] 

<img width="785" alt="run test" src="https://github.com/user-attachments/assets/a5e58438-e1bd-46cf-b9e0-81ce803167f4" />

![Deploy] 

<img width="696" alt="deploy" src="https://github.com/user-attachments/assets/fe2c18be-d9f2-4125-b8c8-6b85dbc80fe5" />


## Para empezar

### Prerequisitos

- NPM

  ```sh
  npm install npm@latest -g
  ```
- Node.js (versión 14 o superior)
- Una cuenta en AWS. Si quieres en tu entorno local desplegar el proyecto
- (Opcional) Una cuenta en MongoDB Atlas para el entorno de producción
- Serverless Framework instalado globalmente (o usar npx)

### Instalación

1. Clona el repositorio

   ```sh
   git clone 
   ```

2. Instala los paquetes de NPM

   ```sh
   npm install
   ```

3. Ejecuta el proyecto

- rm -rf dist --> Limpiar la caché
- Npx tsc -> compilar

4. Abre en local. Para este paso tienes que tener configurado .env para mongo en tu local( Sigue más abajo para ver como crear el archivo .env para tu MongoDB)
   
node dist/MotorbikesStore.Microservice.Api/server.js --> ejecutar nuestro api en local

5. ¡Abre swagger y disfruta!
http://localhost:3000/api-docs/
<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Configuración del Entorno para la base de datos
Crear un archivo .env a la misma altura del package.json. Configurar en el archivo .env en la raíz del proyecto con las variables necesarias, por ejemplo:

###  Para desarrollo local, puedes usar tu MongoDB local este ejemplo tal cual, pero cambiando tus credenciales.
- PORT=3000
- MONGO_URI=mongodb://admin:secret@localhost:27017/motorbike-shop?authSource=admin

- ¡Imporante! Asegurate que tu mongoDB en local este utilizando autenticación. Admin y secret es mi usuario y mi pass en tu local, tu mongo tendras otros credenciales. En mi caso he utilizado Docker con un mongoDB
- Si todo correcto en la terminal te pondrá esto: Mongo URI: mongodb://admin:secret@localhost:27017/motorbike-shop?authSource=admin Server running on port 3000 MongoDB Connected

### Ejecutar la API en Local

rm -rf dist --> Limpiar la caché
Npx tsc -> compilar
<img width="556" alt="Captura de pantalla 15 04 2025 a 17 03 01 p  m" src="https://github.com/user-attachments/assets/66014027-23a1-45d1-a44a-cede680b934c" />

node dist/MotorbikesStore.Microservice.Api/server.js --> ejecutar nuestro api en local
<img width="777" alt="Captura de pantalla 15 04 2025 a 17 03 11 p  m" src="https://github.com/user-attachments/assets/87a5b5ce-fe02-4883-be00-a3ec91840890" />


¡Importante! Asegúrate de tener MongoDB corriendo localmente. Yo me he creado con docker una imagen de MONGO_DB. 
¡Importante! ES NECESARIO TENER UNA IMAGEN DE MONGO_DB corriendo para ejecutar y probar este proyecto

<img width="1263" alt="Captura de pantalla 15 04 2025 a 17 07 59 p  m" src="https://github.com/user-attachments/assets/40fbf923-e405-4451-b6a9-d2fae5ca81cc" />


Ejecuta:

npm run dev

- ### Para producción(por si quereis trastear), actualiza MONGO_URI con la cadena de conexión de MongoDB Atlas por ejemplo(solo tendrias que cambiar el user y el password:
- MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xyz.mongodb.net/motorbike-shop?retryWrites=true&w=majority
- Ej: "mongodb+srv://myuser:mypassword@cluster0.0iydd.mongodb.net/motorbike-shop?retryWrites=true&w=majority&appName=Cluster0"
- 
### Ejecutar Tests: 
La suite de tests utiliza Jest. Para ejecutar todos los tests:

npm test
Puedes ver tests unitarios, de integración,smoke


### Compilar el proyecto 

rm -rf dist --> Limpiar la caché
Npx tsc -> compilar
node dist/MotorbikesStore.Microservice.Api/server.js --> ejecutar nuestro api en local


## Para desplegar mediante serverless. 

### Crear una cuenta de AWS y acceder a la consola de IAM para crear un usuario. 
Una vez que tengas el Access Key ID y el Secrete Access Key, debes de configurar los credenciales para serverless.  Yo he seguido estos pasos que es instalar el AWS CLI en mi local.

Opción A: AWS CLI:
- Instala AWS CLI y ejecuta:
  1. Brew install awscli
  2. aws configure

Ingresa tu AWS Access Key ID, AWS Secret Access Key, región (por ejemplo, us-east-1) y el formato de salida (json).


- Desplegar en AWS con Serverless Framework
Instalar Serverless Framework (si aún no lo tienes):

npm install -g serverless
Asegúrate de que tu AWS CLI o variables de entorno estén configuradas.

- Desplegar:

npx serverless deploy

Al finalizar, Serverless mostrará la URL pública de tu API en AWS (generada por API Gateway. En mi caso, mi API está desplegada en https://1o2f06h114.execute-api.us-east-1.amazonaws.com/api-docs

- Mi API desplegada en:  https://1o2f06h114.execute-api.us-east-1.amazonaws.com/api-docs

### Endpoints y Uso con cURL/Postman
Ejemplos de comandos para probar la API:

- Obtener todos los clientes

curl -X GET "https://<YOUR_API_URL>/customers" -H "accept: application/json"

- Obtener un cliente por ID

curl -X GET "https://<YOUR_API_URL>/customers/<customer-id>" -H "accept: application/json"

- Crear un nuevo cliente

curl -X POST "https://<YOUR_API_URL>/customers" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "David Ramón",
        "email": "davidramón@factorial.com,
        "credit": 10000
      }'
- Actualizar un cliente

curl -X PUT "https://<YOUR_API_URL>/customers/<customer-id>" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "David Ramón Chica",
        "email": "dramon@factorial.com",
        "credit": 15000        
      }'
- Eliminar un cliente
curl -X DELETE "https://<YOUR_API_URL>/customers/<customer-id>" -H "accept: application/json"

- Añadir crédito a un cliente

curl -X PATCH "https://<YOUR_API_URL>/customers/<customer-id>/add-credit" \
  -H "Content-Type: application/json" \
  -d '{"credit": 5000}'
Reemplaza <YOUR_API_URL> por la URL asignada por Serverless o en local (por ejemplo, https://1o2f06h114.execute-api.us-east-1.amazonaws.com) y <customer-id> por un ID válido.
