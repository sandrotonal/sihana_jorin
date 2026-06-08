/* ============================================================
   SIHANA JORIN — BUNDLE
   Kaynak dosyalar: js/config.js, hooks.js, icons.js,
   components/*.js, sections/*.js, app.js
   ============================================================ */

// ---- js/config.js ----
window.SJ = window.SJ || {};
window.SJ.SLIDER_DATA = [
    { title: "Yaz Şenliği 2024", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop", category: "Kültürel Etkinlik", year: "2024", description: "Köyün geleneksel yaz festivali" },
    { title: "El Sanatları Atölyesi", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop", category: "Atölye Çalışması", year: "2024", description: "Geleneksel el sanatları eğitim programı" },
    { title: "Doğa Yürüyüşü", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop", category: "Doğa Aktivitesi", year: "2024", description: "Köy çevresinde doğa yürüyüşleri" },
    { title: "Bağ Bozumu Festivali", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop", category: "Tarım Projesi", year: "2023", description: "Geleneksel bağ bozumu kutlamaları" },
    { title: "Kış Toplantısı", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop", category: "Topluluk Buluşması", year: "2023", description: "Yıllık kış toplantısı ve değerlendirme" },
];
window.SJ.SLIDER_CONFIG = { SCROLL_SPEED: 0.75, LERP_FACTOR: 0.05, BUFFER_SIZE: 5, MAX_VELOCITY: 150, SNAP_DURATION: 500, MINIMAP_HEIGHT: 250 };

// ---- js/hooks.js ----
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

// ---- js/icons.js ----
(function () {
    const SJ = window.SJ;
    const h = React.createElement;

    SJ.ArrowRight = function ArrowRight({ size = 18, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('line', { x1: "5", y1: "12", x2: "19", y2: "12" }),
            h('polyline', { points: "12 5 19 12 12 19" })
        );
    };
    SJ.Check = function Check({ size = 16, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('polyline', { points: "20 6 9 17 4 12" })
        );
    };
    SJ.XIcon = function XIcon({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('line', { x1: "18", y1: "6", x2: "6", y2: "18" }),
            h('line', { x1: "6", y1: "6", x2: "18", y2: "18" })
        );
    };
    SJ.CookieIcon = function CookieIcon({ size = 24, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }),
            h('path', { d: "M8.5 8.5v.01" }), h('path', { d: "M16 15.5v.01" }),
            h('path', { d: "M12 12v.01" }), h('path', { d: "M11 17v.01" }), h('path', { d: "M7 14v.01" })
        );
    };
    SJ.MenuIcon = function MenuIcon({ size = 24, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('line', { x1: "4", y1: "6", x2: "20", y2: "6" }),
            h('line', { x1: "4", y1: "12", x2: "20", y2: "12" }),
            h('line', { x1: "4", y1: "18", x2: "20", y2: "18" })
        );
    };
    SJ.MapPin = function MapPin({ size = 18, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
            h('circle', { cx: "12", cy: "10", r: "3" })
        );
    };
    SJ.Phone = function Phone({ size = 18, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
        );
    };
    SJ.Mail = function Mail({ size = 18, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('rect', { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
            h('path', { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
        );
    };
    SJ.ChevronUp = function ChevronUp({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "m18 15-6-6-6 6" })
        );
    };
    SJ.ChevronDown = function ChevronDown({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "m6 9 6 6 6-6" })
        );
    };
    SJ.Heart = function Heart({ size = 18, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
        );
    };
    SJ.Bell = function Bell({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M6 8a6 6 0 0 1 12 0c0 7 4 9 4 9H2s4-2 4-9" }),
            h('path', { d: "M9.5 17c0 1.38.62 2.5 1.5 2.5s1.5-1.12 1.5-2.5" })
        );
    };
    SJ.Instagram = function Instagram({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('rect', { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
            h('path', { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
            h('line', { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
        );
    };
    SJ.Facebook = function Facebook({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", className },
            h('path', { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
        );
    };
    SJ.YouTube = function YouTube({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
            h('path', { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" }),
            h('polygon', { points: "9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" })
        );
    };
    SJ.XIcon_social = function XIcon_social({ size = 20, className = '' }) {
        return h('svg', { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", className },
            h('path', { d: "M4 4l6.25 8.5L4 20h2.5l5.5-7.25L17 20h5l-7-9.5L21 4h-2.5l-5.25 7L9 4H4z" })
        );
    };
})();

// ---- js/components/ui.js ----
(function () {
    const SJ = window.SJ;
    const { useState, useEffect, useRef, useMemo, useCallback } = React;
    const cn = SJ.cn = function cn(...classes) { return classes.filter(Boolean).join(' '); };

    SJ.HamburgerMenu = function HamburgerMenu({ isOpen, onClose }) {
        const links = [
            { href: 'index.html', label: 'Ana Sayfa' },
            { href: 'hakkimizda.html', label: 'Hikayemiz' },
            { href: 'galeri.html', label: 'Galeri' },
            { href: 'duyurular.html', label: 'Duyurular' },
            { href: 'iletisim.html', label: 'İletişim' }
        ];
        useEffect(() => {
            if (isOpen) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = '';
            return () => { document.body.style.overflow = ''; };
        }, [isOpen]);

        return (
            <>
                {/* Backdrop — z-index 200, above hamburger button (z-190) */}
                <div onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 200,
                        background: 'rgba(0,0,0,0.65)',
                        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transition: 'opacity 0.5s ease'
                    }} />
                {/* Menu panel — z-index 205 */}
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 205,
                    background: '#050505',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)'
                }}>
                    <button onClick={onClose} style={{
                        position: 'absolute', top: 24, right: 24,
                        padding: 8, background: 'none', border: 'none',
                        cursor: 'pointer', color: 'rgba(225,224,204,0.6)',
                        zIndex: 206
                    }} aria-label="Menüyü kapat">
                        <SJ.XIcon size={24} style={{ color: '#E1E0CC' }} />
                    </button>
                    <div className="flex flex-col items-center justify-center w-full p-8 text-center">
                        <span className="text-xs tracking-[0.2em] text-[#DEDBC8]/40 uppercase mb-12">Sıhana Jorin</span>
                        <nav className="flex flex-col gap-8 items-center mb-16" role="navigation" aria-label="Mobil menü">
                            {links.map((link, i) => (
                                <a key={link.href} href={link.href} onClick={onClose}
                                    className="text-3xl sm:text-4xl font-medium text-[#E1E0CC]/60 hover:text-[#E1E0CC] transition-all duration-500"
                                    style={{
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: isOpen ? `${0.1 + i * 0.05}s` : '0s'
                                    }}>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center justify-center gap-2 text-[#DEDBC8]/40 text-sm">
                            <SJ.MapPin size={14} className="shrink-0" />
                            <span>Sıhana Jorin Köyü</span>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    SJ.CookieBanner = function CookieBanner() {
        const [isVisible, setIsVisible] = useState(false);
        const [isClosing, setIsClosing] = useState(false);
        useEffect(() => {
            const a = localStorage.getItem('sj-cookies');
            if (!a) { const t = setTimeout(() => setIsVisible(true), 2500); return () => clearTimeout(t); }
        }, []);
        const close = () => { setIsClosing(true); setTimeout(() => setIsVisible(false), 400); };
        const accept = () => { localStorage.setItem('sj-cookies', 'true'); close(); };
        const decline = () => { localStorage.setItem('sj-cookies', 'declined'); close(); };
        if (!isVisible) return null;
        return (
            <div className={cn('fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] max-w-[calc(100vw-2rem)] sm:max-w-none', isClosing ? 'cookie-exit' : 'cookie-enter')} role="dialog" aria-label="Çerez bildirimi">
                <div className="bg-[#101010] border border-[#DEDBC8]/20 rounded-2xl p-5 sm:p-6 sm:w-80 shadow-2xl">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center shrink-0"><SJ.CookieIcon size={20} className="text-[#DEDBC8]" /></div>
                        <h3 className="text-[#E1E0CC] text-base font-medium leading-snug">Gizliliğiniz bizim için önemli</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                        Sitemiz, deneyiminizi iyileştirmek için çerezleri kullanmaktadır.
                    </p>
                    <div className="flex items-center justify-between gap-3">
                        <a href="#" className="text-[#DEDBC8]/60 underline text-sm hover:text-[#DEDBC8] transition-colors shrink-0">Seçenekler</a>
                        <div className="flex gap-2">
                            <button onClick={decline} className="px-4 py-2 border border-[#DEDBC8]/20 rounded-full text-gray-400 text-sm hover:border-[#DEDBC8]/40 hover:text-[#DEDBC8] active:scale-95 transition-all">Reddet</button>
                            <button onClick={accept} className="px-4 py-2 bg-[#DEDBC8] rounded-full text-black text-sm font-medium active:scale-95 transition-all hover:bg-[#E8E5D4]">Kabul Et</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    SJ.CircleProgress = function CircleProgress({ percentage }) {
        const s = 24, sw = 2.5, r = (s - sw) / 2, c = 2 * Math.PI * r, o = c - (percentage / 100) * c;
        return (
            <svg width={s} height={s} className="-rotate-90 shrink-0">
                <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={sw} />
                <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="var(--foreground)" strokeWidth={sw} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.15s ease-out' }} />
            </svg>
        );
    };

    /* DynamicIslandTOC — debounced scroll */
    SJ.DynamicIslandTOC = function DynamicIslandTOC() {
        const [headings, setHeadings] = useState([]);
        const [activeId, setActiveId] = useState(null);
        const [hoveredId, setHoveredId] = useState(null);
        const [isExpanded, setIsExpanded] = useState(false);
        const [progress, setProgress] = useState(0);
        const [isVisible, setIsVisible] = useState(false);
        const rafId = useRef(null);

        const handleScroll = useCallback(() => {
            if (rafId.current) return;
            rafId.current = requestAnimationFrame(() => {
                setIsVisible(window.scrollY > window.innerHeight * 0.5);
                rafId.current = null;
            });
        }, []);

        useEffect(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            return () => {
                window.removeEventListener('scroll', handleScroll);
                if (rafId.current) cancelAnimationFrame(rafId.current);
            };
        }, [handleScroll]);

        useEffect(() => {
            const getHeadings = () => {
                const els = Array.from(document.querySelectorAll('[data-toc]'));
                const valid = els.filter(el => !el.hasAttribute('data-toc-ignore')).map((el, idx) => {
                    if (!el.id) { el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `toc-${idx}`; }
                    const da = el.getAttribute('data-toc-depth'); let level = 2;
                    if (da) { level = parseInt(da, 10); } else { const t = el.tagName.toUpperCase(); if (t.startsWith('H') && t.length === 2) level = parseInt(t[1], 10); }
                    return { id: el.id, text: el.getAttribute('data-toc-title') || el.textContent || 'Bölüm', level, element: el };
                });
                valid.sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
                setHeadings(valid);
            };
            const t = setTimeout(getHeadings, 300);
            return () => clearTimeout(t);
        }, []);

        useEffect(() => {
            if (headings.length === 0) return;
            const handle = () => {
                let cur = null;
                for (const h of headings) { if (h.element.getBoundingClientRect().top <= 120) cur = h.id; else break; }
                if (!cur && headings.length > 0) cur = headings[0].id;
                setActiveId(cur);
                const tot = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(tot > 0 ? Math.min(100, Math.max(0, (window.scrollY / tot) * 100)) : 0);
            };
            window.addEventListener('scroll', handle, { passive: true }); handle();
            return () => window.removeEventListener('scroll', handle);
        }, [headings]);

        const activeHeading = headings.find(h => h.id === activeId);
        const minLevel = useMemo(() => headings.length === 0 ? 1 : Math.min(...headings.map(h => h.level)), [headings]);
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        const cW = isMobile ? 220 : 280, eW = isMobile ? Math.min(300, window.innerWidth - 32) : 340;
        const cH = isMobile ? 48 : 52, eH = isMobile ? 340 : 400;

        if (!isVisible || headings.length === 0) return null;

        return (
            <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none', transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1)' }} onClick={() => setIsExpanded(false)} />
                <div className="island-enter" style={{ position: 'fixed', bottom: 30, left: '50%', zIndex: 9999, transform: 'translate(-50%,0)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div onClick={() => { if (!isExpanded) setIsExpanded(true); }} style={{
                        width: isExpanded ? eW : cW, height: isExpanded ? eH : cH, borderRadius: isExpanded ? 24 : 26,
                        cursor: isExpanded ? 'default' : 'pointer', overflow: 'hidden', border: '1px solid rgba(225,224,204,0.1)',
                        background: '#101010', color: '#E1E0CC', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s cubic-bezier(0.22,1,0.36,1)',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px 0 20px', opacity: isExpanded ? 0 : 1, transform: isExpanded ? 'scale(0.95)' : 'scale(1)', filter: isExpanded ? 'blur(4px)' : 'blur(0px)', pointerEvents: isExpanded ? 'none' : 'auto', transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E1E0CC', flexShrink: 0 }} />
                            <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                <span style={{ display: 'block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14, fontWeight: 500, color: '#E1E0CC' }}>{activeHeading?.text || 'İçindekiler'}</span>
                            </div>
                            <SJ.CircleProgress percentage={progress} />
                        </div>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', opacity: isExpanded ? 1 : 0, transform: isExpanded ? 'scale(1)' : 'scale(1.05)', pointerEvents: isExpanded ? 'auto' : 'none', transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 12px 24px', flexShrink: 0 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(225,224,204,0.45)' }}>İÇİNDEKİLER</span>
                                <button onClick={e => { e.stopPropagation(); setIsExpanded(false); }} style={{ color: 'rgba(225,224,204,0.45)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Kapat"><SJ.XIcon size={18} /></button>
                            </div>
                            <div className="toc-scroll" style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '0 12px 16px 12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {headings.map(h => {
                                        const ia = activeId === h.id, ih = hoveredId === h.id;
                                        const il = Math.max(0, h.level - minLevel), pl = il * 14 + 12;
                                        return (
                                            <button key={h.id} onMouseEnter={() => setHoveredId(h.id)} onMouseLeave={() => setHoveredId(null)}
                                                onClick={e => { e.stopPropagation(); const y = h.element.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: 'smooth' }); setIsExpanded(false); }}
                                                style={{ paddingLeft: `${pl}px`, display: 'flex', width: '100%', flexShrink: 0, cursor: 'pointer', alignItems: 'center', border: 'none', textAlign: 'left', fontSize: 14, borderRadius: 8, padding: '8px 12px', transition: 'all 0.3s ease-out', background: ia ? 'rgba(225,224,204,0.1)' : ih ? 'rgba(225,224,204,0.05)' : 'transparent', color: ia ? '#E1E0CC' : ih ? 'rgba(225,224,204,0.85)' : 'rgba(225,224,204,0.45)', fontWeight: ia ? 500 : 400 }}>
                                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'transform 0.3s ease', transform: ih && !ia ? 'translateX(4px)' : 'translateX(0)' }}>{h.text}</span>
                                                <span style={{ marginLeft: 12, width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: '#E1E0CC', transform: ia ? 'scale(1)' : 'scale(0)', opacity: ia ? 1 : 0, transition: 'transform 0.3s ease, opacity 0.3s ease' }} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
})();

// ---- js/components/animations.js ----
(function () {
    const SJ = window.SJ;
    const { useState, useEffect, useRef, useMemo } = React;
    const cn = SJ.cn;

    SJ.WordsPullUp = function WordsPullUp({ text, className = '', showAsterisk = false }) {
        const [ref, isInView] = SJ.useInView({ once: true, margin: '-50px' });
        const words = text.split(' ');
        return (
            <span ref={ref} className={cn('flex flex-wrap justify-center w-full', className)}>
                {words.map((word, i) => {
                    const isLast = i === words.length - 1;
                    const delay = i * 0.08;
                    return (
                        <span key={i} className="word-overflow">
                            <span style={{ display: 'inline-block', transform: isInView ? 'translateY(0)' : 'translateY(110%)', transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, position: 'relative' }}>
                                {word}
                                {showAsterisk && isLast && <sup style={{ position: 'absolute', top: '0.65em', right: '-0.3em', fontSize: '0.31em', fontWeight: 'normal' }}>*</sup>}
                            </span>
                        </span>
                    );
                })}
            </span>
        );
    };

    SJ.WordsPullUpMultiStyle = function WordsPullUpMultiStyle({ segments, className = '' }) {
        const [ref, isInView] = SJ.useInView({ once: true, margin: '-50px' });
        const allWords = [];
        segments.forEach((seg, si) => { seg.text.split(' ').forEach((w, wi) => { allWords.push({ word: w, className: seg.className || '', key: `${si}-${wi}` }); }); });
        return (
            <span ref={ref} className={cn('flex flex-wrap justify-center w-full', className)}>
                {allWords.map((item, i) => (
                    <span key={item.key} className="word-overflow">
                        <span className={item.className} style={{ display: 'inline-block', transform: isInView ? 'translateY(0)' : 'translateY(110%)', transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }}>{item.word}</span>
                    </span>
                ))}
            </span>
        );
    };

    SJ.AnimatedLetter = function AnimatedLetter({ char, index, totalChars, scrollProgress }) {
        const cp = index / totalChars; const rs = cp - 0.1; const re = cp + 0.05;
        let o = 0.2;
        if (scrollProgress <= rs) o = 0.2; else if (scrollProgress >= re) o = 1; else { o = 0.2 + ((scrollProgress - rs) / (re - rs)) * 0.8; }
        return <span className="animated-char" style={{ opacity: o, transition: 'opacity 0.05s ease' }}>{char}</span>;
    };

    SJ.AnimatedText = function AnimatedText({ text, className = '' }) {
        const ref = useRef(null); const [progress, setProgress] = useState(0);
        const rafId = useRef(null);
        useEffect(() => {
            const el = ref.current; if (!el) return;
            const handle = () => {
                if (rafId.current) return;
                rafId.current = requestAnimationFrame(() => {
                    const r = el.getBoundingClientRect(); const vh = window.innerHeight;
                    setProgress(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.8 - vh * 0.2))));
                    rafId.current = null;
                });
            };
            window.addEventListener('scroll', handle, { passive: true }); handle();
            return () => { window.removeEventListener('scroll', handle); if (rafId.current) cancelAnimationFrame(rafId.current); };
        }, []);

        const words = text.split(' ');
        let charIndexCounter = 0;
        const totalChars = text.length;

        return (
            <span ref={ref} className={className} style={{ display: 'block' }}>
                {words.map((word, wIdx) => {
                    const wordChars = word.split('');
                    return (
                        <span key={wIdx} className="inline-block whitespace-nowrap" style={{ marginRight: '0.35em' }}>
                            {wordChars.map((char, cIdx) => {
                                const globalIndex = charIndexCounter++;
                                return (
                                    <SJ.AnimatedLetter
                                        key={cIdx}
                                        char={char}
                                        index={globalIndex}
                                        totalChars={totalChars}
                                        scrollProgress={progress}
                                    />
                                );
                            })}
                            {/* Increment index counter for the trailing space */}
                            {(() => { charIndexCounter++; return null; })()}
                        </span>
                    );
                })}
            </span>
        );
    };

    SJ.FadeUp = function FadeUp({ children, delay = 0, className = '' }) {
        const [ref, iv] = SJ.useInView({ once: true, margin: '-50px' });
        return <div ref={ref} className={className} style={{ opacity: iv ? 1 : 0, transform: iv ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
    };

    SJ.CardEntrance = function CardEntrance({ children, delay = 0, className = '' }) {
        const [ref, iv] = SJ.useInView({ once: true, margin: '-100px' });
        return <div ref={ref} className={className} style={{ opacity: iv ? 1 : 0, transform: iv ? 'scale(1)' : 'scale(0.95)', transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>{children}</div>;
    };
})();

// ---- js/components/slider.js ----
(function () {
    const SJ = window.SJ;
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    SJ.InfiniteSlider = function InfiniteSlider() {
        const [visibleRange, setVisibleRange] = useState({ min: -SJ.SLIDER_CONFIG.BUFFER_SIZE, max: SJ.SLIDER_CONFIG.BUFFER_SIZE });
        const containerRef = useRef(null);
        const state = useRef({ currentY: 0, targetY: 0, isDragging: false, isSnapping: false, snapStart: { time: 0, y: 0, target: 0 }, lastScrollTime: Date.now(), dragStart: { y: 0, scrollY: 0 }, projectHeight: 0 });
        const projectsRef = useRef(new Map());
        const minimapRef = useRef(new Map());
        const infoRef = useRef(new Map());
        const requestRef = useRef();
        const renderedRange = useRef({ min: -SJ.SLIDER_CONFIG.BUFFER_SIZE, max: SJ.SLIDER_CONFIG.BUFFER_SIZE });
        const [currentIndex, setCurrentIndex] = useState(0);

        const lerp = (s, e, f) => s + (e - s) * f;
        const getData = (i) => SJ.SLIDER_DATA[((Math.abs(i) % SJ.SLIDER_DATA.length) + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length];
        const getNum = (i) => (((Math.abs(i) % SJ.SLIDER_DATA.length) + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length + 1).toString().padStart(2, '0');

        const updateParallax = (img, scroll, index, height) => {
            if (!img) return;
            if (!img.dataset.pc) img.dataset.pc = '0';
            let cur = parseFloat(img.dataset.pc);
            const tgt = (-scroll - index * height) * 0.2;
            cur = lerp(cur, tgt, 0.1);
            if (Math.abs(cur - tgt) > 0.01) {
                img.style.transform = `translateY(${cur}px) scale(1.5)`;
                img.dataset.pc = cur.toString();
            }
        };

        const snapToProject = () => {
            const s = state.current;
            const cur = Math.round(-s.targetY / s.projectHeight);
            s.isSnapping = true;
            s.snapStart = { time: Date.now(), y: s.targetY, target: -cur * s.projectHeight };
        };

        const updatePositions = () => {
            const s = state.current;
            const mmY = (s.currentY * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT) / s.projectHeight;
            projectsRef.current.forEach((el, i) => {
                el.style.transform = `translateY(${i * s.projectHeight + s.currentY}px)`;
                updateParallax(el.querySelector('img'), s.currentY, i, s.projectHeight);
            });
            minimapRef.current.forEach((el, i) => {
                el.style.transform = `translateY(${i * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT + mmY}px)`;
                updateParallax(el.querySelector('img'), mmY, i, SJ.SLIDER_CONFIG.MINIMAP_HEIGHT);
            });
            infoRef.current.forEach((el, i) => {
                el.style.transform = `translateY(${i * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT + mmY}px)`;
            });
        };

        const animate = () => {
            const s = state.current;
            const now = Date.now();
            if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
                const sp = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
                if (Math.abs(s.targetY - sp) > 1) snapToProject();
            }
            if (s.isSnapping) {
                const prog = Math.min((Date.now() - s.snapStart.time) / SJ.SLIDER_CONFIG.SNAP_DURATION, 1);
                const eased = 1 - Math.pow(1 - prog, 3);
                s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
                if (prog >= 1) s.isSnapping = false;
            }
            if (!s.isDragging) s.currentY += (s.targetY - s.currentY) * SJ.SLIDER_CONFIG.LERP_FACTOR;
            updatePositions();

            const ci = Math.round(-s.targetY / s.projectHeight);
            setCurrentIndex(ci);
            const min = ci - SJ.SLIDER_CONFIG.BUFFER_SIZE, max = ci + SJ.SLIDER_CONFIG.BUFFER_SIZE;
            if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
                renderedRange.current = { min, max };
                setVisibleRange({ min, max });
            }
        };

        const goToProject = (dir) => {
            const s = state.current;
            const cur = Math.round(-s.targetY / s.projectHeight);
            const next = cur + dir;
            s.isSnapping = true;
            s.snapStart = { time: Date.now(), y: s.targetY, target: -next * s.projectHeight };
        };

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;
            state.current.projectHeight = container.offsetHeight;

            const onWheel = (e) => {
                e.preventDefault();
                const s = state.current;
                s.isSnapping = false;
                s.lastScrollTime = Date.now();
                const delta = Math.max(Math.min(e.deltaY * SJ.SLIDER_CONFIG.SCROLL_SPEED, SJ.SLIDER_CONFIG.MAX_VELOCITY), -SJ.SLIDER_CONFIG.MAX_VELOCITY);
                s.targetY -= delta;
            };
            const onTS = (e) => { const s = state.current; s.isDragging = true; s.isSnapping = false; s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY }; s.lastScrollTime = Date.now(); };
            const onTM = (e) => { const s = state.current; if (!s.isDragging) return; s.targetY = s.dragStart.scrollY + (e.touches[0].clientY - s.dragStart.y) * 1.5; s.lastScrollTime = Date.now(); };
            const onTE = () => { state.current.isDragging = false; };
            const onResize = () => { state.current.projectHeight = container.offsetHeight; };

            container.addEventListener('wheel', onWheel, { passive: false });
            container.addEventListener('touchstart', onTS, { passive: true });
            container.addEventListener('touchmove', onTM, { passive: true });
            container.addEventListener('touchend', onTE);
            window.addEventListener('resize', onResize);
            onResize();

            const loop = () => { animate(); requestRef.current = requestAnimationFrame(loop); };
            requestRef.current = requestAnimationFrame(loop);

            return () => {
                container.removeEventListener('wheel', onWheel);
                container.removeEventListener('touchstart', onTS);
                container.removeEventListener('touchmove', onTM);
                container.removeEventListener('touchend', onTE);
                window.removeEventListener('resize', onResize);
                if (requestRef.current) cancelAnimationFrame(requestRef.current);
            };
        }, []);

        const indices = [];
        for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);
        const displayIndex = ((Math.abs(currentIndex) % SJ.SLIDER_DATA.length) + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length + 1;

        return (
            <div ref={containerRef} className="slider-container" style={{ cursor: state.current.isDragging ? 'grabbing' : 'default' }}>
                <ul className="slider-project-list">
                    {indices.map(i => {
                        const d = getData(i);
                        return (
                            <div key={i} className="slider-project" ref={el => { if (el) projectsRef.current.set(i, el); else projectsRef.current.delete(i); }}>
                                <img src={d.image} alt={d.title} loading="lazy" />
                                <div className="slider-info-overlay md:hidden">
                                    <span className="text-[10px] text-[#DEDBC8]/60 tracking-widest uppercase">{d.category} — {d.year}</span>
                                    <h3 className="text-xl font-medium mt-1" style={{ color: '#E1E0CC' }}>{d.title}</h3>
                                    <p className="text-gray-400 text-xs mt-1">{d.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </ul>
                <div className="slider-minimap hidden md:flex">
                    <div className="slider-minimap-wrapper">
                        <div className="slider-minimap-preview">
                            {indices.map(i => {
                                const d = getData(i);
                                return (
                                    <div key={i} className="slider-minimap-img" ref={el => { if (el) minimapRef.current.set(i, el); else minimapRef.current.delete(i); }}>
                                        <img src={d.image} alt={d.title} loading="lazy" />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="slider-minimap-info-list">
                            {indices.map(i => {
                                const d = getData(i); const n = getNum(i);
                                return (
                                    <div key={i} className="slider-minimap-info" ref={el => { if (el) infoRef.current.set(i, el); else infoRef.current.delete(i); }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[#DEDBC8]/40 text-xs tracking-widest">{n}</span>
                                            <span className="text-[#DEDBC8]/40 text-xs">{d.year}</span>
                                        </div>
                                        <h4 className="text-base font-medium mb-1" style={{ color: '#E1E0CC' }}>{d.title}</h4>
                                        <span className="text-[10px] text-[#DEDBC8]/50 tracking-widest uppercase">{d.category}</span>
                                        <p className="text-gray-500 text-xs mt-3">{d.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                    <button onClick={() => goToProject(-1)} className="slider-nav-btn" aria-label="Önceki"><SJ.ChevronUp size={18} /></button>
                    <span className="text-xs text-[#DEDBC8]/40 tracking-widest w-12 text-center">{displayIndex.toString().padStart(2, '0')} / {SJ.SLIDER_DATA.length.toString().padStart(2, '0')}</span>
                    <button onClick={() => goToProject(1)} className="slider-nav-btn" aria-label="Sonraki"><SJ.ChevronDown size={18} /></button>
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-[10px] text-[#DEDBC8]/30 tracking-widest uppercase hidden md:block">Kaydırarak gezin</div>
            </div>
        );
    };
})();

// ---- js/sections/hero.js ----
(function () {
    const SJ = window.SJ;
    const { useState, useEffect } = React;

    SJ.HeroSection = function HeroSection() {
        const [menuOpen, setMenuOpen] = useState(false);
        const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 640);

        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return (
            <>
                <section id="hero" className="h-screen" aria-label="Ana bölüm">
                    <div className="relative h-full overflow-hidden">
                        <video ref={el => { if (el) { el.muted = true; el.play().catch(e => console.log("Hero video autoplay failed", e)); } }} loop muted playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
                            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4" />
                        </video>
                        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0 z-10" aria-hidden="true"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-20" aria-hidden="true"></div>
                        <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[190] bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 hidden md:block" role="navigation" aria-label="Ana navigasyon">
                            <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
                                <a href="index.html" className="nav-link text-[10px] sm:text-xs md:text-sm">Ana Sayfa</a>
                                <a href="hakkimizda.html" className="nav-link text-[10px] sm:text-xs md:text-sm">Hikayemiz</a>
                                <a href="galeri.html" className="nav-link text-[10px] sm:text-xs md:text-sm">Galeri</a>
                                <a href="duyurular.html" className="nav-link text-[10px] sm:text-xs md:text-sm">Duyurular</a>
                                <a href="calismalar.html" className="nav-link text-[10px] sm:text-xs md:text-sm">Çalışmalar</a>
                                <a href="iletisim.html" className="nav-link text-[10px] sm:text-xs md:text-sm">İletişim</a>
                            </div>
                        </nav>
                        <button onClick={() => setMenuOpen(true)} className="fixed top-3 right-4 z-[190] bg-black rounded-full w-10 h-10 flex items-center justify-center md:hidden" aria-label="Menüyü aç">
                            <SJ.MenuIcon size={20} className="text-[#E1E0CC]" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-10 lg:p-14">
                            <div className="grid grid-cols-12 gap-4 items-end">
                                <div className="col-span-12 lg:col-span-8">
                                    <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]" style={{ color: '#E1E0CC' }}>
                                        <SJ.WordsPullUp text="Sıhana Jorin" showAsterisk={true} />
                                    </h1>
                                </div>
                                <div className="col-span-12 lg:col-span-4 lg:pb-4">
                                    <SJ.FadeUp delay={0.5}>
                                        <p className="text-xs sm:text-sm md:text-base mb-5" style={{ lineHeight: 1.35, color: 'rgba(222,219,200,0.7)' }}>
                                            Besler Köyü, kadim adıyla Sîhana Jorin; sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir. Doğubayazıt'ın güneyinde, nesiller boyu aktarılan güçlü bir aidiyetin sembolüdür.
                                        </p>
                                    </SJ.FadeUp>
                                    <SJ.FadeUp delay={0.7}>
                                        <a href="gonullu.html"
                                            style={{
                                                display: 'flex',
                                                width: isMobile ? '100%' : 'auto',
                                                alignItems: 'center',
                                                justifyContent: isMobile ? 'space-between' : 'flex-start',
                                                gap: '12px',
                                                background: '#DEDBC8',
                                                color: '#000',
                                                fontWeight: 500,
                                                fontSize: '0.875rem',
                                                borderRadius: '9999px',
                                                padding: '12px 12px 12px 24px',
                                                textDecoration: 'none',
                                                boxShadow: '0 2px 20px rgba(0,0,0,0.35)',
                                                transition: 'opacity 0.2s',
                                            }}>
                                            Derneğe Katıl
                                            <span style={{
                                                background: '#000',
                                                borderRadius: '50%',
                                                width: '38px',
                                                height: '38px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <SJ.ArrowRight size={16} style={{ color: '#E1E0CC' }} />
                                            </span>
                                        </a>
                                    </SJ.FadeUp>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <SJ.HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </>
        );
    };
})();

// ---- js/sections/about.js ----
(function () {
    const SJ = window.SJ;

    SJ.AboutSection = function AboutSection() {
        return (
            <section id="about" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="Hakkımızda">
                <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto text-center">
                    <SJ.FadeUp delay={0}><span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 block">Geçmişin Mirası, Geleceğin İnancı</span></SJ.FadeUp>
                    <h2 data-toc data-toc-title="Hikayemiz" data-toc-depth="1" id="about-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]" style={{ color: '#E1E0CC' }}>
                        <SJ.WordsPullUpMultiStyle segments={[
                            { text: 'Serhat bölgesinin kalbinde, Ağrı Dağı\'nın gölgesinde köklü bir geçmişe ev sahipliği yapan Besler Köyü,', className: '' },
                            { text: 'bilinen ve kadim adıyla Sîhana Jorin;', className: 'italic font-serif' },
                            { text: 'sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir.', className: '' }
                        ]} />
                    </h2>
                    <SJ.AnimatedText text="Sert kışlarına inat sıcak insan hikayeleriyle filizlenen köyümüz, geleneksel hayvancılık kültürüyle toprağına bağlı kalırken; metropollerden Avrupa'ya uzanan güçlü diasporasıyla da bağlarını asla koparmamıştır. Bugün Sîhana Jorin; geçmişin kültürel mirasını koruyan, genç nesillerin enerjisiyle geleceğe umutla bakan ve nerede olursak olalım hepimizi aynı samimiyette buluşturan ortak evimizdir."
                        className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-10 md:mt-14 leading-relaxed" />
                    <div data-toc data-toc-title="Kültürel Mirasımız" data-toc-depth="2" id="about-heritage" className="mt-16 md:mt-20 max-w-2xl mx-auto text-left">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color: '#E1E0CC' }}>Kültürel Mirasımız</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Köyümüzün köklü gelenekleri, yöresel tatları, müziği ve el sanatları nesiller boyu aktarılan bir hazinedir. Bu mirası korumak ve yaşatmak hepimizin görevidir.</p>
                    </div>
                    <div data-toc data-toc-title="Dayanışma Ruhu" data-toc-depth="2" id="about-solidarity" className="mt-12 max-w-2xl mx-auto text-left">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color: '#E1E0CC' }}>Dayanışma Ruhu</h3>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Sıhana Jorin Derneği olarak, köy halkının birlik ve beraberliğini güçlendirmek için durmaksızın çalışıyoruz. Acı gününde de, sevinçli gününde de yan yana yürüyoruz.</p>
                    </div>
                </div>
            </section>
        );
    };
})();

// ---- js/sections/gallery.js ----
(function () {
    const SJ = window.SJ;

    SJ.GallerySection = function GallerySection() {
        return (
            <section id="gallery" className="bg-black relative" aria-label="Galeri">
                <div data-toc data-toc-title="Galeri" data-toc-depth="1" id="gallery-heading" className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                    <SJ.FadeUp delay={0}>
                        <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#DEDBC8]/10">Fotoğraf Galerisi</span>
                    </SJ.FadeUp>
                </div>
                <SJ.InfiniteSlider />
            </section>
        );
    };
})();

// ---- js/sections/features.js ----
(function () {
    const SJ = window.SJ;

    SJ.FeaturesSection = function FeaturesSection() {
        return (
            <section id="features" className="min-h-screen bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6 relative" aria-label="Çalışmalarımız">
                <div className="bg-noise opacity-[0.15] absolute inset-0 z-0" aria-hidden="true"></div>
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 data-toc data-toc-title="Çalışmalarımız" data-toc-depth="1" id="features-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal" style={{ color: '#E1E0CC' }}>
                            <SJ.WordsPullUpMultiStyle segments={[{ text: 'Köyümüz için güçlü bir gelecek inşa ediyoruz.', className: '' }]} />
                        </h2>
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-3">
                            <SJ.WordsPullUpMultiStyle segments={[{ text: 'Birlikten doğan güç. Gelenekten beslenen gelecek.', className: '' }]} />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
                        <SJ.CardEntrance delay={0} className="relative rounded-2xl overflow-hidden lg:h-[480px] min-h-[300px]">
                            <video ref={el => { if (el) { el.muted = true; el.play().catch(e => console.log("Features video autoplay failed", e)); } }} loop muted playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
                                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>Köyümüzün güzellikleri</p></div>
                        </SJ.CardEntrance>
                        <SJ.CardEntrance delay={0.15} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                            <div data-toc data-toc-title="Kültürel Etkinlikler" data-toc-depth="2" id="feat-culture">
                                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Kültürel etkinlikler ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                                <div className="mb-4"><span className="text-gray-500 text-xs">(01)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color: '#E1E0CC' }}>Kültürel Etkinlikler</h3></div>
                            </div>
                            <div className="flex-1 space-y-3">
                                {['Yıllık köy festivali ve şenlikleri', 'Geleneksel el sanatları atölyeleri', 'Yöresel müzik ve halk oyunları', 'Kültürel miras belgesel çalışmaları'].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                                ))}
                            </div>
                            <a href="duyurular.html" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform: 'rotate(-45deg)', display: 'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                        </SJ.CardEntrance>
                        <SJ.CardEntrance delay={0.3} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                            <div data-toc data-toc-title="Dayanışma Ağı" data-toc-depth="2" id="feat-network">
                                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Dayanışma ağı ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                                <div className="mb-4"><span className="text-gray-500 text-xs">(02)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color: '#E1E0CC' }}>Dayanışma Ağı</h3></div>
                            </div>
                            <div className="flex-1 space-y-3">
                                {['Dijital arşiv ve belge tarama sistemi', 'Köy hikayeleri ve anı derlemeleri', 'İletişim ağı ve yardımlaşma platformu'].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                                ))}
                            </div>
                            <a href="iletisim.html" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform: 'rotate(-45deg)', display: 'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                        </SJ.CardEntrance>
                        <SJ.CardEntrance delay={0.45} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                            <div data-toc data-toc-title="Eğitim Destekleri" data-toc-depth="2" id="feat-education">
                                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Eğitim destekleri ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                                <div className="mb-4"><span className="text-gray-500 text-xs">(03)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color: '#E1E0CC' }}>Eğitim Destekleri</h3></div>
                            </div>
                            <div className="flex-1 space-y-3">
                                {['Burs programları ve eğitim desteği', 'Gençlik kampları ve atölye çalışmaları', 'Program takvimi ve etkinlik senkronizasyonu'].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                                ))}
                            </div>
                            <a href="bagis.html" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform: 'rotate(-45deg)', display: 'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                        </SJ.CardEntrance>
                    </div>
                </div>
            </section>
        );
    };
})();

// ---- js/sections/contact.js ----
(function () {
    const SJ = window.SJ;

    SJ.ContactSection = function ContactSection() {
        return (
            <section id="contact" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="İletişim">
                <div data-toc data-toc-title="İletişim" data-toc-depth="1" id="contact-heading" className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <div>
                            <SJ.FadeUp delay={0}><span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 block">Bize Ulaşın</span></SJ.FadeUp>
                            <SJ.FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-8" style={{ color: '#E1E0CC' }}>Birlikte daha güçlüyüz</h2></SJ.FadeUp>
                            <SJ.FadeUp delay={0.2}><p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">Derneğimize katılmak, fikir paylaşmak veya herhangi bir konuda bizimle iletişime geçmek isterseniz, her zaman buradayız.</p></SJ.FadeUp>
                            <SJ.FadeUp delay={0.3}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <SJ.MapPin size={18} className="text-[#DEDBC8] shrink-0" /><span>Sıhana Jorin Köyü, Merkez Mahallesi, No:1</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <SJ.Phone size={18} className="text-[#DEDBC8] shrink-0" /><span>+90 (555) 123 4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <SJ.Mail size={18} className="text-[#DEDBC8] shrink-0" /><span>info@sihanajorin.org</span>
                                    </div>
                                </div>
                            </SJ.FadeUp>
                        </div>
                        <SJ.FadeUp delay={0.2}>
                            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Ad Soyad</label>
                                    <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">E-posta</label>
                                    <input type="email" placeholder="ornek@email.com" className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Mesajınız</label>
                                    <textarea rows={4} placeholder="Mesajınızı yazın..." className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors resize-none" />
                                </div>
                                <button type="submit" className="w-full bg-[#DEDBC8] text-black font-medium py-3 rounded-xl text-sm hover:bg-[#E8E5D4] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    Gönder <SJ.ArrowRight size={16} />
                                </button>
                            </form>
                        </SJ.FadeUp>
                    </div>
                </div>
            </section>
        );
    };
})();

// ---- js/sections/footer.js ----
(function () {
    const SJ = window.SJ;

    SJ.Footer = function Footer() {
        const links = [
            { group: 'Keşfet', items: [{ label: 'Hikayemiz', href: 'hakkimizda.html' }, { label: 'Galeri', href: 'galeri.html' }, { label: 'Duyurular', href: 'duyurular.html' }] },
            { group: 'Destek', items: [{ label: 'Bağış Yap', href: 'bagis.html' }, { label: 'Gönüllü Ol', href: 'gonullu.html' }, { label: 'İletişim', href: 'iletisim.html' }] },
            { group: 'Sosyal Medya', items: [{ label: 'Instagram', href: 'https://instagram.com' }, { label: 'Facebook', href: 'https://facebook.com' }, { label: 'YouTube', href: 'https://youtube.com' }, { label: 'X', href: 'https://x.com' }] }
        ];
        return (
            <footer className="bg-[#050505] border-t border-[#DEDBC8]/5 pt-16 pb-8 px-4 md:px-6">
                <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="text-2xl font-medium mb-3" style={{ color: '#E1E0CC' }}>Sıhana Jorin</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">Köyümüzün mirasını yaşatmak, geleceğini inşa etmek için bir aradayız.</p>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                                <SJ.Heart size={12} className="text-[#DEDBC8]" /> ile yapıldı
                            </div>
                        </div>
                        {links.map(group => (
                            <div key={group.group}>
                                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4">{group.group}</h4>
                                <ul className="space-y-2.5">
                                    {group.items.map(item => (
                                        <li key={item.label}><a href={item.href} className="text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors">{item.label}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-[#DEDBC8]/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Sıhana Jorin Köy Derneği. Tüm hakları saklıdır.</p>
                        <div className="flex items-center gap-3">
                            <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity" style={{display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(222,219,200,0.08)', color:'rgba(222,219,200,0.5)'}} aria-label="Instagram"><SJ.Instagram size={16} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity" style={{display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(222,219,200,0.08)', color:'rgba(222,219,200,0.5)'}} aria-label="Facebook"><SJ.Facebook size={16} /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity" style={{display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(222,219,200,0.08)', color:'rgba(222,219,200,0.5)'}} aria-label="YouTube"><SJ.YouTube size={16} /></a>
                            <a href="https://x.com" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity" style={{display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(222,219,200,0.08)', color:'rgba(222,219,200,0.5)'}} aria-label="X"><SJ.XIcon_social size={14} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
})();

// ---- js/components/flipping-card.js ----
(function () {
    const SJ = window.SJ;

    SJ.FlippingCard = function FlippingCard({
        className,
        frontContent,
        backContent,
        height = 300,
        width = 350,
    }) {
        return (
            <div
                className="group/flipping-card [perspective:1000px]"
                style={{ "--height": `${height}px`, "--width": `${width}px` }}
            >
                <div
                    className={SJ.cn(
                        "relative rounded-xl border border-[#DEDBC8]/20 bg-[#101010] shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
                        "h-[var(--height)] w-[var(--width)]",
                        className
                    )}
                >
                    <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#101010] text-[#E1E0CC] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
                        <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
                            {frontContent}
                        </div>
                    </div>
                    <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#101010] text-[#E1E0CC] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
                            {backContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
})();

// ---- js/sections/announcements.js ----
(function () {
    const SJ = window.SJ;

    SJ.AnnouncementsSection = function AnnouncementsSection() {
        // Shared data from js/data/announcements.js — edit that file to update both pages
        const raw = (window.SJ.DUYURULAR_DATA || []);
        const announcements = raw.map(item => ({
            id: item.id,
            front: { title: item.title, description: item.summary },
            back: { description: item.description, buttonText: item.buttonText, href: item.buttonHref }
        }));

        return (
            <section id="announcements" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="Duyurular">
                <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <SJ.FadeUp delay={0}>
                            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">Duyurular</span>
                        </SJ.FadeUp>
                        <SJ.FadeUp delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl font-medium" style={{ color: '#E1E0CC' }}>Köyümüzden Haberler</h2>
                        </SJ.FadeUp>
                    </div>
                    <div className="flex md:flex-wrap justify-start md:justify-center gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-none">
                        {announcements.map((a) => (
                            <div key={a.id} className="snap-start shrink-0">
                                <SJ.FlippingCard width={270} height={300}
                                    frontContent={<AnnouncementFront data={a.front} />}
                                    backContent={<AnnouncementBack data={a.back} />}
                                />
                            </div>
                        ))}
                    </div>
                    <SJ.FadeUp delay={0.3}>
                        <div className="text-center mt-10">
                            <a href="duyurular.html" className="inline-flex items-center gap-2 text-sm text-[#DEDBC8]/50 hover:text-[#DEDBC8] transition-colors">
                                Tüm duyuruları gör <SJ.ArrowRight size={14} />
                            </a>
                        </div>
                    </SJ.FadeUp>
                </div>
            </section>
        );
    };

    function AnnouncementFront({ data }) {
        return (
            <div className="flex flex-col h-full w-full p-3 md:p-4">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center">
                        <SJ.Bell size={22} className="text-[#DEDBC8] md:w-7 md:h-7" />
                    </div>
                </div>
                <div className="p-1 md:p-2">
                    <h3 className="text-sm md:text-base font-semibold mt-1 md:mt-2" style={{ color: '#E1E0CC' }}>{data.title}</h3>
                    <p className="text-xs md:text-[13.5px] mt-1 md:mt-2 text-gray-400">{data.description}</p>
                </div>
            </div>
        );
    }

    function AnnouncementBack({ data }) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full p-6">
                <p className="text-[13.5px] text-gray-400 text-center">{data.description}</p>
                <a href={data.href || 'duyurular.html'} className="mt-6 bg-[#DEDBC8] text-black px-4 py-2 rounded-full text-[13.5px] font-medium hover:bg-[#E8E5D4] transition-colors active:scale-95 inline-block text-center">
                    {data.buttonText}
                </a>
            </div>
        );
    }
})();

// ---- js/app.js ----
(function () {
    const SJ = window.SJ;

    function App() {
        return (
            <main>
                <SJ.HeroSection />
                <SJ.AboutSection />
                <SJ.GallerySection />
                <SJ.AnnouncementsSection />
                <SJ.FeaturesSection />
                <SJ.ContactSection />
                <SJ.Footer />
                <SJ.CookieBanner />
                <SJ.DynamicIslandTOC />
            </main>
        );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
})();
