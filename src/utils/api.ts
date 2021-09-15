import axios from "axios";

const token = localStorage.getItem("jwt");

export default axios.create({
  baseURL: "https://expensetracker-be.herokuapp.com/",
  headers: {
    Authorization: token,
  },
});
