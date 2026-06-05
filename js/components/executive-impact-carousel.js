/* ============================================================
   ExecutiveImpactCarousel — 3-column GSAP scroll (shadcn design)
   ============================================================ */
(function() {
const SJ = window.SJ;

SJ.ExecutiveImpactCarousel = function ExecutiveImpactCarousel(props) {
  const h = React.createElement;
  var items = props.items;

  var defaultItems = [
    { id:'p1', title:'Köy Kültür Evi Projesi', desc:'Tarihi binanın restore edilerek kültür evine dönüştürülmesi', period:'2025-2026', tags:['Restorasyon','Kültür'] },
    { id:'p2', title:'Su Kanalı Temizlik', desc:'Sulama kanallarının düzenli bakım ve temizliği', period:'2025-2026', tags:['Altyapı'] },
    { id:'p3', title:'Yemek Festivali', desc:'Geleneksel yemek festivalimiz büyük katılımla gerçekleşti', period:'2024-2025', tags:['Kültür','Etkinlik'] },
    { id:'p4', title:'Çevre Düzenlemesi', desc:'Köy meydanı peyzaj ve oturma alanları yenilendi', period:'2024', tags:['Çevre'] },
    { id:'p5', title:'Eğitim Seminerleri', desc:'Tarım ve hayvancılık alanında bilgilendirme', period:'2024', tags:['Eğitim'] },
    { id:'p6', title:'Köy Kütüphanesi', desc:'Köy kütüphanesi kurulumu ve kitap bağışı kampanyası', period:'2023', tags:['Eğitim','Kültür'] },
    { id:'p7', title:'Yol Yenileme', desc:'Köy yolu asfaltlama çalışmaları tamamlandı', period:'2023', tags:['Altyapı'] },
    { id:'p8', title:'Fidan Dikimi', desc:'Her yıl düzenlenen fidan dikimi etkinliği', period:'2023', tags:['Çevre'] },
    { id:'p9', title:'Düğün Salonu', desc:'Köy düğün salonu yenileme ve modernizasyon', period:'2022', tags:['Kültür'] },
  ];

  var data = items || defaultItems;
  var containerRef = React.useRef(null);

  React.useEffect(function() {
    if (!containerRef.current || !window.gsap) return;
    if (window.innerWidth < 769) return;
    var gsap = window.gsap;
    var ScrollTrigger = window.gsap.ScrollTrigger;
    if (!ScrollTrigger) return;

    ScrollTrigger.refresh();

    var ctx = gsap.context(function() {
      var boxes = containerRef.current.querySelectorAll('.eic-col');
      boxes.forEach(function(box) {
        var list = box.querySelector('.eic-list');
        if (!list) return;
        var isOdd = box.classList.contains('eic-odd');
        var totalH = list.scrollHeight;
        var vh = window.innerHeight;
        var dist = totalH + vh * 0.5;
        gsap.to(list, {
          yPercent: isOdd ? 100 : -100,
          scrollTrigger: {
            trigger: box,
            start: 0,
            end: '+=' + dist,
            scrub: 1.2,
            pin: true,
            invalidateOnRefresh: true
          }
        });
      });
    }, containerRef);

    return function() { ctx.revert(); };
  }, [data]);

  var chunkArray = function(arr, chunks) {
    var result = [];
    for (var i = 0; i < chunks; i++) result.push([]);
    arr.forEach(function(item, idx) { result[idx % chunks].push(item); });
    return result;
  };

  var columns = chunkArray(data, 3);

  return h('div', { ref: containerRef, style: { background: '#000', padding: '0', overflow: 'hidden', width: '100%' } },
    h('div', { className: 'eic-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '95vw', margin: '0 auto', minHeight: '100vh' } },
      columns.map(function(col, colIdx) {
        var isOdd = colIdx % 2 === 1;
        return h('div', {
          key: 'col-' + colIdx,
          className: 'eic-col' + (isOdd ? ' eic-odd' : ''),
          style: { display: 'flex', flexDirection: 'column', padding: '10vh 0 15vh' }
        },
          h('div', {
            className: 'eic-list',
            style: {
              display: 'flex', flexDirection: isOdd ? 'column-reverse' : 'column',
              gap: 'clamp(2rem, 4vw, 4rem)', willChange: 'transform'
            }
          },
            col.map(function(item) {
              return h('div', {
                key: item.id,
                className: 'eic-card',
                style: {
                  width: 'clamp(200px, 20vw, 300px)', margin: '0 auto',
                  background: '#101010', borderRadius: '16px', overflow: 'hidden',
                  border: '1px solid rgba(222,219,200,0.06)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }
              },
                h('div', { style: { padding: '1.5rem' } },
                  h('span', { style: { fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(222,219,200,0.4)' } }, item.period),
                  h('h3', { style: { fontSize: '1rem', fontWeight: 500, color: '#E1E0CC', margin: '8px 0 6px', lineHeight: 1.3 } }, item.title),
                  h('p', { style: { fontSize: '0.8rem', color: 'rgba(225,224,204,0.4)', margin: 0, lineHeight: 1.5 } }, item.desc),
                  item.tags ? h('div', { style: { display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' } },
                    item.tags.map(function(tag, tagIdx) {
                      return h('span', { key: tag, style: { fontSize: '9px', color: 'rgba(222,219,200,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' } }, 
                        tag + (tagIdx < item.tags.length - 1 ? '  •' : '')
                      );
                    })
                  ) : null
                )
              );
            })
          )
        );
      })
    )
  );
};
})();