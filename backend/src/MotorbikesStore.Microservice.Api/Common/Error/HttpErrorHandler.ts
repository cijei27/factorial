import { Response } from "express";

// Enum con los códigos HTTP comunes
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  // Agrega otros códigos según sea necesario
}

// Interfaz para errores HTTP, extendiendo la clase Error
export interface IHttpError extends Error {
  statusCode?: HttpStatusCode;
}

class HttpErrorHandler {
  static handle(error: IHttpError, res: Response): void {
    // Se utiliza el statusCode del error o se asigna INTERNAL_SERVER_ERROR por defecto
    const statusCode: number =
      error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    const message: string = error.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
  }
}

export default HttpErrorHandler;
