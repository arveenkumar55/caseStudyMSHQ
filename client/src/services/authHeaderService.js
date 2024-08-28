const authHeaderService = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  if (Object.keys(user).length && user.token) {
    return {
      Authorization: "Bearer " + user.token,
      oIDgRole: user.ID,
    };
  } else {
    return {};
  }
};

export default authHeaderService;
