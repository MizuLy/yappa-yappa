const {
  changeBio,
  changeName,
  changeUsername,
  changeEmail,
  changePassword,
  changeAvatar,
  getMyProfile,
  getUserProfile,
} = require("../services/user.service");

const changeBioHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bio } = req.body;

    const updatedBio = await changeBio({
      userId,
      bio,
    });

    res.status(200).json({ status: "success", data: updatedBio });
  } catch (err) {
    next(err);
  }
};

const changeNameHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const updatedName = await changeName({
      userId,
      name,
    });

    res.status(200).json({ status: "success", data: updatedName });
  } catch (err) {
    next(err);
  }
};

const changeUsernameHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    const updatedUsername = await changeUsername({
      userId,
      username,
    });

    res.status(200).json({ status: "success", data: updatedUsername });
  } catch (err) {
    next(err);
  }
};

const changeEmailHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { newEmail, password } = req.body;

    const updatedEmail = await changeEmail({
      userId,
      newEmail,
      password,
    });

    res.status(200).json({ status: "success", data: updatedEmail });
  } catch (err) {
    next(err);
  }
};

const changePasswordHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const updatedPassword = await changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    res.status(200).json({ status: "success", data: updatedPassword });
  } catch (err) {
    next(err);
  }
};

const changeAvatarHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const imageUrl = req.file?.path;

    const updatedAvatar = await changeAvatar({
      userId,
      imageUrl,
    });

    res.status(200).json({ status: "success", data: updatedAvatar });
  } catch (err) {
    next(err);
  }
};

const getMyProfileHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const myProfile = await getMyProfile({
      userId,
    });

    res.status(200).json({ status: "success", data: myInfo });
  } catch (err) {
    next(err);
  }
};

const getUserProfileHandler = async (req, res, next) => {
  try {
    const userId = req.params; // this params cuz other's not "your logged in account"

    const userProfile = await getUserProfile({
      userId,
    });

    res.status(200).json({ status: "success", data: userProfile });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  changeBioHandler,
  changeNameHandler,
  changeUsernameHandler,
  changeEmailHandler,
  changePasswordHandler,
  changeAvatarHandler,
  getMyProfileHandler,
  getUserProfileHandler,
};
