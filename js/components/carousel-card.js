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
    const cardWidth = 100 / cardsPerView;

    const nextSlide = () => {
        if (isAnimating || !showCarousel || data.length <= cardsPerView) return;

        setIsAnimating(true);
        const nextIndex = (currentIndex + 1) % data.length;

        if (containerRef.current) {
            containerRef.current.style.transition = "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";
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
                    containerRef.current.style.transition = "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";
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
        <div className="w-full relative px-4 sm:px-12 md:px-16">
            <div className="relative overflow-hidden w-full py-4">
                {/* Carousel Controls */}
                {showCarousel && data.length > cardsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 border border-[#DEDBC8]/10 text-[#E1E0CC] w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/90 hover:border-[#DEDBC8]/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            disabled={isAnimating}
                            aria-label="Önceki duyuru"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 border border-[#DEDBC8]/10 text-[#E1E0CC] w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/90 hover:border-[#DEDBC8]/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            disabled={isAnimating}
                            aria-label="Sonraki duyuru"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </>
                )}

                {/* Cards Container Wrapper */}
                <div className="overflow-hidden rounded-2xl">
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
                                className="px-2 sm:px-3"
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-[#DEDBC8]/5 bg-[#121212] group h-[400px] flex flex-col transition-all duration-300 hover:border-[#DEDBC8]/20 hover:shadow-2xl">
                                    {/* Image Section */}
                                    <div className="w-full h-56 overflow-hidden relative">
                                        <img
                                            src={card.imgUrl}
                                            alt={card.title || 'Duyuru Görseli'}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#DEDBC8]/10 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase text-[#DEDBC8]">
                                            {card.date}
                                        </div>
                                    </div>

                                    {/* Text Info Section */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] tracking-widest uppercase text-primary/40 block mb-2">{card.category}</span>
                                            <h3 className="text-lg font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300" style={{ color: '#E1E0CC' }}>
                                                {card.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-primary text-xs font-medium mt-4 cursor-pointer group/btn">
                                            Detayları Gör 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </div>
                                    </div>

                                    {/* Hover Slide-up Details Panel */}
                                    <div className="absolute inset-0 bg-black/95 text-[#E1E0CC] p-6 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-full group-hover:translate-y-0 z-10 overflow-y-auto">
                                        <div>
                                            <div className="flex items-center justify-between border-b border-[#DEDBC8]/10 pb-3 mb-4">
                                                <span className="text-[10px] tracking-widest uppercase text-primary">{card.category}</span>
                                                <span className="text-[10px] text-gray-500">{card.date}</span>
                                            </div>
                                            <h4 className="text-xl font-medium mb-3 text-primary leading-snug">{card.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{card.content}</p>
                                        </div>
                                        <div className="border-t border-[#DEDBC8]/10 pt-4 mt-6 flex justify-between items-center text-xs text-gray-500">
                                            <span>Sıhana Jorin Köy Derneği</span>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
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
