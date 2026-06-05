const SJ = window.SJ;
const { useState, useEffect, useRef, useMemo, useCallback } = React;
const cn = SJ.cn = function cn(...classes) { return classes.filter(Boolean).join(' '); };



/* HamburgerMenu — slide-in drawer */
SJ.HamburgerMenu = function HamburgerMenu({ isOpen, onClose }) {
    const links = [
        { href: 'index.html', label: 'Ana Sayfa' },
        { href: 'hakkimizda.html', label: 'Hikayemiz' },
        { href: 'galeri.html', label: 'Galeri' },
        { href: 'duyurular.html', label: 'Duyurular' },
        { href: 'calismalar.html', label: 'Çalışmalar' },
        { href: 'iletisim.html', label: 'İletişim' }
    ];
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <div onClick={onClose}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-500"
                style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }} />
            <div className="fixed inset-0 z-50 bg-[#050505] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center"
                style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}>
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-[#E1E0CC]/50 hover:text-[#E1E0CC] transition-colors cursor-pointer" aria-label="Menüyü kapat">
                    <SJ.XIcon size={22} className="text-[#E1E0CC]" />
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

/* CookieBanner */
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

/* CircleProgress */
SJ.CircleProgress = function CircleProgress({ percentage }) {
    const s = 24, sw = 2.5, r = (s - sw) / 2, c = 2 * Math.PI * r, o = c - (percentage / 100) * c;
    return (
        <svg width={s} height={s} className="-rotate-90 shrink-0">
            <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={sw} />
            <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="var(--foreground)" strokeWidth={sw} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.15s ease-out' }} />
        </svg>
    );
};

/* DynamicIslandTOC */
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
