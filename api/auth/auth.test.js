const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

const nate = {
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
});
