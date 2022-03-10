import http from "./httpService";

const postUser = (user) => {
  return http.post("/users", user);
};

export default postUser;
