import axios from "axios";

const api = () => {
  const token = localStorage.getItem("jwt");

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
};

export default api;
