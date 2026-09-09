const { NotificationType } = require("@prisma/client");
const { prisma } = require("../config/prisma");
const { createNotification } = require("./notification.service");

const followUser = async ({ followerId, followingId }) => {
  if (followerId === followingId) {
    const error = new Error("Trying to follow yourself?");
    error.statusCode = 400;
    throw error;
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: followingId },
  });

  if (!targetUser) {
    const error = new Error("User doesn't exist");
    error.statusCode = 404;
    throw error;
  }

  const existingFollow = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });

  if (existingFollow) {
    const error = new Error("You already followed them");
    error.statusCode = 409;
    throw error;
  }

  const follow = await prisma.follow.create({
    data: { followerId, followingId },
  });

  await createNotification({
    userId: followingId,
    actorId: followerId,
    type: NotificationType.FOLLOW,
  });

  return follow;
};

const unfollowUser = async ({ followerId, followingId }) => {
  const existingFollow = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });

  if (!existingFollow) {
    const error = new Error("You haven't follow them yet");
    error.statusCode = 404;
    throw error;
  }

  await prisma.follow.delete({
    where: { id: existingFollow.id },
  });

  return { message: "Unfollowed" };
};

const getFollowers = async ({ userId }) => {
  // user that we want the followers of their
  const [count, followers] = await Promise.all([
    prisma.follow.count({ where: { followingId: userId } }), // find who follows the user
    prisma.follow.findMany({
      where: { followingId: userId },
      select: {
        follower: { select: { id: true, name: true, imageUrl: true } }, // get the followers info
      },
    }),
  ]);

  return { count, followers };
};

const getFollowing = async ({ userId }) => {
  const [count, followings] = await Promise.all([
    prisma.follow.count({ where: { followerId: userId } }), // find who the user following
    prisma.follow.findMany({
      where: { followerId: userId },
      select: {
        following: { select: { id: true, name: true, imageUrl: true } },
      }, // get the followers info
    }),
  ]);

  return { count, followings };
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
