import type { SceneName } from "@/content/types";

/* Illustrated stand-ins for PhotoSlot, ported as-is from bundle.js. Each returns SVG markup for a
   600 by 600 viewBox; `id` keeps gradient ids unique on the page. */

type SceneOpts = { look?: "f" | "m"; tint?: string };

function sky(id: string, a: string, b: string, c: string) {
  return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset=".62" stop-color="' + b + '"/><stop offset="1" stop-color="' + c + '"/></linearGradient></defs><rect width="600" height="600" fill="url(#' + id + ')"/>';
}
function palm(x: number, base: number, h: number, s = 1) {
  const top = base - h, tx = x + 18 * s;
  return '<path d="M' + x + ' ' + base + 'C' + (x - 2) + ' ' + (base - h * .45) + ' ' + (x + 6 * s) + ' ' + (base - h * .8) + ' ' + tx + ' ' + top + '" stroke="#6c5843" stroke-width="' + (6 * s) + '" fill="none" stroke-linecap="round"/>' +
    '<g fill="#4c6a55">' +
    '<path d="M' + tx + ' ' + top + 'c-22-16-48-14-66 4 22-8 44-6 66 0z"/>' +
    '<path d="M' + tx + ' ' + top + 'c-12-26-38-36-60-30 24 4 44 14 60 30z"/>' +
    '<path d="M' + tx + ' ' + top + 'c4-28 26-42 50-42-20 10-38 24-50 42z"/>' +
    '<path d="M' + tx + ' ' + top + 'c24-14 52-10 68 8-22-8-44-10-68-8z"/>' +
    '<path d="M' + tx + ' ' + top + 'c18 4 40 22 44 46-14-20-28-34-44-46z"/>' +
    '<path d="M' + tx + ' ' + top + 'c-18 6-34 26-34 48 8-20 20-36 34-48z"/></g>';
}
function bougainvillea(x: number, y: number) {
  return '<g fill="#5b7a5b"><circle cx="' + (x + 6) + '" cy="' + (y + 8) + '" r="16"/><circle cx="' + (x + 34) + '" cy="' + (y + 4) + '" r="14"/></g>' +
    '<g fill="#c4497f"><circle cx="' + x + '" cy="' + y + '" r="12"/><circle cx="' + (x + 20) + '" cy="' + (y - 6) + '" r="11"/><circle cx="' + (x + 40) + '" cy="' + (y + 2) + '" r="10"/><circle cx="' + (x + 12) + '" cy="' + (y + 16) + '" r="9"/></g>' +
    '<g fill="#d9739e"><circle cx="' + (x + 8) + '" cy="' + (y - 4) + '" r="6"/><circle cx="' + (x + 30) + '" cy="' + (y - 2) + '" r="5"/></g>';
}
function slats(x: number, y: number, w: number, h: number, gap: number) {
  let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#a7774c"/><g stroke="#8a5f3d" stroke-width="2">';
  for (let i = x + gap; i < x + w; i += gap) s += '<path d="M' + i + ' ' + y + 'V' + (y + h) + '"/>';
  return s + '</g>';
}
function bars(x: number, y: number, w: number, h: number, gap: number, col?: string) {
  let s = '<g stroke="' + (col || '#6c7672') + '" stroke-width="2">';
  for (let i = x + gap; i < x + w; i += gap) s += '<path d="M' + i + ' ' + y + 'V' + (y + h) + '"/>';
  return s + '</g>';
}
function hlines(x: number, y: number, w: number, h: number, gap: number, col: string) {
  let s = '<g stroke="' + col + '" stroke-width="1.5">';
  for (let j = y + gap; j < y + h; j += gap) s += '<path d="M' + x + ' ' + j + 'H' + (x + w) + '"/>';
  return s + '</g>';
}
function windows(x: number, y: number, cols: number, rows: number, w: number, h: number, gx: number, gy: number, col: string) {
  let s = '<g fill="' + col + '">';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += '<rect x="' + (x + c * (w + gx)) + '" y="' + (y + r * (h + gy)) + '" width="' + w + '" height="' + h + '"/>';
  return s + '</g>';
}
function wall(y: number, gateX?: number) {
  return '<rect x="0" y="' + y + '" width="600" height="' + (530 - y) + '" fill="#e5ddd0"/><rect x="0" y="' + (y - 5) + '" width="600" height="7" fill="#d2c7b6"/>' +
    (gateX != null ? '<rect x="' + gateX + '" y="' + (y + 8) + '" width="150" height="' + (522 - y) + '" fill="#4b5551"/>' + bars(gateX, y + 8, 150, 522 - y, 10) : '');
}
function road() { return '<rect x="0" y="530" width="600" height="70" fill="#cbc1b0"/><rect x="0" y="530" width="600" height="4" fill="#b7ac99"/>'; }

