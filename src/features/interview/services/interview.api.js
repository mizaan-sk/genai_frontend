import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});
/**
 * @description service to generate interview report
 */
export const generateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
/**
 * @description service to get interview report by id
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};
/**
 * @description service to get all interview reports
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview");
  return response.data;
};

/**
 * @description service to generate the tailored resume PDF.
 * Returns the raw axios response so the caller can read the blob *and* the
 * filename the server sent in Content-Disposition.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  return api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
    responseType: "blob",
  });
};
