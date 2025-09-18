const baseURL = "https://sma-library.duckdns.org/api"

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
