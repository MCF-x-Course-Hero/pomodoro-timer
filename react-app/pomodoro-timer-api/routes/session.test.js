const request = require("supertest");
const app = require("../app");
const Session = require("../models/session");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testSessionIds,
    testTokens
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Session Routes", () => {
    /************* GET /sessions/ */
    describe("GET /session/::username/", () => {
        test("Authed user can get all the sessions they have completed organized by the date", async () => {
            const res = await request(app).get(`/session/::tonyhawk`);
            expect(res.statusCode).toEqual(201);
        })

        test("Throws not found error when user does not exist", async () => {
            const res = await request(app).get(`/session/::nonuser`);
            expect(res.statusCode).toEqual(401);
        })
    })

    /************* GET /sessions/sum */
    describe("GET /session/sum", () => {
        test("Authed user can get the sum of the duration of all their sessions", async () => {
            const res = await request(app).get(`/session/sum/`).set("authorization", `Bearer ${testTokens.thawkToken}`);
            expect(res.statusCode).toEqual(200);
        })

        test("Throws unauthorized error when user is not allowed", async () => {
            const res = await request(app).get(`/session/sum`);
            expect(res.statusCode).toEqual(401);
        }) 
    })

    /*************  POST /session/ */
    describe("POST /session/ ", () => {
        test("Authed user can send a completed session to the database", async () => {
            const res = await request(app).post(`/session/`).set("authorization", `Bearer ${testTokens.thawkToken}`).send({
                duration: 500,
                session_type: "pomozone"
            });
            expect(res.statusCode).toEqual(200);
        })

        test("Throw unauthorized error when user is not allowed", async () => {
            const res = await request(app).post(`/session/`).send({
                duration: 500,
                session_type: "pomozone"
            });
            expect(res.statusCode).toEqual(401);
        })

        test("Throw bad request error when user doesn't provide session type", async () => {
            const res = await request(app).post(`/session/`).set("authorization", `Bearer ${testTokens.thawkToken}`).send({
                duration: 500
            })
            expect(res.statusCode).toEqual(400);
        })

        test("Throw bad request error when user doesn't provide duration", async () => {
            const res = await request(app).post(`/session/`).set("authorization", `Bearer ${testTokens.thawkToken}`).send({
                session_type: "pomozone"
            })
            expect(res.statusCode).toEqual(400);
        })
    })
})