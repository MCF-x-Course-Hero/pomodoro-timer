const request = require("supertest");
const app = require("../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("../tests/common");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("Auth Routes", () => {
    /***************** POST /auth/token/ */
    describe("POST /auth/login", () => {
        test("User can login successfully with valid credentials", async () => {
            const res = await request(app).post("/auth/login/").send({
                username: "lebronjames",
                password: "password"
            })
            expect(res.body).toEqual({
                token: expect.any(String),
                user: {
                    id: expect.any(Number),
                    username: "lebronjames",
                    createdAt: expect.any(String)
                }
            })
        })

        test("Throws Unauthenticated error when user doesn't exist in db", async () => {
            const res = await request(app).post("/auth/login/").send({
                username: "notuser",
                password: "notpassword"
            })
            expect(res.statusCode).toEqual(401);
        })

        test("Throws Unauthenticated error when user provides wrong password", async () => {
            const res = await request(app).post("/auth/login/").send({
              username: "lebronjames",
              password: "nope",
            })
            expect(res.statusCode).toEqual(401)
         })
      
        test("Throws Bad Request error when user doesn't provide password", async () => {
            const res = await request(app).post("/auth/login/").send({
                username: "lebronjames",
            })
            expect(res.statusCode).toEqual(400)
        })

        test("Throws Bad Request error when user doesn't provide email", async () => {
            const res = await request(app).post("/auth/login/").send({
              password: "password",
            })
            expect(res.statusCode).toEqual(400)
          })
    })

    /************************************** POST /auth/register */
    describe("POST /auth/register/", () => {
        test("Allows user to register with valid credentials", async () => {
            const res = await request(app).post("/auth/register/").send({
                username: "arnold",
                password: "eggs"
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual({
            token: expect.any(String),
            user: {
                id: expect.any(Number),
                username: "arnold",
                createdAt: expect.any(String)
            },
            })
        })

        test("Throws Bad Request error when user doesn't provide all fields", async () => {
            const res = await request(app).post("/auth/register/").send({
                username: "new",
            })
        expect(res.statusCode).toEqual(400)
        })
    })

    /*************** DELETE auth/::username/ */
    describe("DELETE auth/::username/", () => {
        test("Allows user to delete their account", async () => {
            const res = await request(app).delete("/auth/::lebronjames")
            expect(res.statusCode).toEqual(204);
        })
        
        test("Throws Not Found error when user doesn't exist", async () => {
            const res = await request(app).delete("/auth/::notuser");
            expect(res.statusCode).toEqual(404);
        })
    })
})