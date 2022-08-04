describe("Config derived from process.env", () => {
    test("Changing env vars changes config", () => {
      process.env.SECRET_KEY = "abc"
      process.env.PORT = "5000"
      process.env.DATABASE_URL = "other"
      process.env.NODE_ENV = "other"
  
      const config = require("./config")
      expect(config.SECRET_KEY).toEqual("abc")
      expect(config.PORT).toEqual(5000)
      expect(config.getDatabaseUri()).toEqual("other")
      expect(config.BCRYPT_WORK_FACTOR).toEqual(13)
  
      delete process.env.SECRET_KEY
      delete process.env.PORT
      delete process.env.BCRYPT_WORK_FACTOR
      delete process.env.DATABASE_URL
  
      expect(config.getDatabaseUri()).toEqual("postgresql://postgres:postgres@localhost:5432/pomozone")
      process.env.NODE_ENV = "test"
      expect(config.getDatabaseUri()).toEqual("postgresql://postgres:postgres@localhost:5432/pomozone_test")
    })
})