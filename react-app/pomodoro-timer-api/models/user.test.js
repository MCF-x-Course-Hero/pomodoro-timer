const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors");
const User = require("./user");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/common");

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("User", () => {
    /******************** User.login */
    describe("Test login", () => {
        test("User can login successfully with proper credentials", async () => {
            const user = await User.login({ username: "lebronjames", password: "password"});
             expect(user).toEqual({
                id: expect.any(Number),
                username: "lebronjames",
                createdAt: expect.any(String)
             })
        })

        test("Unknown email throw unauthorized error", async () => {
            expect.assertions(1);
            try {
                await User.login({ username: "randomperson", password: "password"});
            } catch (err) {
                expect(err instanceof UnauthorizedError).toBeTruthy();
            }
        })

        test("Invalid credentials throw unauthorized error", async () => {
            expect.assertions(1);
            try {
                await User.login({ username: "lebronjames", password: "incorrect" });
            } catch (err) {
                expect(err instanceof UnauthorizedError).toBeTruthy();
            }
        })
    })
    
    /***************** User.register */
    describe("Test register", () => {
        const newUser = {
            username: "new",
        }

        test("User can successfully register with proper credentials", async () => {
            const user = await User.register({ ...newUser, password: "pw" })
            expect(user).toEqual({
                id: expect.any(Number),
                username: "new",
                createdAt: expect.any(String),
            })
        })

        test("Registering with duplicate username throws error", async () => {
            expect.assertions(1);
            try {
                await User.register({
                    ...newUser,
                    password: "pw",
                })
                await User.register({
                    ...newUser,
                    password: "pw",
                })
            } catch (err) {
                expect(err instanceof BadRequestError).toBeTruthy();
            }
        })
    })

    /********************** fetchUserByUsername */
    describe("Test fetchUserByUsername", () => {
        test("Can fetch a user by username", async () => {
            const user = await User.fetchUserByUsername("lebronjames");
            expect(user).toEqual({
                id: expect.any(Number),
                username: "lebronjames",
                password: expect.any(String),
                created_at: expect.any(Date)
            })
        })

        test("Unknown email returns nothing", async () => {
            const user = await User.fetchUserByUsername("wrongusername");
            expect(user).toBeFalsy();
        })
    })

    describe("Test remove", () => {
        test("User can remove their account from the database", async () => {
            const deleteUser = await User.remove(":lebronjames");
            const user = await User.fetchUserByUsername("lebronjames");
            expect(user).toEqual(undefined);
        })

        test("Unknown username returns not found error", async () => {
            try {
                const user = await User.remove("notuser");
            } catch (err) {
                expect(err instanceof NotFoundError).toBeTruthy();
            }
        });
    })
})