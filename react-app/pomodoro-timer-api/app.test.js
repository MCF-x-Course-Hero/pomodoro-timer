const request = require("supertest");
const app = require("./app");
const db = require("./db");

test("not found for site 404", async () => {
    const resp = await request(app).get("/no-such-path")
    expect(resp.statusCode).toEqual(404)
})

test("not found for site 404 (test stack print)", async () => {
    process.env.NODE_ENV = ""
    const resp = await request(app).get("/no-such-path")
    expect(resp.statusCode).toEqual(404)
    delete process.env.NODE_ENV
})

afterAll(async () => {
    await db.end()
})