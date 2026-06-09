/* ─── Sıhana Jorin Admin Panel ─── */
(function () {
    "use strict";

    const APP = {
        currentTab: 'announcements',
        authenticated: false,
        data: { announcements: [], slider: [], gallery: [], site: {} },
        editingItem: null,
        searchQuery: '',
        loading: false,
        lastSync: null,
        selectedIds: new Set()
    };

    const PASSWORD_KEY = 'sj_admin_pass';

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'h' + Math.abs(hash).toString(36);
    }

    function generateId(str) {
        return str.toLowerCase().replace(/ç/g,'c').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ş/g,'s').replace(/ü/g,'u').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'item-' + Date.now();
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function escapeJs(str) {
        if (!str) return '';
        return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    }

    /* ─── API ─── */
    const API = {
        async request(method, url, body) {
            try {
                const opts = { method, headers: {} };
                if (body && !(body instanceof FormData)) {
                    opts.headers['Content-Type'] = 'application/json';
                    opts.body = JSON.stringify(body);
                } else if (body instanceof FormData) {
                    opts.body = body;
                }
                const res = await fetch(url, opts);
                if (!res.ok) {
                    const err = await res.json().catch(() => ({ error: 'Istek basarisiz' }));
                    throw new Error(err.error || `HTTP ${res.status}`);
                }
                return await res.json();
            } catch (err) {
                if (err.message === 'Failed to fetch') throw new Error('Sunucuya baglanilamadi');
                throw err;
            }
        },

        getAnnouncements() { return this.request('GET', '/api/announcements'); },
        addAnnouncement(item) { return this.request('POST', '/api/announcements', item); },
        updateAnnouncement(id, item) { return this.request('PUT', `/api/announcements/${id}`, item); },
        deleteAnnouncement(id) { return this.request('DELETE', `/api/announcements/${id}`); },
        reorderAnnouncements(fromIndex, toIndex) { return this.request('PATCH', '/api/announcements/reorder', { fromIndex, toIndex }); },

        getSlider() { return this.request('GET', '/api/slider'); },
        addSlider(item) { return this.request('POST', '/api/slider', item); },
        updateSlider(index, item) { return this.request('PUT', `/api/slider/${index}`, item); },
        deleteSlider(index) { return this.request('DELETE', `/api/slider/${index}`); },
        reorderSlider(fromIndex, toIndex) { return this.request('PATCH', '/api/slider/reorder', { fromIndex, toIndex }); },

        getGallery() { return this.request('GET', '/api/gallery'); },
        addGallery(item) { return this.request('POST', '/api/gallery', item); },
        deleteGallery(index) { return this.request('DELETE', `/api/gallery/${index}`); },

        getSite() { return this.request('GET', '/api/site'); },
        updateSite(data) { return this.request('PUT', '/api/site', data); },

        uploadFile(file, subdir) {
            const fd = new FormData();
            if (subdir) fd.append('subdir', subdir);
            fd.append('file', file);
            return this.request('POST', '/api/upload', fd);
        },
        getUploads() { return this.request('GET', '/api/uploads'); },
        gitSync() { return this.request('POST', '/api/git-sync'); }
    };

    /* ─── Password ─── */
    function getPassword() { return localStorage.getItem(PASSWORD_KEY); }
    function setPassword(pass) { localStorage.setItem(PASSWORD_KEY, simpleHash(pass)); }
    function checkPassword(pass) { return simpleHash(pass) === getPassword(); }

    /* ─── Data loading ─── */
    async function loadAllData() {
        APP.loading = true;
        showLoading(true);
        try {
            const [announcements, slider, gallery, site] = await Promise.all([
                API.getAnnouncements(), API.getSlider(), API.getGallery(), API.getSite()
            ]);
            APP.data.announcements = announcements;
            APP.data.slider = slider;
            APP.data.gallery = gallery;
            APP.data.site = site;
            APP.lastSync = new Date();
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            APP.loading = false;
            showLoading(false);
        }
    }

    /* ─── Toast ─── */
    function toast(message, type) {
        const container = $('#toast-container');
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'toast ' + (type || '');
        el.textContent = message;
        container.appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 3000);
    }

    /* ─── Loading overlay ─── */
    function showLoading(show) {
        let overlay = $('#loading-overlay');
        if (show) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'loading-overlay';
                overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
                overlay.innerHTML = '<div style="background:#1a1a1a;padding:1.5rem 2rem;border-radius:10px;border:1px solid #2a2a2a;color:#DEDBC8;font-size:0.9rem">Yukleniyor...</div>';
                document.body.appendChild(overlay);
            }
            overlay.style.display = 'flex';
        } else {
            if (overlay) overlay.style.display = 'none';
        }
    }

    /* ─── Image upload helper ─── */
    function createUploadButton(inputEl, subdir) {
        const wrap = inputEl.parentNode;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline btn-sm';
        btn.textContent = 'Yukle';
        btn.style.cssText = 'font-size:0.7rem;padding:0.3rem 0.6rem;flex-shrink:0';
        wrap.style.display = 'flex';
        wrap.style.gap = '0.35rem';
        wrap.style.alignItems = 'center';
        wrap.appendChild(btn);
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,video/mp4,video/webm';
        fileInput.style.display = 'none';
        wrap.appendChild(fileInput);
        btn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file) return;
            btn.textContent = '...';
            btn.disabled = true;
            try {
                const result = await API.uploadFile(file, subdir);
                inputEl.value = result.url;
                toast('Yuklendi: ' + result.filename);
            } catch (err) {
                toast(err.message, 'error');
            } finally {
                btn.textContent = 'Yukle';
                btn.disabled = false;
                fileInput.value = '';
            }
        });

        const galBtn = document.createElement('button');
        galBtn.type = 'button';
        galBtn.className = 'btn btn-outline btn-sm';
        galBtn.textContent = 'Galeri';
        galBtn.style.cssText = 'font-size:0.7rem;padding:0.3rem 0.6rem;flex-shrink:0';
        galBtn.addEventListener('click', () => openMediaPicker(inputEl));
        wrap.appendChild(galBtn);
    }

    /* ─── Media Picker ─── */
    let allUploads = [];
    async function openMediaPicker(inputEl) {
        if (allUploads.length === 0) {
            try { allUploads = await API.getUploads(); } catch { toast('Gorseller yuklenemedi', 'error'); return; }
        }
        const overlay = $('#modal-overlay');
        const content = $('#modal-content');
        content.innerHTML = `
            <div class="modal-header">
                <h2>Gorsel Sec</h2>
                <button class="modal-close" onclick="SJ_ADMIN.closeModal()">X</button>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:0.5rem;padding:0.5rem 0">
                ${allUploads.length === 0 ? '<p style="grid-column:1/-1;color:var(--text3);text-align:center">Henuz yuklenmis gorsel yok</p>' : allUploads.map(f => `
                    <div class="media-item" data-url="${f.url}" style="cursor:pointer;border:2px solid transparent;border-radius:8px;overflow:hidden;aspect-ratio:1;background:var(--bg3);transition:border-color 0.2s">
                        <img src="${f.url}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'" />
                    </div>
                `).join('')}
            </div>
        `;
        overlay.classList.add('open');
        $$('.media-item', content).forEach(el => {
            el.addEventListener('click', () => {
                inputEl.value = el.dataset.url;
                closeModal();
                toast('Gorsel secildi');
            });
        });
    }

    /* ─── Render ─── */
    function render() {
        const root = $('#app-root');
        if (!APP.authenticated) {
            root.innerHTML = renderLogin();
            bindLogin();
            return;
        }
        root.innerHTML = renderApp();
        bindApp();
    }

    /* ─── Login ─── */
    function renderLogin() {
        const hasPass = !!getPassword();
        return `
            <div class="login-screen">
                <div class="login-box">
                    <h1>Admin Paneli</h1>
                    <p>Sihana Jorin — Icerik Yonetimi</p>
                    <form id="login-form">
                        <input type="password" id="login-pass" placeholder="${hasPass ? 'Sifrenizi girin' : 'Yeni sifre belirleyin'}" autofocus />
                        <div class="error-msg" id="login-error">${hasPass ? 'Hatali sifre' : ''}</div>
                        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:0.75rem">${hasPass ? 'Giris Yap' : 'Sifre Belirle & Giris Yap'}</button>
                    </form>
                </div>
            </div>
        `;
    }

    function bindLogin() {
        const form = $('#login-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = $('#login-pass');
            const error = $('#login-error');
            const pass = input.value.trim();
            if (!pass) return;
            const hasPass = !!getPassword();
            if (hasPass) {
                if (checkPassword(pass)) {
                    APP.authenticated = true;
                    render();
                    setTimeout(loadAllData, 50);
                } else {
                    error.classList.add('show');
                    input.value = '';
                    input.focus();
                }
            } else {
                setPassword(pass);
                APP.authenticated = true;
                render();
                setTimeout(loadAllData, 50);
            }
        });
    }

    /* ─── Main App ─── */
    function renderApp() {
        const tabs = [
            { id: 'announcements', label: 'Duyurular' },
            { id: 'slider', label: 'Slider' },
            { id: 'gallery', label: 'Galeri' },
            { id: 'site', label: 'Site Icerigi' }
        ];
        return `
            <div class="app-container">
                <header class="admin-header">
                    <div>
                        <h1>Sihana Jorin — Yonetim Paneli</h1>
                        <div class="subtitle" id="stats-line">Yukleniyor...</div>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-outline btn-sm" onclick="SJ_ADMIN.gitSync()" title="Degisiklikleri Git e kaydet" id="git-sync-btn">Git e Kaydet</button>
                        <button class="btn btn-outline btn-sm" onclick="SJ_ADMIN.refresh()" title="Verileri yenile">Yenile</button>
                        <button class="btn btn-outline btn-sm" onclick="SJ_ADMIN.logout()">Cikis</button>
                    </div>
                </header>
                <div class="tabs" id="tabs">
                    ${tabs.map(t => `
                        <button class="tab ${APP.currentTab === t.id ? 'active' : ''}" data-tab="${t.id}">
                            ${t.label}
                            <span class="count">${APP.data[t.id]?.length || (t.id === 'site' ? '' : '0')}</span>
                        </button>
                    `).join('')}
                </div>
                <div id="tab-content"></div>
                <div id="toast-container" class="toast-container"></div>
            </div>
            <div class="modal-overlay" id="modal-overlay">
                <div class="modal" id="modal-content"></div>
            </div>
        `;
    }

    function bindApp() {
        bindTabs();
        renderTabContent();
        bindModal();
        updateHeaderStats();
    }

    function bindTabs() {
        $$('.tab').forEach(btn => {
            btn.addEventListener('click', function () {
                APP.currentTab = this.dataset.tab;
                APP.searchQuery = '';
                render();
                setTimeout(loadAllData, 50);
            });
        });
    }

    /* ─── Tab Content Router ─── */
    function renderTabContent() {
        const container = $('#tab-content');
        if (!container) return;

        if (APP.currentTab === 'site') {
            renderSiteContent();
            return;
        }
        if (APP.currentTab === 'gallery') {
            renderGalleryContent();
            return;
        }

        const data = APP.data[APP.currentTab] || [];
        const config = LIST_CONFIGS[APP.currentTab];
        if (!config) return;
        const filtered = filterData(data);

        container.innerHTML = `
            <div class="toolbar">
                <div class="toolbar-left">
                    <div class="search-box">
                        <input type="text" placeholder="Ara..." id="search-input" value="${APP.searchQuery}" />
                    </div>
                    <span style="color:var(--text3);font-size:0.8rem">${filtered.length} oge</span>
                </div>
                <div class="toolbar-right">
                    <button class="btn btn-primary btn-sm" onclick="SJ_ADMIN.addItem('${APP.currentTab}')">+ Yeni ${config.label}</button>
                </div>
            </div>
            ${filtered.length === 0 ? renderEmpty(config) : renderList(filtered, config)}
        `;

        const searchInput = $('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                APP.searchQuery = this.value;
                renderTabContent();
            });
        }
    }

    const LIST_CONFIGS = {
        announcements: {
            label: 'Duyuru',
            fields: [
                { key: 'title', label: 'Baslik', type: 'text', required: true },
                { key: 'summary', label: 'Ozet', type: 'text', required: true },
                { key: 'description', label: 'Aciklama', type: 'textarea', required: true },
                { key: 'category', label: 'Kategori', type: 'select', options: ['Etkinlik', 'Altyapi', 'Topluluk', 'Kultur', 'Egitim', 'Tanim', 'Saglik'], required: true },
                { key: 'subCategory', label: 'Alt Kategori', type: 'select', options: ['Duyuru', 'Calisma', 'Uyelik', 'Sanat', 'Atolye', 'Proje'], required: true },
                { key: 'date', label: 'Tarih', type: 'text', required: true, placeholder: 'orn: Agustos 2026' },
                { key: 'imgUrl', label: 'Gorsel URL', type: 'text', placeholder: 'https://...' },
                { key: 'buttonText', label: 'Buton Yazisi', type: 'text', required: true },
                { key: 'buttonHref', label: 'Buton Linki', type: 'select', options: ['duyurular.html', 'gonullu.html', 'iletisim.html', 'bagis.html'] }
            ],
            cardFields: ['title', 'category', 'date']
        },
        slider: {
            label: 'Slider',
            fields: [
                { key: 'title', label: 'Baslik', type: 'text', required: true },
                { key: 'description', label: 'Aciklama', type: 'text', required: true },
                { key: 'category', label: 'Kategori', type: 'select', options: ['Kulturel Etkinlik', 'Atolye Calismasi', 'Doga Aktivitesi', 'Tarim Projesi', 'Topluluk Bulusmasi'], required: true },
                { key: 'year', label: 'Yil', type: 'text', required: true, placeholder: 'orn: 2024' },
                { key: 'image', label: 'Gorsel URL', type: 'text', required: true, placeholder: 'https://...' }
            ],
            cardFields: ['title', 'category', 'year']
        }
    };

    function filterData(data) {
        if (!APP.searchQuery.trim()) return data;
        const q = APP.searchQuery.toLowerCase();
        return data.filter(item => Object.values(item).some(v => String(v).toLowerCase().includes(q)));
    }

    function renderEmpty(config) {
        return `<div class="empty-state"><p>Henuz ${config.label.toLowerCase()} bulunmuyor</p><button class="btn btn-primary" onclick="SJ_ADMIN.addItem('${APP.currentTab}')">Ilk ${config.label} Ekle</button></div>`;
    }

    function renderList(data, config) {
        return `<div class="card-list">${data.map((item, index) => renderCard(item, index, data.length, config)).join('')}</div>`;
    }

    function renderCard(item, index, total, config) {
        const isSlider = config.label === 'Slider';
        const imgUrl = isSlider ? item.image : item.imgUrl;
        return `
            <div class="card">
                ${imgUrl ? `<img class="card-img" src="${imgUrl}" alt="${item.title}" onerror="this.style.display='none'" />` : ''}
                <div class="card-body">
                    <div class="card-title">${escapeHtml(item.title) || '(basliksiz)'}</div>
                    <div class="card-meta">
                        ${config.cardFields.filter(f => item[f]).map(f => `<span>${escapeHtml(item[f])}</span>`).join('')}
                    </div>
                </div>
                <div class="card-actions">
                    ${index > 0 ? `<button class="btn-icon" onclick="SJ_ADMIN.moveItem('${APP.currentTab}',${index},-1)" title="Yukari">↑</button>` : ''}
                    ${index < total - 1 ? `<button class="btn-icon" onclick="SJ_ADMIN.moveItem('${APP.currentTab}',${index},1)" title="Asagi">↓</button>` : ''}
                    <button class="btn-icon" onclick="SJ_ADMIN.editItem('${APP.currentTab}',${index})" title="Duzenle">D</button>
                    <button class="btn-icon danger" onclick="SJ_ADMIN.deleteItem('${APP.currentTab}',${index},'${escapeJs(item.title)}')" title="Sil">X</button>
                </div>
            </div>
        `;
    }

    /* ─── CRUD ─── */
    function addItem(tab) { APP.editingItem = null; openFormModal(tab); }

    function editItem(tab, index) {
        APP.editingItem = { ...APP.data[tab][index], _index: index };
        openFormModal(tab);
    }

    async function deleteItem(tab, index, title) {
        if (!confirm(`"${title}" silinecek. Emin misiniz?`)) return;
        try {
            showLoading(true);
            if (tab === 'announcements') await API.deleteAnnouncement(APP.data[tab][index].id);
            else await API['delete' + capitalize(tab)](index);
            await loadAllData();
            renderTabContent();
            updateHeaderStats();
            toast('Silindi');
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

    async function moveItem(tab, index, direction) {
        const target = index + direction;
        if (target < 0) return;
        try {
            showLoading(true);
            if (tab === 'announcements') await API.reorderAnnouncements(index, target);
            else if (tab === 'slider') await API.reorderSlider(index, target);
            await loadAllData();
            renderTabContent();
            updateHeaderStats();
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    /* ─── Form Modal ─── */
    function openFormModal(tab) {
        const config = LIST_CONFIGS[tab];
        const item = APP.editingItem || {};
        const isEdit = !!APP.editingItem;
        const overlay = $('#modal-overlay');
        const content = $('#modal-content');
        const isSlider = tab === 'slider';

        content.innerHTML = `
            <div class="modal-header">
                <h2>${isEdit ? 'Duzenle' : 'Yeni'} ${config.label}</h2>
                <button class="modal-close" onclick="SJ_ADMIN.closeModal()">X</button>
            </div>
            <form id="item-form">
                ${config.fields.map(f => {
                    const val = item[f.key] || '';
                    const required = f.required ? 'required' : '';
                    const placeholder = f.placeholder || '';
                    if (f.type === 'textarea') {
                        return `<div class="form-group"><label>${f.label} ${required ? '*' : ''}</label><textarea name="${f.key}" ${required} placeholder="${placeholder}">${escapeHtml(val)}</textarea></div>`;
                    } else if (f.type === 'select') {
                        return `<div class="form-group"><label>${f.label} ${required ? '*' : ''}</label><select name="${f.key}" ${required}><option value="">Seciniz...</option>${f.options.map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}</select></div>`;
                    } else {
                        const isUrl = f.key === 'imgUrl' || f.key === 'image';
                        return `<div class="form-group"><label>${f.label} ${required ? '*' : ''}</label><div class="url-input-wrap" style="display:flex;gap:0.35rem;align-items:center"><input type="text" name="${f.key}" value="${escapeHtml(val)}" ${required} placeholder="${placeholder}" style="flex:1" />${isUrl ? `<button type="button" class="btn btn-outline btn-sm upload-btn" style="font-size:0.7rem;padding:0.3rem 0.6rem;flex-shrink:0">Yukle</button>` : ''}</div></div>`;
                    }
                }).join('')}
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="SJ_ADMIN.closeModal()">Iptal</button>
                    <button type="submit" class="btn btn-primary">${isEdit ? 'Kaydet' : 'Ekle'}</button>
                </div>
            </form>
        `;

        overlay.classList.add('open');
        const form = $('#item-form');
        form.addEventListener('submit', function (e) { e.preventDefault(); saveForm(tab); });
        form.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); form.requestSubmit(); } });

        // Upload buttons
        $$('.upload-btn', content).forEach(btn => {
            const wrap = btn.parentNode;
            const input = wrap.querySelector('input');
            createUploadButton(input, tab);
            btn.remove();
        });
    }

    async function saveForm(tab) {
        const form = $('#item-form');
        if (!form) return;
        const config = LIST_CONFIGS[tab];
        const fd = new FormData(form);
        const item = {};
        let valid = true;
        config.fields.forEach(f => {
            const val = fd.get(f.key) || '';
            item[f.key] = val;
            const el = form.querySelector(`[name="${f.key}"]`);
            if (f.required && !val.trim()) {
                if (el) el.style.borderColor = 'var(--danger)';
                valid = false;
            } else if (el) el.style.borderColor = '';
        });
        if (!valid) { toast('Lutfen zorunlu alanlari doldurun', 'error'); return; }

        try {
            showLoading(true);
            if (APP.editingItem && APP.editingItem._index !== undefined) {
                if (tab === 'announcements') await API.updateAnnouncement(APP.editingItem.id, item);
                else if (tab === 'slider') await API.updateSlider(APP.editingItem._index, item);
                toast('Guncellendi');
            } else {
                if (tab === 'announcements') { item.id = generateId(item.title || 'unnamed'); await API.addAnnouncement(item); }
                else if (tab === 'slider') await API.addSlider(item);
                toast('Eklendi');
            }
            APP.editingItem = null;
            closeModal();
            await loadAllData();
            renderTabContent();
            updateHeaderStats();
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    function closeModal() {
        const overlay = $('#modal-overlay');
        overlay.classList.remove('open');
        APP.editingItem = null;
    }

    function bindModal() {
        const overlay = $('#modal-overlay');
        if (overlay) overlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    }

    /* ─── Gallery Tab ─── */
    function renderGalleryContent() {
        const container = $('#tab-content');
        if (!container) return;
        const data = APP.data.gallery || [];
        const filtered = filterData(data);
        APP.selectedIds = new Set();

        container.innerHTML = `
            <div class="toolbar">
                <div class="toolbar-left">
                    <span style="color:var(--text3);font-size:0.8rem">${filtered.length} oge</span>
                    <button class="btn btn-danger btn-sm" id="gallery-delete-selected" style="display:none;font-size:0.7rem;padding:0.3rem 0.6rem" onclick="SJ_ADMIN.deleteSelectedGallery()">Secilenleri Sil</button>
                </div>
                <div class="toolbar-right">
                    <button class="btn btn-primary btn-sm" onclick="SJ_ADMIN.openGalleryUpload()">+ Gorsel Ekle</button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.75rem">
                ${filtered.length === 0
                    ? '<div class="empty-state" style="grid-column:1/-1"><p>Henuz gorsel bulunmuyor</p></div>'
                    : filtered.map((item, i) => `
                        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden">
                            <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--bg3)">
                                <input type="checkbox" data-index="${i}" class="gallery-select" style="position:absolute;top:0.4rem;left:0.4rem;z-index:2;width:1.1rem;height:1.1rem;cursor:pointer;accent-color:var(--primary)" />
                                ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.title)}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'" />` : '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:0.8rem">Gorsel yok</div>'}
                            </div>
                            <div style="padding:0.6rem 0.75rem">
                                <div style="font-size:0.85rem;font-weight:500;color:var(--primary);margin-bottom:0.2rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(item.title)}</div>
                                ${item.description ? `<div style="font-size:0.7rem;color:var(--text3);margin-bottom:0.2rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(item.description)}</div>` : ''}
                                ${item.category ? `<div style="font-size:0.7rem;color:var(--text3)">${escapeHtml(item.category)}${item.year ? ' · ' + escapeHtml(item.year) : ''}</div>` : ''}
                                <button class="btn btn-danger btn-sm" style="margin-top:0.5rem;width:100%;justify-content:center" onclick="SJ_ADMIN.deleteItem('gallery',${i},'${escapeJs(item.title)}')">Sil</button>
                            </div>
                        </div>
                    `).join('')}
            </div>
        `;

        $$('.gallery-select', container).forEach(cb => {
            cb.addEventListener('change', function () {
                const idx = parseInt(this.dataset.index);
                if (this.checked) APP.selectedIds.add(idx);
                else APP.selectedIds.delete(idx);
                const btn = $('#gallery-delete-selected');
                if (btn) btn.style.display = APP.selectedIds.size > 0 ? 'inline-flex' : 'none';
            });
        });
    }

    async function deleteSelectedGallery() {
        if (APP.selectedIds.size === 0) return;
        const count = APP.selectedIds.size;
        if (!confirm(count + ' gorsel silinecek. Emin misiniz?')) return;
        const ids = Array.from(APP.selectedIds).sort((a,b)=>b-a);
        try {
            showLoading(true);
            for (const idx of ids) await API.deleteGallery(idx);
            await loadAllData();
            renderGalleryContent();
            updateHeaderStats();
            toast(count + ' gorsel silindi');
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    function openGalleryUpload() {
        const overlay = $('#modal-overlay');
        const content = $('#modal-content');
        content.innerHTML = `
            <div class="modal-header">
                <h2>Galeriye Gorsel Ekle</h2>
                <button class="modal-close" onclick="SJ_ADMIN.closeModal()">X</button>
            </div>
            <form id="gallery-form">
                <div class="form-group">
                    <label>Gorsel Yukle *</label>
                    <div id="gallery-dropzone" style="border:2px dashed var(--border);border-radius:10px;padding:2rem;text-align:center;cursor:pointer;color:var(--text3);font-size:0.85rem;transition:border-color 0.2s">
                        Dosya secmek icin tiklayin veya surukleyin
                    </div>
                    <input type="file" id="gallery-file-input" accept="image/*" style="display:none" />
                    <div id="gallery-preview" style="display:none;margin-top:0.75rem">
                        <img id="gallery-preview-img" style="max-width:100%;max-height:200px;border-radius:8px" />
                    </div>
                </div>
                <div class="form-group"><label>Baslik *</label><input type="text" id="gallery-title" required /></div>
                <div class="form-group"><label>Kisa Aciklama</label><textarea id="gallery-description" placeholder="Gorsel hakkinda kisa bir aciklama..." style="min-height:60px"></textarea></div>
                <div class="form-group"><label>Kategori</label><input type="text" id="gallery-category" /></div>
                <div class="form-group"><label>Yil</label><input type="text" id="gallery-year" placeholder="orn: 2026" /></div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="SJ_ADMIN.closeModal()">Iptal</button>
                    <button type="submit" class="btn btn-primary">Ekle</button>
                </div>
            </form>
        `;
        overlay.classList.add('open');

        const dropzone = $('#gallery-dropzone');
        const fileInput = $('#gallery-file-input');
        const preview = $('#gallery-preview');
        const previewImg = $('#gallery-preview-img');
        let uploadedUrl = '';

        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = 'var(--primary)'; });
        dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = 'var(--border)'; });
        dropzone.addEventListener('drop', (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); });
        fileInput.addEventListener('change', () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });

        async function handleFile(file) {
            if (!file) return;
            dropzone.textContent = 'Yukleniyor...';
            try {
                const result = await API.uploadFile(file, 'gallery');
                uploadedUrl = result.url;
                previewImg.src = result.url;
                preview.style.display = 'block';
                dropzone.textContent = 'Dosya secmek icin tiklayin';
                toast('Gorsel yuklendi');
            } catch (err) {
                dropzone.textContent = 'Hata! Tekrar deneyin';
                toast(err.message, 'error');
            }
        }

        $('#gallery-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const title = $('#gallery-title').value.trim();
            if (!title) { toast('Baslik zorunludur', 'error'); return; }
            if (!uploadedUrl) { toast('Lutfen bir gorsel yukleyin', 'error'); return; }
            try {
                showLoading(true);
                await API.addGallery({ title, image: uploadedUrl, description: $('#gallery-description').value, category: $('#gallery-category').value, year: $('#gallery-year').value });
                closeModal();
                await loadAllData();
                renderTabContent();
                updateHeaderStats();
                toast('Eklendi');
            } catch (err) {
                toast(err.message, 'error');
            } finally {
                showLoading(false);
            }
        });
    }

    /* ─── Site Icerigi Tab ─── */
    const SITE_GROUPS = {
        anasayfa: { label: 'Ana Sayfa', sections: [
            { id: 'about', title: 'Hakkımızda', fields: [
                { key: 'about.badge', label: 'Rozet', type: 'text' },
                { key: 'about.title', label: 'Baslik', type: 'textarea' },
                { key: 'about.animatedText', label: 'Animasyonlu Metin', type: 'textarea' },
                { key: 'about.heritageTitle', label: 'Kulturel Miras Baslik', type: 'text' },
                { key: 'about.heritageText', label: 'Kulturel Miras Metni', type: 'textarea' },
                { key: 'about.solidarityTitle', label: 'Dayanisma Baslik', type: 'text' },
                { key: 'about.solidarityText', label: 'Dayanisma Metni', type: 'textarea' }
            ]},
            { id: 'contact', title: 'Iletisim', fields: [
                { key: 'contact.badge', label: 'Rozet', type: 'text' },
                { key: 'contact.title', label: 'Baslik', type: 'text' },
                { key: 'contact.description', label: 'Aciklama', type: 'textarea' },
                { key: 'contact.address', label: 'Adres', type: 'text' },
                { key: 'contact.phone', label: 'Telefon', type: 'text' },
                { key: 'contact.email', label: 'E-posta', type: 'text' }
            ]},
            { id: 'footer', title: 'Alt Bilgi', fields: [
                { key: 'footer.description', label: 'Aciklama', type: 'text' },
                { key: 'footer.email', label: 'E-posta', type: 'text' },
                { key: 'footer.phone', label: 'Telefon', type: 'text' },
                { key: 'footer.facebook', label: 'Facebook Link', type: 'text' },
                { key: 'footer.instagram', label: 'Instagram Link', type: 'text' },
                { key: 'footer.twitter', label: 'Twitter Link', type: 'text' }
            ]}
        ]},
        sayfalar: { label: 'Sayfalar', sections: [
            { id: 'pages.hakkimizda', title: 'Hakkimizda', fields: [
                { key: 'pages.hakkimizda.title', label: 'Sayfa Basligi', type: 'text' },
                { key: 'pages.hakkimizda.description', label: 'Sayfa Aciklamasi', type: 'textarea' },
                { key: 'pages.hakkimizda.koklerTitle', label: 'Kokler Baslik', type: 'text' },
                { key: 'pages.hakkimizda.koklerText', label: 'Kokler Metni', type: 'textarea' },
                { key: 'pages.hakkimizda.koklerImage', label: 'Kokler Gorsel URL', type: 'text' },
                { key: 'pages.hakkimizda.culturalTitle', label: 'Kulturel Kimlik Baslik', type: 'text' },
                { key: 'pages.hakkimizda.culturalText', label: 'Kulturel Kimlik Metni', type: 'textarea' },
                { key: 'pages.hakkimizda.geographicTitle', label: 'Cografi Karakter Baslik', type: 'text' },
                { key: 'pages.hakkimizda.geographicText', label: 'Cografi Karakter Metni', type: 'textarea' },
                { key: 'pages.hakkimizda.globalTitle', label: 'Global Bag Baslik', type: 'text' },
                { key: 'pages.hakkimizda.globalText', label: 'Global Bag Metni', type: 'textarea' },
                { key: 'pages.hakkimizda.valuesTitle', label: 'Degerler Basligi', type: 'text' },
                { key: 'pages.hakkimizda.valuesText', label: 'Degerler Metni', type: 'textarea' },
                { key: 'pages.hakkimizda.managementTitle', label: 'Yonetim Basligi', type: 'text' },
                { key: 'pages.hakkimizda.managementText', label: 'Yonetim Metni', type: 'textarea' }
            ]},
            { id: 'pages.iletisim', title: 'Iletisim', fields: [
                { key: 'pages.iletisim.title', label: 'Sayfa Basligi', type: 'text' },
                { key: 'pages.iletisim.description', label: 'Sayfa Aciklamasi', type: 'textarea' },
                { key: 'pages.iletisim.address', label: 'Adres', type: 'textarea' },
                { key: 'pages.iletisim.email', label: 'E-posta', type: 'text' },
                { key: 'pages.iletisim.socialText', label: 'Sosyal Medya Yazisi', type: 'text' },
                { key: 'pages.iletisim.responseTime', label: 'Yanit Suresi', type: 'text' }
            ]},
            { id: 'pages.bagis', title: 'Bagis', fields: [
                { key: 'pages.bagis.title', label: 'Sayfa Basligi', type: 'text' },
                { key: 'pages.bagis.description', label: 'Sayfa Aciklamasi', type: 'textarea' },
                { key: 'pages.bagis.bankName', label: 'Banka Adi', type: 'text' },
                { key: 'pages.bagis.iban', label: 'IBAN', type: 'text' },
                { key: 'pages.bagis.accountName', label: 'Hesap Adi', type: 'text' },
                { key: 'pages.bagis.branch', label: 'Sube', type: 'text' },
                { key: 'pages.bagis.infoText', label: 'Bilgi Metni', type: 'textarea' },
                { key: 'pages.bagis.ctaTitle', label: 'CTA Basligi', type: 'text' },
                { key: 'pages.bagis.ctaText', label: 'CTA Metni', type: 'textarea' }
            ]},
            { id: 'pages.galeri', title: 'Galeri', fields: [
                { key: 'pages.galeri.title', label: 'Sayfa Basligi', type: 'text' },
                { key: 'pages.galeri.description', label: 'Sayfa Aciklamasi', type: 'textarea' }
            ]},
            { id: 'pages.gonullu', title: 'Gonullu', fields: [
                { key: 'pages.gonullu.title', label: 'Sayfa Basligi', type: 'text' },
                { key: 'pages.gonullu.description', label: 'Sayfa Aciklamasi', type: 'textarea' },
                { key: 'pages.gonullu.whyTitle', label: 'Neden Gonullu Basligi', type: 'text' },
                { key: 'pages.gonullu.whyText', label: 'Neden Gonullu Metni', type: 'textarea' },
                { key: 'pages.gonullu.formTitle', label: 'Form Basligi', type: 'text' },
                { key: 'pages.gonullu.formText', label: 'Form Metni', type: 'textarea' }
            ]}
        ]}
    };

    function getSiteVal(key, site) {
        var parts = key.split('.');
        var obj = site;
        for (var i = 0; i < parts.length; i++) { if (obj) obj = obj[parts[i]]; }
        return obj || '';
    }

    function renderSiteContent() {
        var container = $('#tab-content');
        if (!container) return;
        var site = APP.data.site || {};

        APP.siteGroup = APP.siteGroup || 'anasayfa';
        var group = SITE_GROUPS[APP.siteGroup];
        APP.siteSection = APP.siteSection || group.sections[0].id;

        /* ─── Build sidebar items ─── */
        var sidebarHtml = '';
        for (var s = 0; s < group.sections.length; s++) {
            var sec = group.sections[s];
            var isActive = APP.siteSection === sec.id;
            sidebarHtml += '<button class="site-sidebar-item' + (isActive ? ' active' : '') + '" data-section="' + sec.id + '">' +
                '<span class="dot"></span>' + escapeHtml(sec.title) + '</button>';
        }

        /* ─── Build form sections (all rendered, only active visible) ─── */
        var formsHtml = '';
        for (var g in SITE_GROUPS) {
            for (var s = 0; s < SITE_GROUPS[g].sections.length; s++) {
                var sec = SITE_GROUPS[g].sections[s];
                var isActive = APP.siteSection === sec.id;
                formsHtml += '<div class="site-section-form" data-section="' + sec.id + '" style="' + (isActive ? '' : 'display:none') + '">' +
                    '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:1.25rem">' +
                    '<h3 style="font-size:0.95rem;font-weight:600;color:var(--primary);margin-bottom:1.25rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border)">' + escapeHtml(sec.title) + '</h3>' +
                    sec.fields.map(function(f) {
                        var val = getSiteVal(f.key, site);
                        return '<div class="form-group">' +
                            '<label>' + escapeHtml(f.label) + '</label>' +
                            (f.type === 'textarea'
                                ? '<textarea name="' + f.key + '" style="min-height:60px">' + escapeHtml(val) + '</textarea>'
                                : '<input type="text" name="' + f.key + '" value="' + escapeHtml(val) + '" />') +
                            '</div>';
                    }).join('') +
                    '</div></div>';
            }
        }

        container.innerHTML =
            '<div style="display:flex;gap:0.5rem;margin-bottom:1.25rem;flex-wrap:wrap">' +
                Object.keys(SITE_GROUPS).map(function(g) {
                    var grp = SITE_GROUPS[g];
                    var active = APP.siteGroup === g;
                    return '<button class="btn ' + (active ? 'btn-primary' : 'btn-outline') + ' btn-sm site-group-tab" data-group="' + g + '" style="font-size:0.75rem;padding:0.35rem 0.85rem">' + escapeHtml(grp.label) + '</button>';
                }).join('') +
            '</div>' +
            '<div class="site-content-layout">' +
                '<div class="site-sidebar">' +
                    '<div class="site-sidebar-label">' + escapeHtml(group.label) + '</div>' +
                    sidebarHtml +
                '</div>' +
                '<div class="site-main-form" id="site-sections-container">' +
                    formsHtml +
                    '<div style="margin-top:1.25rem;text-align:right">' +
                        '<button class="btn btn-primary" onclick="SJ_ADMIN.saveSiteContent()">Tumunu Kaydet</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        /* ─── Bind group tabs ─── */
        Array.from(container.querySelectorAll('.site-group-tab')).forEach(function(btn) {
            btn.addEventListener('click', function() {
                APP.siteGroup = this.dataset.group;
                APP.siteSection = SITE_GROUPS[APP.siteGroup].sections[0].id;
                renderSiteContent();
            });
        });

        /* ─── Bind sidebar items ─── */
        Array.from(container.querySelectorAll('.site-sidebar-item')).forEach(function(btn) {
            btn.addEventListener('click', function() {
                APP.siteSection = this.dataset.section;
                Array.from(container.querySelectorAll('.site-section-form')).forEach(function(el) {
                    el.style.display = el.dataset.section === APP.siteSection ? '' : 'none';
                });
                Array.from(container.querySelectorAll('.site-sidebar-item')).forEach(function(item) {
                    item.classList.toggle('active', item.dataset.section === APP.siteSection);
                });
            });
        });
    }

    async function saveSiteContent() {
        const formData = {};
        $$('[name]', $('#tab-content')).forEach(el => {
            const key = el.getAttribute('name');
            formData[key] = el.value;
        });
        const current = APP.data.site;
        const updated = { ...current };

        // Map flat key paths back to nested structure
        for (const [key, val] of Object.entries(formData)) {
            const parts = key.split('.');
            let obj = updated;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!obj[parts[i]]) obj[parts[i]] = {};
                obj = obj[parts[i]];
            }
            obj[parts[parts.length - 1]] = val;
        }

        try {
            showLoading(true);
            await API.updateSite(updated);
            APP.data.site = updated;
            toast('Site icerigi kaydedildi');
        } catch (err) {
            toast(err.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    /* ─── Header Stats ─── */
    function updateHeaderStats() {
        const subtitle = $('#stats-line');
        if (subtitle) {
            const syncTime = APP.lastSync ? APP.lastSync.toLocaleTimeString('tr-TR') : '-';
            subtitle.innerHTML = `${APP.data.announcements.length} duyuru / ${APP.data.slider.length} slider / ${APP.data.gallery.length} galeri <span style="color:var(--text3);font-size:0.7rem">| Son senkron: ${syncTime}</span>`;
        }
        $$('.tab .count').forEach(el => {
            const tab = el.closest('.tab');
            if (tab) {
                const id = tab.dataset.tab;
                if (id === 'site') { el.textContent = ''; return; }
                el.textContent = APP.data[id]?.length || 0;
            }
        });
    }

    function logout() {
        APP.authenticated = false;
        APP.data = { announcements: [], slider: [], gallery: [], site: {} };
        render();
    }

    async function refresh() {
        await loadAllData();
        renderTabContent();
        updateHeaderStats();
        toast('Veriler yenilendi');
    }

    async function gitSync() {
        const btn = $('#git-sync-btn');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Kaydediliyor...';
        try {
            const result = await API.gitSync();
            if (result.warning) {
                toast(result.warning, 'warning');
            } else {
                toast('Veriler Git e kaydedildi ve pushlandi');
            }
        } catch (err) {
            toast('Git senkron hatasi: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    window.SJ_ADMIN = {
        addItem, editItem, deleteItem, moveItem,
        closeModal, saveSiteContent, openGalleryUpload, logout,
        refresh, gitSync, deleteSelectedGallery
    };

    (async function init() {
        const hasPass = !!getPassword();
        if (!hasPass) { render(); return; }
        APP.authenticated = true;
        render();
        await loadAllData();
        renderTabContent();
        updateHeaderStats();
    })();
})();
