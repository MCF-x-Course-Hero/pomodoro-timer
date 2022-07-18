const express = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
    // authenticating the users email and password
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // take the users email, password
        // create a new user in database
        } catch(err) {
            next(err)
        }
})

module.exports = router