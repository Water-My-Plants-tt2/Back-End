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
  afterAll(async () => {
    await db("users").truncate();
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
      await db.seed.run(nathan);
      await request(server).post("/api/auth/register").send(nathan);
      let response = await request(server)
        .post("/api/auth/login")
        .send({ username: nathan.username, password: nathan.password });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login Successful");
    });
  });

  describe("Test [PUT] /api/auth/:id/update", () => {
    it("Won't update without valid token", async () => {
      const id = 1;
      const changes = {
        password: "newpass",
        phone_number: "223456789",
      };
      await request(server).post("/api/auth/register").send(nathan);
      let response = await request(server).post("/api/auth/login").send(nathan);
      response = await request(server)
        .put(`/api/auth/${id}/update`)
        .send(changes);
      expect(response.status).toBe(401);
      expect(response.text).toBe('{"message":"No token"}');
    });

    it("Returns message on success", async () => {
      const id = 1;
      const changes = {
        password: "newpass",
        phone_number: "223456789",
      };
      await request(server).post("/api/auth/register").send(nathan);
      let response = await request(server)
        .post("/api/auth/login")
        .send({ username: nathan.username, password: nathan.password });
      const token = response.body.token;
      response = await request(server)
        .put(`/api/auth/${id}/update`)
        .send(changes)
        .set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.text).toBe('{"message":"User updated successfully"}');
    });
  });
});
