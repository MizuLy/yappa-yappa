const { NotificationType } = require("@prisma/client");
const { prisma } = require("../config/prisma");
const { createNotification } = require("./notification.service");

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
    return existingLike;
  }

  const like = await prisma.like.create({
    data: { userId, postId },
  });

  // Only create notification if liking someone else's post
  if (post.userId !== userId) {
    await createNotification({
      userId: post.userId,
      actorId: userId,
      type: NotificationType.LIKE,
      postId,
    });
  }

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
    select: { id: true, postId: true, userId: true },
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
    return existingLike;
  }

  const like = await prisma.like.create({
    data: { userId, commentId },
  });

  if (comment.userId !== userId) {
    await createNotification({
      userId: comment.userId,
      actorId: userId,
      type: NotificationType.LIKE,
      postId: comment.postId,
    });
  }

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
    return { message: "Unliked" };
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
