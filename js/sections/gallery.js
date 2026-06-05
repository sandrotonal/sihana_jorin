const SJ = window.SJ;

SJ.GallerySection = function GallerySection() {
    return (
        <section id="gallery" className="bg-black relative" aria-label="Galeri">
            <div data-toc data-toc-title="Galeri" data-toc-depth="1" id="gallery-heading" className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                <SJ.FadeUp delay={0}>
                    <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#DEDBC8]/10">Fotoğraf Galerisi</span>
                </SJ.FadeUp>
            </div>
            <SJ.InfiniteSlider />
        </section>
    );
};
