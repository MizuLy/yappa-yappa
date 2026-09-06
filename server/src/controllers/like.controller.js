const {
  likePost,
  getLikesByPost,
  unlikePost,
  likeComment,
  getLikesByComment,
  unlikeComment,
} = require("../services/like.service");

// Posts
const likePostHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const like = await likePost({ userId, postId });

    res.status(201).json({ status: "success", data: like });
  } catch (err) {
    next(err);
  }
};

const getLikesByPostHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const result = await getLikesByPost({ postId });

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

const unlikePostHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const unlike = await unlikePost({ userId, postId });

    res.status(200).json({ status: "success", data: unlike });
  } catch (err) {
    next(err);
  }
};

// Comments
const likeCommentHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const like = await likeComment({ userId, commentId });

    res.status(201).json({ status: "success", data: like });
  } catch (err) {
    next(err);
  }
};

const getLikesByCommentHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const result = await getLikesByComment({ commentId });

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    next(err);
  }
};

const unlikeCommentHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const unlike = await unlikeComment({ userId, commentId });

    res.status(200).json({ status: "success", data: unlike });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  likePostHandler,
  likeCommentHandler,
  getLikesByPostHandler,
  getLikesByCommentHandler,
  unlikePostHandler,
  unlikeCommentHandler,
};
