const baseURL = process.env.REACT_APP_BASE_URL

const routes = {
  AUTHOR: "author",
  AUTH: "auth",
  BOOK: "book",
  BORROWAL: "borrowal",
  GENRE: "genre",
  USER: "user"
};

const methods = {
  GET: "get",
  GET_ALL: "getAll",
  POST: "add",
  PUT: "update",
  DELETE: "delete"
};

const apiUrl = (route, method, id = "") => `${baseURL}/${route}/${method}${id && `/${id}`}`;

module.exports = { routes, methods, apiUrl, baseURL };
