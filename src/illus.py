# Original flat spot illustrations (objects only), drawn for this project.
# Palette: mint, green, olive, blue, pale teal, ink outlines.
M, G, O, B, P, K, W, Y = '#a9f8ba', '#34c46a', '#283220', '#3b6cff', '#cfe8e0', '#1b1b1b', '#ffffff', '#ffd166'

def _svg(body, vb='0 0 240 200'):
    return '<svg class="illus" viewBox="%s" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">%s</svg>' % (vb, body)

ILLUS = {
 # magnifier over a rising bar chart
 'search': _svg(f'''<rect x="30" y="40" width="150" height="120" rx="12" fill="{P}"/>
  <rect x="52" y="112" width="18" height="30" rx="3" fill="{M}"/><rect x="80" y="96" width="18" height="46" rx="3" fill="{G}"/>
  <rect x="108" y="80" width="18" height="62" rx="3" fill="{M}"/><rect x="136" y="60" width="18" height="82" rx="3" fill="{G}"/>
  <circle cx="160" cy="88" r="34" fill="{W}" fill-opacity=".55" stroke="{K}" stroke-width="5"/><path d="M184 112l28 28" stroke="{B}" stroke-width="12"/>
  <path d="M40 30l6-10M30 36l-8-6M200 54l10-4" stroke="{G}" stroke-width="4"/>'''),
 # folded map with a pin
 'map': _svg(f'''<path d="M30 60l55-18 60 18 60-18v108l-60 18-60-18-55 18z" fill="{P}" stroke="{K}" stroke-width="4"/>
  <path d="M85 42v108M145 60v108" stroke="{K}" stroke-width="3"/><path d="M40 120c30-20 60 10 90-10s50-10 70-30" stroke="{B}" stroke-width="5" stroke-dasharray="2 10"/>
  <path d="M150 104s-26-24-26-44a26 26 0 0152 0c0 20-26 44-26 44z" fill="{G}" stroke="{K}" stroke-width="4"/><circle cx="150" cy="60" r="9" fill="{W}"/>'''),
 # target with arrow
 'target': _svg(f'''<circle cx="110" cy="105" r="70" fill="{P}"/><circle cx="110" cy="105" r="50" fill="{W}" stroke="{K}" stroke-width="4"/>
  <circle cx="110" cy="105" r="30" fill="{M}" stroke="{K}" stroke-width="4"/><circle cx="110" cy="105" r="11" fill="{G}"/>
  <path d="M112 103l80-62" stroke="{K}" stroke-width="5"/><path d="M180 30l14 12 18-6-14-12z" fill="{B}" stroke="{K}" stroke-width="3"/>'''),
 # browser window with code brackets and gear
 'code': _svg(f'''<rect x="22" y="34" width="170" height="122" rx="12" fill="{W}" stroke="{K}" stroke-width="4"/><path d="M22 60h170" stroke="{K}" stroke-width="4"/>
  <circle cx="40" cy="47" r="4" fill="{G}"/><circle cx="54" cy="47" r="4" fill="{M}"/><circle cx="68" cy="47" r="4" fill="{B}"/>
  <path d="M70 90l-20 18 20 18M120 90l20 18-20 18M104 84l-18 48" stroke="{O}" stroke-width="6"/>
  <circle cx="190" cy="150" r="26" fill="{M}" stroke="{K}" stroke-width="4"/><circle cx="190" cy="150" r="9" fill="{W}" stroke="{K}" stroke-width="4"/>
  <path d="M190 116v8M190 176v8M156 150h8M216 150h8" stroke="{K}" stroke-width="5"/>'''),
 # document with pen
 'doc': _svg(f'''<path d="M50 24h90l36 36v120H50z" fill="{W}" stroke="{K}" stroke-width="4"/><path d="M140 24v36h36" fill="{P}" stroke="{K}" stroke-width="4"/>
  <path d="M70 82h80M70 102h80M70 122h56M70 142h66" stroke="{G}" stroke-width="7"/>
  <path d="M168 170l46-74 14 9-46 74-18 8z" fill="{B}" stroke="{K}" stroke-width="4"/><path d="M206 108l14 9" stroke="{K}" stroke-width="4"/>'''),
 # list with checks
 'list': _svg(f'''<rect x="44" y="26" width="150" height="152" rx="14" fill="{P}"/>
  <rect x="62" y="50" width="24" height="24" rx="6" fill="{G}"/><path d="M68 62l5 5 9-10" stroke="{W}" stroke-width="4"/><path d="M98 62h76" stroke="{O}" stroke-width="6"/>
  <rect x="62" y="90" width="24" height="24" rx="6" fill="{G}"/><path d="M68 102l5 5 9-10" stroke="{W}" stroke-width="4"/><path d="M98 102h60" stroke="{O}" stroke-width="6"/>
  <rect x="62" y="130" width="24" height="24" rx="6" fill="{W}" stroke="{K}" stroke-width="3"/><path d="M98 142h70" stroke="{O}" stroke-width="6" stroke-opacity=".35"/>
  <circle cx="196" cy="40" r="16" fill="{Y}"/>'''),
 # chain link
 'link': _svg(f'''<rect x="28" y="72" width="104" height="56" rx="28" transform="rotate(-25 80 100)" fill="none" stroke="{G}" stroke-width="16"/>
  <rect x="108" y="72" width="104" height="56" rx="28" transform="rotate(-25 160 100)" fill="none" stroke="{B}" stroke-width="16"/>
  <path d="M40 40l10 8M200 150l12 8M190 40l-6 12" stroke="{K}" stroke-width="4"/>'''),
 # storefront
 'store': _svg(f'''<path d="M40 86h160v86H40z" fill="{W}" stroke="{K}" stroke-width="4"/>
  <path d="M32 86l14-48h148l14 48z" fill="{M}" stroke="{K}" stroke-width="4"/><path d="M72 38l-8 48M112 38v48M152 38l8 48" stroke="{K}" stroke-width="3"/>
  <rect x="58" y="112" width="52" height="60" fill="{P}" stroke="{K}" stroke-width="4"/><rect x="128" y="112" width="50" height="36" rx="4" fill="{B}" fill-opacity=".85" stroke="{K}" stroke-width="4"/>
  <circle cx="100" cy="144" r="4" fill="{K}"/><path d="M196 30l6-12M208 40l12-4" stroke="{G}" stroke-width="4"/>'''),
 # shopping cart with boxes
 'cart': _svg(f'''<path d="M26 40h28l22 96h106l18-70H66" fill="none" stroke="{K}" stroke-width="5"/>
  <rect x="84" y="62" width="40" height="40" rx="5" fill="{G}" stroke="{K}" stroke-width="4"/><rect x="132" y="74" width="34" height="34" rx="5" fill="{B}" stroke="{K}" stroke-width="4"/>
  <rect x="104" y="36" width="30" height="30" rx="5" fill="{M}" stroke="{K}" stroke-width="4"/>
  <circle cx="92" cy="160" r="12" fill="{W}" stroke="{K}" stroke-width="5"/><circle cx="168" cy="160" r="12" fill="{W}" stroke="{K}" stroke-width="5"/>'''),
 # clipboard audit with magnifier
 'audit': _svg(f'''<rect x="46" y="30" width="122" height="150" rx="12" fill="{W}" stroke="{K}" stroke-width="4"/><rect x="82" y="20" width="50" height="22" rx="8" fill="{M}" stroke="{K}" stroke-width="4"/>
  <path d="M66 70h80M66 92h60M66 114h70" stroke="{P}" stroke-width="8"/><path d="M66 70h40" stroke="{G}" stroke-width="8"/>
  <circle cx="168" cy="134" r="28" fill="{P}" stroke="{K}" stroke-width="5"/><path d="M188 154l24 24" stroke="{B}" stroke-width="11"/>'''),
 # chat bubble with sparkles (AI)
 'spark': _svg(f'''<path d="M34 42h132a14 14 0 0114 14v70a14 14 0 01-14 14H86l-30 26v-26H34a14 14 0 01-14-14V56a14 14 0 0114-14z" fill="{P}" stroke="{K}" stroke-width="4"/>
  <path d="M100 64l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" fill="{G}" stroke="{K}" stroke-width="3"/>
  <path d="M190 30l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill="{B}"/><path d="M200 120l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="{M}" stroke="{K}" stroke-width="2"/>'''),
 # envelope + mailbox style contact
 'mail': _svg(f'''<rect x="40" y="70" width="110" height="104" rx="10" fill="{P}" stroke="{K}" stroke-width="4"/><path d="M95 174v20" stroke="{K}" stroke-width="8"/>
  <path d="M150 70V40h30v14h-22" fill="{G}" stroke="{K}" stroke-width="4"/>
  <rect x="120" y="96" width="96" height="64" rx="8" fill="{W}" stroke="{K}" stroke-width="4" transform="rotate(-12 168 128)"/>
  <path d="M124 104l44 30 44-38" stroke="{B}" stroke-width="5" transform="rotate(-12 168 128)"/><path d="M30 46l10 6M46 30l4 12" stroke="{G}" stroke-width="4"/>'''),
 # star rating card
 'star': _svg(f'''<rect x="30" y="50" width="180" height="100" rx="16" fill="{W}" stroke="{K}" stroke-width="4"/>
  <path d="M60 86l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="{Y}" stroke="{K}" stroke-width="3"/>
  <path d="M108 86l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="{Y}" stroke="{K}" stroke-width="3"/>
  <path d="M156 86l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z" fill="{Y}" stroke="{K}" stroke-width="3"/>
  <path d="M60 136h120" stroke="{P}" stroke-width="7"/><circle cx="200" cy="44" r="18" fill="{G}"/><path d="M192 44l6 6 10-12" stroke="{W}" stroke-width="4"/>'''),
 # rocket / growth arrow
 'growth': _svg(f'''<path d="M30 170h180" stroke="{K}" stroke-width="4"/><path d="M40 150l46-40 34 24 70-74" stroke="{G}" stroke-width="10"/>
  <path d="M168 56h28v28" stroke="{G}" stroke-width="10"/><circle cx="86" cy="110" r="9" fill="{B}"/><circle cx="120" cy="134" r="9" fill="{B}"/>
  <rect x="40" y="30" width="60" height="38" rx="8" fill="{P}"/><path d="M52 52h36" stroke="{O}" stroke-width="5"/>'''),
}

def illus(name):
    return ILLUS.get(name, ILLUS['search'])
