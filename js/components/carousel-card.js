(function() {
const SJ = window.SJ || {};
const { useState, useEffect, useRef } = React;
const h = React.createElement;

/* ── SVG Arrow Icons ── */
function ArrowLeft({ size = 18 }) {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width: size, height: size,
    viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round'
  },
    h('line', { x1: '19', y1: '12', x2: '5', y2: '12' }),
    h('polyline', { points: '12 19 5 12 12 5' })
  );
}
function ArrowRight2({ size = 18 }) {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width: size, height: size,
    viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round'
  },
    h('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
    h('polyline', { points: '12 5 19 12 12 19' })
  );
}

const Card = function Card({ data, showCarousel = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSingleCard, setIsSingleCard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef(null);

  // Responsive cardsPerView calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsSingleCard(data?.length === 1);
  }, [data]);

  if (!data || data.length === 0) {
    return h('div', { className: 'text-[#E1E0CC]/60 text-center py-12' }, 'No card data available');
  }

  // Calculate width percentage for each card based on cardsPerView
  const cardWidth = 75 / cardsPerView;

  const nextSlide = () => {
    if (isAnimating || !showCarousel || !data || data.length <= cardsPerView) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % data.length;

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = "translateX(-" + cardWidth + "%)";

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
          void containerRef.current.offsetWidth;
          setIsAnimating(false);
        }
      }, 500);
    }
  };

  const prevSlide = () => {
    if (isAnimating || !showCarousel || !data || data.length <= cardsPerView) return;
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;

    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = "translateX(-" + cardWidth + "%)";
      setCurrentIndex(prevIndex);
      void containerRef.current.offsetWidth;

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "transform 500ms ease";
          containerRef.current.style.transform = "translateX(0)";
        }
        setTimeout(() => { setIsAnimating(false); }, 500);
      }, 50);
    }
  };

  const getVisibleCards = () => {
    if (!showCarousel || !data) return data || [];
    const visibleCards = [];
    const totalCards = data.length;
    const count = data.length <= cardsPerView ? data.length : cardsPerView + 1;
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(data[index]);
    }
    return visibleCards;
  };

  const visibleCards = getVisibleCards();
  const showControls = showCarousel && data.length > cardsPerView;

  /* ── Nav Buttons — design-system consistent ── */
  const navBtnStyle = {
    position: 'absolute',
    top: '-44px',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: '#1a1a1a',
    border: '1px solid rgba(222,219,200,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isAnimating ? 'not-allowed' : 'pointer',
    opacity: isAnimating ? 0.4 : 1,
    transition: 'background 0.25s, border-color 0.25s, opacity 0.25s',
    color: '#DEDBC8',
    zIndex: 10,
    flexShrink: 0,
  };

  const buttons = [];
  if (showControls) {
    buttons.push(
      h('div', {
        key: 'nav-row',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }
      },
        h('button', {
          key: 'prev',
          onClick: prevSlide,
          disabled: isAnimating,
          'aria-label': 'Önceki',
          style: {
            width: '38px', height: '38px', borderRadius: '50%',
            background: '#1a1a1a', border: '1px solid rgba(222,219,200,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            opacity: isAnimating ? 0.4 : 1,
            transition: 'background 0.25s, border-color 0.25s, opacity 0.25s',
            color: '#DEDBC8', flexShrink: 0,
          },
          onMouseEnter: (e) => { if (!isAnimating) { e.currentTarget.style.background = 'rgba(222,219,200,0.1)'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)'; } },
          onMouseLeave: (e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.15)'; },
        }, h(ArrowLeft, { size: 16 })),

        h('button', {
          key: 'next',
          onClick: nextSlide,
          disabled: isAnimating,
          'aria-label': 'Sonraki',
          style: {
            width: '38px', height: '38px', borderRadius: '50%',
            background: '#1a1a1a', border: '1px solid rgba(222,219,200,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            opacity: isAnimating ? 0.4 : 1,
            transition: 'background 0.25s, border-color 0.25s, opacity 0.25s',
            color: '#DEDBC8', flexShrink: 0,
          },
          onMouseEnter: (e) => { if (!isAnimating) { e.currentTarget.style.background = 'rgba(222,219,200,0.1)'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)'; } },
          onMouseLeave: (e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.15)'; },
        }, h(ArrowRight2, { size: 16 }))
      )
    );
  }

  const cardsContainerWidth = showCarousel && data.length > cardsPerView ? ((cardsPerView + 1) * 100 / cardsPerView) : 100;
  const singleCardWidth = showCarousel && data.length > cardsPerView ? (100 / (cardsPerView + 1)) : (100 / Math.min(cardsPerView, data.length));

  const slides = visibleCards.map((card, idx) => {
    return h('div', {
      key: 'card-' + currentIndex + '-' + idx + '-' + card.id,
      className: 'px-2',
      style: { width: singleCardWidth + '%' }
    },
      h('div', {
        className: 'relative overflow-hidden rounded-xl shadow-md group h-72 border border-[#DEDBC8]/5 hover:border-[#DEDBC8]/20 transition-colors duration-300'
      },
        h('div', { className: 'w-full h-full' },
          h('img', {
            src: card.imgUrl,
            alt: '',
            className: 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
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
    );
  });

  return h('div', { className: 'w-full px-2 sm:px-4' },
    h('div', { className: 'relative ' + (isSingleCard ? 'max-w-sm mx-auto' : 'w-full') },
      buttons,
      h('div', { className: 'overflow-hidden rounded-xl' },
        h('div', {
          ref: containerRef,
          className: 'flex',
          style: {
            transform: 'translateX(0)',
            width: cardsContainerWidth + '%'
          }
        }, slides)
      )
    )
  );
};

SJ.CarouselCard = Card;
})();


