(function() {
const SJ = window.SJ || {};
const { useState, useEffect, useRef } = React;

const Card = function Card({ data, showCarousel = true }) {
  const h = React.createElement;
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

  // Calculate width percentage for each card based on cardsPerView (YAP.MD exact logic)
  const cardWidth = 75 / cardsPerView;

  const nextSlide = () => {
    if (isAnimating || !showCarousel || !data || data.length <= cardsPerView) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % data.length;

    if (containerRef.current) {
      // Apply slide out animation (YAP.MD exact logic)
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = "translateX(-" + cardWidth + "%)";

      // After animation completes, reset position and update index
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";

          // Force reflow
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
      // First move instantly to the right position
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = "translateX(-" + cardWidth + "%)";

      // Update the index immediately
      setCurrentIndex(prevIndex);

      // Force reflow
      void containerRef.current.offsetWidth;

      // Then animate back to center
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "transform 500ms ease";
          containerRef.current.style.transform = "translateX(0)";
        }
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 50);
    }
  };

  // Calculate which cards to show (YAP.MD exact logic)
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

  const buttons = [];
  if (showControls) {
    buttons.push(
      h('button', {
        key: 'prev',
        onClick: prevSlide,
        className: 'absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 border border-[#DEDBC8]/10 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 disabled:opacity-50 cursor-pointer',
        disabled: isAnimating,
        'aria-label': 'Previous slide'
      }, '<'),
      h('button', {
        key: 'next',
        onClick: nextSlide,
        className: 'absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-30 bg-black/60 border border-[#DEDBC8]/10 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 disabled:opacity-50 cursor-pointer',
        disabled: isAnimating,
        'aria-label': 'Next slide'
      }, '>')
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
        className: 'relative overflow-hidden rounded-lg shadow-md group h-72 border border-[#DEDBC8]/5 hover:border-[#DEDBC8]/20 transition-colors duration-300'
      },
        h('div', { className: 'w-full h-full' },
          h('img', {
            src: card.imgUrl,
            alt: '',
            className: 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          })
        ),
        h('div', {
          className: 'absolute inset-0 bg-black/80 text-white p-6 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 overflow-y-auto z-20 flex flex-col justify-start'
        },
          h('p', {
            className: 'text-sm',
            dangerouslySetInnerHTML: { __html: card.content }
          })
        )
      )
    );
  });

  return h('div', { className: 'w-full px-4' },
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
