const SJ = window.SJ;

SJ.FeaturesSection = function FeaturesSection() {
    return (
        <section id="features" className="min-h-screen bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6 relative" aria-label="Çalışmalarımız">
            <div className="bg-noise opacity-[0.15] absolute inset-0 z-0" aria-hidden="true"></div>
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 data-toc data-toc-title="Çalışmalarımız" data-toc-depth="1" id="features-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal" style={{ color:'#E1E0CC' }}>
                        <SJ.WordsPullUpMultiStyle segments={[{ text:'Köyümüz için güçlü bir gelecek inşa ediyoruz.', className:'' }]} />
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-3">
                        <SJ.WordsPullUpMultiStyle segments={[{ text:'Birlikten doğan güç. Gelenekten beslenen gelecek.', className:'' }]} />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
                    <SJ.CardEntrance delay={0} className="relative rounded-2xl overflow-hidden lg:h-[480px] min-h-[300px]">
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" aria-hidden="true">
                            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-sm sm:text-base font-medium" style={{ color:'#E1E0CC' }}>Köyümüzün güzellikleri</p></div>
                    </SJ.CardEntrance>

                    <SJ.CardEntrance delay={0.15} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                        <div data-toc data-toc-title="Kültürel Etkinlikler" data-toc-depth="2" id="feat-culture">
                            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Kültürel etkinlikler ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                            <div className="mb-4"><span className="text-gray-500 text-xs">(01)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color:'#E1E0CC' }}>Kültürel Etkinlikler</h3></div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {['Yıllık köy festivali ve şenlikleri','Geleneksel el sanatları atölyeleri','Yöresel müzik ve halk oyunları','Kültürel miras belgesel çalışmaları'].map((item,i) => (
                                <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                            ))}
                        </div>
                        <a href="#" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform:'rotate(-45deg)', display:'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                    </SJ.CardEntrance>

                    <SJ.CardEntrance delay={0.3} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                        <div data-toc data-toc-title="Dayanışma Ağı" data-toc-depth="2" id="feat-network">
                            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Dayanışma ağı ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                            <div className="mb-4"><span className="text-gray-500 text-xs">(02)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color:'#E1E0CC' }}>Dayanışma Ağı</h3></div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {['Dijital arşiv ve belge tarama sistemi','Köy hikayeleri ve anı derlemeleri','İletişim ağı ve yardımlaşma platformu'].map((item,i) => (
                                <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                            ))}
                        </div>
                        <a href="#" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform:'rotate(-45deg)', display:'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                    </SJ.CardEntrance>

                    <SJ.CardEntrance delay={0.45} className="feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col">
                        <div data-toc data-toc-title="Eğitim Destekleri" data-toc-depth="2" id="feat-education">
                            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Eğitim destekleri ikonu" className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" />
                            <div className="mb-4"><span className="text-gray-500 text-xs">(03)</span><h3 className="text-lg sm:text-xl font-medium mt-1" style={{ color:'#E1E0CC' }}>Eğitim Destekleri</h3></div>
                        </div>
                        <div className="flex-1 space-y-3">
                            {['Burs programları ve eğitim desteği','Gençlik kampları ve atölye çalışmaları','Program takvimi ve etkinlik senkronizasyonu'].map((item,i) => (
                                <div key={i} className="flex items-start gap-2"><SJ.Check size={16} className="text-primary mt-0.5 flex-shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                            ))}
                        </div>
                        <a href="#" className="learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4">Daha fazla<span className="learn-arrow" style={{ transform:'rotate(-45deg)', display:'inline-flex' }}><SJ.ArrowRight size={14} /></span></a>
                    </SJ.CardEntrance>
                </div>
            </div>
        </section>
    );
};
