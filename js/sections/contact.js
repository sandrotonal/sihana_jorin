const SJ = window.SJ;

SJ.ContactSection = function ContactSection() {
    return (
        <section id="contact" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="İletişim">
            <div data-toc data-toc-title="İletişim" data-toc-depth="1" id="contact-heading" className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <SJ.FadeUp delay={0}><span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 block">Bize Ulaşın</span></SJ.FadeUp>
                        <SJ.FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-8" style={{ color:'#E1E0CC' }}>Birlikte daha güçlüyüz</h2></SJ.FadeUp>
                        <SJ.FadeUp delay={0.2}><p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">Derneğimize katılmak, fikir paylaşmak veya herhangi bir konuda bizimle iletişime geçmek isterseniz, her zaman buradayız.</p></SJ.FadeUp>

                        <SJ.FadeUp delay={0.3}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.MapPin size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>Sıhana Jorin Köyü, Merkez Mahallesi, No:1</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.Phone size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>+90 (555) 123 4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.Mail size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>info@sihanajorin.org</span>
                                </div>
                            </div>
                        </SJ.FadeUp>
                    </div>

                    <SJ.FadeUp delay={0.2}>
                        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Ad Soyad</label>
                                <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">E-posta</label>
                                <input type="email" placeholder="ornek@email.com" className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Mesajınız</label>
                                <textarea rows={4} placeholder="Mesajınızı yazın..." className="w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors resize-none" />
                            </div>
                            <button type="submit" className="w-full bg-[#DEDBC8] text-black font-medium py-3 rounded-xl text-sm hover:bg-[#E8E5D4] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                Gönder <SJ.ArrowRight size={16} />
                            </button>
                        </form>
                    </SJ.FadeUp>
                </div>
            </div>
        </section>
    );
};
