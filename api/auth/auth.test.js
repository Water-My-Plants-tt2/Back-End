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
    // await db("users").truncate();
  });
  afterAll(async () => {
    await db.destroy();
  });

  it("Sanity Check", () => {
    expect(true).toEqual(true);
  });

  describe("Test [POST] api/auth/register", () => {
    it("Responds 201/ user info on successful user creation", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send(nathan);
      expect(response.status).toBe(201);
      expect(response.text).toContain(
        '{"user_id":1,"username":"nate","phone_number":"1112223333"}'
      );
    });
  });

  describe("Test [POST] /api/auth/login", () => {
    it("Won't log in with invalid credentials", async () => {
      nathan.password = "pizza";
      const response = await request(server)
        .post("/api/auth/login")
        .send(nathan);
      expect(response.status).toBe(401);
      expect(response.text).toBe('{"message":"Invalid Credentials"}');
    });
    it("Login success returns token/msg", async () => {
      await request(server).post("/api/auth/register").send(nathan);
      const response = await request(server)
        .post("api/auth/login")
        .send({ username: nathan.username, password: nathan.password });
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.text).toContain(/login successful/i);
      expect(response.body).toContain(/token/i);
      console.log(response);
    });
  });

  describe("Test [PUT] /api/auth/:id/login", () => {
    it("Won't update without valid token", async () => {});
    it("Returns message on success", async () => {
      // "message": "User updated successfully"
    });
  });
});
