const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

const hamburglar = {
  username: "notathief",
  password: "hamburgers",
  phone_number: 123456789,
};

describe("Server Tests", () => {
  it("Sanity Check", () => {
    expect(true).toEqual(true);
  });
  it("Check for correct testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
  it("Server responds with 200 status code", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
  it("Server catch all 404 on unknown resource", async () => {
    const response = await request(server).get(`/${Math.random()}`);
    expect(response.status).toBe(404);
  });
});

describe("Endpoint Testing", () => {
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

  describe("[GET] /api/users", () => {
    it("Responds if empty", async () => {
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it("Gets all users if exist", async () => {
      // can't connect to test db atm
      // seed users, check for users
    });
  });
  describe("[GET] /api/users/:id", () => {
    it("Returns specific user", async () => {
      // need test db running
      // const id = 1;
      // const response = await request(server).get(`/api/user/${id}`);
      // expect(response.username).toBe("Tommy Tutone");
    });
    it("Returns error if not found", async () => {
      // need test db running
      // const id = 999;
      // const response = await request(server).get(`/api/user/${id}`);
      // expect(response.username).toBe("Tommy Tutone");
    });
  });
  describe("[GET] /api/plants/:id", () => {
    it("Get plants belonging to user", async () => {});
  });
});
