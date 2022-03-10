import http from "./httpService";
const getUsers = () => {
  return http.get("/users");
};

export default getUsers;
