<a name="readme-top"></a>

<div align="center">
<img width="300px" src="https://www.rrhhdigital.com/wp-content/uploads/img_directorio/LBQY_factorial_logo_color.png" alt="Logo" width="800"> 
</div>

## David Ramón Chica - Factorial Senior Software Engineer

El software empresarial para gestionar a todo tu equipo · Automatiza el trabajo que no te deja trabajar

Este proyecto está dividido en dos partes, el backend y el frontend. Para el backend, he reutilizado el siguiente challenge que hice: 
"
In this challenge  (don't worry we don't want you to do work for free, we'll keep it short), you will have to create an API(Motorbike API) for the customer management of an online motorbike shop. The idea is to use Node.js (This is our base technology) with Typescript to create this API. The design of the "Customer" entity, the database technology and the structure of the project are your choice.
👂 Everything you consider "Best Practices" is mandatory to implement ("We LOVE testing")

First step 🌟

Create a REST API that allows you to perform CRUD operations for a "Customer" entity with the minimum attributes that you think an online shop selling motorbikes should store.
Once the CRUD operations has been done, create an specific method to add an "available credit" to customers.
Finally, this API needs a method that allows list all customers and sorting them by "available credit". (As we promised, it won't take you too long 😆)

Second step(optional)

We got the service running and working as expected! 🚀
Let's deploy it. What's the fun of developing something if no one can access it?
We use the serverless framework https://serverless.com/. If you are comfortable with it or want to learn, go for it! Otherwise, use whatever you feel comfortable with, but please remember that we should be able to clone the repo and replicate the environment.
👂 Psst, remember to include instructions on how to deploy it
". 

He adaptado la temática del challenge, de una tienda de motos a un software de gestión de clientes y créditos, para adaptar mejor al scope de Factorial



## El camino previo antes del desarrollo. El ciclo de vida del desarrollo del software.

Para mi, siempre que trabajo en un equipo, de las primeras cosas que hago es entender como el equipo trata el SDLC(Software Development Life Cycle, en español, el ciclo de vida del desarrollo del software), porque me hago una idea de dos cosas importantes el As-is y el To-be del proyecto.

En pocas palabras y para que lo entienda todo el mundo, el As-is es un mapa que demuestra la situación actual del proyecto y el To-be es el mapa donde quiere llegar la empresa a final de la evolución del proceso.

Lo primero que he hecho es coger el As-is, es decir el challenge de backend que hice y eso me ha permitido crear el blueprint To-Be. Tengo que hacer una aclaración, en el blueprint To-Be es un artefacto de arquitectura que te va a permitir hacer una construcción detallada de la arquitectura el sistema para dar respuesta a las iniciativas estratégicas de la compañia, en este caso de Factorial.
Por lo que es importante aclarar el alcance, no todo el blueprint se ha cubierto, pero si he ido más allá y he añadido todo lo relacionado para mejorar y seguir trabajando en este challenge, una vez entregado.

Antes de entrar en detalle al plan de arquitectura y como he pensado todo antes de desarrollar, comentar que estos puntos se van a tratar en los readme de la carpeta de backend y la carpeta de frontend. Recomiendo encarecidamente que se sigan para poner el marcha los proyecto y hacer las pruebas end to end:

* Características principales
* Tecnologias y dependencias
* Capturas de pantalla de la API
* Para empezar en el backend/frontend
* Prerequisitos
* Instalación
* Para desarrollo local
* Para producción
* Ejecutar la API en Local
* Ejecutar Tests
* Compilar el proyecto


## Plan de Arquitectura para Customer API - Blueprint To-Be

### Plan de Arquitectura – Customer API
1. Blueprint TO-BE
Visión General
La Customer API es un servicio RESTful diseñado para gestionar clientes y sus créditos. Está desarrollada siguiendo los principios de Domain-Driven Design (DDD) y se despliega en AWS mediante un enfoque serverless. El sistema se divide en contextos acotados que encapsulan la lógica de negocio y permiten un crecimiento escalable.
Componentes Clave
* Dominio (Core):
    * Customer Management Context:
        * Entidad: Customer (Cliente)
        * Value Objects: Email
        * Casos de Uso CRUD: Crear, leer, actualizar y eliminar clientes.
    * Credit Management Context:
        * Value Object: Credit
        * Funcionalidades Específicas: Incrementar crédito disponible y listar clientes ordenados por crédito.
* Aplicación:
    * Casos de Uso: Orquestación de la lógica de negocio (por ejemplo, CreateCustomerUseCase, UpdateCustomerUseCase, IncreaseCustomerCreditUseCase).
    * Handlers: Adaptadores que transforman solicitudes externas (HTTP) en comandos y consultas para el dominio.
* Infraestructura:
    * Persistencia: MongoDB Atlas para la base de datos, con Mongoose para interactuar con ella.
    * Deployment Serverless: AWS Lambda y API Gateway, gestionados con Serverless Framework.
    * Logging y Monitoreo: Integración con AWS CloudWatch y herramientas de análisis de métricas.
* Interface Adapters (API):
    * Controladores Express: Exponen la API REST y traducen el lenguaje externo (JSON, HTTP) al lenguaje ubicuo del dominio.

2. Principio de Arquitectura Orientado a API
Principios Clave
* Separación de Responsabilidades: Cada capa (dominio, aplicación, infraestructura y API) tiene responsabilidades bien definidas.
* Desacoplamiento y DIP: Se utilizan abstracciones (interfaces y Value Objects) para separar la lógica de negocio de la infraestructura, facilitando pruebas y cambios.
* Modelo de Dominio Rico: El dominio se modela con entidades y Value Objects que encapsulan reglas de negocio y validaciones (por ejemplo, Email, Address).
* Exposición de Servicios a través de API Gateway: La API REST se despliega en un entorno serverless (AWS Lambda y API Gateway) para lograr escalabilidad, alta disponibilidad y reducción de costos operativos.
* Consistencia en el Lenguaje Ubicuo: Tanto en el backend como en el frontend se utilizan términos comunes (Customer, Email, Address, Credit) que facilitan la comunicación entre equipos técnicos y de negocio.

3. Requerimientos y Casos de Uso
Requerimientos Funcionales
* Gestión de Clientes:
    * Crear Cliente: Registrar un cliente con nombre, email, y crédito inicial.
    * Leer Cliente: Consultar un cliente por su ID.
    * Actualizar Cliente: Modificar la información del cliente, incluyendo cambios en el crédito.
    * Eliminar Cliente: Remover un cliente del sistema
* Gestión de Crédito:
    * Incrementar Crédito: Agregar crédito adicional a un cliente según reglas de negocio (p.ej., validaciones o límites).
    * Listar Clientes por Crédito: Consultar y ordenar clientes de mayor a menor crédito.
Requerimientos No Funcionales
* Escalabilidad: La API debe soportar un alto volumen de peticiones y escalar automáticamente (usando AWS Lambda).
* Monitoreo y Logging: Uso de AWS CloudWatch para monitorizar tiempos de respuesta, errores y uso de recursos.
* Seguridad: Validación de datos a nivel de dominio mediante Value Objects; uso de políticas IAM para funciones Lambda y encriptación de datos sensibles.
* Despliegue Automático: Uso de Serverless Framework para integraciones CI/CD que permitan despliegues rápidos y reproducibles.
Casos de Uso Específicos
* Crear Cliente: Un usuario ingresa datos en un formulario para registrar un nuevo cliente.
    * Validación de datos (email y credit) mediante Value Objects.
    * Persistencia del cliente en MongoDB Atlas.
* Actualizar Cliente: Un usuario (o administrador) edita la información de un cliente existente.
    * Se permite actualizar nombre, email, crédito.
    * La actualización de dirección se realiza utilizando un objeto plano derivado del Value Object.
* Incrementar Crédito: Un administrador añade crédito a un cliente.
    * Se envía la cantidad a añadir y se actualiza el campo de crédito en el documento del cliente.
* Listar Clientes por Crédito: Se consulta y ordena la lista de clientes según su crédito disponible para identificar a los clientes de mayor valor.

4. Roadmap de Producto
* Fase 1: Desarrollo del Backend
   * Implementar la API REST siguiendo DDD, separando los contextos (Customer Management y Credit Management).
   * Realizar pruebas unitarias que cubran todos los casos de uso, smoke.
* Fase 2: Desarrollo del Frontend y Consumo de la API
   * Diseño y prototipado de la interfaz de usuario (UI) para la gestión de clientes y crédito.
   * Implementación del frontend utilizando un framework moderno (React).
   * Creación de una capa de servicios para consumir la API REST.
* Fase 3: Despliegue del backend
   * Desplegar la API en AWS utilizando Serverless Framework.
* Fase 4: Monitorización y Escalabilidad
   * Integrar AWS CloudWatch para recoger métricas (tiempos de respuesta, tasas de error, uso de recursos).
   * Configurar un dashboard para visualizar las métricas clave en tiempo real.
   * Realizar pruebas de stress y optimizar la API según sea necesario.
   * Integración y pruebas end-to-end para garantizar la correcta comunicación entre frontend y backend.
* Fase 5: Iteración y Mejora Continua
   * Recoger feedback de usuarios y administradores.
   * Iterar sobre la UI/UX y añadir nuevas funcionalidades basadas en necesidades reales.
   * Refinar la arquitectura y los casos de uso conforme evoluciona el producto.


5. Métricas y Dashboard
Las métricas clave que se pueden incluir en un futurio dashboard son:
* Tasa de Solicitudes: Número de peticiones por minuto/hora, para medir la carga en la API.
* Tiempos de Respuesta: Tiempo promedio y percentiles (p95, p99) de respuesta para cada endpoint.
* Errores HTTP: Conteo y tipos de errores (4xx y 5xx) para detectar problemas de funcionamiento.
* Uso de Recursos de Lambda: Monitorización de memoria y tiempo de ejecución de las funciones Lambda.
* Transacciones de Base de Datos: Número de operaciones exitosas y fallidas en MongoDB, para identificar posibles cuellos de botella.
* Eventos Críticos y Logs: Registro de errores y advertencias capturados por Winston y enviados a CloudWatch, para facilitar el análisis de incidencias.
Estas métricas no solo permiten un monitoreo continuo, sino que también ayudan a identificar oportunidades de optimización y asegurar una alta disponibilidad del producto.

6. Orientación a Producto
Para orientar la arquitectura a producto (como lo haría Factorial), se deben considerar los siguientes aspectos:
* Enfoque en el usuario y en el valor de negocio: La solución se diseña para satisfacer las necesidades del cliente final, ofreciendo una experiencia de usuario intuitiva y funcional. Se definen flujos claros de gestión de clientes y crédito que aporten valor y permitan un uso ágil y eficaz.
* Iteración y entrega continua: La arquitectura permite despliegues frecuentes y actualizaciones rápidas mediante CI/CD, lo que facilita la incorporación de mejoras y nuevas funcionalidades basadas en feedback real.
* Escalabilidad y Flexibilidad: El uso de AWS Lambda y API Gateway permite escalar la API automáticamente. La separación en contextos acotados y el uso de principios como DIP garantizan que cada módulo se pueda modificar o expandir sin afectar al resto del sistema.
* Monitoreo y Feedback: La integración con herramientas de monitoreo y un dashboard robusto permite medir la calidad del servicio, identificar problemas en tiempo real y actuar rápidamente para mejorar el producto.
* Seguridad y Confiabilidad: Se implementan mecanismos de validación y control en el dominio (con Value Objects) y se aplican buenas prácticas de seguridad en la gestión de datos y credenciales, asegurando que el producto es confiable y seguro para los usuarios. Este punto se ha hecho a través de implementar class-validtor y VOs(Value Objects)

Conclusiones que he tenido en cuenta
Este plan de arquitectura orientado a producto para la Motorbike API:
* Define un blueprint TO-BE con contextos acotados (Customer Management y Credit Management) y un modelo de dominio enriquecido.
* Establece principios de arquitectura orientados a API que garantizan el desacoplamiento, escalabilidad y seguridad.
* Detalla los requerimientos y casos de uso fundamentales para la gestión de clientes y crédito.
* Presenta un roadmap que abarca desde el desarrollo del backend hasta la integración con el frontend y la monitorización continua.
* Incluye las métricas clave para el dashboard, que permiten evaluar el rendimiento y la salud del sistema en producción.
Con este enfoque, la API no solo será técnicamente robusta, sino que también estará alineada con los objetivos de negocio y la experiencia del usuario, permitiendo una evolución continua y escalable del producto.

NOTA importante: para esta entrega se ha hecho la fase 1 y la fase 2. Como comentaba antes, la idea, por tiempo es crear un plan detallado que abarque los proximos pasos una vez entregada la práctica

### Fase 2: Desarrollo del frontend y consumo de la API
Primero defino los casos de uso y los wireframes que se van a estructurar en la web.


1. Casos de Uso Principales (Use Cases) que he pensado en general
Basado en la funcionalidad expuesta por mi API, estos son los casos de uso que debe cubrir el futuro frontend:
* UC1: Listar Clientes
* Descripción: El usuario (administrador o empleado) puede ver una lista de clientes registrados. Flujo Principal:
    1. El usuario accede a la página "Clientes".
    2. La aplicación realiza un GET a /customers.
    3. Se muestra una tabla/lista con la información de cada cliente (nombre, email, crédito, dirección). Casos Alternativos:
    * Si no hay clientes, se muestra un mensaje "No se encontraron clientes".
* UC2: Crear Cliente
*  Descripción: Permite crear un nuevo cliente con datos básicos y dirección. Flujo Principal:
    1. El usuario hace clic en el botón "Nuevo Cliente".
    2. Se abre un formulario con campos: Nombre, Email, Crédito inicial, Dirección (Calle, Ciudad, Código Postal).
    3. El usuario ingresa la información y envía el formulario.
    4. La aplicación realiza un POST a /customers con los datos.
    5. Se muestra una notificación de éxito y el cliente se agrega a la lista. Validaciones:
    * Los campos deben ser obligatorios y tener validaciones (por ejemplo, formato de email).
* UC3: Actualizar Cliente
* Descripción: Permite editar la información de un cliente existente. Flujo Principal:
    1. En la lista de clientes, el usuario selecciona "Editar" para un cliente específico.
    2. Se abre un formulario prellenado con la información actual del cliente.
    3. El usuario modifica los campos necesarios y guarda los cambios.
    4. Se realiza un PUT a /customers/{id} con los datos actualizados.
    5. Se notifica el éxito o se muestra un error. Validaciones:
    * Validar que el email y dirección tengan un formato correcto.
* UC4: Eliminar Cliente
*  Descripción: Permite eliminar un cliente. Flujo Principal:
    1. En la lista de clientes, el usuario hace clic en "Eliminar".
    2. Se muestra una confirmación.
    3. Al confirmar, se realiza un DELETE a /customers/{id}.
    4. Se actualiza la lista eliminando el cliente y se muestra un mensaje de confirmación.
* UC5: Incrementar Crédito del Cliente
* Descripción: Permite añadir crédito a un cliente. Flujo Principal:
    1. En la vista de detalles o en la lista de clientes, el usuario selecciona "Añadir Crédito".
    2. Se abre un modal o formulario donde se ingresa la cantidad a añadir.
    3. Al enviar, se realiza un PATCH a /customers/{id}/add-credit con la cantidad.
    4. Se actualiza la información del cliente en la lista y se muestra un mensaje de éxito.
* UC6: Consultar Detalle de un Cliente
*  Descripción: El usuario puede ver la información completa de un cliente (incluyendo dirección y crédito). Flujo Principal:
    1. El usuario hace click en un cliente de la lista.
    2. Se muestra una vista detallada con toda la información del cliente.

2. Wireframes Propuestos
A continuación, se describen de forma resumida los wireframes para cada caso de uso. (Estos son esquemáticos y se pueden detallar con herramientas como Figma o Sketch).
* Página de Listado de Clientes (UC1):
    * Encabezado: Título "Gestión de Clientes" y botón "Nuevo Cliente".
    * Tabla/Listado: Columnas: Nombre, Email, Crédito, Dirección (Calle, Ciudad, Código Postal), Acciones (Editar, Eliminar, Añadir Crédito).
    * Paginación o scroll infinito.
* Formulario de Creación de Cliente (UC2):
    * Campos:
        * Nombre (Input de texto)
        * Email (Input de texto)
        * Crédito Inicial (Input numérico)
    * Botones: "Crear Cliente" y "Cancelar".
* Formulario de Actualización de Cliente (UC3):
    * Similar al formulario de creación, pero prellenado con la información actual.
    * Botones: "Guardar Cambios" y "Cancelar".
* Modal para Incrementar Crédito (UC5):
    * Campo: Cantidad de Crédito a añadir (Input numérico).
    * Botones: "Agregar Crédito" y "Cancelar".
    * Muestra el crédito actual y el nuevo crédito resultante.
* Vista Detallada de Cliente (UC6):
    * Muestra toda la información del cliente en un formato de tarjeta o panel.
    * Incluye botones para "Editar", "Eliminar" y "Añadir Crédito".


NOTA: Todo esto ha servido de base para luego el resultado final
 
## ¿Qué puedo aportar a Factorial?

Para mí el camino hacia el To-be comienza en la arquitectura y termina en el SDLC. Una buena base de arquitectura hace que los sistemas sean mucho más escalables y sobre todo que haya crecimiento tanto de la empresa, como del trabajador. En mi tiempo como arquitecto, he trabajado en definir estándares y directrices de Arquitectura que han sido el motor del nuevo del SDLC. Aquí os los detallo y puedo potenciar vuestros proyectos dando mi visión en todos estos artefactos que, para mi, forman una buena arquitectura. De hecho he utilizadoo  el artefacto de blueprint y principios de arquitectura para pensar y estructurar el challenge y luego por supuesto la implementación. Aquí os dejo todos los artefactos que puedo aportar a Factorial:

* Estrategia de TI
* Principios de Arquitectura
* Blueprints de Arquitectura
* Patrones de Arquitectura
* Procedimientos y guías para desarrollar
* Implementación de la arquitectura y roadmap de Arquitectura
Para esta práctica he trabajado en primer lugar, en los principios de arquitectura que será la base de la arquitectura de la práctica.

Si entro en Factorial, una de las muchas cosas que puedo aportar, es ayudar a renovar/crear los principios de Arquitectura, que como todos sabemos son la base de la arquitectura, sin ellos, la alineación estratégica y el desarrollado se hace más complicado.

Me he tomado la libertad de crear otro principio para vosotros, que puede ser el motor de Factorial 2.0.(Para este principio he seguido el framework de TOGAF para su redacción):

Principio 1 - Arquitectura Basada en Servicios APIficados y Desacoplada

Declaración: las aplicaciones de Factorial deben ser diseñadas como servicios desacoplados, con interfaces bien definidas mediante APIs, para asegurar una integración flexible y escalable que minimice dependencias directas entre los sistemas.
Racional: Una arquitectura desacoplada basada en servicios y en un futuro orientada a eventos permite una mejor gestión de la complejidad y facilita la integración de nuevas funcionalidades sin afectar la estabilidad de los sistemas existentes. Este enfoque también proporciona la agilidad necesaria para implementar cambios regulatorios o nuevas demandas del mercado con mayor rapidez y eficiencia para Factorial.
Implicaciones:
Los servicios deben ser desarrollados como componentes independientes y reutilizables, que puedan ser fácilmente actualizados sin impacto en el sistema completo.
La integración debe apoyarse en APIs estandarizadas y mecanismos de publicación/suscripción de eventos(en un futuro) que permitan una conectividad fluida y adaptable entre sistemas internos y externos.
Se deben implementar soluciones que favorezcan el procesamiento asíncrono y la gestión de eventos(en un futuro) para optimizar el flujo de datos y la interacción entre sistemas.



### GRACIAS POR VUESTRA LECTURA
