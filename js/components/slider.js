const SJ = window.SJ;
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* InfiniteSlider */
SJ.InfiniteSlider = function InfiniteSlider() {
    const [visibleRange, setVisibleRange] = useState({ min:-SJ.SLIDER_CONFIG.BUFFER_SIZE, max:SJ.SLIDER_CONFIG.BUFFER_SIZE });
    const containerRef = useRef(null);
    const state = useRef({ currentY:0, targetY:0, isDragging:false, isSnapping:false, snapStart:{time:0,y:0,target:0}, lastScrollTime:Date.now(), dragStart:{y:0,scrollY:0}, projectHeight:0 });
    const projectsRef = useRef(new Map());
    const minimapRef = useRef(new Map());
    const infoRef = useRef(new Map());
    const requestRef = useRef();
    const renderedRange = useRef({ min:-SJ.SLIDER_CONFIG.BUFFER_SIZE, max:SJ.SLIDER_CONFIG.BUFFER_SIZE });
    const [currentIndex, setCurrentIndex] = useState(0);

    const lerp = (s, e, f) => s + (e - s) * f;
    const getData = (i) => SJ.SLIDER_DATA[((Math.abs(i) % SJ.SLIDER_DATA.length) + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length];
    const getNum = (i) => (((Math.abs(i) % SJ.SLIDER_DATA.length) + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length + 1).toString().padStart(2,'0');

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
        s.snapStart = { time:Date.now(), y:s.targetY, target:-cur * s.projectHeight };
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
        s.snapStart = { time:Date.now(), y:s.targetY, target:-next * s.projectHeight };
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

        const onTS = (e) => { const s = state.current; s.isDragging=true; s.isSnapping=false; s.dragStart={y:e.touches[0].clientY,scrollY:s.targetY}; s.lastScrollTime=Date.now(); };
        const onTM = (e) => { const s = state.current; if (!s.isDragging) return; s.targetY=s.dragStart.scrollY+(e.touches[0].clientY-s.dragStart.y)*1.5; s.lastScrollTime=Date.now(); };
        const onTE = () => { state.current.isDragging=false; };
        const onResize = () => { state.current.projectHeight=container.offsetHeight; };

        container.addEventListener('wheel', onWheel, { passive:false });
        container.addEventListener('touchstart', onTS, { passive:true });
        container.addEventListener('touchmove', onTM, { passive:true });
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
                        <div key={i} className="slider-project" ref={el => { if (el) projectsRef.current.set(i,el); else projectsRef.current.delete(i); }}>
                            <img src={d.image} alt={d.title} loading="lazy" />
                            <div className="slider-info-overlay md:hidden">
                                <span className="text-[10px] text-[#DEDBC8]/60 tracking-widest uppercase">{d.category} — {d.year}</span>
                                <h3 className="text-xl font-medium mt-1" style={{ color:'#E1E0CC' }}>{d.title}</h3>
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
                                <div key={i} className="slider-minimap-img" ref={el => { if (el) minimapRef.current.set(i,el); else minimapRef.current.delete(i); }}>
                                    <img src={d.image} alt={d.title} loading="lazy" />
                                </div>
                            );
                        })}
                    </div>
                    <div className="slider-minimap-info-list">
                        {indices.map(i => {
                            const d = getData(i); const n = getNum(i);
                            return (
                                <div key={i} className="slider-minimap-info" ref={el => { if (el) infoRef.current.set(i,el); else infoRef.current.delete(i); }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[#DEDBC8]/40 text-xs font-mono">{n}</span>
                                        <span className="text-[#DEDBC8]/40 text-xs">{d.year}</span>
                                    </div>
                                    <h4 className="text-base font-medium mb-1" style={{ color:'#E1E0CC' }}>{d.title}</h4>
                                    <span className="text-[10px] text-[#DEDBC8]/50 tracking-widest uppercase">{d.category}</span>
                                    <p className="text-gray-500 text-xs mt-3">{d.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                <button onClick={() => goToProject(-1)} className="slider-nav-btn" aria-label="Önceki">
                    <SJ.ChevronUp size={18} />
                </button>
                <span className="text-xs text-[#DEDBC8]/40 font-mono w-12 text-center">{displayIndex.toString().padStart(2,'0')} / {SJ.SLIDER_DATA.length.toString().padStart(2,'0')}</span>
                <button onClick={() => goToProject(1)} className="slider-nav-btn" aria-label="Sonraki">
                    <SJ.ChevronDown size={18} />
                </button>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-[10px] text-[#DEDBC8]/30 tracking-widest uppercase hidden md:block">
                Kaydırarak gezin
            </div>
        </div>
    );
};
