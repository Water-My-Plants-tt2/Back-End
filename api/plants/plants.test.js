const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

const groot = {
  username: "groot",
  password: "iamgroot",
  phone_number: 880070088,
};

describe("Plant Endpoint Testing", () => {
  // DB set up
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  afterAll(async () => {
    await db("plants").truncate();
    await db.destroy();
  });

  it("Sanity Check", () => {
    expect(true).toEqual(true);
  });

  describe("[GET] /api/plants/:id", () => {
    it("Get plants belonging to user", async () => {
      const id = 1;
      await request(server).post("/api/auth/register").send(groot);
      let response = await request(server).post("/api/auth/login").send(groot);
      const token = response.body.token;
      response = await request(server)
        .get(`/api/plants/${id}`)
        .set({ Authorization: token });
      expect(response.body).toHaveLength(0);
    });

    it("Returns Error if user not found", async () => {
      const id = 999;
      const response = await request(server).get(`/api/plants/${id}`);
      expect(response.status).toBe(400);
    });

    it("[POST] /api/plants/:id", async () => {
      const id = 1;
      const newPlant = {
        nickname: "ficus",
        species: "ficus maximus",
        h2oFrequency: "daily",
      };
      await request(server).post("/api/auth/register").send(groot);
      let response = await request(server).post("/api/auth/login").send(groot);
      const token = response.body.token;
      response = await request(server)
        .get(`/api/plants/${id}`)
        .set({ Authorization: token })
        .send(newPlant);
      expect(response.status).toBe(200);
    });

    it("[PUT] /api/plants/:id", async () => {
      const id = 1;
      const changes = {
        nickname: "Ficus",
        species: "Ficus Maximus",
        h2oFrequency: "Daily",
      };
      await request(server).post("/api/auth/register").send(groot);
      let response = await request(server).post("/api/auth/login").send(groot);
      const token = response.body.token;
      response = await request(server)
        .get(`/api/plants/${id}`)
        .set({ Authorization: token })
        .send(changes);
      expect(response.status).toBe(200);
    });

    it("[DELETE] /api/plants/:id", async () => {
      const id = 1;
      await request(server).post("/api/auth/register").send(groot);
      let response = await request(server).post("/api/auth/login").send(groot);
      const token = response.body.token;
      response = await request(server)
        .get(`/api/plants/${id}`)
        .set({ Authorization: token });
      expect(response.status).toBe(200);
    });
  });
});
