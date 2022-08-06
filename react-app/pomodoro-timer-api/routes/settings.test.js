const request = require("supertest");
const User = require("../models/user");
const app = require("../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testTokens
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Settings Routes", () => {
    /****************** POST /settings/ */
    describe("POST /settings/", () => {
        test("User can send their new saved settings to db", async () => {
            const res = await request(app).post(`/settings/`).send({
                pTime: 25,
                sbTime: 5,
                lbTime: 15,
                pColor: 'pdefault',
                sbColor: 'sbdefault',
                lbColor: 'lbdefault',
                dark_mode: false,
                sound_notif: false
            }).set("authorization", `Bearer ${testTokens.lebronToken}`);
            expect(res.statusCode).toEqual(201);
        })

        test("Throws Bad Request error if all values aren't supplied", async () => {
            const res = await request(app).post(`/settings/`).send({
                pTime: 25,
                sbTime: 5,
                lbTime: 15,
                pColor: 'pdefault',
                sbColor: 'sbdefault',
                lbColor: 'lbdefault',
                // dark_mode: false,
                sound_notif: false
            }).set("authorization", `Bearer ${testTokens.lebronToken}`);
            expect(res.statusCode).toEqual(400);
        })

        test("Throws Unauthorized error if user is not valid", async () => {
            const res = await request(app).post(`/settings/`).send({
                pTime: 25,
                sbTime: 5,
                lbTime: 15,
                pColor: 'pdefault',
                sbColor: 'sbdefault',
                lbColor: 'lbdefault',
                dark_mode: false,
                sound_notif: false
            });
            expect(res.statusCode).toEqual(401);
        })
    })

    /****************** GET /settings/ */
    describe("GET /settings/", () => {
        test("User can retrieve their saved settings from db", async () => {
            const res = await request(app).get(`/settings/`).set("authorization", `Bearer ${testTokens.lebronToken}`);
            expect(res.statusCode).toEqual(200);
        })

        test("Throws Unauthorized error if user is not valid", async () => {
            const res = await request(app).get(`/settings/`);
            expect(res.statusCode).toEqual(401);
        })
    })
})