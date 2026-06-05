const SJ = window.SJ;

SJ.Footer = function Footer() {
    const links = [
        { group:'Keşfet', items:[{label:'Hikayemiz',href:'hakkimizda.html'},{label:'Galeri',href:'galeri.html'},{label:'Duyurular',href:'duyurular.html'}] },
        { group:'Destek', items:[{label:'Bağış Yap',href:'bagis.html'},{label:'Gönüllü Ol',href:'gonullu.html'},{label:'İletişim',href:'iletisim.html'}] }
    ];

    return (
        <footer className="bg-[#050505] border-t border-[#DEDBC8]/5 pt-16 pb-8 px-4 md:px-6">
            <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-medium mb-3" style={{ color:'#E1E0CC' }}>Sıhana Jorin</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">Köyümüzün mirasını yaşatmak, geleceğini inşa etmek için bir aradayız.</p>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <SJ.Heart size={12} className="text-[#DEDBC8]" /> ile yapıldı
                        </div>
                    </div>

                    {links.map(group => (
                        <div key={group.group}>
                            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4">{group.group}</h4>
                            <ul className="space-y-2.5">
                                {group.items.map(item => (
                                    <li key={item.label}><a href={item.href} className="text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors">{item.label}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[#DEDBC8]/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Sıhana Jorin Köy Derneği. Tüm hakları saklıdır.</p>
                    <div style={{display:'none'}}></div>
                </div>
            </div>
        </footer>
    );
};
