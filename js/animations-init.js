/* ============================================================
   Shared entrance animations — uses IntersectionObserver
   Add data-reveal to any element for a fade-up entrance.
   ============================================================ */
(function () {
    var REVEAL_CLASS = 'sj-revealed';

    function initReveal() {
        var els = document.querySelectorAll('[data-reveal]');
        if (!els.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(REVEAL_CLASS);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        els.forEach(function (el) { observer.observe(el); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
