import api from "./api";

export const generateSummary = (data) => api.post("/api/ai/generate-summary", data);
export const generateBullets = (data) => api.post("/api/ai/generate-bullets", data);
export const reviewResume = (data) => api.post("/api/ai/review-resume", data);
export const matchJob = (data) => api.post("/api/ai/match-job", data);
export const generateInterviewQuestions = (data) => api.post("/api/ai/interview-questions", data);