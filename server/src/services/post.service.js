const { prisma } = require("../config/prisma");

const postYappa = async ({ userId, content, imageUrls }) => {
  if (!content && (!imageUrls || imageUrls.length === 0)) {
    const error = new Error("There must be something to yap about");
    error.statusCode = 400;
    throw error;
  }

  const post = await prisma.post.create({
    data: {
      userId,
      content,
      images: imageUrls?.length
        ? { create: imageUrls.map((url, index) => ({ url, position: index })) }
        : undefined,
    },
    include: { images: true },
  });

  return post;
};

const getYappas = async () => {
  const posts = await prisma.post.findMany({
    include: { images: true },
  });

  return posts;
};

const getYappaById = async ({ id }) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!post) {
    const error = new Error("Can't find the yap");
    error.statusCode = 404;
    throw error;
  }

  return post;
};

const updateYappa = async ({ id, userId, content, imageUrls }) => {
  const exist = await prisma.post.findUnique({
    where: { id },
    include: { images: true },
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

  if (!content && (!imageUrls || imageUrls.length === 0)) {
    const error = new Error("There must be something to yap about");
    error.statusCode = 400;
    throw error;
  }

  if (imageUrls?.length) {
    await prisma.postImage.deleteMany({ where: { postId: id } });
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      content,
      images: imageUrls?.length
        ? { create: imageUrls.map((url, index) => ({ url, position: index })) }
        : undefined,
    },
    include: { images: true },
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
