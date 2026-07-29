import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf
} from "../services/interview.api.js";
import { useContext, useEffect } from "react";
import { interviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";
export const useInterview = () => {
  const context = useContext(interviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

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
  const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
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
    getResumePdf
  };
};
