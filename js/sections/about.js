const SJ = window.SJ;

SJ.AboutSection = function AboutSection() {
    return (
        <section id="about" className="bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6" aria-label="Hakkımızda">
            <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto text-center">
                <SJ.FadeUp delay={0}><span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 block">Geçmişin Mirası, Geleceğin İnancı</span></SJ.FadeUp>

                <h2 data-toc data-toc-title="Hikayemiz" data-toc-depth="1" id="about-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]" style={{ color:'#E1E0CC' }}>
                    <SJ.WordsPullUpMultiStyle segments={[
                        { text:'Serhat bölgesinin kalbinde, Ağrı Dağı\'nın gölgesinde köklü bir geçmişe ev sahipliği yapan Besler Köyü,', className:'' },
                        { text:'bilinen ve kadim adıyla Sîhana Jorin;', className:'italic font-serif' },
                        { text:'sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir.', className:'' }
                    ]} />
                </h2>

                <SJ.AnimatedText text="Sert kışlarına inat sıcak insan hikayeleriyle filizlenen köyümüz, geleneksel hayvancılık kültürüyle toprağına bağlı kalırken; metropollerden Avrupa'ya uzanan güçlü diasporasıyla da bağlarını asla koparmamıştır. Bugün Sîhana Jorin; geçmişin kültürel mirasını koruyan, genç nesillerin enerjisiyle geleceğe umutla bakan ve nerede olursak olalım hepimizi aynı samimiyette buluşturan ortak evimizdir."
                    className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-10 md:mt-14 leading-relaxed" />

                <div data-toc data-toc-title="Kültürel Mirasımız" data-toc-depth="2" id="about-heritage" className="mt-16 md:mt-20 max-w-2xl mx-auto text-left">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color:'#E1E0CC' }}>Kültürel Mirasımız</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Köyümüzün köklü gelenekleri, yöresel tatları, müziği ve el sanatları nesiller boyu aktarılan bir hazinedir. Bu mirası korumak ve yaşatmak hepimizin görevidir.</p>
                </div>

                <div data-toc data-toc-title="Dayanışma Ruhu" data-toc-depth="2" id="about-solidarity" className="mt-12 max-w-2xl mx-auto text-left">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4" style={{ color:'#E1E0CC' }}>Dayanışma Ruhu</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Sıhana Jorin Derneği olarak, köy halkının birlik ve beraberliğini güçlendirmek için durmaksızın çalışıyoruz. Acı gününde de, sevinçli gününde de yan yana yürüyoruz.</p>
                </div>
            </div>
        </section>
    );
};
