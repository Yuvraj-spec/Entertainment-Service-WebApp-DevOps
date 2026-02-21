import api from "./axios";

export const registerUser = (data) => {
  return api.post("/users/", data);
};

export const loginUser = (data) => {
  return api.post("/users/login/", {
    ...data,
    email: data.email.trim(), // removes accidental spaces
  });
};