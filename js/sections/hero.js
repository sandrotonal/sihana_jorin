const SJ = window.SJ;
const { useState } = React;

SJ.HeroSection = function HeroSection() {
    return (
        <section id="hero" className="h-screen p-4 md:p-6" aria-label="Ana bölüm">
            <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
                <video ref={el => { if (el) { el.muted = true; el.play().catch(e => console.log("Hero video autoplay failed", e)); } }} loop muted playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4" />
                </video>
                <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0 z-10" aria-hidden="true"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-20" aria-hidden="true"></div>

                <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-10 lg:p-14">
                    <div className="grid grid-cols-12 gap-4 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]" style={{ color: '#E1E0CC' }}>
                                <SJ.WordsPullUp text="Sıhana Jorin" showAsterisk={true} />
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pb-4">
                            <SJ.FadeUp delay={0.5}>
                                <p className="text-primary/70 text-xs sm:text-sm md:text-base mb-6" style={{ lineHeight: 1.2 }}>
                                    Sıhana Jorin Köy Derneği, köyümüzün zengin kültürel mirasını yaşatan, dayanışmayı güçlendiren ve gelecek nesillere aktaran bir birlik ruhudur.
                                </p>
                            </SJ.FadeUp>
                            <SJ.FadeUp delay={0.7}>
                                <a href="gonullu.html" className="inline-flex items-center gap-2 bg-primary rounded-full px-5 py-2.5 text-black font-medium text-sm sm:text-base group hover:gap-3 transition-all">
                                    Derneğe Katıl
                                    <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <SJ.ArrowRight size={18} className="text-[#E1E0CC]" />
                                    </span>
                                </a>
                            </SJ.FadeUp>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