export const SCENES: Record<SceneName, (id: string, o?: SceneOpts) => string> = {
  villa(id) {
    return sky(id, '#e7c995', '#f2e1c3', '#f6ecdc') +
      '<circle cx="470" cy="236" r="44" fill="#f8e5bf"/>' +
      '<path d="M0 470Q70 440 140 458T290 452T450 458T600 446V600H0z" fill="#b8b398" opacity=".55"/>' +
      '<rect x="196" y="254" width="226" height="90" fill="#e7dfd2"/><rect x="186" y="247" width="246" height="9" fill="#d6ccbc"/>' +
      '<rect x="216" y="272" width="112" height="52" fill="#5e706a"/><path d="M272 272v52" stroke="#879690" stroke-width="2"/>' +
      slats(346, 266, 58, 78, 8) +
      '<rect x="152" y="344" width="344" height="146" fill="#f5f1ea"/><rect x="140" y="336" width="368" height="9" fill="#ddd3c4"/>' +
      '<rect x="172" y="364" width="164" height="108" fill="#55685f"/><path d="M227 364v108M282 364v108" stroke="#7d8d86" stroke-width="2"/>' +
      '<path d="M172 364h60l-40 108h-20z" fill="#f0d6a8" opacity=".28"/>' +
      '<rect x="354" y="360" width="118" height="130" fill="#e3dbcf"/>' + hlines(354, 360, 118, 130, 16, '#d6ccbd') +
      wall(470, 318) + bougainvillea(36, 462) + bougainvillea(520, 466) +
      palm(112, 532, 230) + palm(560, 532, 170, .8) + road();
  },
  villa2(id) {
    return sky(id, '#e9cd9c', '#f3e3c7', '#f6ecdc') +
      '<rect x="70" y="300" width="200" height="190" fill="#e4ddd2"/><rect x="60" y="292" width="220" height="9" fill="#cfc5b6"/>' +
      '<rect x="96" y="326" width="70" height="60" fill="#5e706a"/><rect x="186" y="326" width="60" height="60" fill="#5e706a"/>' +
      '<rect x="300" y="268" width="230" height="222" fill="#f3eee6"/><rect x="290" y="260" width="250" height="9" fill="#d8cebf"/>' +
      '<rect x="324" y="294" width="96" height="70" fill="#566962"/>' + slats(440, 290, 64, 96, 8) +
      '<rect x="324" y="392" width="180" height="80" fill="#e2d9cc"/>' + hlines(324, 392, 180, 80, 14, '#d3c8b8') +
      wall(470, 380) + bougainvillea(150, 462) + bougainvillea(290, 466) + palm(40, 532, 200, .9) + road();
  },
  towers(id) {
    return sky(id, '#e6c99b', '#f1e2c8', '#f4e9d8') +
      '<rect x="56" y="282" width="74" height="196" fill="#d9d1c4"/>' + windows(64, 292, 4, 12, 10, 8, 6, 8, '#c4baa9') +
      '<rect x="146" y="172" width="88" height="306" fill="#ece6dc"/>' + hlines(146, 172, 88, 306, 14, '#d4cabb') + '<rect x="200" y="172" width="12" height="306" fill="#8fa29f"/>' +
      '<rect x="250" y="112" width="72" height="366" fill="#e0d8cc"/>' + hlines(250, 112, 72, 366, 12, '#cfc4b4') + '<rect x="262" y="112" width="10" height="366" fill="#92a4a1"/>' +
      '<rect x="338" y="204" width="110" height="274" fill="#efe9df"/>' + windows(348, 216, 5, 17, 14, 8, 6, 7, '#8fa29f') +
      '<rect x="464" y="262" width="76" height="216" fill="#d9d1c4"/>' + hlines(464, 262, 76, 216, 14, '#c9bfae') +
      '<rect x="0" y="478" width="600" height="20" fill="#cfc4b2"/>' + palm(120, 492, 120, .7) + palm(430, 492, 110, .65) +
      '<rect x="0" y="498" width="600" height="62" fill="#7f9a9b"/><path d="M0 512h600M40 528h210M330 540h230" stroke="#9fb5b4" stroke-width="2"/>' +
      '<rect x="0" y="560" width="600" height="40" fill="#e1d2b4"/>';
  },
  apartments(id) {
    return sky(id, '#e8cb98', '#f2e2c6', '#f6ecdc') +
      '<rect x="70" y="250" width="210" height="260" fill="#ece4d6"/>' +
      windows(88, 268, 4, 7, 32, 20, 16, 14, '#6c7d77') + hlines(70, 250, 210, 260, 34, '#d8cdbb') +
      '<rect x="300" y="210" width="230" height="300" fill="#e2d9cb"/>' +
      windows(318, 228, 5, 8, 28, 18, 14, 14, '#5f716b') + hlines(300, 210, 230, 300, 32, '#d1c6b5') +
      '<rect x="0" y="500" width="600" height="30" fill="#7c9476"/>' + palm(40, 520, 150, .8) + palm(560, 520, 140, .75) + road();
  },
  apartments2(id) {
    return sky(id, '#e7ca98', '#f1e1c5', '#f5ebda') +
      '<rect x="120" y="230" width="360" height="280" fill="#efe9df"/><rect x="110" y="222" width="380" height="9" fill="#d6ccbc"/>' +
      windows(144, 248, 6, 4, 34, 26, 20, 18, '#5e706a') +
      '<rect x="120" y="428" width="360" height="82" fill="#ccd2cd"/><rect x="140" y="440" width="320" height="58" fill="#4f625b"/>' + bars(140, 440, 320, 58, 40, '#7d8d86') +
      palm(70, 530, 200, .9) + bougainvillea(500, 500) + road();
  },
  houses(id) {
    return sky(id, '#e8cc9b', '#f2e2c6', '#f6ecdc') +
      '<rect x="30" y="320" width="170" height="170" fill="#e9e1d4"/><rect x="24" y="314" width="182" height="8" fill="#d2c7b6"/>' + windows(50, 340, 2, 2, 50, 40, 30, 30, '#62746e') +
      '<rect x="216" y="290" width="170" height="200" fill="#f2ece2"/><rect x="210" y="284" width="182" height="8" fill="#d7cdbd"/>' + windows(236, 312, 2, 2, 50, 44, 30, 34, '#5a6c66') +
      '<rect x="402" y="330" width="180" height="160" fill="#e3dbcd"/><rect x="396" y="324" width="192" height="8" fill="#cfc4b3"/>' + windows(422, 350, 2, 2, 52, 38, 34, 28, '#66776f') +
      wall(470, 230) + bougainvillea(60, 464) + road();
  },
  houses2(id) {
    return sky(id, '#e6c896', '#f0e0c4', '#f5ebda') +
      '<rect x="80" y="300" width="230" height="190" fill="#efe8dc"/><rect x="72" y="292" width="246" height="9" fill="#d5cab9"/>' + windows(104, 322, 3, 2, 46, 40, 24, 32, '#5f716b') +
      '<rect x="330" y="320" width="200" height="170" fill="#e5ddd0"/><rect x="322" y="312" width="216" height="9" fill="#cfc4b3"/>' + windows(352, 340, 2, 2, 60, 40, 36, 30, '#64756f') +
      '<g fill="#56755c"><circle cx="40" cy="360" r="60"/><circle cx="90" cy="330" r="44"/><circle cx="560" cy="350" r="58"/></g>' +
      '<path d="M40 420v110M560 410v120" stroke="#6c5843" stroke-width="10"/>' +
      wall(470, 240) + road();
  },
  plots(id) {
    return sky(id, '#e5c590', '#f1e0c0', '#f4e8d2') +
      '<rect x="0" y="380" width="600" height="220" fill="#d8c49d"/>' +
      '<g fill="#e6dccb"><rect x="70" y="352" width="40" height="28"/><rect x="118" y="360" width="30" height="20"/><rect x="420" y="356" width="46" height="24"/><rect x="474" y="362" width="28" height="18"/></g>' +
      '<g stroke="#b59f75" stroke-width="2" fill="none"><path d="M0 410H600M0 450H600M0 510H600"/><path d="M300 380L300 600M240 380L120 600M360 380L480 600M180 380L-60 600M420 380L660 600"/></g>' +
      '<g fill="#8a7653"><rect x="236" y="404" width="5" height="12"/><rect x="296" y="404" width="5" height="12"/><rect x="357" y="404" width="5" height="12"/><rect x="214" y="444" width="6" height="14"/><rect x="297" y="444" width="6" height="14"/><rect x="380" y="444" width="6" height="14"/></g>' +
      '<rect x="460" y="300" width="80" height="54" fill="#f4efe6"/><path d="M480 354v40M520 354v40" stroke="#6c5843" stroke-width="4"/>';
  },
  interior() {
    return '<rect width="600" height="600" fill="#efe8dd"/>' +
      '<rect x="300" y="110" width="250" height="330" fill="#d3ddd3"/><g fill="#a7b9a9"><circle cx="420" cy="300" r="60"/><circle cx="480" cy="260" r="40"/></g>' +
      '<path d="M300 440L550 440 550 110 300 110z" fill="none" stroke="#f7f3ec" stroke-width="10"/><path d="M425 110v330M300 275h250" stroke="#f7f3ec" stroke-width="6"/>' +
      '<rect x="0" y="470" width="600" height="130" fill="#c8ae8b"/><path d="M300 470L210 600H470L550 470z" fill="#f2dcb4" opacity=".5"/>' +
      '<ellipse cx="220" cy="540" rx="190" ry="34" fill="#e3d6c3"/>' +
      '<rect x="40" y="392" width="300" height="96" fill="#8d9b93"/><rect x="40" y="368" width="300" height="34" fill="#7f8e86"/><rect x="66" y="378" width="64" height="40" fill="#d8c7a8"/><rect x="138" y="380" width="58" height="36" fill="#e6dccb"/>' +
      '<rect x="160" y="500" width="130" height="14" fill="#a7774c"/><path d="M172 514v30M278 514v30" stroke="#8a5f3d" stroke-width="5"/>' +
      '<path d="M560 470v-100" stroke="#5a5048" stroke-width="3"/><path d="M536 372h48l-10-38h-28z" fill="#f4ead6"/>' +
      '<path d="M70 300c10-40 40-56 60-56-16 16-26 34-30 56z" fill="#5f7d62"/><rect x="40" y="250" width="110" height="80" fill="none" stroke="#c9b9a2" stroke-width="3"/>';
  },
  site(id) {
    function fig(x: number, h: number, body: string, head: string, extra?: string) {
      return '<rect x="' + (x - 22) + '" y="' + (530 - h) + '" width="44" height="' + (h - 28) + '" rx="16" fill="' + body + '"/>' +
        '<circle cx="' + x + '" cy="' + (514 - h) + '" r="15" fill="' + head + '"/>' + (extra || '');
    }
    return sky(id, '#e6c793', '#f1e0c2', '#f5e9d6') +
      '<rect x="0" y="420" width="600" height="180" fill="#d8c6a2"/>' +
      '<rect x="20" y="380" width="250" height="40" fill="#d0c3ad"/>' + hlines(20, 380, 250, 40, 13, '#bfb197') +
      '<rect x="380" y="300" width="190" height="120" fill="#ece5d9"/><rect x="372" y="294" width="206" height="8" fill="#d2c7b6"/><rect x="400" y="320" width="70" height="56" fill="#5e706a"/>' +
      fig(210, 170, '#2d3a35', '#7a5640', '<rect x="222" y="410" width="30" height="40" fill="#f6f2ea"/>') +
      fig(300, 160, '#e7e0d3', '#6e4c38', '<path d="M282 372c10 30 26 60 40 80" stroke="#9d5b6e" stroke-width="10" fill="none"/>') +
      fig(370, 176, '#5b6a64', '#7f5a43') +
      '<g fill="#8a7653"><rect x="80" y="470" width="6" height="16"/><rect x="520" y="470" width="6" height="16"/></g>' + palm(560, 430, 150, .7);
  },
  call(id) {
    return '<rect width="600" height="600" fill="#ebe3d6"/><rect x="0" y="470" width="600" height="130" fill="#b38a62"/>' +
      '<rect x="40" y="120" width="170" height="220" fill="#e0d6c7"/><path d="M125 120v220M40 230h170" stroke="#f3eee6" stroke-width="5"/>' +
      '<rect x="214" y="148" width="190" height="342" rx="26" fill="#1f2925"/>' +
      '<g transform="translate(228 166) scale(.27)">' + SCENES.villa(id + 'p') + '</g>' +
      '<rect x="228" y="166" width="162" height="160" fill="none"/><rect x="330" y="176" width="48" height="66" rx="6" fill="#7a8a83" stroke="#f4efe6" stroke-width="3"/>' +
      '<rect x="228" y="330" width="162" height="146" fill="#f4efe6"/><g fill="#d9d1c4"><rect x="240" y="346" width="120" height="10"/><rect x="240" y="366" width="90" height="10"/><rect x="240" y="400" width="130" height="34"/></g>' +
      '<rect x="452" y="420" width="56" height="54" rx="6" fill="#f4efe6"/><path d="M508 434c22 0 22 26 0 26" stroke="#f4efe6" stroke-width="6" fill="none"/>';
  },
  portrait(_id, o) {
    const f = o?.look === 'f';
    const tint = o?.tint || '#d9ddd5';
    const suit = f ? '#4d5f58' : '#27332f';
    return '<rect width="600" height="600" fill="' + tint + '"/>' +
      '<rect x="0" y="0" width="210" height="600" fill="#ffffff" opacity=".18"/><rect x="430" y="80" width="170" height="260" fill="#ffffff" opacity=".12"/>' +
      '<path d="M110 600C120 470 196 432 300 432S480 470 490 600z" fill="' + suit + '"/>' +
      (f ? '<path d="M196 456c40 30 90 40 104 120 14-80 64-90 104-120-30-12-64-20-104-20s-74 8-104 20z" fill="#b9a38f"/><path d="M226 470c20 50 34 90 30 130h-40c-8-40-4-84 10-130z" fill="#9b5b6c"/>'
        : '<path d="M262 436l38 70 38-70z" fill="#f4f1ea"/><path d="M294 446h12l6 90-12 16-12-16z" fill="#6b3f3a"/>') +
      '<rect x="276" y="384" width="48" height="60" fill="#7a5640"/>' +
      '<ellipse cx="300" cy="320" rx="70" ry="86" fill="#7f5a43"/>' +
      (f ? '<path d="M226 330c-6-86 40-122 74-122s82 36 74 122c-8-50-30-80-74-80s-66 30-74 80z" fill="#2a211c"/><path d="M220 300c-20 80-10 150 20 190 10-60 0-120-20-190zM380 300c20 80 10 150-20 190-10-60 0-120 20-190z" fill="#2a211c"/>'
        : '<path d="M232 300c-4-64 30-96 68-96s72 32 68 96c-10-34-30-50-68-50s-58 16-68 50z" fill="#211a16"/>');
  },
  map() {
    return '<rect width="600" height="600" fill="#e3e9e6"/>' +
      '<path d="M0 470C120 440 210 500 330 470S520 420 600 450V600H0z" fill="#c9d8d7"/>' +
      '<g fill="#d6dfdb"><rect x="30" y="40" width="150" height="110"/><rect x="210" y="40" width="160" height="110"/><rect x="400" y="40" width="170" height="110"/><rect x="30" y="180" width="150" height="120"/><rect x="400" y="180" width="170" height="120"/><rect x="30" y="330" width="150" height="90"/><rect x="210" y="330" width="160" height="90"/><rect x="400" y="330" width="170" height="90"/></g>' +
      '<g stroke="#ffffff" stroke-width="16"><path d="M0 165H600M0 315H600M195 0V460M385 0V450"/></g>' +
      '<path d="M210 180h160v120H210z" fill="#cfdcd6"/><path d="M0 165H600" stroke="#f6f0dd" stroke-width="20"/>' +
      '<g transform="translate(290 218)"><path d="M0 24C-14 10-20 0-20-10a20 20 0 0 1 40 0C20 0 14 10 0 24z" fill="#1d5c47"/><circle cx="0" cy="-10" r="7" fill="#ffffff"/></g>';
  },
};
