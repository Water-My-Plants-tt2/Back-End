const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");
const Plant = require("./model");

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
  beforeEach(async () => {
    await db("plants").truncate;
  });
  afterAll(async () => {
    await db.destroy();
  });

  it("Sanity Check", () => {
    expect(true).toEqual(true);
  });
  describe("[GET] /api/plants/:id", () => {
    it("Get plants belonging to user", async () => {
      // need test db running
    });
    it("Returns Error if user not found", () => {
      // need test db running
    });
  });
});
