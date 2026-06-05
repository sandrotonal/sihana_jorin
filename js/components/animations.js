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
                        <span style={{ display:'inline-block', transform:isInView?'translateY(0)':'translateY(110%)', transition:`transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, position:'relative' }}>
                            {word}
                            {showAsterisk && isLast && <sup style={{ position:'absolute',top:'0.65em',right:'-0.3em',fontSize:'0.31em',fontWeight:'normal' }}>*</sup>}
                        </span>
                    </span>
                );
            })}
        </span>
    );
};

/* WordsPullUpMultiStyle */
SJ.WordsPullUpMultiStyle = function WordsPullUpMultiStyle({ segments, className = '' }) {
    const [ref, isInView] = SJ.useInView({ once: true, margin: '-50px' });
    const allWords = [];
    segments.forEach((seg, si) => { seg.text.split(' ').forEach((w, wi) => { allWords.push({ word:w, className:seg.className||'', key:`${si}-${wi}` }); }); });
    return (
        <span ref={ref} className={cn('flex flex-wrap justify-center w-full', className)}>
            {allWords.map((item, i) => (
                <span key={item.key} className="word-overflow">
                    <span className={item.className} style={{ display:'inline-block', transform:isInView?'translateY(0)':'translateY(110%)', transition:`transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s` }}>{item.word}</span>
                </span>
            ))}
        </span>
    );
};

/* AnimatedText (scroll reveal) */
SJ.AnimatedLetter = function AnimatedLetter({ char, index, totalChars, scrollProgress }) {
    const cp = index / totalChars; const rs = cp - 0.1; const re = cp + 0.05;
    let o = 0.2;
    if (scrollProgress <= rs) o = 0.2; else if (scrollProgress >= re) o = 1; else { o = 0.2 + ((scrollProgress - rs) / (re - rs)) * 0.8; }
    return <span className="animated-char" style={{ opacity:o, transition:'opacity 0.05s ease' }}>{char}</span>;
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
                setProgress(Math.min(1, Math.max(0, (vh*0.8-r.top)/(vh*0.8-vh*0.2))));
                rafId.current = null;
            });
        };
        window.addEventListener('scroll', handle, { passive:true }); handle();
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

/* FadeUp + CardEntrance */
SJ.FadeUp = function FadeUp({ children, delay=0, className='' }) {
    const [ref, iv] = SJ.useInView({ once:true, margin:'-50px' });
    return <div ref={ref} className={className} style={{ opacity:iv?1:0, transform:iv?'translateY(0)':'translateY(20px)', transition:`opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
};

SJ.CardEntrance = function CardEntrance({ children, delay=0, className='' }) {
    const [ref, iv] = SJ.useInView({ once:true, margin:'-100px' });
    return <div ref={ref} className={className} style={{ opacity:iv?1:0, transform:iv?'scale(1)':'scale(0.95)', transition:`opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>{children}</div>;
};
