const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../services/post.service");

const createPostHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const post = await createPost({
      userId,
      content,
      imageUrls,
    });
    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

const getPostsHandler = async (req, res, next) => {
  try {
    const posts = await getPosts();
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    next(err);
  }
};

const getPostByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostById({ id });

    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

const updatePostHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const post = await updatePost({
      id,
      userId,
      content,
      imageUrls,
    });

    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

const deletePostHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deletePost({ id, userId });

    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPostHandler,
  getPostByIdHandler,
  getPostsHandler,
  updatePostHandler,
  deletePostHandler,
};
