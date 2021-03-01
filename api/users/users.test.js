const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

const Optimus = {
  username: "Optimus Prime",
  password: "primotech",
  phone_number: 122333333,
};

describe("User Endpoint Testing", () => {
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

  describe("[GET] /api/users", () => {
    it("Responds if empty", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it("Gets all users if exist", async () => {
      // regular seed
      // const response = await request(server).get("/api/users");
      // expect(response.body).toHaveLength(3);
    });
  });
  describe("[GET] /api/users/:id", () => {
    it("Returns specific user", async () => {
      expect(true).toBe(true);
      // seed optimus
      // const id = 1;
      // const response = await request(server).get(`/api/user/${id}`);
      // expect(response.username).toBe("Optimus Prime");
    });
    it("Returns error if not found", async () => {
      const id = 999;
      const response = await request(server).get(`/api/user/${id}`);
      expect(response.text).toBe('{"message":"404: Resource not found"}');
    });
  });
});
