import api from "./api";

export const getAllResumes = () => api.get("/api/resume");
export const getResumeById = (id) => api.get(`/api/resume/${id}`);
export const createResume = (data) => api.post("/api/resume", data);
export const updateResume = (id, data) => api.put(`/api/resume/${id}`, data);
export const deleteResume = (id) => api.delete(`/api/resume/${id}`);