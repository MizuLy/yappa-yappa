const { prisma } = require("../config/prisma");

// Posts
const likePost = async ({ userId, postId }) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    const error = new Error("Can't find the yap");
    error.statusCode = 404;
    throw error;
  }

  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existingLike) {
    const error = new Error("Already liked the yap");
    error.statusCode = 409;
    throw error;
  }

  const like = await prisma.like.create({
    data: { userId, postId },
  });

  return like;
};

const getLikesByPost = async ({ postId }) => {
  const [count, likes] = await Promise.all([
    prisma.like.count({ where: { postId } }),
    prisma.like.findMany({
      where: { postId },
      include: { user: { select: { id: true, name: true, imageUrl: true } } },
    }),
  ]);

  return { count, likes };
};

const unlikePost = async ({ userId, postId }) => {
  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (!existingLike) {
    const error = new Error("You haven't like the yap");
    error.statusCode = 404;
    throw error;
  }

  await prisma.like.delete({
    where: { id: existingLike.id },
  });

  return { message: "Unliked" };
};

// Comments
const likeComment = async ({ userId, commentId }) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    const error = new Error("Can't find the comment");
    error.statusCode = 404;
    throw error;
  }

  const existingLike = await prisma.like.findUnique({
    where: { userId_commentId: { userId, commentId } },
  });

  if (existingLike) {
    const error = new Error("You already liked the yap");
    error.statusCode = 409;
    throw error;
  }

  const like = await prisma.like.create({
    data: { userId, commentId },
  });

  return like;
};

const getLikesByComment = async ({ commentId }) => {
  const [count, likes] = await Promise.all([
    prisma.like.count({ where: { commentId } }),
    prisma.like.findMany({
      where: { commentId },
      include: { user: { select: { id: true, name: true, imageUrl: true } } },
    }),
  ]);

  return { count, likes };
};

const unlikeComment = async ({ userId, commentId }) => {
  const existingLike = await prisma.like.findUnique({
    where: { userId_commentId: { userId, commentId } },
  });

  if (!existingLike) {
    const error = new Error("You haven't like this yap");
    error.statusCode = 404;
    throw error;
  }

  await prisma.like.delete({
    where: { id: existingLike.id },
  });

  return { message: "Unliked" };
};

module.exports = {
  likePost,
  likeComment,
  getLikesByPost,
  getLikesByComment,
  unlikePost,
  unlikeComment,
};
