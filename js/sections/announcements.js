const SJ = window.SJ;

SJ.AnnouncementsSection = function AnnouncementsSection() {
  const raw = (window.SJ.DUYURULAR_DATA || []);
  const announcements = raw.slice(0, 4).map(item => ({
    id: item.id,
    front: { title: item.title, description: item.summary },
    back: { description: item.description, buttonText: item.buttonText, href: item.buttonHref }
  }));

  return (
    <section id="announcements" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="Duyurular">
      <div className="w-full max-w-[95%] xl:max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SJ.FadeUp delay={0}>
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">Duyurular</span>
          </SJ.FadeUp>
          <SJ.FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-medium" style={{ color: '#E1E0CC' }}>Köyümüzden Haberler</h2>
          </SJ.FadeUp>
        </div>
        <div className={announcements.length === 1 ? "flex justify-center items-center py-4 w-full" : "flex md:flex-wrap justify-start md:justify-center gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-none"}>
          {announcements.map((a) => (
            <div key={a.id} className="snap-start shrink-0">
              <SJ.FlippingCard width={270} height={300}
                frontContent={<AnnouncementFront data={a.front} />}
                backContent={<AnnouncementBack data={a.back} />}
              />
            </div>
          ))}
        </div>
        <SJ.FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <a href="duyurular.html" className="inline-flex items-center gap-2 text-sm text-[#DEDBC8]/50 hover:text-[#DEDBC8] transition-colors">
              Tüm duyuruları gör <SJ.ArrowRight size={14} />
            </a>
          </div>
        </SJ.FadeUp>
      </div>
    </section>
  );
};

function AnnouncementFront({ data }) {
  return (
    <div className="flex flex-col h-full w-full p-3 md:p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center">
          <SJ.Bell size={22} className="text-[#DEDBC8] md:w-7 md:h-7" />
        </div>
      </div>
      <div className="p-1 md:p-2">
        <h3 className="text-sm md:text-base font-semibold mt-1 md:mt-2" style={{ color: '#E1E0CC' }}>{data.title}</h3>
        <p className="text-xs md:text-[13.5px] mt-1 md:mt-2 text-gray-400">{data.description}</p>
      </div>
    </div>
  );
}

function AnnouncementBack({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <p className="text-[13.5px] text-gray-400 text-center">{data.description}</p>
      <a href={data.href || 'duyurular.html'} className="mt-6 bg-[#DEDBC8] text-black px-4 py-2 rounded-full text-[13.5px] font-medium hover:bg-[#E8E5D4] transition-colors active:scale-95 inline-block text-center">
        {data.buttonText}
      </a>
    </div>
  );
}
