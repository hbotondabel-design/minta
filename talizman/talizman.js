// Közös adatok és apró segédek a Talizmán mintaoldalaihoz.
const Talizman = (() => {
  // Nyitvatartás a nyilvános térképadat szerint (K–V 9:30–21:00), véglegesítés előtt egyeztetendő.
  // Index: 0 = vasárnap ... 6 = szombat. null = zárva.
  const NYITVA = [[570, 1260], null, [570, 1260], [570, 1260], [570, 1260], [570, 1260], [570, 1260]];
  const NAPOK = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
  const ora = (p) => `${Math.floor(p / 60)}:${String(p % 60).padStart(2, "0")}`;

  const ETLAP = {
    leves: { kep: "gulyas-kint", tetelek: [["Gulyásleves", "csipetkével, friss kenyérrel"], ["Újházi tyúkhúsleves", "házi tésztával"], ["Halászlé", "pontyból, paprikásan"], ["Gombakrémleves", "pirított magokkal"]] },
    foetel: { kep: "rantott", tetelek: [["Rántott sertésszelet", "hasábburgonyával"], ["Cordon bleu", "rizzsel vagy burgonyával"], ["Grillezett csirkemell", "párolt zöldséggel"], ["Csülök pékné módra", "hagymás burgonyával"], ["Paprikás csirke", "galuskával"]] },
    hal: { kep: "halaszle", tetelek: [["Harcsapaprikás", "túrós csuszával"], ["Rántott harcsafilé", "petrezselymes burgonyával"], ["Fish and chips", "tartármártással"]] },
    pizza: { kep: "pizza", tetelek: [["Margherita", "paradicsom, mozzarella, bazsalikom"], ["Sonkás-gombás", "paradicsom, sonka, gomba, sajt"], ["Hawaii", "sonka, ananász, sajt"], ["A ház pizzája", "a szakács aktuális kedvence"]] },
    teszta: { kep: "kenyertal", tetelek: [["Bolognai spagetti", ""], ["Carbonara", "tojással, szalonnával"], ["Ramen", "ázsiai tésztaleves"]] },
    edes: { kep: "gulyas-abrosz", tetelek: [["Somlói galuska", ""], ["Palacsinta", "lekvárral vagy kakaóval"], ["Túrógombóc", "tejföllel, porcukorral"]] },
  };

  const FORRASOK = [
    ["Gulyásleves és limonádé", "Lennart Tange", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Guly%C3%A1sleves_%C3%A9s_limon%C3%A1d%C3%A9.jpg"],
    ["Gulyásleves", "Christo", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Guly%C3%A1sleves.jpg"],
    ["Rántott hús", "Christo", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Visegr%C3%A1d,_%C3%89telb%C3%A1rka,_r%C3%A1ntott_h%C3%BAs_s%C3%BClt_krumplival.jpg"],
    ["Pizza", "Lombroso", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Pizza_Margherita_().JPG"],
    ["Halászlé", "Themightyquill", "CC BY-SA 2.5", "https://commons.wikimedia.org/wiki/File:Hal%C3%A1szl%C3%A9.jpg"],
    ["Leves kenyértálban", "ainudil", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Goulash_soup_2014.jpg"],
    ["Kemence", "Tony Webster", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Punch_Neapolitan_Pizza_(2257039638).jpg"],
    ["Kemence a konyhában", "Aaron Landry", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Oven_at_Punch_Pizza,_Highland_Park,_Saint_Paul_(2198176403).jpg"],
  ];

  // Most nyitva van-e, és mikor változik.
  const most = () => {
    const d = new Date(), nap = d.getDay(), perc = d.getHours() * 60 + d.getMinutes(), ma = NYITVA[nap];
    if (ma && perc >= ma[0] && perc < ma[1]) return { nyitva: true, szoveg: `Most nyitva · ma ${ora(ma[1])}-ig` };
    if (ma && perc < ma[0]) return { nyitva: false, szoveg: `Zárva · ma ${ora(ma[0])}-kor nyitunk` };
    for (let i = 1; i <= 7; i++) {
      const n = (nap + i) % 7;
      if (NYITVA[n]) return { nyitva: false, szoveg: `Zárva · ${i === 1 ? "holnap" : NAPOK[n].toLowerCase()} ${ora(NYITVA[n][0])}-kor nyitunk` };
    }
    return { nyitva: false, szoveg: "Zárva" };
  };

  return {
    ETLAP, NYITVA, NAPOK, ora, most,
    allapot(el, frissit = true) {
      if (!el) return;
      const r = () => { const a = most(); el.textContent = a.szoveg; el.classList.toggle("zarva", !a.nyitva); };
      r(); if (frissit) setInterval(r, 60000);
    },
    orak(tabla) {
      if (!tabla) return;
      const ma = new Date().getDay();
      tabla.innerHTML = [1, 2, 3, 4, 5, 6, 0].map((n) => `<tr${n === ma ? ' class="ma"' : ""}><td>${NAPOK[n]}</td><td>${NYITVA[n] ? `${ora(NYITVA[n][0])}–${ora(NYITVA[n][1])}` : "zárva"}</td></tr>`).join("");
    },
    datum(el) {
      if (!el) return;
      el.textContent = new Date().toLocaleDateString("hu-HU", { month: "long", day: "numeric", weekday: "long" });
    },
    forrasok(el) {
      if (!el) return;
      el.innerHTML = FORRASOK.map(([m, sz, l, u]) => `<a href="${u}" target="_blank" rel="noopener">${m}</a> (${sz}, ${l})`).join(" · ");
    },
    urlap(form, uzenet) {
      if (!form) return;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = new FormData(form);
        uzenet.textContent = `Köszönjük, ${d.get("nev")}! A kész oldalon ez az ajánlatkérés egyenesen a vendéglőhöz érkezik, és visszahívják a megadott számon. (Ez most csak bemutató, üzenet nem ment el.)`;
        uzenet.classList.add("l");
      });
    },
    belepo(sel) {
      const t = document.querySelectorAll(sel);
      if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { t.forEach((e) => e.classList.add("l")); return; }
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("l"); io.unobserve(e.target); } }), { threshold: 0.12 });
      t.forEach((e) => io.observe(e));
    },
  };
})();
