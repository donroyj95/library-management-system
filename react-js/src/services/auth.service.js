import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";
// const API_URL = "http://ec2-52-62-22-184.ap-southeast-2.compute.amazonaws.com:3000/api/auth/"

const register = (username, email, password,role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    role
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const resetPassword =(username,email)=>{
  return axios.post(API_URL+"reset",{username,email})
  .then((response)=>{
    return response.data;
  })
}

const updatePassword = (username,newPassword)=>{
  console.log(username,newPassword)
  return axios.post(API_URL+"passwordreset",{username,newPassword})
  .then((response)=>{
    return response.data;
  })
}

const verifyOTP = (otp) =>{
  return axios.post(API_URL+"otp",{otp})
  .then((response)=>{
    return response.data;
  })
}

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  resetPassword,
  verifyOTP,
  updatePassword,
}

export default AuthService;
