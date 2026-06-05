const SJ = window.SJ;
const { HeroSection, AboutSection, GallerySection, AnnouncementsSection, FeaturesSection, ContactSection, Footer, CookieBanner, DynamicIslandTOC } = SJ;

function App() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <GallerySection />
            <AnnouncementsSection />
            <FeaturesSection />
            <ContactSection />
            <Footer />
            <CookieBanner />
            <DynamicIslandTOC />
        </main>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
