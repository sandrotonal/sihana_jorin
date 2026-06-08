const SJ = window.SJ;

SJ.AboutSection = function AboutSection() {
  const a = (SJ.SITE_DATA && SJ.SITE_DATA.about) || {};
  return (
    <section id="about" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="Hakkımızda">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto text-center">
        <SJ.FadeUp delay={0}><span className="text-primary text-xs tracking-widest uppercase mb-8 block">{a.badge || "Geçmişin Mirası, Geleceğin İnancı"}</span></SJ.FadeUp>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]" style={{ color: '#E1E0CC' }}>
          <SJ.WordsPullUpMultiStyle segments={[
            { text: a.title || "Serhat bölgesinin kalbinde...", className: '' },
            { text: 'bilinen ve kadim adıyla Sîhana Jorin;', className: 'italic font-serif' },
            { text: 'sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir.', className: '' }
          ]} />
        </h2>
        <SJ.AnimatedText text={a.animatedText || ""} className="text-[#DEDBC8] text-sm md:text-base max-w-2xl mx-auto mt-10 md:mt-14 leading-relaxed" />
        <div id="about-heritage" className="mt-16 md:mt-20 max-w-2xl mx-auto text-left">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color: '#E1E0CC' }}>{a.heritageTitle || "Kültürel Mirasımız"}</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{a.heritageText || ""}</p>
        </div>
        <div id="about-solidarity" className="mt-12 max-w-2xl mx-auto text-left">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color: '#E1E0CC' }}>{a.solidarityTitle || "Dayanışma Ruhu"}</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{a.solidarityText || ""}</p>
        </div>
      </div>
    </section>
  );
};
