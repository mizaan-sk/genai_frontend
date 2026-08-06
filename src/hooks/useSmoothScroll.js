import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const OPTIONS = {
    duration: 1.05,
    // gentle exponential ease-out — quick start, soft landing
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // native touch scrolling stays snappier than a simulated one on mobile
    syncTouch: false,
};

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Boots a Lenis instance and drives it from rAF. Returns a teardown fn. */
const startLenis = (options) => {
    const lenis = new Lenis({ ...OPTIONS, ...options });

    let frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
    });

    return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
    };
};

/**
 * Smooth-scrolls the page itself.
 * Users with `prefers-reduced-motion` keep native scrolling.
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        if (prefersReducedMotion()) return;
        return startLenis();
    }, []);
};

/**
 * Smooth-scrolls a nested `overflow: auto` element — the interview page
 * scrolls its middle column rather than the window.
 *
 * Pass the element itself (via a callback ref) rather than a ref object, so
 * the instance is created the moment the element actually mounts.
 */
export const useSmoothScrollContainer = (element) => {
    useEffect(() => {
        if (!element || prefersReducedMotion()) return;
        return startLenis({ wrapper: element });
    }, [element]);
};
