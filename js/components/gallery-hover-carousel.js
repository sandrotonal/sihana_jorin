/* ============================================================
   GalleryHoverCarousel — Premium Gallery Carousel with Hover Effects
   ============================================================ */
(function() {
const SJ = window.SJ;
const h = React.createElement;

SJ.GalleryHoverCarousel = function GalleryHoverCarousel(props) {
  const { useRef, useState, useEffect, useCallback } = React;

  const heading = props.heading || "Köyümüzden Kareler";
  const galleryData = (window.SJ && window.SJ.GALLERY_DATA) || [];
  const items = props.items || (galleryData.length > 0 ? galleryData.map(function(g, i) {
    return {
      id: g.id || 'gallery-' + i,
      title: g.title || '',
      summary: g.description || g.category || '',
      url: g.url || '#',
      image: g.image || ''
    };
  }) : []);

  const scrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 5);
    setCanScrollNext(el.scrollLeft < maxScroll - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);
    
    // Initial check
    setTimeout(updateState, 100);

    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75 * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return h('section', { className: 'py-20 md:py-28 bg-black overflow-hidden' },
    h('div', { className: 'max-w-6xl mx-auto px-4 md:px-6' },
      // Header Section
      h('div', { className: 'mb-10 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16' },
        h('div', { className: 'max-w-2xl' },
          h('h2', { className: 'text-2xl md:text-3xl font-medium text-[#E1E0CC] leading-relaxed' }, heading),
          h('p', { className: 'text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed' }, 
            'Köyümüzün zengin kültürel mirasını, doğal güzelliklerini ve birlikte imza attığımız çalışmaları keşfedin.'
          )
        ),
        // Nav Buttons
        h('div', { className: 'flex gap-2 mt-6 md:mt-0' },
          h('button', {
            onClick: () => scroll(-1),
            disabled: !canScrollPrev,
            className: `h-10 w-10 rounded-full border border-[#DEDBC8]/15 bg-black text-[#E1E0CC] flex items-center justify-center transition-all duration-300 ${
              canScrollPrev ? 'opacity-100 hover:bg-[#DEDBC8]/10 cursor-pointer' : 'opacity-30 cursor-default'
            }`,
            'aria-label': 'Önceki'
          },
            h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('polyline', { points: '15 18 9 12 15 6' })
            )
          ),
          h('button', {
            onClick: () => scroll(1),
            disabled: !canScrollNext,
            className: `h-10 w-10 rounded-full border border-[#DEDBC8]/15 bg-black text-[#E1E0CC] flex items-center justify-center transition-all duration-300 ${
              canScrollNext ? 'opacity-100 hover:bg-[#DEDBC8]/10 cursor-pointer' : 'opacity-30 cursor-default'
            }`,
            'aria-label': 'Sonraki'
          },
            h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('polyline', { points: '9 18 15 12 9 6' })
            )
          )
        )
      ),

      // Carousel Container
      h('div', { className: 'w-full max-w-full' },
        h('div', {
          ref: scrollRef,
          className: 'flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-6 pb-4',
          style: { WebkitOverflowScrolling: 'touch' }
        },
          items.map((item) =>
            h('div', { key: item.id, className: 'snap-start shrink-0 w-[290px] sm:w-[320px] md:w-[350px]' },
              h('a', { href: item.url, className: 'group block relative w-full h-[360px] md:h-[400px] overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#DEDBC8]/10 bg-[#101010]' },
                // Image section
                h('div', { className: 'relative h-full w-full transition-all duration-500 group-hover:h-1/2 overflow-hidden' },
                  h('img', {
                    src: item.image,
                    alt: item.title,
                    className: 'h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105',
                    loading: 'lazy'
                  }),
                  h('div', { className: 'absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' })
                ),
                // Text Section (Reveals on Hover)
                h('div', { className: 'absolute bottom-0 left-0 w-full h-0 px-6 py-0 transition-all duration-500 group-hover:h-1/2 group-hover:py-6 flex flex-col justify-center bg-[#101010]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 border-t border-[#DEDBC8]/5' },
                  h('h3', { className: 'text-base md:text-lg font-medium text-[#E1E0CC] mb-2' }, item.title),
                  h('p', { className: 'text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3' }, item.summary),
                  h('div', { className: 'absolute bottom-4 right-4 h-8 w-8 rounded-full border border-[#DEDBC8]/25 bg-black flex items-center justify-center text-[#DEDBC8] hover:bg-[#DEDBC8] hover:text-black transition-all duration-500 group-hover:-rotate-45' },
                    h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round' },
                      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
                      h('polyline', { points: '12 5 19 12 12 19' })
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};
})();
