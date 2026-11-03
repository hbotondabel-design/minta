// Közös adatok az aniko photography mintaoldalaihoz.
// A fotók Anikó saját, nyilvános oldaláról töltődnek be (nincsenek átmásolva ide).
const Aniko = (() => {
  const U = "https://anikophotography.hu/wp-content/uploads/";
  // [kis, nagy, arány (szélesség/magasság), kategória, leírás]
  const KEPEK = {
    kismamaFF: [U + "2019/04/Kismamafot%C3%B3z%C3%A1s-Aniko-Photography-058-682x1024.jpg", U + "2019/04/Kismamafot%C3%B3z%C3%A1s-Aniko-Photography-058-768x1152.jpg", 2 / 3, "kismama", "Kismama fekete-fehérben"],
    kismamaAblak: [U + "2020/08/DSC5096_resize-1024x682.jpg", U + "2020/08/DSC5096_resize-1536x1024.jpg", 3 / 2, "kismama", "Kismama a nagy ablaknál"],
    kismamaFarmer: [U + "2020/08/cropped-DSC5011_resize-scaled-1-1024x614.jpg", U + "2020/08/cropped-DSC5011_resize-scaled-1-1536x922.jpg", 5 / 3, "kismama", "Kismama ablakfényben"],
    ujszulott: [U + "2020/08/DSC4342_resize-1024x683.jpg", U + "2020/08/DSC4342_resize-1536x1024.jpg", 3 / 2, "ujszulott", "Alvó újszülött"],
    maci: [U + "2020/08/cropped-DSC1782_resize-scaled-1-1024x614.jpg", U + "2020/08/cropped-DSC1782_resize-scaled-1-1536x922.jpg", 5 / 3, "ujszulott", "Újszülött macikkal"],
    talpak: [U + "2020/08/DSC1684-a_resize-1024x683.jpg", U + "2020/08/DSC1684-a_resize-1536x1024.jpg", 3 / 2, "ujszulott", "Pici talpak a szülők kezében"],
    csalad: [U + "2020/08/DSC6010_resize-1024x683.jpg", U + "2020/08/DSC6010_resize-1536x1024.jpg", 3 / 2, "csalad", "Szülők az újszülöttel"],
    dinnye: [U + "2020/08/DSC1108_resize-683x1024.jpg", U + "2020/08/DSC1108_resize-1024x1536.jpg", 2 / 3, "baba", "Baba görögdinnyével"],
    zongora: [U + "2020/08/cropped-DSC5216_resize-scaled-1-1024x614.jpg", U + "2020/08/cropped-DSC5216_resize-scaled-1-1536x922.jpg", 5 / 3, "baba", "Kislány a fehér zongoránál"],
    eskuvo: [U + "2020/07/DSC7383-682x1024.jpg", U + "2020/07/DSC7383-1024x1536.jpg", 2 / 3, "eskuvo", "Jegyespár"],
    koszoruslanyok: [U + "2020/07/DSC3352-1024x683.jpg", U + "2020/07/DSC3352-1536x1024.jpg", 3 / 2, "eskuvo", "Koszorúslányok"],
    portre: [U + "2020/08/DSC_1696-vintage_resize-1024x683.jpg", U + "2020/08/DSC_1696-vintage_resize-1536x1024.jpg", 3 / 2, "portre", "Portré az ablaknál"],
  };
  const KATEGORIAK = { kismama: "Kismama", ujszulott: "Újszülött", baba: "Baba és gyerek", csalad: "Család", eskuvo: "Esküvő", portre: "Portré" };

  const img = (k, { sizes = "100vw", lazy = true, alt } = {}) => {
    const [kis, nagy, , , leiras] = KEPEK[k];
    return `<img src="${kis}" srcset="${kis} 1024w, ${nagy} 1536w" sizes="${sizes}" alt="${alt ?? leiras}"${lazy ? ' loading="lazy"' : ""} decoding="async">`;
  };

  // Ajánlott fotózási időszakok a várható szülés napjából (általános iránymutatás).
  const nap = 864e5;
  const fmt = (d) => d.toLocaleDateString("hu-HU", { month: "long", day: "numeric" });
  const fmtEv = (d) => d.toLocaleDateString("hu-HU", { year: "numeric", month: "long" });
  const idoszakok = (szules, mar = false) => {
    const sz = new Date(szules + "T12:00:00");
    const fogant = new Date(sz - 280 * nap);
    const het = (h) => new Date(+fogant + h * 7 * nap);
    const plusz = (d) => new Date(+sz + d * nap);
    const ho = (m) => { const d = new Date(sz); d.setMonth(d.getMonth() + m); return d; };
    const sor = [
      { k: "kismama", cim: "Kismamafotózás", mikor: `${fmt(het(28))} és ${fmt(het(34))} között`, miert: "A 28. és 34. hét között szép a pocak, és még kényelmes a mozgás.", tol: het(28), ig: het(34) },
      { k: "ujszulott", cim: "Újszülöttfotózás", mikor: `${fmt(plusz(5))} és ${fmt(plusz(14))} között`, miert: "Az első két hétben a babák sokat alszanak, ilyenkor készülnek a legszebb összegömbölyödős képek.", tol: plusz(5), ig: plusz(14) },
      { k: "baba", cim: "Ülő baba", mikor: `${fmtEv(ho(6))} és ${fmtEv(ho(8))} között`, miert: "Amikor már magától ül, de még nem indul el: mosolyok, kíváncsi tekintet.", tol: ho(6), ig: ho(8) },
      { k: "csalad", cim: "Első születésnap", mikor: fmtEv(ho(12)), miert: "Családi fotózás az első szülinap körül, otthon vagy a szabadban.", tol: ho(11), ig: ho(12) },
    ];
    const ma = new Date();
    return sor.map((s) => ({ ...s, mult: s.ig < ma, most: s.tol <= ma && ma <= s.ig })).filter((s) => !(mar && s.k === "kismama"));
  };

  const belepo = (sel) => {
    const t = document.querySelectorAll(sel);
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { t.forEach((e) => e.classList.add("l")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("l"); io.unobserve(e.target); } }), { threshold: 0.12 });
    t.forEach((e) => io.observe(e));
  };

  return { KEPEK, KATEGORIAK, img, idoszakok, belepo, fmt };
})();
