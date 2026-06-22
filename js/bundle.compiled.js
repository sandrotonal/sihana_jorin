window.SJ = window.SJ || {};
window.SJ.useInView = function useInView(options = {}) {
  const { useState, useEffect, useRef } = React;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once !== false) observer.unobserve(el);
        } else if (options.once === false) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold || 0, rootMargin: options.margin || "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
};
(function() {
  const SJ = window.SJ;
  const h = React.createElement;
  SJ.ArrowRight = function ArrowRight({ size = 18, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
      h("polyline", { points: "12 5 19 12 12 19" })
    );
  };
  SJ.Check = function Check({ size = 16, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("polyline", { points: "20 6 9 17 4 12" })
    );
  };
  SJ.XIcon = function XIcon({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      h("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    );
  };
  SJ.CookieIcon = function CookieIcon({ size = 24, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }),
      h("path", { d: "M8.5 8.5v.01" }),
      h("path", { d: "M16 15.5v.01" }),
      h("path", { d: "M12 12v.01" }),
      h("path", { d: "M11 17v.01" }),
      h("path", { d: "M7 14v.01" })
    );
  };
  SJ.MenuIcon = function MenuIcon({ size = 24, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
      h("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
      h("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
    );
  };
  SJ.MapPin = function MapPin({ size = 18, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
      h("circle", { cx: "12", cy: "10", r: "3" })
    );
  };
  SJ.Phone = function Phone({ size = 18, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
    );
  };
  SJ.Mail = function Mail({ size = 18, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
      h("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
    );
  };
  SJ.ChevronUp = function ChevronUp({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "m18 15-6-6-6 6" })
    );
  };
  SJ.ChevronDown = function ChevronDown({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "m6 9 6 6 6-6" })
    );
  };
  SJ.Heart = function Heart({ size = 18, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
    );
  };
  SJ.Bell = function Bell({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M6 8a6 6 0 0 1 12 0c0 7 4 9 4 9H2s4-2 4-9" }),
      h("path", { d: "M9.5 17c0 1.38.62 2.5 1.5 2.5s1.5-1.12 1.5-2.5" })
    );
  };
  SJ.Instagram = function Instagram({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
      h("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
      h("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
    );
  };
  SJ.Facebook = function Facebook({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", className },
      h("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
    );
  };
  SJ.YouTube = function YouTube({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className },
      h("path", { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" }),
      h("polygon", { points: "9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" })
    );
  };
  SJ.XIcon_social = function XIcon_social({ size = 20, className = "" }) {
    return h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", stroke: "none", className },
      h("path", { d: "M4 4l6.25 8.5L4 20h2.5l5.5-7.25L17 20h5l-7-9.5L21 4h-2.5l-5.25 7L9 4H4z" })
    );
  };
})();
(function() {
  const SJ = window.SJ;
  const { useState, useEffect, useRef, useMemo, useCallback } = React;
  const cn = SJ.cn = function cn2(...classes) {
    return classes.filter(Boolean).join(" ");
  };
  SJ.HamburgerMenu = function HamburgerMenu({ isOpen, onClose }) {
    const links = [
      { href: "index.html", label: "Ana Sayfa" },
      { href: "hakkimizda.html", label: "Hikayemiz" },
      { href: "galeri.html", label: "Galeri" },
      { href: "duyurular.html", label: "Duyurular" },
      { href: "iletisim.html", label: "\u0130leti\u015Fim" }
    ];
    useEffect(() => {
      if (isOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: onClose,
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.5s ease"
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      inset: 0,
      zIndex: 205,
      background: "#050505",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
      transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)"
    } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
      position: "absolute",
      top: 24,
      right: 24,
      padding: 8,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "rgba(225,224,204,0.6)",
      zIndex: 206
    }, "aria-label": "Men\xFCy\xFC kapat" }, /* @__PURE__ */ React.createElement(SJ.XIcon, { size: 24, style: { color: "#E1E0CC" } })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center w-full p-8 text-center" }, /* @__PURE__ */ React.createElement("img", { src: "/logo.png", alt: "S\u0131hana Jorin", className: "h-10 w-auto mb-10" }), /* @__PURE__ */ React.createElement("nav", { className: "flex flex-col gap-8 items-center mb-16", role: "navigation", "aria-label": "Mobil men\xFC" }, links.map((link, i) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: link.href,
        href: link.href,
        onClick: onClose,
        className: "text-3xl sm:text-4xl font-medium text-[#E1E0CC]/60 hover:text-[#E1E0CC] transition-all duration-500",
        style: {
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          transitionDelay: isOpen ? `${0.1 + i * 0.05}s` : "0s"
        }
      },
      link.label
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2 text-[#DEDBC8]/40 text-sm" }, /* @__PURE__ */ React.createElement(SJ.MapPin, { size: 14, className: "shrink-0" }), /* @__PURE__ */ React.createElement("span", null, "S\u0131hana Jorin K\xF6y\xFC")))));
  };
  SJ.CookieBanner = function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });
    useEffect(() => {
      const saved = localStorage.getItem("sj-cookies");
      if (!saved) {
        const t = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(t);
      }
      try {
        const p = JSON.parse(saved);
        if (p && typeof p === "object") setPrefs(p);
      } catch {
      }
    }, []);
    const close = () => {
      setIsClosing(true);
      setTimeout(() => setIsVisible(false), 400);
    };
    const savePrefs = (p) => {
      localStorage.setItem("sj-cookies", JSON.stringify(p));
      close();
    };
    const acceptAll = () => {
      const p = { necessary: true, analytics: true, marketing: true };
      setPrefs(p);
      savePrefs(p);
    };
    const acceptSelected = () => {
      savePrefs(prefs);
    };
    const decline = () => {
      const p = { necessary: true, analytics: false, marketing: false };
      setPrefs(p);
      savePrefs(p);
    };
    if (!isVisible) return null;
    if (showOptions) {
      return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4", role: "dialog", "aria-label": "\xC7erez tercihleri" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#101010] border border-[#DEDBC8]/20 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl" }, /* @__PURE__ */ React.createElement("h3", { className: "text-[#E1E0CC] text-lg font-medium mb-2" }, "\xC7erez Tercihleri"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm mb-6" }, "Hangi \xE7erez t\xFCrlerine izin verece\u011Finizi se\xE7in."), [
        { key: "necessary", label: "Gerekli \xC7erezler", desc: "Siteyi \xE7al\u0131\u015Ft\u0131rmak i\xE7in zorunludur.", disabled: true },
        { key: "analytics", label: "Analitik \xC7erezler", desc: "Site kullan\u0131m\u0131n\u0131 anonim olarak izlememize yard\u0131mc\u0131 olur." },
        { key: "marketing", label: "Pazarlama \xC7erezleri", desc: "Size \xF6zel i\xE7erik ve reklamlar g\xF6stermemizi sa\u011Flar." }
      ].map((c) => /* @__PURE__ */ React.createElement("label", { key: c.key, className: `flex items-start gap-3 py-3 border-b border-[#DEDBC8]/5 ${c.disabled ? "opacity-50" : "cursor-pointer"}` }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: prefs[c.key], disabled: c.disabled, onChange: (e) => setPrefs({ ...prefs, [c.key]: e.target.checked }), className: "mt-0.5 accent-[#DEDBC8]" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[#E1E0CC] text-sm" }, c.label), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs mt-0.5" }, c.desc)))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-6" }, /* @__PURE__ */ React.createElement("button", { onClick: acceptSelected, className: "flex-1 px-4 py-2.5 bg-[#DEDBC8] text-black text-sm font-medium rounded-full hover:bg-[#E8E5D4] active:scale-95 transition-all" }, "Se\xE7imleri Kaydet"), /* @__PURE__ */ React.createElement("button", { onClick: acceptAll, className: "flex-1 px-4 py-2.5 border border-[#DEDBC8]/20 text-[#DEDBC8] text-sm font-medium rounded-full hover:border-[#DEDBC8]/40 active:scale-95 transition-all" }, "T\xFCm\xFCn\xFC Kabul Et"))));
    }
    return /* @__PURE__ */ React.createElement("div", { className: cn("fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] max-w-[calc(100vw-2rem)] sm:max-w-none", isClosing ? "cookie-exit" : "cookie-enter"), role: "dialog", "aria-label": "\xC7erez bildirimi" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#101010] border border-[#DEDBC8]/20 rounded-2xl p-5 sm:p-6 sm:w-80 shadow-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center shrink-0" }, /* @__PURE__ */ React.createElement(SJ.CookieIcon, { size: 20, className: "text-[#DEDBC8]" })), /* @__PURE__ */ React.createElement("h3", { className: "text-[#E1E0CC] text-base font-medium leading-snug" }, "Gizlili\u011Finiz bizim i\xE7in \xF6nemli")), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm leading-relaxed mb-5" }, "Sitemiz, deneyiminizi iyile\u015Ftirmek i\xE7in \xE7erezleri kullanmaktad\u0131r."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowOptions(true), className: "text-[#DEDBC8]/60 underline text-sm hover:text-[#DEDBC8] transition-colors shrink-0 bg-transparent border-none cursor-pointer" }, "Se\xE7enekler"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("button", { onClick: decline, className: "px-4 py-2 border border-[#DEDBC8]/20 rounded-full text-gray-400 text-sm hover:border-[#DEDBC8]/40 hover:text-[#DEDBC8] active:scale-95 transition-all" }, "Reddet"), /* @__PURE__ */ React.createElement("button", { onClick: acceptAll, className: "px-4 py-2 bg-[#DEDBC8] rounded-full text-black text-sm font-medium active:scale-95 transition-all hover:bg-[#E8E5D4]" }, "Kabul Et")))));
  };
  SJ.CircleProgress = function CircleProgress({ percentage }) {
    const s = 24, sw = 2.5, r = (s - sw) / 2, c = 2 * Math.PI * r, o = c - percentage / 100 * c;
    return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, className: "-rotate-90 shrink-0" }, /* @__PURE__ */ React.createElement("circle", { cx: s / 2, cy: s / 2, r, fill: "none", stroke: "var(--muted)", strokeWidth: sw }), /* @__PURE__ */ React.createElement("circle", { cx: s / 2, cy: s / 2, r, fill: "none", stroke: "var(--foreground)", strokeWidth: sw, strokeDasharray: c, strokeDashoffset: o, strokeLinecap: "round", style: { transition: "stroke-dashoffset 0.15s ease-out" } }));
  };
  SJ.DynamicIslandTOC = function DynamicIslandTOC() {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const rafId = useRef(null);
    const handleScroll = useCallback(() => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > window.innerHeight * 0.5);
        rafId.current = null;
      });
    }, []);
    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    }, [handleScroll]);
    useEffect(() => {
      const getHeadings = () => {
        const els = Array.from(document.querySelectorAll("[data-toc]"));
        const valid = els.filter((el) => !el.hasAttribute("data-toc-ignore")).map((el, idx) => {
          if (!el.id) {
            el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || `toc-${idx}`;
          }
          const da = el.getAttribute("data-toc-depth");
          let level = 2;
          if (da) {
            level = parseInt(da, 10);
          } else {
            const t2 = el.tagName.toUpperCase();
            if (t2.startsWith("H") && t2.length === 2) level = parseInt(t2[1], 10);
          }
          return { id: el.id, text: el.getAttribute("data-toc-title") || el.textContent || "B\xF6l\xFCm", level, element: el };
        });
        valid.sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        setHeadings(valid);
      };
      const t = setTimeout(getHeadings, 300);
      return () => clearTimeout(t);
    }, []);
    useEffect(() => {
      if (headings.length === 0) return;
      const handle = () => {
        let cur = null;
        for (const h of headings) {
          if (h.element.getBoundingClientRect().top <= 120) cur = h.id;
          else break;
        }
        if (!cur && headings.length > 0) cur = headings[0].id;
        setActiveId(cur);
        const tot = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(tot > 0 ? Math.min(100, Math.max(0, window.scrollY / tot * 100)) : 0);
      };
      window.addEventListener("scroll", handle, { passive: true });
      handle();
      return () => window.removeEventListener("scroll", handle);
    }, [headings]);
    const activeHeading = headings.find((h) => h.id === activeId);
    const minLevel = useMemo(() => headings.length === 0 ? 1 : Math.min(...headings.map((h) => h.level)), [headings]);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const cW = isMobile ? 220 : 280, eW = isMobile ? Math.min(300, window.innerWidth - 32) : 340;
    const cH = isMobile ? 48 : 52, eH = isMobile ? 340 : 400;
    if (!isVisible || headings.length === 0) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? "auto" : "none", transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)" }, onClick: () => setIsExpanded(false) }), /* @__PURE__ */ React.createElement("div", { className: "island-enter", style: { position: "fixed", bottom: 30, left: "50%", zIndex: 9999, transform: "translate(-50%,0)", display: "flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => {
      if (!isExpanded) setIsExpanded(true);
    }, style: {
      width: isExpanded ? eW : cW,
      height: isExpanded ? eH : cH,
      borderRadius: isExpanded ? 24 : 26,
      cursor: isExpanded ? "default" : "pointer",
      overflow: "hidden",
      border: "1px solid rgba(225,224,204,0.1)",
      background: "#101010",
      color: "#E1E0CC",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      transition: "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s cubic-bezier(0.22,1,0.36,1)",
      position: "relative"
    } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 16, padding: "0 16px 0 20px", opacity: isExpanded ? 0 : 1, transform: isExpanded ? "scale(0.95)" : "scale(1)", filter: isExpanded ? "blur(4px)" : "blur(0px)", pointerEvents: isExpanded ? "none" : "auto", transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "#E1E0CC", flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: "100%", display: "flex", alignItems: "center", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 14, fontWeight: 500, color: "#E1E0CC" } }, activeHeading?.text || "\u0130\xE7indekiler")), /* @__PURE__ */ React.createElement(SJ.CircleProgress, { percentage: progress })), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "scale(1)" : "scale(1.05)", pointerEvents: isExpanded ? "auto" : "none", transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 12px 24px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(225,224,204,0.45)" } }, "\u0130\xC7\u0130NDEK\u0130LER"), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
      e.stopPropagation();
      setIsExpanded(false);
    }, style: { color: "rgba(225,224,204,0.45)", background: "none", border: "none", cursor: "pointer", padding: 4 }, "aria-label": "Kapat" }, /* @__PURE__ */ React.createElement(SJ.XIcon, { size: 18 }))), /* @__PURE__ */ React.createElement("div", { className: "toc-scroll", style: { flex: 1, overflowY: "auto", overscrollBehavior: "contain", padding: "0 12px 16px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } }, headings.map((h) => {
      const ia = activeId === h.id, ih = hoveredId === h.id;
      const il = Math.max(0, h.level - minLevel), pl = il * 14 + 12;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: h.id,
          onMouseEnter: () => setHoveredId(h.id),
          onMouseLeave: () => setHoveredId(null),
          onClick: (e) => {
            e.stopPropagation();
            const y = h.element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
            setIsExpanded(false);
          },
          style: { paddingLeft: `${pl}px`, display: "flex", width: "100%", flexShrink: 0, cursor: "pointer", alignItems: "center", border: "none", textAlign: "left", fontSize: 14, borderRadius: 8, padding: "8px 12px", transition: "all 0.3s ease-out", background: ia ? "rgba(225,224,204,0.1)" : ih ? "rgba(225,224,204,0.05)" : "transparent", color: ia ? "#E1E0CC" : ih ? "rgba(225,224,204,0.85)" : "rgba(225,224,204,0.45)", fontWeight: ia ? 500 : 400 }
        },
        /* @__PURE__ */ React.createElement("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "transform 0.3s ease", transform: ih && !ia ? "translateX(4px)" : "translateX(0)" } }, h.text),
        /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 12, width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: "#E1E0CC", transform: ia ? "scale(1)" : "scale(0)", opacity: ia ? 1 : 0, transition: "transform 0.3s ease, opacity 0.3s ease" } })
      );
    })))))));
  };
})();
(function() {
  const SJ = window.SJ;
  const { useState, useEffect, useRef, useMemo } = React;
  const cn = SJ.cn;
  SJ.WordsPullUp = function WordsPullUp({ text, className = "", showAsterisk = false }) {
    const [ref, isInView] = SJ.useInView({ once: true, margin: "-50px" });
    const words = text.split(" ");
    return /* @__PURE__ */ React.createElement("span", { ref, className: cn("flex flex-wrap justify-center w-full", className) }, words.map((word, i) => {
      const isLast = i === words.length - 1;
      const delay = i * 0.08;
      return /* @__PURE__ */ React.createElement("span", { key: i, className: "word-overflow" }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", transform: isInView ? "translateY(0)" : "translateY(110%)", transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, position: "relative" } }, word, showAsterisk && isLast && /* @__PURE__ */ React.createElement("sup", { style: { position: "absolute", top: "0.65em", right: "-0.3em", fontSize: "0.31em", fontWeight: "normal" } }, "*")));
    }));
  };
  SJ.WordsPullUpMultiStyle = function WordsPullUpMultiStyle({ segments, className = "" }) {
    const [ref, isInView] = SJ.useInView({ once: true, margin: "-50px" });
    const allWords = [];
    segments.forEach((seg, si) => {
      seg.text.split(" ").forEach((w, wi) => {
        allWords.push({ word: w, className: seg.className || "", key: `${si}-${wi}` });
      });
    });
    return /* @__PURE__ */ React.createElement("span", { ref, className: cn("flex flex-wrap justify-center w-full", className) }, allWords.map((item, i) => /* @__PURE__ */ React.createElement("span", { key: item.key, className: "word-overflow" }, /* @__PURE__ */ React.createElement("span", { className: item.className, style: { display: "inline-block", transform: isInView ? "translateY(0)" : "translateY(110%)", transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` } }, item.word))));
  };
  SJ.AnimatedLetter = function AnimatedLetter({ char, index, totalChars, scrollProgress }) {
    const cp = index / totalChars;
    const rs = cp - 0.1;
    const re = cp + 0.05;
    let o = 0.2;
    if (scrollProgress <= rs) o = 0.2;
    else if (scrollProgress >= re) o = 1;
    else {
      o = 0.2 + (scrollProgress - rs) / (re - rs) * 0.8;
    }
    return /* @__PURE__ */ React.createElement("span", { className: "animated-char", style: { opacity: o, transition: "opacity 0.05s ease" } }, char);
  };
  SJ.AnimatedText = function AnimatedText({ text, className = "" }) {
    const ref = useRef(null);
    const [progress, setProgress] = useState(0);
    const rafId = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const handle = () => {
        if (rafId.current) return;
        rafId.current = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const vh = window.innerHeight;
          setProgress(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.8 - vh * 0.2))));
          rafId.current = null;
        });
      };
      window.addEventListener("scroll", handle, { passive: true });
      handle();
      return () => {
        window.removeEventListener("scroll", handle);
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    }, []);
    const words = text.split(" ");
    let charIndexCounter = 0;
    const totalChars = text.length;
    return /* @__PURE__ */ React.createElement("span", { ref, className, style: { display: "block" } }, words.map((word, wIdx) => {
      const wordChars = word.split("");
      return /* @__PURE__ */ React.createElement("span", { key: wIdx, className: "inline-block whitespace-nowrap", style: { marginRight: "0.35em" } }, wordChars.map((char, cIdx) => {
        const globalIndex = charIndexCounter++;
        return /* @__PURE__ */ React.createElement(
          SJ.AnimatedLetter,
          {
            key: cIdx,
            char,
            index: globalIndex,
            totalChars,
            scrollProgress: progress
          }
        );
      }), (() => {
        charIndexCounter++;
        return null;
      })());
    }));
  };
  SJ.FadeUp = function FadeUp({ children, delay = 0, className = "" }) {
    const [ref, iv] = SJ.useInView({ once: true, margin: "-50px" });
    return /* @__PURE__ */ React.createElement("div", { ref, className, style: { opacity: iv ? 1 : 0, transform: iv ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` } }, children);
  };
  SJ.CardEntrance = function CardEntrance({ children, delay = 0, className = "" }) {
    const [ref, iv] = SJ.useInView({ once: true, margin: "-100px" });
    return /* @__PURE__ */ React.createElement("div", { ref, className, style: { opacity: iv ? 1 : 0, transform: iv ? "scale(1)" : "scale(0.95)", transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` } }, children);
  };
})();
(function() {
  const SJ = window.SJ;
  const { useState, useEffect, useRef, useMemo, useCallback } = React;
  SJ.InfiniteSlider = function InfiniteSlider() {
    const [visibleRange, setVisibleRange] = useState({ min: -SJ.SLIDER_CONFIG.BUFFER_SIZE, max: SJ.SLIDER_CONFIG.BUFFER_SIZE });
    const containerRef = useRef(null);
    const state = useRef({ currentY: 0, targetY: 0, isDragging: false, isSnapping: false, snapStart: { time: 0, y: 0, target: 0 }, lastScrollTime: Date.now(), dragStart: { y: 0, scrollY: 0 }, projectHeight: 0 });
    const projectsRef = useRef(/* @__PURE__ */ new Map());
    const minimapRef = useRef(/* @__PURE__ */ new Map());
    const infoRef = useRef(/* @__PURE__ */ new Map());
    const requestRef = useRef();
    const renderedRange = useRef({ min: -SJ.SLIDER_CONFIG.BUFFER_SIZE, max: SJ.SLIDER_CONFIG.BUFFER_SIZE });
    const [currentIndex, setCurrentIndex] = useState(0);
    const lerp = (s, e, f) => s + (e - s) * f;
    const getData = (i) => SJ.SLIDER_DATA[(Math.abs(i) % SJ.SLIDER_DATA.length + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length];
    const getNum = (i) => ((Math.abs(i) % SJ.SLIDER_DATA.length + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length + 1).toString().padStart(2, "0");
    const updateParallax = (img, scroll, index, height) => {
      if (!img) return;
      if (!img.dataset.pc) img.dataset.pc = "0";
      let cur = parseFloat(img.dataset.pc);
      const tgt = (-scroll - index * height) * 0.2;
      cur = lerp(cur, tgt, 0.1);
      if (Math.abs(cur - tgt) > 0.01) {
        img.style.transform = `translateY(${cur}px) scale(1.5)`;
        img.dataset.pc = cur.toString();
      }
    };
    const snapToProject = () => {
      const s = state.current;
      const cur = Math.round(-s.targetY / s.projectHeight);
      s.isSnapping = true;
      s.snapStart = { time: Date.now(), y: s.targetY, target: -cur * s.projectHeight };
    };
    const updatePositions = () => {
      const s = state.current;
      const mmY = s.currentY * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT / s.projectHeight;
      projectsRef.current.forEach((el, i) => {
        el.style.transform = `translateY(${i * s.projectHeight + s.currentY}px)`;
        updateParallax(el.querySelector("img"), s.currentY, i, s.projectHeight);
      });
      minimapRef.current.forEach((el, i) => {
        el.style.transform = `translateY(${i * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT + mmY}px)`;
        updateParallax(el.querySelector("img"), mmY, i, SJ.SLIDER_CONFIG.MINIMAP_HEIGHT);
      });
      infoRef.current.forEach((el, i) => {
        el.style.transform = `translateY(${i * SJ.SLIDER_CONFIG.MINIMAP_HEIGHT + mmY}px)`;
      });
    };
    const animate = () => {
      const s = state.current;
      const now = Date.now();
      if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
        const sp = -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
        if (Math.abs(s.targetY - sp) > 1) snapToProject();
      }
      if (s.isSnapping) {
        const prog = Math.min((Date.now() - s.snapStart.time) / SJ.SLIDER_CONFIG.SNAP_DURATION, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
        if (prog >= 1) s.isSnapping = false;
      }
      if (!s.isDragging) s.currentY += (s.targetY - s.currentY) * SJ.SLIDER_CONFIG.LERP_FACTOR;
      updatePositions();
      const ci = Math.round(-s.targetY / s.projectHeight);
      setCurrentIndex(ci);
      const min = ci - SJ.SLIDER_CONFIG.BUFFER_SIZE, max = ci + SJ.SLIDER_CONFIG.BUFFER_SIZE;
      if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
        renderedRange.current = { min, max };
        setVisibleRange({ min, max });
      }
    };
    const goToProject = (dir) => {
      const s = state.current;
      const cur = Math.round(-s.targetY / s.projectHeight);
      const next = cur + dir;
      s.isSnapping = true;
      s.snapStart = { time: Date.now(), y: s.targetY, target: -next * s.projectHeight };
    };
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      state.current.projectHeight = container.offsetHeight;
      const onWheel = (e) => {
        e.preventDefault();
        const s = state.current;
        s.isSnapping = false;
        s.lastScrollTime = Date.now();
        const delta = Math.max(Math.min(e.deltaY * SJ.SLIDER_CONFIG.SCROLL_SPEED, SJ.SLIDER_CONFIG.MAX_VELOCITY), -SJ.SLIDER_CONFIG.MAX_VELOCITY);
        s.targetY -= delta;
      };
      const onTS = (e) => {
        const s = state.current;
        s.isDragging = true;
        s.isSnapping = false;
        s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
        s.lastScrollTime = Date.now();
      };
      const onTM = (e) => {
        const s = state.current;
        if (!s.isDragging) return;
        s.targetY = s.dragStart.scrollY + (e.touches[0].clientY - s.dragStart.y) * 1.5;
        s.lastScrollTime = Date.now();
      };
      const onTE = () => {
        state.current.isDragging = false;
      };
      const onResize = () => {
        state.current.projectHeight = container.offsetHeight;
      };
      container.addEventListener("wheel", onWheel, { passive: false });
      container.addEventListener("touchstart", onTS, { passive: true });
      container.addEventListener("touchmove", onTM, { passive: true });
      container.addEventListener("touchend", onTE);
      window.addEventListener("resize", onResize);
      onResize();
      const loop = () => {
        animate();
        requestRef.current = requestAnimationFrame(loop);
      };
      requestRef.current = requestAnimationFrame(loop);
      return () => {
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("touchstart", onTS);
        container.removeEventListener("touchmove", onTM);
        container.removeEventListener("touchend", onTE);
        window.removeEventListener("resize", onResize);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      };
    }, []);
    const indices = [];
    for (let i = visibleRange.min; i <= visibleRange.max; i++) indices.push(i);
    const displayIndex = (Math.abs(currentIndex) % SJ.SLIDER_DATA.length + SJ.SLIDER_DATA.length) % SJ.SLIDER_DATA.length + 1;
    return /* @__PURE__ */ React.createElement("div", { ref: containerRef, className: "slider-container", style: { cursor: state.current.isDragging ? "grabbing" : "default" } }, /* @__PURE__ */ React.createElement("ul", { className: "slider-project-list" }, indices.map((i) => {
      const d = getData(i);
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "slider-project", ref: (el) => {
        if (el) projectsRef.current.set(i, el);
        else projectsRef.current.delete(i);
      } }, /* @__PURE__ */ React.createElement("img", { src: d.image, alt: d.title, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { className: "slider-info-overlay md:hidden" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#DEDBC8]/60 tracking-widest uppercase" }, d.category, " \u2014 ", d.year), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-medium mt-1", style: { color: "#E1E0CC" } }, d.title), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-xs mt-1" }, d.description)));
    })), /* @__PURE__ */ React.createElement("div", { className: "slider-minimap hidden md:flex" }, /* @__PURE__ */ React.createElement("div", { className: "slider-minimap-wrapper" }, /* @__PURE__ */ React.createElement("div", { className: "slider-minimap-preview" }, indices.map((i) => {
      const d = getData(i);
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "slider-minimap-img", ref: (el) => {
        if (el) minimapRef.current.set(i, el);
        else minimapRef.current.delete(i);
      } }, /* @__PURE__ */ React.createElement("img", { src: d.image, alt: d.title, loading: "lazy" }));
    })), /* @__PURE__ */ React.createElement("div", { className: "slider-minimap-info-list" }, indices.map((i) => {
      const d = getData(i);
      const n = getNum(i);
      return /* @__PURE__ */ React.createElement("div", { key: i, className: "slider-minimap-info", ref: (el) => {
        if (el) infoRef.current.set(i, el);
        else infoRef.current.delete(i);
      } }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#DEDBC8]/40 text-xs tracking-widest" }, n), /* @__PURE__ */ React.createElement("span", { className: "text-[#DEDBC8]/40 text-xs" }, d.year)), /* @__PURE__ */ React.createElement("h4", { className: "text-base font-medium mb-1", style: { color: "#E1E0CC" } }, d.title), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-[#DEDBC8]/50 tracking-widest uppercase" }, d.category), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-xs mt-3" }, d.description));
    })))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => goToProject(-1), className: "slider-nav-btn", "aria-label": "\xD6nceki" }, /* @__PURE__ */ React.createElement(SJ.ChevronUp, { size: 18 })), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-[#DEDBC8]/40 tracking-widest w-12 text-center" }, displayIndex.toString().padStart(2, "0"), " / ", SJ.SLIDER_DATA.length.toString().padStart(2, "0")), /* @__PURE__ */ React.createElement("button", { onClick: () => goToProject(1), className: "slider-nav-btn", "aria-label": "Sonraki" }, /* @__PURE__ */ React.createElement(SJ.ChevronDown, { size: 18 }))), /* @__PURE__ */ React.createElement("div", { className: "absolute top-4 left-1/2 -translate-x-1/2 z-10 text-[10px] text-[#DEDBC8]/30 tracking-widest uppercase hidden md:block" }, "Kayd\u0131rarak gezin"));
  };
})();
(function() {
  const SJ = window.SJ;
  const { useState, useEffect } = React;
  SJ.HeroSection = function HeroSection() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { id: "hero", className: "h-screen", "aria-label": "Ana b\xF6l\xFCm" }, /* @__PURE__ */ React.createElement("div", { className: "relative h-full overflow-hidden" }, /* @__PURE__ */ React.createElement("video", { ref: (el) => {
      if (el) {
        el.muted = true;
        el.play().catch((e) => console.log("Hero video autoplay failed", e));
      }
    }, loop: true, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("source", { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4", type: "video/mp4" })), /* @__PURE__ */ React.createElement("div", { className: "noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0 z-10", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-20", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("nav", { className: "fixed top-0 left-1/2 -translate-x-1/2 z-[190] bg-black/90 backdrop-blur-sm rounded-b-2xl md:rounded-b-3xl px-3 py-1.5 md:px-6 hidden md:block", role: "navigation", "aria-label": "Ana navigasyon" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 sm:gap-5 md:gap-10 lg:gap-12" }, /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "flex-shrink-0" }, /* @__PURE__ */ React.createElement("img", { src: "/logo.png", alt: "S\u0131hana Jorin", className: "h-8 md:h-9 w-auto" })), /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "nav-link text-[10px] sm:text-xs md:text-sm" }, "Ana Sayfa"), /* @__PURE__ */ React.createElement("a", { href: "hakkimizda.html", className: "nav-link text-[10px] sm:text-xs md:text-sm" }, "Hikayemiz"), /* @__PURE__ */ React.createElement("a", { href: "galeri.html", className: "nav-link text-[10px] sm:text-xs md:text-sm" }, "Galeri"), /* @__PURE__ */ React.createElement("a", { href: "duyurular.html", className: "nav-link text-[10px] sm:text-xs md:text-sm" }, "Duyurular"), /* @__PURE__ */ React.createElement("a", { href: "iletisim.html", className: "nav-link text-[10px] sm:text-xs md:text-sm" }, "\u0130leti\u015Fim"))), /* @__PURE__ */ React.createElement("div", { className: "fixed top-0 left-0 right-0 z-[190] flex items-center justify-between px-4 h-14 md:hidden" }, /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "flex-shrink-0 leading-none" }, /* @__PURE__ */ React.createElement("img", { src: "/logo.png", alt: "S\u0131hana Jorin", className: "h-8 w-auto" })), /* @__PURE__ */ React.createElement("button", { onClick: () => setMenuOpen(true), className: "flex items-center justify-center w-9 h-9 rounded-full bg-black cursor-pointer", "aria-label": "Men\xFCy\xFC a\xE7" }, /* @__PURE__ */ React.createElement(SJ.MenuIcon, { size: 18, className: "text-[#E1E0CC]" }))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 z-30 p-6 md:p-10 lg:p-14" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-12 gap-4 items-end" }, /* @__PURE__ */ React.createElement("div", { className: "col-span-12 lg:col-span-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]", style: { color: "#E1E0CC" } }, /* @__PURE__ */ React.createElement(SJ.WordsPullUp, { text: "S\u0131hana Jorin", showAsterisk: true }))), /* @__PURE__ */ React.createElement("div", { className: "col-span-12 lg:col-span-4 lg:pb-4" }, /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.5 }, /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm md:text-base mb-5", style: { lineHeight: 1.35, color: "rgba(222,219,200,0.7)" } }, "Besler K\xF6y\xFC, kadim ad\u0131yla S\xEEhana Jorin; sars\u0131lmaz ba\u011Flar\u0131n, eme\u011Fin ve misafirperverli\u011Fin merkezidir. Do\u011Fubayaz\u0131t'\u0131n g\xFCneyinde, nesiller boyu aktar\u0131lan g\xFC\xE7l\xFC bir aidiyetin sembol\xFCd\xFCr.")), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.7 }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "gonullu.html",
        style: {
          display: isMobile ? "flex" : "inline-flex",
          width: isMobile ? "100%" : "auto",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : "flex-start",
          gap: "10px",
          background: "#DEDBC8",
          color: "#000",
          fontWeight: 500,
          fontSize: "0.875rem",
          borderRadius: "9999px",
          padding: isMobile ? "12px 12px 12px 24px" : "8px 8px 8px 20px",
          textDecoration: "none",
          boxShadow: "0 2px 20px rgba(0,0,0,0.35)",
          transition: "opacity 0.2s"
        }
      },
      "Derne\u011Fe Kat\u0131l",
      /* @__PURE__ */ React.createElement("span", { style: {
        background: "#000",
        borderRadius: "50%",
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      } }, /* @__PURE__ */ React.createElement(SJ.ArrowRight, { size: 16, style: { color: "#E1E0CC" } }))
    ))))))), /* @__PURE__ */ React.createElement(SJ.HamburgerMenu, { isOpen: menuOpen, onClose: () => setMenuOpen(false) }));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.AboutSection = function AboutSection() {
    const a = SJ.SITE_DATA && SJ.SITE_DATA.about || {};
    return /* @__PURE__ */ React.createElement("section", { id: "about", className: "bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6", "aria-label": "Hakk\u0131m\u0131zda" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto text-center" }, /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0 }, /* @__PURE__ */ React.createElement("span", { className: "text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 block" }, a.badge || "Ge\xE7mi\u015Fin Miras\u0131, Gelece\u011Fin \u0130nanc\u0131")), /* @__PURE__ */ React.createElement("h2", { "data-toc": true, "data-toc-title": "Hikayemiz", "data-toc-depth": "1", id: "about-heading", className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]", style: { color: "#E1E0CC" } }, /* @__PURE__ */ React.createElement(SJ.WordsPullUpMultiStyle, { segments: [
      { text: a.title || "Serhat b\xF6lgesinin kalbinde, A\u011Fr\u0131 Da\u011F\u0131'n\u0131n g\xF6lgesinde k\xF6kl\xFC bir ge\xE7mi\u015Fe ev sahipli\u011Fi yapan Besler K\xF6y\xFC,", className: "" },
      { text: "bilinen ve kadim ad\u0131yla S\xEEhana Jorin;", className: "italic font-serif" },
      { text: "sars\u0131lmaz ba\u011Flar\u0131n, eme\u011Fin ve misafirperverli\u011Fin merkezidir.", className: "" }
    ] })), /* @__PURE__ */ React.createElement(
      SJ.AnimatedText,
      {
        text: a.animatedText || "Sert k\u0131\u015Flar\u0131na inat s\u0131cak insan hikayeleriyle filizlenen k\xF6y\xFCm\xFCz, geleneksel hayvanc\u0131l\u0131k k\xFClt\xFCr\xFCyle topra\u011F\u0131na ba\u011Fl\u0131 kal\u0131rken; metropollerden Avrupa'ya uzanan g\xFC\xE7l\xFC diasporas\u0131yla da ba\u011Flar\u0131n\u0131 asla koparmam\u0131\u015Ft\u0131r. Bug\xFCn S\xEEhana Jorin; ge\xE7mi\u015Fin k\xFClt\xFCrel miras\u0131n\u0131 koruyan, gen\xE7 nesillerin enerjisiyle gelece\u011Fe umutla bakan ve nerede olursak olal\u0131m hepimizi ayn\u0131 samimiyette bulu\u015Fturan ortak evimizdir.",
        className: "text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-10 md:mt-14 leading-relaxed"
      }
    ), /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "K\xFClt\xFCrel Miras\u0131m\u0131z", "data-toc-depth": "2", id: "about-heritage", className: "mt-16 md:mt-20 max-w-2xl mx-auto text-left" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl sm:text-2xl md:text-3xl font-medium mb-4", style: { color: "#E1E0CC" } }, a.heritageTitle || "K\xFClt\xFCrel Miras\u0131m\u0131z"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed" }, a.heritageText || "K\xF6y\xFCm\xFCz\xFCn k\xF6kl\xFC gelenekleri, y\xF6resel tatlar\u0131, m\xFCzi\u011Fi ve el sanatlar\u0131 nesiller boyu aktar\u0131lan bir hazinedir.")), /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "Dayan\u0131\u015Fma Ruhu", "data-toc-depth": "2", id: "about-solidarity", className: "mt-12 max-w-2xl mx-auto text-left" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xl sm:text-2xl md:text-3xl font-medium mb-4", style: { color: "#E1E0CC" } }, a.solidarityTitle || "Dayan\u0131\u015Fma Ruhu"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed" }, a.solidarityText || "S\u0131hana Jorin Derne\u011Fi olarak, k\xF6y halk\u0131n\u0131n birlik ve beraberli\u011Fini g\xFC\xE7lendirmek i\xE7in durmaks\u0131z\u0131n \xE7al\u0131\u015F\u0131yoruz."))));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.GallerySection = function GallerySection() {
    return /* @__PURE__ */ React.createElement("section", { id: "gallery", className: "bg-black relative", "aria-label": "Galeri" }, /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "Galeri", "data-toc-depth": "1", id: "gallery-heading", className: "absolute top-6 left-1/2 -translate-x-1/2 z-10" }, /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0 }, /* @__PURE__ */ React.createElement("span", { className: "text-primary text-[10px] sm:text-xs tracking-widest uppercase bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#DEDBC8]/10" }, "Foto\u011Fraf Galerisi"))), /* @__PURE__ */ React.createElement(SJ.InfiniteSlider, null));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.FeaturesSection = function FeaturesSection() {
    const f = SJ.SITE_DATA && SJ.SITE_DATA.features || {};
    return /* @__PURE__ */ React.createElement("section", { id: "features", className: "min-h-screen bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6 relative", "aria-label": "\xC7al\u0131\u015Fmalar\u0131m\u0131z" }, /* @__PURE__ */ React.createElement("div", { className: "bg-noise opacity-[0.15] absolute inset-0 z-0", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-12 md:mb-16" }, /* @__PURE__ */ React.createElement("h2", { "data-toc": true, "data-toc-title": "\xC7al\u0131\u015Fmalar\u0131m\u0131z", "data-toc-depth": "1", id: "features-heading", className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal", style: { color: "#E1E0CC" } }, /* @__PURE__ */ React.createElement(SJ.WordsPullUpMultiStyle, { segments: [{ text: f.title || "K\xF6y\xFCm\xFCz i\xE7in g\xFC\xE7l\xFC bir gelecek in\u015Fa ediyoruz.", className: "" }] })), /* @__PURE__ */ React.createElement("p", { className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-3" }, /* @__PURE__ */ React.createElement(SJ.WordsPullUpMultiStyle, { segments: [{ text: f.subtitle || "Birlikten do\u011Fan g\xFC\xE7. Gelenekten beslenen gelecek.", className: "" }] }))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1" }, /* @__PURE__ */ React.createElement(SJ.CardEntrance, { delay: 0, className: "relative rounded-2xl overflow-hidden lg:h-[480px] min-h-[300px]" }, /* @__PURE__ */ React.createElement("video", { ref: (el) => {
      if (el) {
        el.muted = true;
        el.play().catch((e) => console.log("Features video autoplay failed", e));
      }
    }, loop: true, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("source", { src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4", type: "video/mp4" })), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 p-5" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm sm:text-base font-medium", style: { color: "#E1E0CC" } }, f.card1Label || "K\xF6y\xFCm\xFCz\xFCn g\xFCzellikleri"))), /* @__PURE__ */ React.createElement(SJ.CardEntrance, { delay: 0.15, className: "feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "K\xFClt\xFCrel Etkinlikler", "data-toc-depth": "2", id: "feat-culture" }, /* @__PURE__ */ React.createElement("img", { src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85", alt: "K\xFClt\xFCrel etkinlikler ikonu", className: "w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" }), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500 text-xs" }, "(01)"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg sm:text-xl font-medium mt-1", style: { color: "#E1E0CC" } }, f.card2Title || "K\xFClt\xFCrel Etkinlikler"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 space-y-3" }, (f.card2Items || ["Y\u0131ll\u0131k k\xF6y festivali ve \u015Fenlikleri", "Geleneksel el sanatlar\u0131 at\xF6lyeleri", "Y\xF6resel m\xFCzik ve halk oyunlar\u0131", "K\xFClt\xFCrel miras belgesel \xE7al\u0131\u015Fmalar\u0131"]).map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(SJ.Check, { size: 16, className: "text-primary mt-0.5 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 text-sm" }, item)))), /* @__PURE__ */ React.createElement("a", { href: "duyurular.html", className: "learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4" }, "Daha fazla", /* @__PURE__ */ React.createElement("span", { className: "learn-arrow", style: { transform: "rotate(-45deg)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(SJ.ArrowRight, { size: 14 })))), /* @__PURE__ */ React.createElement(SJ.CardEntrance, { delay: 0.3, className: "feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "Dayan\u0131\u015Fma A\u011F\u0131", "data-toc-depth": "2", id: "feat-network" }, /* @__PURE__ */ React.createElement("img", { src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85", alt: "Dayan\u0131\u015Fma a\u011F\u0131 ikonu", className: "w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" }), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500 text-xs" }, "(02)"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg sm:text-xl font-medium mt-1", style: { color: "#E1E0CC" } }, f.card3Title || "Dayan\u0131\u015Fma A\u011F\u0131"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 space-y-3" }, (f.card3Items || ["Dijital ar\u015Fiv ve belge tarama sistemi", "K\xF6y hikayeleri ve an\u0131 derlemeleri", "\u0130leti\u015Fim a\u011F\u0131 ve yard\u0131mla\u015Fma platformu"]).map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(SJ.Check, { size: 16, className: "text-primary mt-0.5 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 text-sm" }, item)))), /* @__PURE__ */ React.createElement("a", { href: "iletisim.html", className: "learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4" }, "Daha fazla", /* @__PURE__ */ React.createElement("span", { className: "learn-arrow", style: { transform: "rotate(-45deg)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(SJ.ArrowRight, { size: 14 })))), /* @__PURE__ */ React.createElement(SJ.CardEntrance, { delay: 0.45, className: "feature-card bg-[#212121] rounded-2xl p-5 sm:p-6 lg:h-[480px] flex flex-col" }, /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "E\u011Fitim Destekleri", "data-toc-depth": "2", id: "feat-education" }, /* @__PURE__ */ React.createElement("img", { src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20250405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85", alt: "E\u011Fitim destekleri ikonu", className: "w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4" }), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500 text-xs" }, "(03)"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg sm:text-xl font-medium mt-1", style: { color: "#E1E0CC" } }, f.card4Title || "E\u011Fitim Destekleri"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 space-y-3" }, (f.card4Items || ["Burs programlar\u0131 ve e\u011Fitim deste\u011Fi", "Gen\xE7lik kamplar\u0131 ve at\xF6lye \xE7al\u0131\u015Fmalar\u0131", "Program takvimi ve etkinlik senkronizasyonu"]).map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(SJ.Check, { size: 16, className: "text-primary mt-0.5 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 text-sm" }, item)))), /* @__PURE__ */ React.createElement("a", { href: "gonullu.html", className: "learn-more-group inline-flex items-center gap-1 text-primary text-sm mt-4" }, "Daha fazla", /* @__PURE__ */ React.createElement("span", { className: "learn-arrow", style: { transform: "rotate(-45deg)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(SJ.ArrowRight, { size: 14 })))))));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.ContactSection = function ContactSection() {
    const c = SJ.SITE_DATA && SJ.SITE_DATA.contact || {};
    return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6", "aria-label": "\u0130leti\u015Fim" }, /* @__PURE__ */ React.createElement("div", { "data-toc": true, "data-toc-title": "\u0130leti\u015Fim", "data-toc-depth": "1", id: "contact-heading", className: "bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 md:py-24 px-6 md:px-12 w-full max-w-[95%] xl:max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0 }, /* @__PURE__ */ React.createElement("span", { className: "text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 block" }, c.badge || "Bize Ula\u015F\u0131n")), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.1 }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-8", style: { color: "#E1E0CC" } }, c.title || "Birlikte daha g\xFC\xE7l\xFCy\xFCz")), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.2 }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed mb-8" }, c.description || "Derne\u011Fimize kat\u0131lmak, fikir payla\u015Fmak veya herhangi bir konuda bizimle ileti\u015Fime ge\xE7mek isterseniz, her zaman buraday\u0131z.")), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.3 }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-gray-400 text-sm" }, /* @__PURE__ */ React.createElement(SJ.MapPin, { size: 18, className: "text-[#DEDBC8] shrink-0" }), /* @__PURE__ */ React.createElement("span", null, c.address || "S\u0131hana Jorin K\xF6y\xFC, Merkez Mahallesi, No:1")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-gray-400 text-sm" }, /* @__PURE__ */ React.createElement(SJ.Phone, { size: 18, className: "text-[#DEDBC8] shrink-0" }), /* @__PURE__ */ React.createElement("span", null, c.phone || "+90 (544) 917 77 01")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-gray-400 text-sm" }, /* @__PURE__ */ React.createElement(SJ.Mail, { size: 18, className: "text-[#DEDBC8] shrink-0" }), /* @__PURE__ */ React.createElement("span", null, c.email || "omerozbay104@gmail.com"))))), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.2 }, /* @__PURE__ */ React.createElement("form", { className: "space-y-5", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-500 uppercase tracking-wider mb-1.5 block" }, "Ad Soyad"), /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: "Ad\u0131n\u0131z Soyad\u0131n\u0131z", className: "w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-500 uppercase tracking-wider mb-1.5 block" }, "E-posta"), /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: "ornek@email.com", className: "w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs text-gray-500 uppercase tracking-wider mb-1.5 block" }, "Mesaj\u0131n\u0131z"), /* @__PURE__ */ React.createElement("textarea", { rows: 4, placeholder: "Mesaj\u0131n\u0131z\u0131 yaz\u0131n...", className: "w-full bg-[#1a1a1a] border border-[#DEDBC8]/10 rounded-xl px-4 py-3 text-sm text-[#E1E0CC] placeholder-gray-600 focus:outline-none focus:border-[#DEDBC8]/30 transition-colors resize-none" })), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "wa-send-btn button-spring w-full" }, /* @__PURE__ */ React.createElement("div", { className: "svg-wrapper-1" }, /* @__PURE__ */ React.createElement("div", { className: "svg-wrapper" }, /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.356 1.449 5.405 0 9.803-4.394 9.806-9.8.003-5.396-4.39-9.789-9.801-9.789-5.403 0-9.799 4.393-9.802 9.8-.001 1.997.519 3.945 1.508 5.666l-.993 3.626 3.726-.952zm11.12-6.17c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.654.145-.193.29-.748.944-.917 1.138-.17.193-.338.217-.628.072-2.825-1.413-4.64-3.084-5.46-4.498-.218-.376-.023-.578.167-.768.171-.171.38-.444.57-.667.19-.22.254-.377.38-.628.127-.25.063-.467-.031-.661-.095-.193-.654-1.58-.895-2.16-.236-.57-.475-.492-.654-.501-.17-.008-.364-.01-.557-.01-.193 0-.507.072-.772.361-.266.29-1.014.992-1.014 2.417s1.04 2.796 1.185 2.99c.145.193 2.049 3.128 4.964 4.385.693.3 1.233.478 1.655.612.697.22 1.33.19 1.83.115.557-.08 1.72-.7 1.962-1.375.242-.676.242-1.255.17-1.375-.072-.12-.266-.19-.556-.335z" })))), /* @__PURE__ */ React.createElement("span", null, "WhatsApp ile G\xF6nder")))))));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.Footer = function Footer() {
    const f = SJ.SITE_DATA && SJ.SITE_DATA.footer || {};
    const socialLinks = [
      { label: "Facebook", href: f.facebook || "https://facebook.com", icon: "Facebook" },
      { label: "TikTok", href: f.tiktok || "https://tiktok.com", icon: "TikTok" }
    ];
    return /* @__PURE__ */ React.createElement("footer", { className: "bg-[#050505] border-t border-[#DEDBC8]/5 pt-16 pb-8 px-4 md:px-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-[95%] xl:max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12" }, /* @__PURE__ */ React.createElement("div", { className: "col-span-2 md:col-span-1" }, /* @__PURE__ */ React.createElement("a", { href: "index.html", className: "inline-block mb-3" }, /* @__PURE__ */ React.createElement("img", { src: "/logo.png", alt: "S\u0131hana Jorin", style: { height: "2.25rem", width: "auto" } })), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 text-sm leading-relaxed mb-4" }, f.description || "K\xF6y\xFCm\xFCz\xFCn miras\u0131n\u0131 ya\u015Fatmak, gelece\u011Fini in\u015Fa etmek i\xE7in bir araday\u0131z."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-gray-500 text-xs" }, /* @__PURE__ */ React.createElement("a", { href: "https://gucluyumhe.dev", target: "_blank", rel: "noopener", className: "flex items-center gap-1 hover:text-[#DEDBC8] transition-colors", "aria-label": "gucluyumhe.dev" }, /* @__PURE__ */ React.createElement(SJ.Heart, { size: 12, className: "text-[#DEDBC8]" }), " ile yap\u0131ld\u0131"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4" }, "\u0130leti\u015Fim"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("li", { className: "text-gray-500 text-sm" }, f.email || "omerozbay104@gmail.com"), /* @__PURE__ */ React.createElement("li", { className: "text-gray-500 text-sm" }, f.phone || "+90 (544) 917 77 01"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4" }, "Ke\u015Ffet"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "hakkimizda.html", className: "text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors" }, "Hikayemiz")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "galeri.html", className: "text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors" }, "Galeri")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "duyurular.html", className: "text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors" }, "Duyurular")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-semibold tracking-widest uppercase text-[#DEDBC8]/40 mb-4" }, "Destek"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2.5" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "gonullu.html", className: "text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors" }, "G\xF6n\xFCll\xFC Ol")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "iletisim.html", className: "text-gray-500 text-sm hover:text-[#DEDBC8] transition-colors" }, "\u0130leti\u015Fim"))))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-[#DEDBC8]/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-gray-600 text-xs" }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " S\u0131hana Jorin K\xF6y Derne\u011Fi. T\xFCm haklar\u0131 sakl\u0131d\u0131r. ", /* @__PURE__ */ React.createElement("a", { href: "https://gucluyumhe.dev", target: "_blank", rel: "noopener", className: "hover:text-[#DEDBC8] transition-colors" }, "gucluyumhe.dev"), " taraf\u0131ndan yap\u0131lm\u0131\u015Ft\u0131r."), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, socialLinks.map((s) => {
      const Icon = SJ[s.icon];
      return Icon ? /* @__PURE__ */ React.createElement("a", { key: s.label, href: s.href, target: "_blank", rel: "noopener", className: "hover:opacity-70 transition-opacity", style: { display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(222,219,200,0.08)", color: "rgba(222,219,200,0.5)" }, "aria-label": s.label }, /* @__PURE__ */ React.createElement(Icon, { size: 16 })) : null;
    })))));
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.FlippingCard = function FlippingCard({
    className,
    frontContent,
    backContent,
    height = 300,
    width = 350
  }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "group/flipping-card [perspective:1000px]",
        style: { "--height": `${height}px`, "--width": `${width}px` }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: SJ.cn(
            "relative rounded-xl border border-[#DEDBC8]/20 bg-[#101010] shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
            "h-[var(--height)] w-[var(--width)]",
            className
          )
        },
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 h-full w-full rounded-[inherit] bg-[#101010] text-[#E1E0CC] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]" }, /* @__PURE__ */ React.createElement("div", { className: "[transform:translateZ(70px)_scale(.93)] h-full w-full" }, frontContent)),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 h-full w-full rounded-[inherit] bg-[#101010] text-[#E1E0CC] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]" }, /* @__PURE__ */ React.createElement("div", { className: "[transform:translateZ(70px)_scale(.93)] h-full w-full" }, backContent))
      )
    );
  };
})();
(function() {
  const SJ = window.SJ;
  SJ.AnnouncementsSection = function AnnouncementsSection() {
    const raw = window.SJ.DUYURULAR_DATA || [];
    const announcements = raw.slice(0, 4).map((item) => ({
      id: item.id,
      front: { title: item.title, description: item.summary },
      back: { description: item.description, buttonText: item.buttonText, href: item.buttonHref }
    }));
    return /* @__PURE__ */ React.createElement("section", { id: "announcements", className: "bg-black py-20 md:py-28 lg:py-36 px-4 md:px-6", "aria-label": "Duyurular" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-[95%] xl:max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-12" }, /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0 }, /* @__PURE__ */ React.createElement("span", { className: "text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4 block" }, "Duyurular")), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.1 }, /* @__PURE__ */ React.createElement("h2", { className: "text-3xl sm:text-4xl font-medium", style: { color: "#E1E0CC" } }, "K\xF6y\xFCm\xFCzden Haberler"))), /* @__PURE__ */ React.createElement("div", { className: announcements.length === 1 ? "flex justify-center items-center py-4 w-full" : "flex md:flex-wrap justify-start md:justify-center gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-pl-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-none" }, announcements.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, className: "snap-start shrink-0" }, /* @__PURE__ */ React.createElement(
      SJ.FlippingCard,
      {
        width: 270,
        height: 300,
        frontContent: /* @__PURE__ */ React.createElement(AnnouncementFront, { data: a.front }),
        backContent: /* @__PURE__ */ React.createElement(AnnouncementBack, { data: a.back })
      }
    )))), /* @__PURE__ */ React.createElement(SJ.FadeUp, { delay: 0.3 }, /* @__PURE__ */ React.createElement("div", { className: "text-center mt-10" }, /* @__PURE__ */ React.createElement("a", { href: "duyurular.html", className: "inline-flex items-center gap-2 text-sm text-[#DEDBC8]/50 hover:text-[#DEDBC8] transition-colors" }, "T\xFCm duyurular\u0131 g\xF6r ", /* @__PURE__ */ React.createElement(SJ.ArrowRight, { size: 14 }))))));
  };
  function AnnouncementFront({ data }) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col h-full w-full p-3 md:p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(SJ.Bell, { size: 22, className: "text-[#DEDBC8] md:w-7 md:h-7" }))), /* @__PURE__ */ React.createElement("div", { className: "p-1 md:p-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm md:text-base font-semibold mt-1 md:mt-2", style: { color: "#E1E0CC" } }, data.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-[13.5px] mt-1 md:mt-2 text-gray-400" }, data.description)));
  }
  function AnnouncementBack({ data }) {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center h-full w-full p-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-[13.5px] text-gray-400 text-center" }, data.description), /* @__PURE__ */ React.createElement("a", { href: data.href || "duyurular.html", className: "mt-6 bg-[#DEDBC8] text-black px-4 py-2 rounded-full text-[13.5px] font-medium hover:bg-[#E8E5D4] transition-colors active:scale-95 inline-block text-center" }, data.buttonText));
  }
})();
(function() {
  const SJ = window.SJ;
  function App() {
    return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(SJ.HeroSection, null), /* @__PURE__ */ React.createElement(SJ.AboutSection, null), /* @__PURE__ */ React.createElement(SJ.GallerySection, null), /* @__PURE__ */ React.createElement(SJ.AnnouncementsSection, null), /* @__PURE__ */ React.createElement(SJ.ContactSection, null), /* @__PURE__ */ React.createElement(SJ.Footer, null), /* @__PURE__ */ React.createElement(SJ.CookieBanner, null), /* @__PURE__ */ React.createElement(SJ.DynamicIslandTOC, null));
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
