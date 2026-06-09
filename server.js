const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

/* ─── Config ─── */
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const ALLOWED_SUBDIRS = ['general', 'gallery', 'slider', 'announcements'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let sub = (req.body.subdir || 'general').replace(/\.\./g, '').replace(/[^a-z0-9_-]/gi, '');
        if (!sub || !ALLOWED_SUBDIRS.includes(sub)) sub = 'general';
        const dir = path.join(UPLOAD_DIR, sub);
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '.jpg';
        const name = Date.now() + '-' + Math.random().toString(36).slice(2, 6) + ext;
        cb(null, name);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedExt = /\.(jpg|jpeg|png|gif|webp|svg|avif|mp4|webm)$/i;
        const allowedMime = /^image\/(jpeg|png|gif|webp|svg\+xml|avif)|^video\/(mp4|webm)$/i;
        if (allowedExt.test(path.extname(file.originalname)) && allowedMime.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Sadece gorsel/video dosyalarina izin verilir'));
        }
    }
});

const filePath = (name) => path.join(DATA_DIR, name);

/* ─── Default data ─── */
const DEFAULTS = {
    'announcements.json': [
        { id: 'yaz-senligi', category: 'Etkinlik', subCategory: 'Duyuru', date: 'Ağustos 2026', title: 'Geleneksel Yaz Şenliği', summary: "15–16 Ağustos'ta köy meydanında", description: 'Bu yıl geleneksel Yaz Şenliğimiz 15–16 Ağustos tarihlerinde köy meydanında gerçekleşecektir.', imgUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=compress&cs=tinysrgb&w=800', buttonText: 'Detaylar', buttonHref: 'duyurular.html' },
        { id: 'koy-yolu', category: 'Altyapı', subCategory: 'Çalışma', date: 'Haziran 2026', title: 'Köy Yolu Çalışmaları', summary: 'Ana bağlantı yolunda asfaltlama tamamlandı', description: 'Köyümüzün ana bağlantı yolunda derneğimizin girişimleri ve belediye iş birliğiyle yürütülen çalışmalar başarıyla tamamlanmıştır.', imgUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=compress&cs=tinysrgb&w=800', buttonText: 'Devamı', buttonHref: 'duyurular.html' },
        { id: 'uye-kayit', category: 'Topluluk', subCategory: 'Üyelik', date: 'Mayıs 2026', title: 'Yeni Dönem Üye Kayıtları', summary: '2026–2027 dönemi kayıtları başladı', description: 'Sıhana Jorin Köy Derneği 2026–2027 dönemi üyelik yenileme ve yeni üye kayıt süreci başlamıştır.', imgUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=compress&cs=tinysrgb&w=800', buttonText: 'Kayıt Ol', buttonHref: 'gonullu.html' },
        { id: 'el-sanatlari', category: 'Kültür', subCategory: 'Sanat', date: 'Nisan 2026', title: 'El Sanatları Sergisi', summary: 'Geleneksel el ürünleri bir ay boyunca sergileniyor', description: 'Köyümüzün kadınları tarafından hazırlanan el emeği göz nuru dokumalar, seramikler ve geleneksel süs eşyalarının sergileneceği özel sergimiz.', imgUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=compress&cs=tinysrgb&w=800', buttonText: 'Keşfet', buttonHref: 'duyurular.html' }
    ],
    'slider.json': [
        { title: "Yaz Şenliği 2024", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop", category: "Kültürel Etkinlik", year: "2024", description: "Köyün geleneksel yaz festivali" },
        { title: "El Sanatları Atölyesi", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop", category: "Atölye Çalışması", year: "2024", description: "Geleneksel el sanatları eğitim programı" },
        { title: "Doğa Yürüyüşü", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1920&auto=format&fit=crop", category: "Doğa Aktivitesi", year: "2024", description: "Köy çevresinde doğa yürüyüşleri" },
        { title: "Bağ Bozumu Festivali", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop", category: "Tarım Projesi", year: "2023", description: "Geleneksel bağ bozumu kutlamaları" },
        { title: "Kış Toplantısı", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop", category: "Topluluk Buluşması", year: "2023", description: "Yıllık kış toplantısı ve değerlendirme" }
    ],
    'gallery.json': [],
    'site.json': {
        "about": {
            "badge": "Geçmişin Mirası, Geleceğin İnancı",
            "title": "Serhat bölgesinin kalbinde, Ağrı Dağı'nın gölgesinde köklü bir geçmişe ev sahipliği yapan Besler Köyü, bilinen ve kadim adıyla Sîhana Jorin; sarsılmaz bağların, emeğin ve misafirperverliğin merkezidir.",
            "animatedText": "Sert kışlarına inat sıcak insan hikayeleriyle filizlenen köyümüz, geleneksel hayvancılık kültürüyle toprağına bağlı kalırken; metropollerden Avrupa'ya uzanan güçlü diasporasıyla da bağlarını asla koparmamıştır. Bugün Sîhana Jorin; geçmişin kültürel mirasını koruyan, genç nesillerin enerjisiyle geleceğe umutla bakan ve nerede olursak olalım hepimizi aynı samimiyette buluşturan ortak evimizdir.",
            "heritageTitle": "Kültürel Mirasımız",
            "heritageText": "Köyümüzün köklü gelenekleri, yöresel tatları, müziği ve el sanatları nesiller boyu aktarılan bir hazinedir. Bu mirası korumak ve yaşatmak hepimizin görevidir.",
            "solidarityTitle": "Dayanışma Ruhu",
            "solidarityText": "Sıhana Jorin Derneği olarak, köy halkının birlik ve beraberliğini güçlendirmek için durmaksızın çalışıyoruz."
        },
        "features": {
            "title": "Köyümüz için güçlü bir gelecek inşa ediyoruz.",
            "subtitle": "Birlikten doğan güç. Gelenekten beslenen gelecek.",
            "card1Label": "Köyümüzün güzellikleri",
            "card2Title": "Kültürel Etkinlikler",
            "card2Items": ["Yıllık köy festivali ve şenlikleri","Geleneksel el sanatları atölyeleri","Yöresel müzik ve halk oyunları","Kültürel miras belgesel çalışmaları"],
            "card3Title": "Dayanışma Ağı",
            "card3Items": ["Dijital arşiv ve belge tarama sistemi","Köy hikayeleri ve anı derlemeleri","İletişim ağı ve yardımlaşma platformu"],
            "card4Title": "Eğitim Destekleri",
            "card4Items": ["Burs programları ve eğitim desteği","Gençlik kampları ve atölye çalışmaları","Program takvimi ve etkinlik senkronizasyonu"]
        },
        "contact": {
            "badge": "Bize Ulaşın",
            "title": "Birlikte daha güçlüyüz",
            "description": "Derneğimize katılmak, fikir paylaşmak veya herhangi bir konuda bizimle iletişime geçmek isterseniz, her zaman buradayız.",
            "address": "Sıhana Jorin Köyü, Merkez Mahallesi, No:1",
            "phone": "+90 (555) 123 4567",
            "email": "info@sihanajorin.org"
        },
        "footer": {
            "description": "Sıhana Jorin Köyü Derneği — birlikte daha güçlüyüz.",
            "email": "info@sihanajorin.org",
            "phone": "+90 (555) 123 4567",
            "facebook": "#",
            "instagram": "#",
            "twitter": "#"
        }
    }
};

/* ─── File helpers ─── */
const readJSON = (name) => {
    const p = filePath(name);
    if (!fs.existsSync(p)) {
        const def = DEFAULTS[name];
        if (def) {
            writeJSON(name, def);
            return def;
        }
        return null;
    }
    try {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
    } catch {
        const def = DEFAULTS[name];
        if (def) {
            writeJSON(name, def);
            return def;
        }
        return null;
    }
};

const writeJSON = (name, data) => {
    const tmp = filePath('_' + name);
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmp, filePath(name));
};

/* ─── Middleware ─── */
app.use(express.json({ limit: '1mb' }));

/* ─── Generate JS from JSON (intercepted routes) ─── */
app.get('/js/data/announcements.js', (req, res) => {
    const data = readJSON('announcements.json');
    res.type('application/javascript');
    res.send(
        `/**\n * Sıhana Jorin — Duyuru Verisi (dinamik)\n */\nwindow.SJ = window.SJ || {};\n\nwindow.SJ.DUYURULAR_DATA = ${JSON.stringify(data, null, 2)};\n`
    );
});

app.get('/js/config.js', (req, res) => {
    const data = readJSON('slider.json');
    res.type('application/javascript');
    res.send(
        `window.SJ = window.SJ || {};\n\nwindow.SJ.SLIDER_DATA = ${JSON.stringify(data, null, 2)};\n\nwindow.SJ.SLIDER_CONFIG = { SCROLL_SPEED:0.75, LERP_FACTOR:0.05, BUFFER_SIZE:5, MAX_VELOCITY:150, SNAP_DURATION:500, MINIMAP_HEIGHT:250 };\n`
    );
});

/* ─── API: Announcements ─── */
app.get('/api/announcements', (req, res) => {
    const data = readJSON('announcements.json');
    res.json(data);
});

app.post('/api/announcements', (req, res) => {
    const item = req.body;
    if (!item || !item.title) {
        return res.status(400).json({ error: 'Başlık zorunludur' });
    }
    const data = readJSON('announcements.json');
    item.id = item.id || item.title.toLowerCase().replace(/ç/g,'c').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ş/g,'s').replace(/ü/g,'u').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'item-' + Date.now();
    data.unshift(item);
    writeJSON('announcements.json', data);
    res.status(201).json(item);
});

app.put('/api/announcements/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (!updates || !updates.title) {
        return res.status(400).json({ error: 'Başlık zorunludur' });
    }
    const data = readJSON('announcements.json');
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Bulunamadı' });
    const updated = { ...data[idx], ...updates, id };
    data.splice(idx, 1);
    data.unshift(updated);
    writeJSON('announcements.json', data);
    res.json(updated);
});

app.delete('/api/announcements/:id', (req, res) => {
    const { id } = req.params;
    const data = readJSON('announcements.json');
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Bulunamadı' });
    data.splice(idx, 1);
    writeJSON('announcements.json', data);
    res.json({ ok: true });
});

app.patch('/api/announcements/reorder', (req, res) => {
    const { fromIndex, toIndex } = req.body;
    if (fromIndex === undefined || toIndex === undefined) {
        return res.status(400).json({ error: 'fromIndex ve toIndex zorunludur' });
    }
    const data = readJSON('announcements.json');
    if (fromIndex < 0 || fromIndex >= data.length || toIndex < 0 || toIndex >= data.length) {
        return res.status(400).json({ error: 'Geçersiz index' });
    }
    const [moved] = data.splice(fromIndex, 1);
    data.splice(toIndex, 0, moved);
    writeJSON('announcements.json', data);
    res.json(data);
});

/* ─── API: Slider ─── */
app.get('/api/slider', (req, res) => {
    const data = readJSON('slider.json');
    res.json(data);
});

app.post('/api/slider', (req, res) => {
    const item = req.body;
    if (!item || !item.title) {
        return res.status(400).json({ error: 'Başlık zorunludur' });
    }
    const data = readJSON('slider.json');
    data.unshift(item);
    writeJSON('slider.json', data);
    res.status(201).json(item);
});

app.put('/api/slider/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);
    const updates = req.body;
    if (!updates || !updates.title) {
        return res.status(400).json({ error: 'Başlık zorunludur' });
    }
    const data = readJSON('slider.json');
    if (idx < 0 || idx >= data.length) return res.status(404).json({ error: 'Bulunamadı' });
    const updated = { ...data[idx], ...updates };
    data.splice(idx, 1);
    data.unshift(updated);
    writeJSON('slider.json', data);
    res.json(updated);
});

app.delete('/api/slider/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);
    const data = readJSON('slider.json');
    if (idx < 0 || idx >= data.length) return res.status(404).json({ error: 'Bulunamadı' });
    data.splice(idx, 1);
    writeJSON('slider.json', data);
    res.json({ ok: true });
});

app.patch('/api/slider/reorder', (req, res) => {
    const { fromIndex, toIndex } = req.body;
    if (fromIndex === undefined || toIndex === undefined) {
        return res.status(400).json({ error: 'fromIndex ve toIndex zorunludur' });
    }
    const data = readJSON('slider.json');
    if (fromIndex < 0 || fromIndex >= data.length || toIndex < 0 || toIndex >= data.length) {
        return res.status(400).json({ error: 'Geçersiz index' });
    }
    const [moved] = data.splice(fromIndex, 1);
    data.splice(toIndex, 0, moved);
    writeJSON('slider.json', data);
    res.json(data);
});

/* ─── API: Gallery ─── */
app.get('/api/gallery', (req, res) => {
    const data = readJSON('gallery.json');
    res.json(data);
});

app.post('/api/gallery', (req, res) => {
    const item = req.body;
    if (!item || !item.title) {
        return res.status(400).json({ error: 'Başlık zorunludur' });
    }
    const data = readJSON('gallery.json');
    data.unshift(item);
    writeJSON('gallery.json', data);
    res.status(201).json(item);
});

app.delete('/api/gallery/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);
    const data = readJSON('gallery.json');
    if (idx < 0 || idx >= data.length) return res.status(404).json({ error: 'Bulunamadı' });
    data.splice(idx, 1);
    writeJSON('gallery.json', data);
    res.json({ ok: true });
});

/* ─── API: Upload ─── */
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Dosya gerekli' });
    let sub = (req.body.subdir || 'general').replace(/\.\./g, '').replace(/[^a-z0-9_-]/gi, '');
    if (!sub || !ALLOWED_SUBDIRS.includes(sub)) sub = 'general';
    res.json({ url: '/uploads/' + sub + '/' + req.file.filename, filename: req.file.filename });
});

