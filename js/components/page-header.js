const SJ = window.SJ;

SJ.PageHeader = function PageHeader({ title, description, badge, buttons, background }) {
  const { useRef, useState, useEffect } = React;

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  function useInView(opts) {
    const ref = useRef(null);
    const [iv, setIv] = useState(false);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIv(true); if (opts?.once !== false) o.unobserve(el); } else if (opts?.once === false) setIv(false); }, { threshold: opts?.threshold || 0, margin: opts?.margin || '0px' });
      o.observe(el); return () => o.disconnect();
    }, []);
    return [ref, iv];
  }

  const [badgeRef, badgeIn] = useInView({ once: true });
  const [descRef, descIn] = useInView({ once: true });
  const [ctaRef, ctaIn] = useInView({ once: true });

  return React.createElement('section', {
    style: {
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1rem, 4vw, 2.5rem) clamp(3rem, 6vw, 4.5rem)',
      background: background || '#000'
    }
  },
    React.createElement('div', {
      style: {
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(222,219,200,0.03) 0%, transparent 60%)'
      }
    }),
    React.createElement('div', { style: { position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' } },
      badge ? React.createElement('div', {
        ref: badgeRef, style: {
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '9999px',
          border: '1px solid rgba(222,219,200,0.15)',
          background: 'rgba(222,219,200,0.04)',
          fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em',
          color: 'rgba(222,219,200,0.7)', textTransform: 'uppercase',
          marginBottom: '24px',
          opacity: badgeIn ? 1 : 0, transform: badgeIn ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'
        }
      }, badge) : null,
      React.createElement('h1', { style: {
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em',
          color: '#E1E0CC', margin: 0,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
        }
      },
        title.split(' ').map((word, i) =>
          React.createElement('span', { key: i, style: { overflow: 'hidden', display: 'inline-block', marginRight: '0.25em' } },
            React.createElement('span', {
              style: {
                display: 'inline-block',
                transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + (i * 0.05)}s`
              }
            }, word)
          )
        )
      ),
      description ? React.createElement('p', {
        ref: descRef, style: {
          fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
          lineHeight: 1.7, color: 'rgba(225,224,204,0.45)',
          maxWidth: '600px', margin: '18px auto 0',
          opacity: descIn ? 1 : 0, transform: descIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s'
        }
      }, description) : null,
      buttons && buttons.length ? React.createElement('div', {
        ref: ctaRef, style: {
          display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '32px',
          opacity: ctaIn ? 1 : 0, transform: ctaIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s'
        }
      }, buttons.map((btn, i) =>
        React.createElement('a', {
          key: i, href: btn.href,
          style: {
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: btn.variant === 'ghost' ? '10px 22px' : '10px 26px',
            borderRadius: '9999px', fontSize: '14px', fontWeight: 500,
            textDecoration: 'none', cursor: 'pointer',
            background: btn.variant === 'ghost' || btn.variant === 'outline' ? 'transparent' : '#DEDBC8',
            color: btn.variant === 'ghost' || btn.variant === 'outline' ? 'rgba(225,224,204,0.6)' : '#000',
            border: btn.variant === 'outline' || btn.variant === 'ghost' ? '1px solid rgba(222,219,200,0.15)' : 'none',
            transition: 'all 0.25s ease'
          },
          className: 'page-header-cta'
        }, btn.label)
      )) : null
    )
  );
};
