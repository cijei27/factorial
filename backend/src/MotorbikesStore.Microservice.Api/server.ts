import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import winston from "winston";
import cors from "cors";
// Cargar variables de entorno
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3001", // Permite solo este origen
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Solo si necesitas enviar cookies o credenciales
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuración de MongoDB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));
}

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customers API",
      version: "1.0.0",
      description: "API para gestionar clientes y créditos",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  // Ajusta la ruta a la carpeta 'controller' según dónde estén tus controladores TS
  apis: ["./dist/MotorbikesStore.Microservice.Api/controller/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importa las rutas del controlador
import customerRoutes from "./controller/CustomerController";
app.use("/customers", customerRoutes);

// Configuración del logger con Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// Middleware de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Exporta la aplicación para que se pueda importar en los tests
export default app;

// Si el archivo se ejecuta directamente (no en test), arranca el servidor:
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
