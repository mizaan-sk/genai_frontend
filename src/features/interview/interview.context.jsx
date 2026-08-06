import { createContext, useState } from "react";

export const interviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    // kept separate from `loading` so downloading a resume doesn't tear the
    // whole page down and replace it with the page loader.
    const [downloadingResume, setDownloadingResume] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    return (
        <interviewContext.Provider
            value={{
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
            }}
        >
            {children}
        </interviewContext.Provider>
    );
};