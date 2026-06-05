window.SJ = window.SJ || {};
const SJ = window.SJ;

SJ.ArrowRight = function ArrowRight({ size=18, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('line', { x1:"5", y1:"12", x2:"19", y2:"12" }),
        React.createElement('polyline', { points:"12 5 19 12 12 19" })
    );
};

SJ.Check = function Check({ size=16, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('polyline', { points:"20 6 9 17 4 12" })
    );
};

SJ.XIcon = function XIcon({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('line', { x1:"18", y1:"6", x2:"6", y2:"18" }),
        React.createElement('line', { x1:"6", y1:"6", x2:"18", y2:"18" })
    );
};

SJ.CookieIcon = function CookieIcon({ size=24, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }),
        React.createElement('path', { d:"M8.5 8.5v.01" }),
        React.createElement('path', { d:"M16 15.5v.01" }),
        React.createElement('path', { d:"M12 12v.01" }),
        React.createElement('path', { d:"M11 17v.01" }),
        React.createElement('path', { d:"M7 14v.01" })
    );
};

SJ.MenuIcon = function MenuIcon({ size=24, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('line', { x1:"4", y1:"6", x2:"20", y2:"6" }),
        React.createElement('line', { x1:"4", y1:"12", x2:"20", y2:"12" }),
        React.createElement('line', { x1:"4", y1:"18", x2:"20", y2:"18" })
    );
};

SJ.MapPin = function MapPin({ size=18, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
        React.createElement('circle', { cx:"12", cy:"10", r:"3" })
    );
};

SJ.Phone = function Phone({ size=18, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
    );
};

SJ.Mail = function Mail({ size=18, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('rect', { width:"20", height:"16", x:"2", y:"4", rx:"2" }),
        React.createElement('path', { d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
    );
};

SJ.ChevronUp = function ChevronUp({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"m18 15-6-6-6 6" })
    );
};

SJ.ChevronDown = function ChevronDown({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"m6 9 6 6 6-6" })
    );
};

SJ.Heart = function Heart({ size=18, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"currentColor", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
    );
};

SJ.Instagram = function Instagram({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('rect', { width:"20", height:"20", x:"2", y:"2", rx:"5", ry:"5" }),
        React.createElement('path', { d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
        React.createElement('line', { x1:"17.5", y1:"6.5", x2:"17.51", y2:"6.5" })
    );
};

SJ.Facebook = function Facebook({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"currentColor", stroke:"none", className },
        React.createElement('path', { d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
    );
};

SJ.YouTube = function YouTube({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" }),
        React.createElement('polygon', { points:"9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" })
    );
};

SJ.XIcon_social = function XIcon_social({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"currentColor", stroke:"none", className },
        React.createElement('path', { d:"M4 4l6.25 8.5L4 20h2.5l5.5-7.25L17 20h5l-7-9.5L21 4h-2.5l-5.25 7L9 4H4z" })
    );
};

SJ.Bell = function Bell({ size=20, className='' }) {
    return React.createElement('svg', { xmlns:"http://www.w3.org/2000/svg", width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className },
        React.createElement('path', { d:"M6 8a6 6 0 0 1 12 0c0 7 4 9 4 9H2s4-2 4-9" }),
        React.createElement('path', { d:"M9.5 17c0 1.38.62 2.5 1.5 2.5s1.5-1.12 1.5-2.5" })
    );
};
