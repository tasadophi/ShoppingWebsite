import http from "./httpService";
const getData = () => {
  return http.get("/products");
};

export default getData;
