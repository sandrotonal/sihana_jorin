/* ============================================================
   SIHANA JORIN — Shared Navigation + Footer (Tailwind Optimized)
   ============================================================ */
(function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const year = new Date().getFullYear();

    const NAV_LINKS = [
        { label: 'Ana Sayfa', href: 'index.html' },
        { label: 'Hikayemiz', href: 'hakkimizda.html' },
        { label: 'Galeri', href: 'galeri.html' },
        { label: 'Duyurular', href: 'duyurular.html' },
        { label: 'İletişim', href: 'iletisim.html' },
    ];
    const FOOTER_GROUPS = [
        { group: 'Keşfet', items: [{ label: 'Hikayemiz', href: 'hakkimizda.html' }, { label: 'Galeri', href: 'galeri.html' }, { label: 'Duyurular', href: 'duyurular.html' }] },
        { group: 'Destek', items: [{ label: 'Bağış Yap', href: 'bagis.html' }, { label: 'Gönüllü Ol', href: 'gonullu.html' }, { label: 'İletişim', href: 'iletisim.html' }] },
        { group: 'Sosyal Medya', items: [{ label: 'Instagram', href: 'https://instagram.com' }, { label: 'Facebook', href: 'https://facebook.com' }, { label: 'YouTube', href: 'https://youtube.com' }, { label: 'X', href: 'https://x.com' }] },
    ];

    function isActive(href) {
        const p = href.split('#')[0];
        return (page === p || (page === '' && p === 'index.html'));
    }

    document.addEventListener('DOMContentLoaded', function () {
        const nav = document.getElementById('site-nav');
        if (!nav) return;

        /* Skip sticky header on index.html (hero has its own nav) */
        if (page !== 'index.html' && page !== '') {
            /* Desktop nav — centered black pill with logo + links */
            const desktopNav = document.createElement('nav');
            desktopNav.className = 'fixed top-0 left-1/2 -translate-x-1/2 z-[190] bg-black/90 backdrop-blur-sm rounded-b-2xl md:rounded-b-3xl px-3 py-1.5 md:px-6 hidden md:block';
            desktopNav.setAttribute('aria-label', 'Ana navigasyon');
            desktopNav.innerHTML = `
                <div class="flex items-center gap-3 sm:gap-5 md:gap-10 lg:gap-12">
                    <a href="index.html" class="flex-shrink-0">
                        <img src="/logo.png" alt="Sıhana Jorin" class="h-7 md:h-8 w-auto" />
                    </a>
                    ${NAV_LINKS.map(l =>
                        `<a href="${l.href}" class="nav-link text-[10px] sm:text-xs md:text-sm transition-colors duration-300 hover:text-[#E1E0CC] ${isActive(l.href) ? 'text-[#E1E0CC] font-medium' : 'text-[#E1E0CC]/60'}">${l.label}</a>`
                    ).join('')}
                </div>
            `;
            nav.appendChild(desktopNav);

            /* Mobile header — logo left + hamburger right, no black bar */
            const mobileHeader = document.createElement('div');
            mobileHeader.className = 'fixed top-0 left-0 right-0 z-[190] flex items-center justify-between px-4 h-14 md:hidden';
            mobileHeader.innerHTML = `
                <a href="index.html" class="flex-shrink-0 leading-none">
                    <img src="/logo.png" alt="Sıhana Jorin" class="h-7 w-auto" />
                </a>
                <button id="site-menu-btn" aria-label="Menü" class="flex items-center justify-center w-9 h-9 rounded-full bg-black cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1E0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
                    </svg>
                </button>
            `;
            nav.appendChild(mobileHeader);

            /* Fullscreen drawer (matches hero SJ.HamburgerMenu) */
            const backdrop = document.createElement('div');
            backdrop.className = 'fixed inset-0 z-[200] bg-black/60 backdrop-blur-md transition-opacity duration-500 opacity-0 pointer-events-none';
            backdrop.id = 'drawer-backdrop';
            nav.appendChild(backdrop);

            const drawer = document.createElement('div');
            drawer.className = 'fixed inset-0 z-[210] bg-[#050505] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center opacity-0 pointer-events-none';
            drawer.id = 'drawer';
            drawer.setAttribute('aria-hidden', 'true');
            drawer.innerHTML = `
                <button class="absolute top-6 right-6 p-2 text-[#E1E0CC]/50 hover:text-[#E1E0CC] transition-colors cursor-pointer" id="drawer-close-btn" aria-label="Kapat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="flex flex-col items-center justify-center w-full p-8 text-center">
                    <img src="/logo.png" alt="Sıhana Jorin" class="h-10 w-auto mb-10" />
                    <nav class="flex flex-col gap-8 items-center mb-16" role="navigation" aria-label="Mobil menü">
                        ${NAV_LINKS.map((l, i) =>
                            `<a href="${l.href}" class="text-3xl sm:text-4xl font-medium text-[#E1E0CC]/60 hover:text-[#E1E0CC] transition-all duration-500 translate-y-[20px] opacity-0 ${isActive(l.href) ? 'font-serif italic text-[#E1E0CC]' : ''}" style="transition-delay:${0.1 + i * 0.05}s">${l.label}</a>`
                        ).join('')}
                    </nav>
                    <div class="flex items-center justify-center gap-2 text-[#DEDBC8]/40 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>Sıhana Jorin Köyü</span>
                    </div>
                </div>
            `;
            nav.appendChild(drawer);

            const closeBtn = document.getElementById('drawer-close-btn');

            function openDrawer() {
                drawer.classList.remove('opacity-0', 'pointer-events-none');
                drawer.classList.add('opacity-100', 'pointer-events-auto');
                drawer.querySelectorAll('nav a').forEach(a => {
                    a.classList.remove('opacity-0', 'translate-y-[20px]');
                    a.classList.add('opacity-100', 'translate-y-0');
                });
                backdrop.classList.remove('opacity-0', 'pointer-events-none');
                backdrop.classList.add('opacity-100', 'pointer-events-auto');
                document.body.style.overflow = 'hidden';
            }

            function closeDrawer() {
                drawer.classList.remove('opacity-100', 'pointer-events-auto');
                drawer.classList.add('opacity-0', 'pointer-events-none');
                drawer.querySelectorAll('nav a').forEach(a => {
                    a.classList.remove('opacity-100', 'translate-y-0');
                    a.classList.add('opacity-0', 'translate-y-[20px]');
                });
                backdrop.classList.remove('opacity-100', 'pointer-events-auto');
                backdrop.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            }

            document.getElementById('site-menu-btn').addEventListener('click', openDrawer);
            closeBtn.addEventListener('click', closeDrawer);
            backdrop.addEventListener('click', closeDrawer);
            drawer.querySelectorAll('nav a').forEach(function (a) {
                a.addEventListener('click', closeDrawer);
            });
        }

        /* ==================== FOOTER (skip on index.html — bundle.js handles it) ==================== */
        if (page !== 'index.html' && page !== '') {
            const footer = document.getElementById('site-footer');
            if (footer) {
                footer.innerHTML = `
                <footer class="bg-[#050505] border-t border-[#DEDBC8]/5 pt-16 pb-8 px-4 md:px-6">
                    <div class="max-w-[95%] xl:max-w-7xl mx-auto">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                            <div class="col-span-2 md:col-span-1">
                                <a href="index.html" class="inline-block mb-3">
                                    <img src="/logo.png" alt="Sıhana Jorin" class="h-8 w-auto" />
                                </a>
                                <p class="text-gray-500 text-sm leading-relaxed mb-4">Köyümüzün mirasını yaşatmak, geleceğini inşa etmek için bir aradayız.</p>
                                <div class="flex items-center gap-1 text-gray-500 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#DEDBC8]"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> ile yapıldı
                                </div>
                            </div>
                            ${FOOTER_GROUPS.map(g => `
                            <div>
                                <h4 class="text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4">${g.group}</h4>
                                <ul class="space-y-2.5">
                                    ${g.items.map(i => `
                                    <li><a href="${i.href}" class="text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors">${i.label}</a></li>
                                    `).join('')}
                                </ul>
                            </div>
                            `).join('')}
                        </div>
                        <div class="border-t border-[#DEDBC8]/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p class="text-gray-600 text-xs">&copy; ${year} Sıhana Jorin Köy Derneği. Tüm hakları saklıdır.</p>
                            <div class="flex items-center gap-3">
                                <a href="https://instagram.com" target="_blank" rel="noopener" style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(222,219,200,0.08); color:rgba(222,219,200,0.5); transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                                <a href="https://facebook.com" target="_blank" rel="noopener" style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(222,219,200,0.08); color:rgba(222,219,200,0.5); transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                                <a href="https://youtube.com" target="_blank" rel="noopener" style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(222,219,200,0.08); color:rgba(222,219,200,0.5); transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
                                <a href="https://x.com" target="_blank" rel="noopener" style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(222,219,200,0.08); color:rgba(222,219,200,0.5); transition:opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l6.25 8.5L4 20h2.5l5.5-7.25L17 20h5l-7-9.5L21 4h-2.5l-5.25 7L9 4H4z"/></svg></a>
                            </div>
                        </div>
                    </div>
                </footer>
                `;
            }
        }
    });
})();

