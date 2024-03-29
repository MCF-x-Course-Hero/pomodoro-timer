const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors");
const Session = require("./session");
const User = require("./user");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const newSession = {
    duration: 900,
    session_type: "pomozone"
}

const newSession2 = {
    duration: 800,
    session_type: "pomozone"
}

const newSession3 = {
    duration: 300,
    session_type: "pomozone"
}

const userInfo = {
    username: "lebronjames",
    password: "password"
}

describe("Session Models", () => {
    /***************** Get Total */
    describe("Test get total", () => {
        test("User can successfully get the total duration of their completed sessions", async () => {
            const user = await User.login(userInfo)
            const session = await Session.addSession(newSession, user);
            const total = await Session.getTotal(user);
            expect(total.duration).toEqual("900");
        })

        test("User gets no duration time if they do not have any sessions completed", async () => {
            const user = await User.login(userInfo);
            const total = await Session.getTotal(user);
            expect(total.duration).toEqual(null);
        })

        test("Throws unauthorized error if no user is provided", async () => {
            try {
                const total = await Session.getTotal();
            } catch (err) {
                expect(err instanceof UnauthorizedError).toBeTruthy();
            }
        })
    })

    /***************** Get User Sessions */
    describe("Test get user sessions", () => {
        test("User can successfully retrieve their completed sessions", async () => {
            const user = await User.login(userInfo);
            const session1 = await Session.addSession(newSession, user);
            const session2 = await Session.addSession(newSession2, user);
            const session3 = await Session.addSession(newSession3, user);
            const allSessions = await Session.getUserSessions(user);
            expect(allSessions.length).toEqual(3);
        })

        test("Throws not found error if no user is provided", async () => {
            try {
                const total = await Session.getUserSessions();
            } catch (err) {
                expect(err instanceof NotFoundError).toBeTruthy();
            }
        })
    })

    /***************** addSession */
    describe("Test addSession", () => {
        test("Can add new session successfully with valid params", async () => {
            const user = await User.login(userInfo);
            const session = await Session.addSession(newSession, user);
            expect(session).toEqual({
                id: expect.any(Number),
                duration: newSession.duration,
                session_type: newSession.session_type,
                user_id: expect.any(Number)
            })
        })

        test("Throws an error when proper attributes aren't provided", async () => {
            expect.assertions(1);
            const user = await User.login(userInfo);
            const newSessionWrong = {
                duration: 900,
                // session_type: "pomozone"
            };
            try {
                await Session.addSession(newSessionWrong, user);
            } catch (err) {
                expect(err instanceof BadRequestError).toBeTruthy();
            }
        })
    })
})