app.get('/api/uploads', (req, res) => {
    const list = [];
    const walk = (dir, prefix) => {
        let items;
        try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
        for (const item of items) {
            if (item.isDirectory()) walk(path.join(dir, item.name), prefix + item.name + '/');
            else if (/\.(jpg|jpeg|png|gif|webp|svg|avif|mp4|webm)$/i.test(item.name))
                list.push({ name: item.name, url: '/uploads/' + prefix + item.name });
        }
    };
    walk(UPLOAD_DIR, '');
    res.json(list);
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Dosya boyutu 10MB sinirini asiyor' });
    }
    if (err) return res.status(400).json({ error: err.message });
    next();
});

/* ─── Dynamic JS: Gallery Data ─── */
app.get('/js/data/gallery.js', (req, res) => {
    const data = readJSON('gallery.json');
    res.type('application/javascript');
    res.send(
        `window.SJ = window.SJ || {};\n\nwindow.SJ.GALLERY_DATA = ${JSON.stringify(data, null, 2)};\n`
    );
});

/* ─── Dynamic JS: Site Data ─── */
app.get('/js/data/site.js', (req, res) => {
    const data = readJSON('site.json');
    res.type('application/javascript');
    res.send(
        `window.SJ = window.SJ || {};\n\nwindow.SJ.SITE_DATA = ${JSON.stringify(data, null, 2)};\n`
    );
});

/* ─── API: Site Data ─── */
app.get('/api/site', (req, res) => {
    res.json(readJSON('site.json'));
});

app.put('/api/site', (req, res) => {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
        return res.status(400).json({ error: 'Gecersiz veri' });
    }
    const current = readJSON('site.json');
    const merged = { ...current, ...updates };
    writeJSON('site.json', merged);
    res.json(merged);
});

/* ─── Static files (after dynamic routes) ─── */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname));

/* ─── Start ─── */
ensureDir(DATA_DIR);
ensureDir(UPLOAD_DIR);
readJSON('announcements.json');
readJSON('slider.json');
readJSON('gallery.json');
readJSON('site.json');

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log('');
        console.log('  Sıhana Jorin — Sunucu çalışıyor');
        console.log('  ─────────────────────────────────');
        console.log(`  Site:  http://localhost:${port}`);
        console.log(`  Admin: http://localhost:${port}/admin/`);
        console.log('');
    });
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`  Port ${port} dolu, ${port + 1} deneniyor...`);
            startServer(port + 1);
        } else {
            console.error('  Sunucu hatası:', err.message);
        }
    });
};

startServer(PORT);
