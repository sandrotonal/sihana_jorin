/* ============================================================
   FlippingCard — 3D flip card (shadcn FlippingCard design)
   ============================================================ */
(function() {
const SJ = window.SJ;

SJ.FlippingCard = function FlippingCard(props) {
  const h = React.createElement;
  var width = props.width || 300;
  var height = props.height || 320;
  var frontContent = props.frontContent;
  var backContent = props.backContent;
  var className = props.className || '';

  return h('div', {
    className: 'flipping-card-wrapper' + (className ? ' ' + className : ''),
    style: { perspective: '1000px', display: 'inline-block' }
  },
    h('div', {
      className: 'flipping-card-inner',
      style: {
        position: 'relative', width: width + 'px', height: height + 'px',
        borderRadius: '12px', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        transformStyle: 'preserve-3d', cursor: 'pointer'
      }
    },
      // Front
      h('div', {
        className: 'flipping-card-front',
        style: {
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: '#212121', border: '1px solid rgba(222,219,200,0.08)',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)', overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }
      }, frontContent || h('div', { style: { padding: '24px', color: '#E1E0CC' } }, 'Front')),
      // Back
      h('div', {
        className: 'flipping-card-back',
        style: {
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: '#1a1a1a', border: '1px solid rgba(222,219,200,0.12)',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }
      }, backContent || h('div', { style: { color: '#E1E0CC' } }, 'Back'))
    )
  );
};
})();