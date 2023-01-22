const { Router } = require("express");

const router = Router();

router.use("/users", require("./Users.route"));
router.use("/goods", require("./Goods.route"));
router.use("/massage", require("./Massage.route"));
router.use("/coaches", require("./Coach.route"));
router.use("/simulators", require("./Simulators.route"));
router.use("/admin/form", require("./Form.route"));

module.exports = router;
