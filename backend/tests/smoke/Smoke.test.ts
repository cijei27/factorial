// tests/smoke/smoke.test.ts
import request from "supertest";
import app from "../../src/MotorbikesStore.Microservice.Api/server";
//aquí he hecho el export de app, dela instancia de Express en el server.ts para poder uitlizar supertest sin arrancar un servidor real en cada prueba
// este test tiene como objetivo, asegurar que la api se levanta y responde a solicitudes basicas
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  // Levanta un servidor de MongoDB en memoria y conéctate
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe("Smoke Test", () => {
  it("should return 200 on GET /customers", async () => {
    const res = await request(app).get("/customers");
    expect(res.status).toBe(200);
  }, 10000); // Timeout de 10 segundos para este test
});
