const generateUserData = async (user) => {
  try {

    if (!user) {
      return null;
    }

    const {
      password,
      refreshToken,
      __v,
      ...userData
    } = user.toObject ? user.toObject() : user;

    return userData;

  } catch (error) {
    throw new Error("Failed to generate user data");
  }
};

export { generateUserData };