import "./page-loader.scss";
import BrandMark from "./BrandMark.jsx";

/**
 * Full-screen branded loading state, shared by every route.
 * Pass `overlay` to float it above the current page instead of replacing it.
 */
const PageLoader = ({ title = "Loading", hint, overlay = false }) => (
    <main className={`page-loader ${overlay ? "page-loader--overlay" : ""}`}>
        <div className="page-wash" aria-hidden="true" />
        <div className="page-loader__inner" role="status" aria-live="polite">
            <BrandMark />
            <div className="page-loader__bar" aria-hidden="true">
                <span />
            </div>
            <p className="page-loader__title">{title}</p>
            {hint && <p className="page-loader__hint">{hint}</p>}
        </div>
    </main>
);

export default PageLoader;
