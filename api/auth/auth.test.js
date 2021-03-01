const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

const nathan = {
  username: "nate",
  password: "nate123",
  phone_number: 1112223333,
};

describe("Auth Endpoint Testing", () => {
  // DB set up
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  beforeEach(async () => {
    await db("users").truncate;
  });
  afterAll(async () => {
    await db.destroy();
  });

  it("Sanity Check", () => {
    expect(true).toEqual(true);
  });

  describe("Test [POST] api/auth/register", () => {
    it("Responds 201 on successful user creation", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send(nathan);
      expect(response.status).toBe(201);
    });
    it("Responds with new user data", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send(nathan);

      console.log(process.env.TESTING_DATABASE_URL); // shows test db 👍
      console.log(response.body.username); // undefined 👎
      console.log(process.env.NODE_ENV); // testing 👍

      expect(response.body.username).toBe(nathan.username);
    });
  });

  describe("Test [POST] /api/auth/login", () => {
    it("Won't log in with invalid credentials", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send(nathan);
      expect(response.status).toBe(401);
      expect(response.text).toContain(/invalid credentials/i);
    });
    it("Login success returns token/msg", async () => {
      await request(server).post("/api/auth/register").send(nathan);
      const response = await request(server)
        .post("api/auth/login")
        .send(nathan);
      expect(response.status).toBe(200);
      expect(response.text).toContain(/login successful/i);
      expect(response.body).toContain(/token/i);
    });
  });

  describe("Test [PUT] /api/auth/:id/login", () => {
    it("Won't update without valid token", async () => {});
    it("Returns message on success", async () => {
      // "message": "User updated successfully"
    });
  });
});
