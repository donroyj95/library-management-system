import axios from "axios";

const API_URL = "https://localhost:3000/api/test/";
// const API_URL = "http://ec2-52-62-22-184.ap-southeast-2.compute.amazonaws.com:3000/api/test/"

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;
