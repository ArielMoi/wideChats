const User = require("../models/user");

const addUser = async (name, email) => {
  try {
    const user = new User({
      name,
      email,
    });
    await user.save();
    return user;
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (name) => {
  return await User.find({ name });
};

const getAllUsers = async () => {
  return await User.find({});
};

const addToUserFav = async (userName, chat) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { favoriteChats: chat } },
    { new: true }
  );
};

const addToUserCreated = async (userName, chat) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { createdChats: chat } },
    { new: true }
  );
};

const addToUserPosts = async (userName, post) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { posts: post } },
    { new: true }
  );
};

const addToUserFriends = async (userName, friendName) => {
  return await User.findOneAndUpdate(
    { name: userName },
    { $push: { friends: friendName } },
    { new: true }
  );
};

const deletePost = async (username, post) => {
  const user = await User.findOne({ name: username });

  const updatedPosts = user.posts.filter((userPost) => userPost !== post);

  user.posts = updatedPosts;
  await user.save();
  return user;
};

const replacePost = async (username, lastPost, newPost) => {
  const user = await User.findOne({ name: username });

  const updatedPosts = user.posts.map((post) =>
    lastPost !== post ? post : newPost
  );

  user.posts = updatedPosts;
  await user.save();
  return user;
};

const deleteFriend = async (username, friendToDelete) => {
  const user = await User.findOne({ name: username });

  const updatedFriends = user.friends.filter(friend => friend === friendToDelete)

  user.friends = updatedFriends;
  await user.save();
  return user;
};

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  addToUserFav,
  addToUserCreated,
  addToUserPosts,
  addToUserFriends,
  deletePost,
  replacePost,
  deleteFriend,
};
