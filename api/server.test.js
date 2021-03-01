const request = require("supertest");
const server = require("./server");

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
