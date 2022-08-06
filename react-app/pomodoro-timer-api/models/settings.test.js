const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors");
const Settings = require("./settings");
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

describe("Settings Models", () => {
    /***************** updateSettings */
    describe("updateSettings", () => {
        test("Updates user settings based on their preference", async () => {
            
        })
    })

    describe("getSettings", () => {
        test("Retrieves user settings from db", async () => {

        })
    })
})