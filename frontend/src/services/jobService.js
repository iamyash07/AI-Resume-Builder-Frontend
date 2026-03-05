import api from "./api.js";
export const getAllJobs = () => api.get("/api/jobs");
export const createJob = (data) => api.post("/api/jobs", data);
export const updateJob = (id, data) => api.put(`/api/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/api/jobs/${id}`);