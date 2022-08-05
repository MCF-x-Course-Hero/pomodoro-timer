const jwt = require("jsonwebtoken");
const tokens = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("Can create valid tokens for users", () => {
    test("Valid tokens are created for users", () => {
      const token = tokens.createUserJwt({ username: "test" })
      const payload = jwt.verify(token, SECRET_KEY)
      expect(payload).toEqual({
        iat: expect.any(Number),
        exp: expect.any(Number),
        username: "test"
      })
    })
})