var express = require("express");
var router = express.Router();

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  res.json({
    success: true,
    data: {
      username
    }
  });
});

module.exports = router;
