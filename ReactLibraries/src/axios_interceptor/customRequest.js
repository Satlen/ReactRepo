import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:2000" });

/**
 * @function
 * @param {object} options Cette fonction va recevoir un objet avec plusieurs clés que je mettrai dans options
 */
export const request = ({ ...options }) => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  return api(options).then((res) => res.data);
};
