import express, { Request, Response } from "express";
import winston from "winston";

// Handlers
import CreateCustomerHandler from "../UseCases/CreateCustomer/CreateCustomerHandler";
import DeleteCustomerHandler from "../UseCases/DeleteCustomer/DeleteCustomerHandler";
import UpdateCustomerHandler from "../UseCases/UpdateCustomer/UpdateCustomerHandler";
import ReadCustomerHandler from "../UseCases/ReadCustomer/ReadCustomerHandler";
import IncreaseCustomerCreditHandler from "../UseCases/IncreaseCustomerCredit/IncreaseCustomerCreditHandler";
import ListCustomersByCreditHandler from "../UseCases/ListCustomersByCredit/ListCustomersByCreditHandler";

// Use Cases
import CreateCustomerUseCase from "../../MotorbikesStore.Microservice.Application/UseCases/CreateCustomer/CreateCustomerUseCase";
import ReadCustomerUseCase from "../../MotorbikesStore.Microservice.Application/UseCases/ReadCustomer/ReadCustomerUseCase";
import { DeleteCustomerUseCase } from "../../MotorbikesStore.Microservice.Application/UseCases/DeleteCustomer/DeleteCustomerUseCase";
import { UpdateCustomerUseCase } from "../../MotorbikesStore.Microservice.Application/UseCases/UpdateCustomer/UpdateCustomerUseCase";
import { IncreaseCustomerCreditUseCase } from "../../MotorbikesStore.Microservice.Application/UseCases/IncreaseCustomerCredit/IncreaseCustomerCreditUseCase";
import { ListCustomersByCreditUseCase } from "../../MotorbikesStore.Microservice.Application/UseCases/ListCustomersByCredit/ListCustomersByCreditUseCase";

// Repositorio
import customerRepository from "../../MotorbikesStore.Microservice.Infrastructure/Database/Repositories/CustomerRepository";

// Manejador de errores
import HttpErrorHandler from "../Common/Error/HttpErrorHandler";

const router = express.Router();

// Configuración del logger con Winston
const logger = winston.createLogger({
  level: "warn", // Se registrarán los logs de nivel warn y superior (warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "warn" }),
  ],
});
// Inyección de dependencias
const createCustomerHandler = new CreateCustomerHandler(
  new CreateCustomerUseCase(customerRepository)
);

const readCustomerHandler = new ReadCustomerHandler(
  new ReadCustomerUseCase(customerRepository)
);

const deleteCustomerHandler = new DeleteCustomerHandler(
  new DeleteCustomerUseCase(customerRepository)
);
const updateCustomerHandler = new UpdateCustomerHandler(
  new UpdateCustomerUseCase(customerRepository)
);

const listCustomersByCreditHandler = new ListCustomersByCreditHandler(
  new ListCustomersByCreditUseCase(customerRepository)
);
const increaseCustomerCreditHandler = new IncreaseCustomerCreditHandler(
  new IncreaseCustomerCreditUseCase(customerRepository)
);

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Email:
 *       type: string
 *       format: email
 *       example: "usuario@ejemplo.com"
 *       description: "Correo electrónico válido. Se transforma a un Value Object."
 *     Credit:
 *       type: number
 *       minimum: 0
 *       example: 1000
 *       description: "Crédito. Se valida que sea positivo y se transforma en un Value Object."
 *     CustomerCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - credit
 *       properties:
 *         name:
 *           type: string
 *           description: "Nombre del cliente"
 *           example: "David Ramon"
 *         email:
 *           $ref: '#/components/schemas/Email'
 *         credit:
 *           $ref: '#/components/schemas/Credit'
 *     CustomerUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: "Nombre del cliente"
 *           example: "David Ramon Actualizado"
 *         email:
 *           $ref: '#/components/schemas/Email'
 *         credit:
 *           $ref: '#/components/schemas/Credit'
 *     AddCreditRequest:
 *       type: object
 *       required:
 *         - credit
 *       properties:
 *         credit:
 *           $ref: '#/components/schemas/Credit'
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerCreate'
 *     responses:
 *       201:
 *         description: Cliente creado con éxito
 *       400:
 *         description: Error al crear el cliente
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const response = await createCustomerHandler.handle(req.body);
    res.status(response.success ? 201 : 400).json(response);
  } catch (error: any) {
    logger.error(`POST /customers error: ${error.stack || error}`);
    HttpErrorHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente obtenido con éxito
 *       404:
 *         description: Cliente no encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const response = await readCustomerHandler.handle({ id: req.params.id });
    if (response.success) {
      res.status(200).json(response);
    } else {
      logger.warn(`GET /customers/${req.params.id} - ${response.message}`);
      res.status(404).json({ message: response.message });
    }
  } catch (error: any) {
    logger.error(
      `GET /customers/${req.params.id} error: ${error.stack || error}`
    );
    HttpErrorHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Actualiza un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerUpdate'
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito
 *       400:
 *         description: Error al actualizar el cliente
 */

router.put("/:id", async (req: Request, res: Response) => {
  try {
    /// (...) es un operador de propagación que se utiliza para copiar todas las propiedades de un objeto a otro.
    /// en este caso se crea un nuevo objeto que contiene la propiedad id y todas las propiedas de req.body
    const updateInputData = { id: req.params.id, ...req.body };
    const response = await updateCustomerHandler.handle(updateInputData);
    res.status(response.success ? 200 : 400).json(response);
  } catch (error: any) {
    HttpErrorHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 */

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const response = await deleteCustomerHandler.handle({ id: req.params.id });
    res.status(response.success ? 200 : 404).json(response);
  } catch (error: any) {
    logger.error(
      `DELETE /customers/${req.params.id} error: ${error.stack || error}`
    );
    HttpErrorHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /customers/{id}/add-credit:
 *   patch:
 *     summary: Añade crédito disponible a un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCreditRequest'
 *     responses:
 *       200:
 *         description: Crédito añadido con éxito
 *       400:
 *         description: Error al añadir crédito
 */
router.patch("/:id/add-credit", async (req: Request, res: Response) => {
  try {
    /// (...) es un operador de propagación que se utiliza para copiar todas las propiedades de un objeto a otro.
    /// en este caso se crea un nuevo objeto que contiene la propiedad id y todas las propiedas de req.body
    const updateInputData = { id: req.params.id, ...req.body };
    const response = await increaseCustomerCreditHandler.handle(
      updateInputData
    );
    res.status(response.success ? 200 : 400).json(response);
  } catch (error: any) {
    logger.error(
      `PATCH /customers/${req.params.id}/add-credit error: ${
        error.stack || error
      }`
    );
    HttpErrorHandler.handle(error, res);
  }
});

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Lista todos los clientes ordenados por crédito disponible
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */

router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await listCustomersByCreditHandler.handle();
    res.status(200).json(customers);
  } catch (error: any) {
    logger.error(`GET /customers error: ${error.stack || error}`);
    HttpErrorHandler.handle(error, res);
  }
});
export default router;
