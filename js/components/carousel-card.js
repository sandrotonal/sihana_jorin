const SJ = window.SJ || {};
const { useState, useEffect, useRef } = React;

SJ.CarouselCard = function CarouselCard({ data, showCarousel = true }) {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    if (!data || data.length === 0) {
        return <div className="text-[#E1E0CC]/60 text-center py-12">Duyuru bulunamadı.</div>;
    }

    // Each card's width in percentage based on cardsPerView
    const cardWidth = 75 / cardsPerView;

    const nextSlide = () => {
        if (isAnimating || !showCarousel || data.length <= cardsPerView) return;

        setIsAnimating(true);
        const nextIndex = (currentIndex + 1) % data.length;

        if (containerRef.current) {
            containerRef.current.style.transition = "transform 500ms ease";
            containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

            setTimeout(() => {
                setCurrentIndex(nextIndex);
                if (containerRef.current) {
                    containerRef.current.style.transition = "none";
                    containerRef.current.style.transform = "translateX(0)";
                    // Force reflow
                    void containerRef.current.offsetWidth;
                }
                setIsAnimating(false);
            }, 500);
        }
    };

    const prevSlide = () => {
        if (isAnimating || !showCarousel || data.length <= cardsPerView) return;

        setIsAnimating(true);
        const prevIndex = (currentIndex - 1 + data.length) % data.length;

        if (containerRef.current) {
            containerRef.current.style.transition = "none";
            containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
            setCurrentIndex(prevIndex);

            // Force reflow
            void containerRef.current.offsetWidth;

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

    const getVisibleCards = () => {
        if (!showCarousel || data.length <= cardsPerView) return data;

        const visibleCards = [];
        const totalCards = data.length;

        for (let i = 0; i < cardsPerView + 1; i++) {
            const index = (currentIndex + i) % totalCards;
            visibleCards.push(data[index]);
        }

        return visibleCards;
    };

    return (
        <div className="w-full px-4">
            <div className={`relative ${data.length === 1 ? 'max-w-sm mx-auto' : 'w-full'}`}>
                {/* Carousel Controls */}
                {showCarousel && data.length > cardsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer"
                            disabled={isAnimating}
                            aria-label="Previous slide"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer"
                            disabled={isAnimating}
                            aria-label="Next slide"
                        >
                            &gt;
                        </button>
                    </>
                )}

                {/* Cards Container Wrapper - limits visible area */}
                <div className="overflow-hidden">
                    {/* Sliding Cards Container */}
                    <div
                        ref={containerRef}
                        className="flex"
                        style={{
                            transform: "translateX(0)",
                            width: showCarousel && data.length > cardsPerView ? `${((cardsPerView + 1) * 100) / cardsPerView}%` : '100%'
                        }}
                    >
                        {getVisibleCards().map((card, idx) => (
                            <div
                                key={`${card.id || idx}-${currentIndex}`}
                                style={{
                                    width: showCarousel && data.length > cardsPerView ? `${100 / (cardsPerView + 1)}%` : `${100 / Math.min(cardsPerView, data.length)}%`
                                }}
                                className="px-2"
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-md group h-96">
                                    {/* Image Section */}
                                    <div className="w-full h-full">
                                        <img
                                            src={card.imgUrl}
                                            alt={card.title || ''}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    {/* Info Overlay at the bottom when not hovered */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none">
                                        <span className="text-[10px] tracking-widest uppercase text-primary/70 block mb-1">{card.category} — {card.date}</span>
                                        <h3 className="text-base font-medium text-[#E1E0CC] line-clamp-1">{card.title}</h3>
                                    </div>

                                    {/* Hover Slide-up Details Panel */}
                                    <div className="absolute inset-0 bg-black/90 text-white p-6 flex flex-col justify-between transition-all duration-300 transform translate-y-full group-hover:translate-y-0 overflow-y-auto z-20">
                                        <div>
                                            <div className="flex items-center justify-between border-b border-[#DEDBC8]/10 pb-2 mb-3 text-xs text-[#DEDBC8]/60">
                                                <span>{card.category}</span>
                                                <span>{card.date}</span>
                                            </div>
                                            <h4 className="text-lg font-medium text-primary mb-3 leading-snug">{card.title}</h4>
                                            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{card.content}</p>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-4 text-right">
                                            Sıhana Jorin Köy Derneği
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
