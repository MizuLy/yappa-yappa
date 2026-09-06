const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createCommentHandler,
  getCommentByIdHandler,
  updateCommentHandler,
  deleteCommentHandler,
} = require("../controllers/comment.controller");
const upload = require("../config/upload");

const router = express.Router();

router.post("/", verifyToken, upload.array("images", 3), createCommentHandler);
router.get("/:id", getCommentByIdHandler);
router.patch(
  "/:id",
  verifyToken,
  upload.array("images", 3),
  updateCommentHandler,
);
router.delete("/:id", verifyToken, deleteCommentHandler);

module.exports = router;
