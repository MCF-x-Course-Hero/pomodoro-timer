const request = require("supertest");
const app = require("../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testTokens,
    testTaskIds
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Task Routes", () => {
    /*************** POST /tasks/ */
    describe("POST /task/", () => {
        test("Authed user can send a completed task to the database ", async () => {
            const res = await request(app).post(`/task/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                task: "writing tests",
                is_completed: false
            })
            expect(res.statusCode).toEqual(201);
        })

        test("Throw unauthorized error when user is not allowed", async () => {
            const res = await request(app).post(`/task/`).send({
                task: 500,
                is_completed: "pomozone"
            });
            expect(res.statusCode).toEqual(401);
        })

        test("Throw bad request error when user doesn't provide task", async () => {
            const res = await request(app).post(`/task/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                is_completed: false
            })
            expect(res.statusCode).toEqual(400);
        })

        test("Throw bad request error when user doesn't provide is_completed status", async () => {
            const res = await request(app).post(`/task/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                task: "writing tests"
            })
            expect(res.statusCode).toEqual(400);
        })
    })

    /*************** GET /tasks/complete/ */
    describe("GET /task/complete/", () => {
        test("Authed user can get a list of their completed tasks", async () => {
            const res = await request(app).get(`/task/complete/`).set("authorization", `Bearer ${testTokens.cenaToken}`);
            expect(res.statusCode).toEqual(200);
        })

        test("Throws unauthorized error when user does not exist in db", async () => {
            const res = await request(app).get(`/task/complete/`);
            expect(res.statusCode).toEqual(401);
        });
    })

    /*************** GET /tasks/pending/ */
    describe("GET /task/pending/", () => {
        test("Authed user can get a list of their pending tasks", async () => {
            const res = await request(app).get(`/task/pending/`).set("authorization", `Bearer ${testTokens.cenaToken}`);
            expect(res.statusCode).toEqual(200);
        })

        test("Throws unauthorized error when user does not exist in db", async () => {
            const res = await request(app).get(`/task/pending/`);
            expect(res.statusCode).toEqual(401);
        });
    })

    /*************** POST /tasks/update/ */
    describe("POST /tasks/update/", () => {
        test("Authed user can update a task from complete to pending or the other way around", async () => {
            const res = await request(app).post(`/task/update/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                id: 1,
                is_completed: false
            })
            expect(res.statusCode).toEqual(201);
        })

        test("Throw unauthorized error when user is not allowed", async () => {
            const res = await request(app).post(`/task/update/`).send({
                task: 500,
                is_completed: "pomozone"
            });
            expect(res.statusCode).toEqual(401);
        })

        test("Throw bad request error when user doesn't provide task id", async () => {
            const res = await request(app).post(`/task/update/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                is_completed: false
            })
            expect(res.statusCode).toEqual(400);
        })

        test("Throw bad request error when user doesn't provide is_completed status", async () => {
            const res = await request(app).post(`/task/update/`).set("authorization", `Bearer ${testTokens.cenaToken}`).send({
                id: 1
            })
            expect(res.statusCode).toEqual(400);
        })
    })

    /*************** DELETE /task/:taskId/ */
    describe("DELETE /task/:taskId/", () => {
        test("Authed user can delete a pending task", async () => {
            const taskId = testTaskIds[0];
            const res = await request(app).delete(`/task/:${taskId}/`).set("authorization", `Bearer ${testTokens.lebronToken}`);
            expect(res.statusCode).toEqual(204);
        })

        test("Throw unauthorized error when user is not allowed", async () => {
            const taskId = testTaskIds[0];
            const res = await request(app).delete(`/task/:${taskId}`);
            expect(res.statusCode).toEqual(401);
        })

        test("Throw not found error when task id does not exist", async () => {
            const res = await request(app).delete(`/task/:${-1}`).set("authorization", `Bearer ${testTokens.cenaToken}`);
            expect(res.statusCode).toEqual(404);
        })
    })
})