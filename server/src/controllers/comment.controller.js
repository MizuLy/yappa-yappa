const {
  createComment,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../services/comment.service");

const createCommentHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId, content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const comment = await createComment({
      userId,
      postId,
      content,
      imageUrls,
    });

    res.status(201).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

const getCommentsByPostHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await getCommentsByPost({ postId });

    res.status(200).json({ status: "success", data: comments });
  } catch (err) {
    next(err);
  }
};

const getCommentByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await getCommentById({ id });

    res.status(200).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

const updateCommentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const comment = await updateComment({
      id,
      userId,
      content,
      imageUrls,
    });

    res.status(200).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

const deleteCommentHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await deleteComment({ id, userId });

    res.status(200).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCommentHandler,
  getCommentByIdHandler,
  getCommentsByPostHandler,
  updateCommentHandler,
  deleteCommentHandler,
};
