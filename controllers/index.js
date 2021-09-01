const router = require("express").Router()
const apiRoutes = require("./api-routes")
const homeRoutes = require("./home-routes.js")
const dashboardRoutes = require("./dashboard-routes")

router.use("/", homeRoutes)
router.use("/dashboard", dashboardRoutes)
router.use("/api", apiRoutes)

module.exports = router;
