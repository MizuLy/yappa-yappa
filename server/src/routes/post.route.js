const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  postYappaHandler,
  getYappasHandler,
  getYappaByIdHandler,
  updateYappaHandler,
} = require("../controllers/post.controller");
const { deleteYappa } = require("../services/post.service");

const router = express.Router();

router.post("/", verifyToken, postYappaHandler);
router.get("/", verifyToken, getYappasHandler);
router.get("/:id", verifyToken, getYappaByIdHandler);
router.put("/:id", verifyToken, updateYappaHandler);
router.delete("/:id", verifyToken, deleteYappa);

module.exports = router;
