const SJ = window.SJ;
const { useState } = React;

SJ.HeroSection = function HeroSection() {
    return (
        <section id="hero" className="h-screen p-4 md:p-6" aria-label="Ana bölüm">
            <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
                <video 
                    ref={el => { 
                        if (el) { 
                            el.muted = true; 
                            el.load();
                            el.play().catch(e => console.log("Hero video autoplay failed", e)); 
                        } 
                    }} 
                    loop 
                    muted 
                    playsInline 
                    autoPlay
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover" 
                    aria-hidden="true"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23000000' width='1920' height='1080'/%3E%3C/svg%3E">
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
                                <p className="text-xs sm:text-sm md:text-base mb-5" style={{ lineHeight: 1.35, color: 'rgba(222,219,200,0.7)' }}>
                                    Besler Köyü, kadim adıyla Sîhana Jorin; sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir. Doğubayazıt'ın güneyinde, nesiller boyu aktarılan güçlü bir aidiyetin sembolüdür.
                                </p>
                            </SJ.FadeUp>
                            <SJ.FadeUp delay={0.7}>
                                <a href="gonullu.html"
                                    className="group inline-flex items-center gap-3 transition-all duration-300 hover:gap-4"
                                    style={{
                                        background: '#DEDBC8',
                                        color: '#000',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                        borderRadius: '9999px',
                                        padding: '10px 10px 10px 20px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
                                    }}>
                                    Derneğe Katıl
                                    <span style={{
                                        background: '#000',
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.3s ease',
                                        flexShrink: 0,
                                    }} className="group-hover:scale-110">
                                        <SJ.ArrowRight size={16} className="text-[#E1E0CC]" />
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

