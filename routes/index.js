var express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("index home!!!");
});

router.get("/s", function(req, res) {
  res.sendFile(__dirname + "/users.js");
});

router.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  try {
    const file = req.file;
    console.log(file.originalname);
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
