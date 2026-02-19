import api from "./axios";

export const createContent = (data) => {
  return api.post("/content/", data);
};

export const getAllContent = () => {
  return api.get("/content/");
};
