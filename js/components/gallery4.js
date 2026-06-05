/* ============================================================
   Gallery4 — Carousel Gallery (shadcn Gallery4 design)
   ============================================================ */
(function() {
const SJ = window.SJ;

SJ.Gallery4 = function Gallery4(props) {
  const h = React.createElement;
  const { useRef, useState, useEffect, useCallback } = React;

  var title = props.title || 'Köyümüzden Kareler';
  var description = props.description || 'Her bir kare, Sıhana Jorin\'in hikayesini anlatıyor.';
  var items = props.items || [
    { id:'1', title:'Köy Meydanı', description:'Geleneksel etkinliklerimizden bir kare', image:'https://images.unsplash.com/photo-1551250928-243dc937c49d?w=800&q=80', href:'#' },
    { id:'2', title:'Doğa Yürüyüşü', description:'Köyümüzün eşsiz doğal güzellikleri', image:'https://images.unsplash.com/photo-1551250928-e4a05afaed1e?w=800&q=80', href:'#' },
    { id:'3', title:'Yemek Festivali', description:'Yöresel lezzetlerimizin tanıtımı', image:'https://images.unsplash.com/photo-1536735561749-fc87494598cb?w=800&q=80', href:'#' },
    { id:'4', title:'Köy Kültür Evi', description:'Restorasyon çalışmaları devam ediyor', image:'https://images.unsplash.com/photo-1548324215-9133768e4094?w=800&q=80', href:'#' },
    { id:'5', title:'Hasat Zamanı', description:'Bereketli topraklarımızdan kareler', image:'https://images.unsplash.com/photo-1550070881-a5d71eda5800?w=800&q=80', href:'#' },
  ];

  var scrollRef = useRef(null);
  var [current, setCurrent] = useState(0);
  var [canScrollPrev, setCanScrollPrev] = useState(false);
  var [canScrollNext, setCanScrollNext] = useState(true);

  var updateState = useCallback(function() {
    var el = scrollRef.current;
    if (!el) return;
    var idx = Math.round(el.scrollLeft / el.clientWidth);
    setCurrent(idx);
    setCanScrollPrev(idx > 0);
    setCanScrollNext(idx < items.length - 1);
  }, [items.length]);

  useEffect(function() {
    var el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateState, { passive: true });
    updateState();
    return function() { el.removeEventListener('scroll', updateState); };
  }, [updateState]);

  var scrollTo = function(idx) {
    var el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  return h('section', { style: { background: '#000', padding: 'clamp(3rem, 6vw, 5rem) 0' } },
    h('div', { style: { maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' } },
      h('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' } },
        h('div', null,
          h('h2', { style: { fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, color: '#E1E0CC', margin: 0 } }, title),
          h('p', { style: { fontSize: '0.9rem', color: 'rgba(225,224,204,0.45)', marginTop: '10px', maxWidth: '480px', lineHeight: 1.6 } }, description)
        ),
        h('div', { style: { display: 'flex', gap: '8px' } },
          h('button', {
            onClick: function() { var el = scrollRef.current; if (el) el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' }); },
            disabled: !canScrollPrev,
            style: {
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(222,219,200,0.15)',
              background: 'rgba(0,0,0,0.5)', color: '#E1E0CC', cursor: canScrollPrev ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s',
              opacity: canScrollPrev ? 1 : 0.3
            }
          },
            h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
              h('path', { d: 'M15 18l-6-6 6-6' })
            )
          ),
          h('button', {
            onClick: function() { var el = scrollRef.current; if (el) el.scrollBy({ left: el.clientWidth, behavior: 'smooth' }); },
            disabled: !canScrollNext,
            style: {
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(222,219,200,0.15)',
              background: 'rgba(0,0,0,0.5)', color: '#E1E0CC', cursor: canScrollNext ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s',
              opacity: canScrollNext ? 1 : 0.3
            }
          },
            h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
              h('path', { d: 'M9 18l6-6-6-6' })
            )
          )
        )
      )
    ),
    h('div', { style: { width: '100%', paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2))' } },
      h('div', {
        ref: scrollRef,
        style: {
          display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none',
          gap: '16px', paddingRight: '20px'
        }
      },
        items.map(function(item) {
          return h('div', { key: item.id, style: {
            flex: '0 0 min(320px, 80vw)', scrollSnapAlign: 'start',
            borderRadius: '16px', overflow: 'hidden', cursor: 'pointer'
          }},
            h('a', { href: item.href, style: { textDecoration: 'none', display: 'block' } },
              h('div', { style: {
                position: 'relative', height: 'clamp(22rem, 40vh, 27rem)', minHeight: '27rem',
                background: '#212121', borderRadius: '16px', overflow: 'hidden'
              }, className: 'gallery-card-hover' },
                h('img', {
                  src: item.image,
                  alt: item.title,
                  style: { position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
                  className: 'gallery-card-img'
                }),
                h('div', { style: {
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)'
                }, className: 'gallery-overlay' }),
                h('div', { style: {
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem'
                }, className: 'gallery-content' },
                  h('h3', { style: { fontSize: '1.1rem', fontWeight: 600, color: '#fff', margin: '0 0 4px' } }, item.title),
                  h('p', { style: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0 } }, item.description),
                  h('span', { style: { fontSize: '0.75rem', color: '#DEDBC8', marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' } },
                    'Devamını Gör',
                    h('svg', { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
                      h('path', { d: 'M5 12h14M12 5l7 7-7 7' })
                    )
                  )
                )
              )
            )
          );
        })
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' } },
        items.map(function(_, index) {
          return h('button', {
            key: index,
            onClick: function() { scrollTo(index); },
            'aria-label': 'Slide ' + (index + 1),
            style: {
              width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: current === index ? '#DEDBC8' : 'rgba(222,219,200,0.15)',
              transition: 'background 0.3s ease', padding: 0
            }
          });
        })
      )
    )
  );
};
})();
