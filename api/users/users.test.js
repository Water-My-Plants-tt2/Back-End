const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

describe("User Endpoint Testing", () => {
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

  describe("[GET] /api/users", () => {
    it("Responds if empty", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it("Gets all users if exist", async () => {
      await db.seed.run();
      const response = await request(server).get("/api/users");
      expect(response.body).toHaveLength(3);
    });
  });
  describe("[GET] /api/users/:id", () => {
    it("Returns specific user", async () => {
      await db.seed.run();
      const id = 1;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.status).toBe(200);
    });
    it("Returns error if not found", async () => {
      const id = 999;
      const response = await request(server).get(`/api/user/${id}`);
      expect(response.text).toBe('{"message":"404: Resource not found"}');
    });
  });
});
