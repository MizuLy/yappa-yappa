const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createCommentHandler,
  getCommentByIdHandler,
  updateCommentHandler,
  deleteCommentHandler,
} = require("../controllers/comment.controller");
const upload = require("../config/upload");
const {
  likeCommentHandler,
  getLikesByCommentHandler,
  unlikeCommentHandler,
} = require("../controllers/like.controller");

const router = express.Router();

// Comments
router.get("/:id", getCommentByIdHandler);
router.patch(
  "/:id",
  verifyToken,
  upload.array("images", 3),
  updateCommentHandler,
);
router.delete("/:id", verifyToken, deleteCommentHandler);

// Likes
router.post("/:commentId/like", verifyToken, likeCommentHandler);
router.get("/:commentId/likes", getLikesByCommentHandler);
router.delete("/:commentId/like", verifyToken, unlikeCommentHandler);

module.exports = router;
