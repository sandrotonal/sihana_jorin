const SJ = window.SJ;

SJ.ContactSection = function ContactSection() {
    const c = (SJ.SITE_DATA && SJ.SITE_DATA.contact) || {};
    return (
        <section id="contact" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="İletişim">
            <div data-toc data-toc-title="İletişim" data-toc-depth="1" id="contact-heading" className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <SJ.FadeUp delay={0}><span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 block">{c.badge || "Bize Ulaşın"}</span></SJ.FadeUp>
                        <SJ.FadeUp delay={0.1}><h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-8" style={{ color:'#E1E0CC' }}>{c.title || "Birlikte daha güçlüyüz"}</h2></SJ.FadeUp>
                        <SJ.FadeUp delay={0.2}><p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">{c.description || "Derneğimize katılmak, fikir paylaşmak veya herhangi bir konuda bizimle iletişime geçmek isterseniz, her zaman buradayız."}</p></SJ.FadeUp>

                        <SJ.FadeUp delay={0.3}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.MapPin size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>{c.address || "Sıhana Jorin Köyü, Merkez Mahallesi, No:1"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.Phone size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>{c.phone || "+90 (555) 123 4567"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <SJ.Mail size={18} className="text-[#DEDBC8] shrink-0" />
                                    <span>{c.email || "info@sihanajorin.org"}</span>
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
                            <button type="submit" className="wa-send-btn button-spring w-full">
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.356 1.449 5.405 0 9.803-4.394 9.806-9.8.003-5.396-4.39-9.789-9.801-9.789-5.403 0-9.799 4.393-9.802 9.8-.001 1.997.519 3.945 1.508 5.666l-.993 3.626 3.726-.952zm11.12-6.17c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.654.145-.193.29-.748.944-.917 1.138-.17.193-.338.217-.628.072-2.825-1.413-4.64-3.084-5.46-4.498-.218-.376-.023-.578.167-.768.171-.171.38-.444.57-.667.19-.22.254-.377.38-.628.127-.25.063-.467-.031-.661-.095-.193-.654-1.58-.895-2.16-.236-.57-.475-.492-.654-.501-.17-.008-.364-.01-.557-.01-.193 0-.507.072-.772.361-.266.29-1.014.992-1.014 2.417s1.04 2.796 1.185 2.99c.145.193 2.049 3.128 4.964 4.385.693.3 1.233.478 1.655.612.697.22 1.33.19 1.83.115.557-.08 1.72-.7 1.962-1.375.242-.676.242-1.255.17-1.375-.072-.12-.266-.19-.556-.335z"/></svg>
                                    </div>
                                </div>
                                <span>WhatsApp ile Gönder</span>
                            </button>
                        </form>
                    </SJ.FadeUp>
                </div>
            </div>
        </section>
    );
};
