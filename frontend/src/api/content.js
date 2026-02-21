import api from "./axios";

export const createContent = (data) => api.post("/content/", data);

// ✅ Search + filter (both optional)
export const getAllContent = (params = {}) => api.get("/content/", { params });

getAllContent({ q: "avengers", content_type: "movie" })