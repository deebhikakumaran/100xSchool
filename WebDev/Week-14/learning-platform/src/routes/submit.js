const express = require("express")
const {submitProblems} = require("../controllers/submitController")

const router = express.Router()

router.post("/", submitProblems)

module.exports = router 