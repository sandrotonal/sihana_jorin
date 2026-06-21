/* ============================================================
   Shared entrance animations — uses IntersectionObserver
   Supports: data-reveal, data-reveal-left, data-reveal-right,
             data-reveal-scale, data-stagger
   Premium spring-based easing, 60fps GPU-composited.
   ============================================================ */
(function () {
    var REVEALED = 'sj-revealed';

    function initReveal() {
        /* All reveal selectors */
        var selectors = [
            '[data-reveal]',
            '[data-reveal-left]',
            '[data-reveal-right]',
            '[data-reveal-scale]',
            '[data-stagger]'
        ];
        var els = document.querySelectorAll(selectors.join(','));
        if (!els.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    /* Optional stagger delay from attribute */
                    var delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
                    if (delay > 0) {
                        setTimeout(function () { el.classList.add(REVEALED); }, delay * 1000);
                    } else {
                        el.classList.add(REVEALED);
                    }
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -32px 0px'
        });

        els.forEach(function (el) { observer.observe(el); });
    }

    /* Run after DOM + scripts ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
