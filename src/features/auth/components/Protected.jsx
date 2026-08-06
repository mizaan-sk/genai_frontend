import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import PageLoader from "../../../components/PageLoader.jsx";


const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    if (loading) {
        return <PageLoader title="Checking your session" hint="Getting your workspace ready." />
    }
    if (!user) {
        return <Navigate to={'/login'} />
    }
    return children
}

export default Protected
