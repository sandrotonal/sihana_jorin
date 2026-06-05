window.SJ = window.SJ || {};

window.SJ.useInView = function useInView(options = {}) {
    const { useState, useEffect, useRef } = React;
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsInView(true); if (options.once !== false) observer.unobserve(el); } else if (options.once === false) { setIsInView(false); } },
            { threshold: options.threshold || 0, rootMargin: options.margin || '0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return [ref, isInView];
};
