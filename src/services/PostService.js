import http from "./Http-common";

// const API_URL = "http://localhost:8080/";

const getAll = () => {
  return http.get("posts");
  //return axios.get(API_URL + "posts", { headers: authHeader() });
};
const get = id => {
  return http.get(`posts/${id}`);
  //return axios.get(API_URL + `posts/${id}`, { headers: authHeader() });
};
const create = data => {
  return http.post("posts",data);
  //return axios.post(API_URL + "posts", data, { headers: authHeader() });
};
const update = (id, data) => {
  return http.put(`posts/${id}`, data);
  //return axios.put(API_URL + `posts/${id}`, data, { headers: authHeader() });
};
const remove = id => {
  return http.delete(`posts/${id}`);
  //return axios.delete(`posts/${id}`, { headers: authHeader() });
};
const findByTitle = title => {
  return http.get(`posts/search?title=${title}`);
  //return axios.get(API_URL + `posts/search?title=${title}`);
};
const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle
};
export default PostService;