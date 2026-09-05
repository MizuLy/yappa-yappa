const { prisma } = require("../config/prisma");

const postYappa = async ({ userId, content, imageUrl }) => {
  if (!content && !imageUrl) {
    const error = new Error("There must be something to yap about");
    error.statusCode = 400;
    throw error;
  }

  const post = await prisma.post.create({
    data: { userId, content, imageUrl },
  });

  return post;
};

const getYappas = async () => {
  const posts = await prisma.post.findMany();

  return posts;
};

const getYappaById = async ({ id }) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    const error = new Error("Can't find the yap");
    error.statusCode = 404;
    throw error;
  }

  return post;
};

const updateYappa = async ({ id, userId, content, imageUrl }) => {
  const exist = await prisma.post.findUnique({
    where: { id },
  });

  if (!exist) {
    const error = new Error("Can't find the yap");
    error.statusCode = 404;
    throw error;
  }

  if (exist.userId !== userId) {
    const error = new Error("Hey don't spill the tea, gurl");
    error.statusCode = 403;
    throw error;
  }

  if (!content && !imageUrl) {
    const error = new Error("There must be something to yap about");
    error.statusCode = 400;
    throw error;
  }

  const post = await prisma.post.update({
    where: { id },
    data: { content, imageUrl },
  });

  return post;
};

const deleteYappa = async ({ id, userId }) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    const error = new Error("Can't find the yap");
    error.statusCode = 404;
    throw error;
  }

  if (post.userId !== userId) {
    const error = new Error("Hey don't spill the tea, gurl");
    error.statusCode = 403;
    throw error;
  }

  await prisma.post.delete({
    where: { id },
  });

  return { message: "No more yap" };
};

module.exports = {
  postYappa,
  getYappas,
  getYappaById,
  updateYappa,
  deleteYappa,
};
