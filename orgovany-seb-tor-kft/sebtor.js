// Seb-Tor Kft. mintaoldalak — közös adatok és segédek (mindhárom változat ezt tölti be).
// Tények csak nyilvános cégadatokból: név, székhely, e-mail, használtcikk-kereskedelem, 2009 óta.
// A kínálat PÉLDA: a kész oldalon az Önök valódi kínálata áll.
const Sebtor = (() => {
  const EMAIL = "sebtorkft@gmail.com";
  const CIM = "6077 Orgovány, Kossuth Lajos utca 51.";
  const LAT = 46.7523638, LON = 19.4734855;
  const UTVONAL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LON}`;
  const TERKEP = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - 0.008},${LAT - 0.004},${LON + 0.008},${LAT + 0.004}&layer=mapnik&marker=${LAT},${LON}`;

  // név → [fájlnév, szélesség/magasság arány, alt szöveg]
  const KEPEK = {
    radioCedula: ["radio-cedula", "1920/1309", "Krémszínű régi asztali rádió kézzel írt árcédulával"],
    radioFa: ["radio-fa", "1920/1359", "Fadobozos régi rádió árcédulával"],
    furo: ["furo", "4/3", "Régi kézi fúró a műhely falán"],
    fogo: ["fogo", "4/3", "Fogók a műhely falán"],
    kanna: ["kanna", "1920/1238", "Virágmintás zománcozott kancsók a polcon"],
    varroasztal: ["varroasztal", "3/2", "Fiókos varrógépasztal"],
    lampasor: ["lampasor", "1344/1280", "Petróleumlámpák árcédulával a polcon"],
    bicikli: ["bicikli", "3/2", "Régi kerékpár árcédulával"],
    lampa: ["lampa", "3/4", "Asztali lámpa üvegburával"],
  };

  // Példa-kínálat (leltári szám, név, kategória, kép).
  const TETELEK = [
    ["0101", "Varrógépasztal fiókkal", "butor", "varroasztal"],
    ["0102", "Zománcozott kancsók", "haztartas", "kanna"],
    ["0103", "Kézi fúró", "szerszam", "furo"],
    ["0104", "Fogók, csípőfogó", "szerszam", "fogo"],
    ["0105", "Asztali rádió, fa dobozban", "muszaki", "radioFa"],
    ["0106", "Csöves rádió, krém színű", "muszaki", "radioCedula"],
    ["0107", "Petróleumlámpák", "lampa", "lampasor"],
    ["0108", "Asztali lámpa", "lampa", "lampa"],
    ["0109", "Kerékpár", "kerekpar", "bicikli"],
  ];
  const KATEGORIAK = { butor: "Bútor", haztartas: "Háztartás", szerszam: "Szerszám", muszaki: "Műszaki", lampa: "Lámpa, dísz", kerekpar: "Kerékpár" };

  const FORRASOK = [
    ["Rádiók árcédulával", "Doc Searls", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:2024_05_18_springfield-antiques_45.jpg"],
    ["Fadobozos rádió", "Doc Searls", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:2024_05_18_springfield-antiques_34.jpg"],
    ["Szerszámok", "Syced", "CC0", "https://commons.wikimedia.org/wiki/File:Old_tools_on_personal_workshop_wall.jpg"],
    ["Zománcozott kancsók", "Jean L.", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Vintage_enamelware_(51341679040).jpg"],
    ["Varrógépasztal", "cogdogblog", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:2011-365-270_Grandma%27s_Sewing_Machine_(6191011180).jpg"],
    ["Petróleumlámpák", "CRUSTINA!", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Aberfoyle_Antique_Market_(10717080474).jpg"],
    ["Kerékpár", "Ramesh Lalwani", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Hercules_Cycle_of_India_in_Antique_Shop_for_$380.jpg"],
    ["Asztali lámpa", "Agbarto", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:2024.08.09_Vintage_Yugoslavia_Table_Lamp_1970s_01.jpg"],
  ];

  const img = (k, { sizes = "50vw", lazy = true, alt } = {}) => {
    const [f, , a] = KEPEK[k];
    return `<img src="../img/${f}-800.webp" srcset="../img/${f}-800.webp 800w, ../img/${f}-1600.webp 1600w" sizes="${sizes}" alt="${alt ?? a}"${lazy ? ' loading="lazy"' : ""} decoding="async">`;
  };

  const level = (targy, torzs) => `mailto:${EMAIL}?subject=${encodeURIComponent(targy)}${torzs ? `&body=${encodeURIComponent(torzs)}` : ""}`;

  return {
    EMAIL, CIM, UTVONAL, TERKEP, KEPEK, TETELEK, KATEGORIAK, img, level,
    forrasok(el) {
      if (el) el.innerHTML = "Illusztrációk (Wikimedia Commons): " + FORRASOK.map(([m, sz, l, u]) => `<a href="${u}" target="_blank" rel="noopener">${m}</a> (${sz}, ${l})`).join(" · ");
    },
    belepo(sel) {
      const t = document.querySelectorAll(sel);
      if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { t.forEach((x) => x.classList.add("lat")); return; }
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("lat"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
      t.forEach((x) => io.observe(x));
    },
  };
})();
