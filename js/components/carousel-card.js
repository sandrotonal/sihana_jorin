/* ============================================================
   CarouselCard — Smooth horizontal scroll-snap carousel
   ============================================================ */
(function() {
const SJ = window.SJ || {};
const { useState, useEffect, useRef, useCallback } = React;
const h = React.createElement;

function ArrowLeft({ size = 18 }) {
  return h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('line', { x1: '19', y1: '12', x2: '5', y2: '12' }),
    h('polyline', { points: '12 19 5 12 12 5' })
  );
}

function ArrowRight2({ size = 18 }) {
  return h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
    h('polyline', { points: '12 5 19 12 12 19' })
  );
}

const Card = function Card({ data, showCarousel = true }) {
  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 10);
    setCanScrollNext(el.scrollLeft < maxScroll - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    const t = setTimeout(updateState, 150);
    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
      clearTimeout(t);
    };
  }, [updateState, data]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector('.carousel-card')?.offsetWidth || el.clientWidth * 0.75;
    el.scrollBy({ left: cardW * direction, behavior: 'smooth' });
  };

  if (!data || data.length === 0) {
    return h('div', { className: 'text-[#E1E0CC]/60 text-center py-12' }, 'Henüz duyuru bulunmuyor.');
  }

  const showControls = showCarousel && data.length > 1;

  const btnBase = {
    width: '38px', height: '38px', borderRadius: '50%',
    background: '#1a1a1a', border: '1px solid rgba(222,219,200,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#DEDBC8', flexShrink: 0, padding: 0,
    transition: 'background 0.25s, border-color 0.25s, opacity 0.25s',
  };

  return h('div', { className: 'w-full px-2 sm:px-4' },
    showControls ? h('div', {
      style: { display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginBottom: '16px' }
    },
      h('button', {
        onClick: () => scroll(-1),
        disabled: !canScrollPrev,
        'aria-label': 'Önceki',
        style: { ...btnBase, opacity: canScrollPrev ? 1 : 0.3 },
        onMouseEnter: (e) => { if (canScrollPrev) { e.currentTarget.style.background = 'rgba(222,219,200,0.1)'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)'; } },
        onMouseLeave: (e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.15)'; },
      }, h(ArrowLeft, { size: 16 })),
      h('button', {
        onClick: () => scroll(1),
        disabled: !canScrollNext,
        'aria-label': 'Sonraki',
        style: { ...btnBase, opacity: canScrollNext ? 1 : 0.3 },
        onMouseEnter: (e) => { if (canScrollNext) { e.currentTarget.style.background = 'rgba(222,219,200,0.1)'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)'; } },
        onMouseLeave: (e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.15)'; },
      }, h(ArrowRight2, { size: 16 }))
    ) : null,
    h('div', {
      ref: scrollRef,
      style: {
        overflowX: 'auto', scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch',
        display: 'flex', gap: '12px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }
    },
      data.map((card) =>
        h('div', {
          key: card.id,
          className: 'carousel-card flex-shrink-0',
          style: { width: 'calc(25% - 9px)', minWidth: '280px', scrollSnapAlign: 'start' }
        },
          h('div', {
            className: 'relative overflow-hidden rounded-xl shadow-md group h-72 border border-[#DEDBC8]/5 hover:border-[#DEDBC8]/20 transition-colors duration-300'
          },
            h('div', { className: 'w-full h-full' },
              h('img', {
                src: card.imgUrl, alt: '',
                className: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
                loading: 'lazy'
              })
            ),
            h('div', {
              className: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 overflow-y-auto'
            },
              h('p', {
                className: 'text-sm text-[#E1E0CC]/90 leading-relaxed',
                dangerouslySetInnerHTML: { __html: card.content }
              })
            )
          )
        )
      )
    )
  );
};

SJ.CarouselCard = Card;
})();
