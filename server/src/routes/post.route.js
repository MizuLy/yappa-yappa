const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  postYappaHandler,
  getYappasHandler,
  getYappaByIdHandler,
  updateYappaHandler,
  deleteYappaHandler,
} = require("../controllers/post.controller");
const upload = require("../config/upload");

const router = express.Router();

router.post("/", verifyToken, upload.array("images", 5), postYappaHandler);
router.get("/", getYappasHandler);
router.get("/:id", getYappaByIdHandler);
router.put("/:id", verifyToken, upload.array("images", 5), updateYappaHandler);
router.delete("/:id", verifyToken, deleteYappaHandler);

module.exports = router;
