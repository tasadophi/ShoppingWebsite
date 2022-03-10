import http from "./httpService";

const getUser = (id) => {
  return http.get(`/users/${id}`);
};

export default getUser;
