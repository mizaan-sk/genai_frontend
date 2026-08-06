import { useId } from "react";
import { Link } from "react-router";
import "./brand-mark.scss";

/** Change the product name here and it updates everywhere. */
export const BRAND_NAME = "Interview Studio";

const Glyph = () => {
    // unique per instance — duplicate gradient ids would collide between marks
    const gradientId = useId();
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="30" height="30" rx="9.5" fill={`url(#${gradientId})`} />
            <path d="M9.5 11.5 13.5 15.5 9.5 19.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 19.5h4.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop style={{ stopColor: "var(--accent)" }} />
                    <stop offset="1" style={{ stopColor: "var(--accent-hover)" }} />
                </linearGradient>
            </defs>
        </svg>
    );
};

const BrandMark = ({ to, tagline, compact = false }) => {
    const content = (
        <>
            <span className="brand-mark__glyph">
                <Glyph />
            </span>
            {!compact && (
                <span className="brand-mark__text">
                    <span className="brand-mark__name">{BRAND_NAME}</span>
                    {tagline && <span className="brand-mark__tagline">{tagline}</span>}
                </span>
            )}
        </>
    );

    if (to) {
        return (
            <Link className="brand-mark" to={to} aria-label={BRAND_NAME}>
                {content}
            </Link>
        );
    }

    return <span className="brand-mark">{content}</span>;
};

export default BrandMark;
