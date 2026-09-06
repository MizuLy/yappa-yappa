const { prisma } = require("../config/prisma");

const createComment = async ({ userId, postId, content, imageUrls }) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    const error = new Error("Not post is found to comment");
    error.statusCode = 404;
    throw error;
  }

  if (!content && (!imageUrls || imageUrls.length === 0)) {
    const error = new Error("There must be something to yap");
    error.statusCode = 400;
    throw error;
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      userId,
      content,
      images: imageUrls?.length
        ? { create: imageUrls.map((url, index) => ({ url, position: index })) }
        : undefined,
    },
    include: { images: true },
  });

  return comment;
};

const getCommentsByPost = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { images: true },
    orderBy: { createdAt: "asc" },
  });

  return comments;
};

const getCommentById = async ({ id }) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!comment) {
    const error = new Error("Can't find the comment");
    error.statusCode = 404;
    throw error;
  }

  return comment;
};

const updateComment = async ({ id, userId, content, imageUrls }) => {
  const exist = await prisma.comment.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!exist) {
    const error = new Error("Can't find the comment");
    error.statusCode = 404;
    throw error;
  }

  if (exist.userId !== userId) {
    const error = new Error("Not your comment to edit");
    error.statusCode = 403;
    throw error;
  }

  if (!content && (!imageUrls || imageUrls.length === 0)) {
    const error = new Error("There must be something to say");
    error.statusCode = 400;
    throw error;
  }

  if (imageUrls?.length) {
    await prisma.commentImage.deleteMany({ where: { commentId: id } });
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: {
      content,
      images: imageUrls?.length
        ? { create: imageUrls.map((url, index) => ({ url, position: index })) }
        : undefined,
    },
    include: { images: true },
  });

  return comment;
};

const deleteComment = async ({ id, userId }) => {
  const exist = await prisma.comment.findUnique({
    where: { id },
  });

  if (!exist) {
    const error = new Error("Can't find the comment");
    error.statusCode = 404;
    throw error;
  }

  if (exist.userId !== userId) {
    const error = new Error("Not your comment to delete");
    error.statusCode = 403;
    throw error;
  }

  await prisma.comment.delete({
    where: { id },
  });

  return { message: "Comment deleted" };
};

module.exports = {
  createComment,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
};
