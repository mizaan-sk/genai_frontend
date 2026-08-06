import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf
} from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { interviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";

const GENERIC_DOWNLOAD_ERROR =
  "We couldn't generate your resume right now. Please try again in a moment.";

/** Reads the server's message out of a non-PDF blob response. */
const readErrorMessage = async (blob) => {
  try {
    return JSON.parse(await blob.text()).message || GENERIC_DOWNLOAD_ERROR;
  } catch {
    return GENERIC_DOWNLOAD_ERROR;
  }
};

/** Pulls `resume_xxx.pdf` out of a Content-Disposition header. */
const parseFilename = (contentDisposition) => {
  if (!contentDisposition) return null;
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(contentDisposition);
  return match ? decodeURIComponent(match[1].trim()) : null;
};

export const useInterview = () => {
  const context = useContext(interviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }
  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    downloadingResume,
    setDownloadingResume,
    downloadError,
    setDownloadError,
  } = context;

  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setReport(response.interviewReport);
      // return response
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };
  /**
   * Asks the server for the tailored resume PDF and saves it to disk.
   * Uses its own loading flag — the report stays on screen while it runs.
   */
  const getResumePdf = async (interviewReportId) => {
    if (!interviewReportId) return;

    setDownloadingResume(true);
    setDownloadError(null);

    let objectUrl = null;
    try {
      const response = await generateResumePdf({ interviewReportId });
      const data = response.data;

      // With responseType "blob" an error payload also arrives as a blob, so
      // anything that isn't a PDF means the server failed — saving it anyway
      // is what produced "downloaded" files that wouldn't open.
      if (!data.type || !data.type.includes("pdf")) {
        throw new Error(await readErrorMessage(data));
      }
      if (!data.size) {
        throw new Error("The server returned an empty resume file.");
      }

      const filename =
        parseFilename(response.headers["content-disposition"]) ||
        `resume_${interviewReportId}.pdf`;

      objectUrl = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      // A failed request carries the server's JSON message inside a blob too.
      const body = error.response?.data;
      setDownloadError(
        body instanceof Blob
          ? await readErrorMessage(body)
          : error.message || GENERIC_DOWNLOAD_ERROR,
      );
    } finally {
      // give the browser a tick to pick the blob up before we drop it
      if (objectUrl) setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
      setDownloadingResume(false);
    }
  };
  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      // return response
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };
  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
      // return response
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    downloadingResume,
    downloadError,
  };
};
