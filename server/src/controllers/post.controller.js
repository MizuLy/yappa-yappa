const {
  postYappa,
  getYappas,
  getYappaById,
  updateYappa,
  deleteYappa,
} = require("../services/post.service");

const postYappaHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const post = await postYappa({
      userId,
      content,
      imageUrls,
    });
    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

const getYappasHandler = async (req, res, next) => {
  try {
    const posts = await getYappas();
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    next(err);
  }
};

const getYappaByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getYappaById({ id });

    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

const updateYappaHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const post = await updateYappa({
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

const deleteYappaHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await deleteYappa({ id, userId });

    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postYappaHandler,
  getYappaByIdHandler,
  getYappasHandler,
  updateYappaHandler,
  deleteYappaHandler,
};
