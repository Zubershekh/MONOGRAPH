/**
 * MONOGRAPH ATELIER — Complete Product Catalog Database
 * High-resolution imagery, rich specifications, origin countries, and category mappings.
 */

const MONOGRAPH_PRODUCTS = [
  // --- ARCHIVAL NOTEBOOKS ---
  {
    id: 101,
    title: 'Smyth-Sewn Archival Leather Journal',
    category: 'notebooks',
    categoryName: 'Archival Notebooks',
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Best Seller',
    origin: 'Italy',
    originCity: 'Florence',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Full-grain Italian vegetable tanned leather binding with 192 numbered pages of fountain pen archival 120gsm cotton rag paper.',
    description: 'Bound by artisanal bookbinders in Florence, Italy, each journal lays completely flat at 180 degrees thanks to traditional Smyth-sewn stitching. Handcrafted archival cotton rag paper prevents bleed-through and feathering even with wet fountain pen inks.',
    specs: {
      'Paper Weight': '120 gsm Acid-Free Cotton Rag',
      'Page Count': '192 numbered pages (5mm dot grid)',
      'Binding': '180° Flat Smyth-Sewn Smyth Stitch',
      'Cover Material': 'Tuscan Full-Grain Vegetable Tanned Leather',
      'Dimensions': '145mm × 210mm (A5 Standard)',
      'Ink Compatibility': 'Fountain Pen, Sumi Ink, Gouache Proof'
    },
    inStock: true,
    monogrammable: true,
    tags: ['leather', 'journal', 'fountain-pen-safe', 'florence', 'bestseller']
  },
  {
    id: 102,
    title: 'Kyoto Washi Thread-Bound Notebook',
    category: 'notebooks',
    categoryName: 'Archival Notebooks',
    price: 26.00,
    originalPrice: 30.00,
    rating: 4.8,
    reviewsCount: 84,
    badge: 'Japanese Import',
    origin: 'Japan',
    originCity: 'Kyoto',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Traditional Japanese Yotsume Toji four-hole exposed thread binding with mulberry washi fibers and silken smooth texture.',
    description: 'Crafted using heritage techniques in Kyoto, Japan. Mulberry paper provides a featherweight yet tear-resistant surface that glides under Japanese fine nibs and calligraphy brushes. Features subtle gilt edge detailing.',
    specs: {
      'Paper Weight': '84 gsm Mulberry Kozo Washi Paper',
      'Page Count': '160 blank unlined pages',
      'Binding': 'Traditional Japanese 4-Hole Yotsume Toji',
      'Cover Material': 'Hand-dyed Chiyogami patterned cotton paper',
      'Dimensions': '130mm × 185mm (B6)',
      'Ink Compatibility': 'Fine nibs, Calligraphy sumi, Gel ink'
    },
    inStock: true,
    monogrammable: true,
    tags: ['washi', 'kyoto', 'japan', 'handmade', 'artisan']
  },
  {
    id: 103,
    title: 'Atelier Hardcover Project Planner (Undated)',
    category: 'notebooks',
    categoryName: 'Archival Notebooks',
    price: 38.00,
    originalPrice: 45.00,
    rating: 5.0,
    reviewsCount: 92,
    badge: 'Staff Pick',
    origin: 'Germany',
    originCity: 'Munich',
    images: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'A structured architecture for visionary makers: dual ribbon markers, numbered milestones, gantt spreads, and archival index.',
    description: 'Engineered in Munich for architects, designers, and authors. The undated format allows you to pause and resume without wasted calendar pages. Includes expandable rear pocket, pen loop, and heavyweight 140gsm bamboo pulp paper.',
    specs: {
      'Paper Weight': '140 gsm Bamboo Archival Vellum',
      'Page Count': '240 structured pages (Undated)',
      'Binding': 'Reinforced Casebound Hardcover with cloth spine',
      'Cover Material': 'Belgian bookcloth with brass corner guards',
      'Dimensions': '160mm × 230mm',
      'Ink Compatibility': 'Markers, Rollerball, Fountain pen'
    },
    inStock: true,
    monogrammable: true,
    tags: ['planner', 'undated', 'hardcover', 'germany', 'minimal']
  },
  {
    id: 104,
    title: 'Minimalist Grid Pocket Memo Set (Pack of 3)',
    category: 'notebooks',
    categoryName: 'Archival Notebooks',
    price: 18.00,
    originalPrice: 22.00,
    rating: 4.7,
    reviewsCount: 65,
    badge: 'Essential',
    origin: 'Japan',
    originCity: 'Tokyo',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Pocket-sized staple-stitched notebooks with pale copper 3.5mm grid lines, crafted with Tomoe River bleed-proof paper.',
    description: 'Designed to slip seamlessly into breast pockets or passport holders. Uses 68gsm Tomoe River ultra-thin paper that exhibits unparalleled ink sheen, shading, and zero ghosting.',
    specs: {
      'Paper Weight': '68 gsm Tomoe River Paper S',
      'Page Count': '64 pages per notebook (192 total)',
      'Binding': 'Copper wire saddle-stitched',
      'Cover Material': '350gsm chipboard kraft stock',
      'Dimensions': '90mm × 140mm (Pocket Size)',
      'Ink Compatibility': 'Ultra-wet fountain pens, inks with high sheen'
    },
    inStock: true,
    monogrammable: false,
    tags: ['pocket', 'tomoe-river', 'grid', 'edc']
  },

  // --- FOUNTAIN & FINE PENS ---
  {
    id: 201,
    title: 'Solid Matte Brass Fountain Pen',
    category: 'pens',
    categoryName: 'Fountain & Fine Pens',
    price: 48.00,
    originalPrice: 60.00,
    rating: 4.9,
    reviewsCount: 215,
    badge: 'Iconic Signature',
    origin: 'Japan',
    originCity: 'Osaka',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Precision-machined from single-billet raw brass. Weighs 44g for effortless, fatigue-free gravimetric pressure on the page.',
    description: 'Engineered in Osaka with German Schmidt #5 iridium-tipped stainless steel nib. Over months of use, the untreated brass barrel develops a bespoke, lustrous patina unique to your hands. Comes with a brass cartridge converter and five black archival ink cartridges.',
    specs: {
      'Nib Size': 'Fine (0.5mm) / Medium (0.7mm) German Iridium',
      'Material': '100% Solid Billet Brass (No plating)',
      'Weight': '44 grams (Optimal balance uncapped)',
      'Mechanism': 'Screw-lock postable cap & airtight seal',
      'Filling System': 'International Standard Converter + Cartridge',
      'Length': '138mm closed / 152mm posted'
    },
    inStock: true,
    monogrammable: true,
    tags: ['brass', 'fountain-pen', 'schmidt-nib', 'edc', 'patina']
  },
  {
    id: 202,
    title: 'Aesthetic Pastel Gel Pen Suite (10-Piece Studio Edition)',
    category: 'pens',
    categoryName: 'Fountain & Fine Pens',
    price: 16.50,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Popular',
    origin: 'Korea',
    originCity: 'Seoul',
    images: [
      'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80'
    ],
    summary: '0.38mm micro-needle tip pens formulated with instant-dry pigment gel ink in muted Tokyo cafe pastel hues.',
    description: 'Developed in Seoul for precision annotating and sketch study. The proprietary tungsten carbide ball ensures skip-free writing at any angle with smudge-free drying in under 0.8 seconds — loved by left-handed writers.',
    specs: {
      'Tip Size': '0.38mm Ultra-Fine Micro Needle',
      'Ink Formula': 'Quick-Dry Waterproof Japanese Pigment',
      'Set Count': '10 distinct muted architectural tones',
      'Body Finish': 'Velvet matte soft-touch barrel with metal clip',
      'Smudge Resistance': 'Under 0.8 seconds (Lefty Friendly)'
    },
    inStock: true,
    monogrammable: false,
    tags: ['gel-pens', 'korea', 'pastel', 'fast-dry', 'study']
  },
  {
    id: 203,
    title: 'Titanium Anodized Mechanical Drafting Pencil (0.5mm)',
    category: 'pens',
    categoryName: 'Fountain & Fine Pens',
    price: 36.00,
    originalPrice: 44.00,
    rating: 4.9,
    reviewsCount: 78,
    badge: 'Precision Pro',
    origin: 'Germany',
    originCity: 'Nuremberg',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Aero-grade aluminum and titanium construction featuring brass knurled grip and 4mm fixed drafting sleeve.',
    description: 'Engineered for technical draftspeople and fine artists. The balanced center-of-gravity allows effortless linework, while the lead grade hardness indicator window (4H to 2B) keeps your tools organized.',
    specs: {
      'Lead Size': '0.5mm Polymer Carbon Lead',
      'Material': 'Aero-grade 6061 Aluminum + Titanium Clip',
      'Grip': 'Diamond knurled anti-slip brass collar',
      'Lead Indicator': 'Rotatable HB / B / 2B / H / 2H window',
      'Weight': '22 grams'
    },
    inStock: true,
    monogrammable: true,
    tags: ['drafting', 'mechanical-pencil', 'titanium', 'germany']
  },
  {
    id: 204,
    title: 'Ceramic Dipped Hand-Blown Glass Calligraphy Pen',
    category: 'pens',
    categoryName: 'Fountain & Fine Pens',
    price: 29.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 62,
    badge: 'Artisan Glass',
    origin: 'Italy',
    originCity: 'Murano',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Spiral fluted Murano glass nib capable of writing 60 words per single ink dip without refilling.',
    description: 'Each piece is individually lampworked by Venetian glass artisans. Capillary spiral channels along the nib tip hold ink reservoirs gracefully, allowing swift ink color swapping with a simple rinse under water.',
    specs: {
      'Nib Type': '12-Groove Capillary Spiral Borosilicate Glass',
      'Capacity': '50-80 words per single ink dip',
      'Included': 'Glass Pen Rest + 15ml Smoked Obsidian Ink Bottle',
      'Length': '180mm',
      'Cleaning': 'Instantly rinses clean in lukewarm water'
    },
    inStock: true,
    monogrammable: false,
    tags: ['glass-pen', 'calligraphy', 'murano', 'artisan']
  },

  // --- AESTHETIC DESK ITEMS ---
  {
    id: 301,
    title: 'Solid American Walnut Desk Caddy Tray',
    category: 'desk',
    categoryName: 'Aesthetic Desk Items',
    price: 42.00,
    originalPrice: 52.00,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Atelier Woodwork',
    origin: 'USA',
    originCity: 'Oregon',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Milled from kiln-dried black walnut with natural food-safe beeswax finish and vegetable leather-lined grooves.',
    description: 'Organize your favorite writing instruments, cards, and daily stationery treasures with timeless warmth. Natural variations in dark heartwood grain guarantee every piece is completely one-of-a-kind.',
    specs: {
      'Material': 'Solid American Black Walnut (FSC-Certified)',
      'Lining': 'Burgundy Italian Vachetta Leather base insert',
      'Finish': 'Organic Beeswax & Walnut Oil polish',
      'Dimensions': '240mm × 100mm × 24mm',
      'Feet': 'Non-marring micro-suction silicone bumpers'
    },
    inStock: true,
    monogrammable: true,
    tags: ['walnut', 'woodwork', 'desk-tray', 'minimal', 'aesthetic']
  },
  {
    id: 302,
    title: 'Brushed Brass Desktop Ruler & Paperweight (30cm)',
    category: 'desk',
    categoryName: 'Aesthetic Desk Items',
    price: 24.00,
    originalPrice: 30.00,
    rating: 4.8,
    reviewsCount: 88,
    badge: 'Architect Series',
    origin: 'Japan',
    originCity: 'Tokyo',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Substantial 3mm thick solid brass with laser-etched metric and imperial graduations and beveled finger lift.',
    description: 'Engineered for tactile satisfaction. Heavy enough to serve as an elegant book weight while you transcribe. The raised central spine ensures comfortable lifting from tabletop without scratching.',
    specs: {
      'Material': 'Solid 360-Alloy Brass with brushed satin finish',
      'Markings': 'Laser-etched deep fill enamel (Metric & Inches)',
      'Dimensions': '310mm × 28mm × 3.2mm',
      'Weight': '210 grams',
      'Edge': 'Tapered cutting edge for craft knives'
    },
    inStock: true,
    monogrammable: true,
    tags: ['brass', 'ruler', 'paperweight', 'desk']
  },
  {
    id: 303,
    title: 'Cast Iron Sculptural Pen Rest & Paperclip Well',
    category: 'desk',
    categoryName: 'Aesthetic Desk Items',
    price: 32.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviewsCount: 54,
    badge: 'Brutalist Style',
    origin: 'Japan',
    originCity: 'Morioka',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Nambu ironware (Nanbu Tekki) cast iron desk object with urushi lacquer finish and magnetic internal reservoir.',
    description: 'Cast using centuries-old iron techniques in Iwate prefecture. Features a dedicated cradle for your fountain pen alongside an invisible internal rare-earth magnet that neatly gathers copper paperclips.',
    specs: {
      'Material': 'Nanbu Tekki Traditional Cast Iron',
      'Coating': 'Natural baked Urushi botanical lacquer',
      'Feature': 'Internal Neodymium magnet base for clips',
      'Dimensions': '110mm × 65mm × 35mm',
      'Weight': '420 grams'
    },
    inStock: true,
    monogrammable: false,
    tags: ['cast-iron', 'japan', 'pen-rest', 'nambu-tekki']
  },
  {
    id: 304,
    title: 'Full-Grain Leather Large Desk Blotter Mat (90×45cm)',
    category: 'desk',
    categoryName: 'Aesthetic Desk Items',
    price: 58.00,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 167,
    badge: 'Luxury Core',
    origin: 'Italy',
    originCity: 'Milan',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Buttery vegetable-tanned leather surface with non-slip suede underlay that dampens keystrokes and anchors your desk.',
    description: 'Transform your desktop into an inspiring studio sanctuary. The cushioned leather gives pen nibs the optimal tactile resistance while protecting hardwood desks from scratches and spills.',
    specs: {
      'Top Surface': 'Full-Grain Italian Calfskin Leather (Water-repellent)',
      'Backing': 'Anti-slip natural suede microfiber',
      'Size': '900mm × 450mm (Accommodates keyboard, mouse & book)',
      'Edge': 'Hand-burnished and waxed edge dressing',
      'Thickness': '3.5mm triple-ply construction'
    },
    inStock: true,
    monogrammable: true,
    tags: ['desk-mat', 'leather', 'workspace', 'blotter']
  },

  // --- CURATED GIFT SETS ---
  {
    id: 401,
    title: 'The Master Scribe Atelier Box Set',
    category: 'gifts',
    categoryName: 'Curated Gift Sets',
    price: 88.00,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 94,
    badge: 'Signature Gift',
    origin: 'Japan & Italy',
    originCity: 'Kyoto / Florence',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'The ultimate bespoke pairing: Smyth-sewn archival leather journal, matte brass pen, solid walnut rest, and letterpress cards in a linen presentation keepsake box.',
    description: 'Curated for milestone celebrations, graduations, promotions, and passionate writers. Presented in a rigid bookcloth presentation box lined with heavy linen ribbon, debossed with foil monograph lettering.',
    specs: {
      'Includes': '1× Leather Archival Journal (A5), 1× Brass Fountain Pen, 1× Walnut Pen Stand, 5× Cotton Letterpress Note Cards',
      'Packaging': 'Museum-grade magnetic linen keepsake box',
      'Gift Note': 'Complimentary personalized handwritten calligraphy wax-sealed envelope included',
      'Weight': '1.2 kg total presentation weight'
    },
    inStock: true,
    monogrammable: true,
    tags: ['gift-set', 'luxury', 'atelier', 'box-set', 'bestseller']
  },
  {
    id: 402,
    title: 'The Architect & Designer Ideation Kit',
    category: 'gifts',
    categoryName: 'Curated Gift Sets',
    price: 68.00,
    originalPrice: 82.00,
    rating: 4.9,
    reviewsCount: 71,
    badge: 'Creator Bundle',
    origin: 'Germany',
    originCity: 'Berlin',
    images: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Engineered drafting notebook, brass scale ruler, 0.5mm titanium mechanical pencil, and brass sharpener in embossed foil tin.',
    description: 'Designed for minds that conceptualize the future. Built to withstand daily studio carrying while elevating every sketch with German precision instruments.',
    specs: {
      'Includes': '1× Munich Hardcover Grid Notebook, 1× Brass Ruler (30cm), 1× 0.5mm Mechanical Drafting Pencil, 1× Lead Refill Tube (2B)',
      'Packaging': 'Brushed matte black aluminum tin with debossed monogram logo',
      'Origin': 'Germany & Japan certified imports'
    },
    inStock: true,
    monogrammable: true,
    tags: ['architect', 'bundle', 'creator', 'germany']
  },
  {
    id: 403,
    title: 'Kyoto Washi Ceremonial Tea & Journal Gift Bundle',
    category: 'gifts',
    categoryName: 'Curated Gift Sets',
    price: 52.00,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 46,
    badge: 'Zen Ritual',
    origin: 'Japan',
    originCity: 'Uji & Kyoto',
    images: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Four-hole thread bound washi notebook, 5 rolls Kyoto gold-leaf washi tape, and cedar bookmark wrapped in furoshiki cloth.',
    description: 'Encourage reflective morning rituals. Wrapped in authentic Japanese Indigo Furoshiki cotton fabric that can be reused infinitely.',
    specs: {
      'Includes': '1× Thread-bound Washi Journal, 5× Gold Washi Tapes, 1× Hinoki Cedar Bookmark, 1× Cotton Furoshiki Wrap',
      'Presentation': 'Traditional knot furoshiki gift wrap with seasonal dried botanical branch'
    },
    inStock: true,
    monogrammable: true,
    tags: ['zen', 'ritual', 'japan', 'furoshiki', 'gift']
  },

  // --- INTERNATIONAL FINDS (JAPAN & KOREA IMPORTS) ---
  {
    id: 501,
    title: 'Kyoto Hand-Gilded Washi Rice Tape (Collection of 5 Rolls)',
    category: 'international',
    categoryName: 'International Finds',
    price: 19.50,
    originalPrice: 25.00,
    rating: 4.9,
    reviewsCount: 189,
    badge: 'Kyoto Heritage',
    origin: 'Japan',
    originCity: 'Kyoto',
    images: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Genuine washi fiber masking tape stamped with real copper and gold foil botanical motifs from Kyoto botanical archives.',
    description: 'Leaves no residue on paper or furniture. Peelable and repositionable. Perfect for highlighting headers, envelope sealing, and bullet journal borders.',
    specs: {
      'Material': 'Natural Japanese Mulberry Bark Washi',
      'Roll Dimensions': '15mm width × 10 meters length per roll (50m total)',
      'Adhesive': 'Residue-free repositionable acrylic adhesive',
      'Foil': 'Heat-stamped 24k luster metallic foils'
    },
    inStock: true,
    monogrammable: false,
    tags: ['washi-tape', 'japan', 'craft', 'gold-foil']
  },
  {
    id: 502,
    title: 'Seoul Minimalist Acrylic Book & Tablet Stand',
    category: 'international',
    categoryName: 'International Finds',
    price: 28.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 112,
    badge: 'Seoul Design',
    origin: 'Korea',
    originCity: 'Seoul',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Crystal-clear 6mm heavyweight acrylic display easel with rounded polished edges and page holding brass clips.',
    description: 'Designed by a Hongdae studio in Seoul. Holds heavyweight hardcover volumes, reference manuals, or your tablet at a fatigue-reducing 65-degree ergonomic angle.',
    specs: {
      'Material': 'Optical-Grade 6mm Cast Acrylic (Lucite)',
      'Clips': 'Dual spring-loaded brass page holders',
      'Capacity': 'Supports books up to 1,200 pages / 4kg',
      'Dimensions': '280mm × 210mm × 140mm'
    },
    inStock: true,
    monogrammable: false,
    tags: ['seoul', 'acrylic', 'book-stand', 'desk-setup']
  },
  {
    id: 503,
    title: 'Tokyo Brass Wax Seal Stamp with Monogram Matrix',
    category: 'international',
    categoryName: 'International Finds',
    price: 27.00,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 97,
    badge: 'Wax Atelier',
    origin: 'Japan',
    originCity: 'Tokyo',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Solid lathe-turned brass seal head with rosewood handle. Includes 2 sticks of flexible metallic sealing wax.',
    description: 'Add ceremonial charm to correspondence and invitations. High-density brass releases smoothly from hot wax without sticking or chipping.',
    specs: {
      'Seal Diameter': '25mm circular matrix',
      'Handle': 'Turned natural rosewood with brass collar',
      'Wax Included': '1× Antique Gold, 1× Deep Burgundy Flexible Wax Stick (Yields ~30 seals)',
      'Engraving': 'Monogram initial or botanical Monograph crest'
    },
    inStock: true,
    monogrammable: true,
    tags: ['wax-seal', 'calligraphy', 'japan', 'ceremonial']
  },
  {
    id: 504,
    title: 'Handmade Mulberry Washi Letter Paper & Envelope Suite',
    category: 'international',
    categoryName: 'International Finds',
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 83,
    badge: 'Artisan Letters',
    origin: 'Japan',
    originCity: 'Echizen',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80'
    ],
    summary: 'Deckled-edge artisanal stationery suite made by Echizen papermakers with visible plant fibers and gold leaf flecks.',
    description: 'Echizen has maintained papermaking traditions for over 1,500 years. Feathery deckled edges are created naturally during drying on bamboo screens.',
    specs: {
      'Contents': '10× Deckled Letter Sheets + 5× Matching Lined Envelopes',
      'Paper': '100% Kozo mulberry fiber with real brass leaf flecks',
      'Texture': 'Textured laid surface, fountain pen ink resistant',
      'Sheet Size': '148mm × 210mm'
    },
    inStock: true,
    monogrammable: false,
    tags: ['stationery-suite', 'echizen', 'washi', 'letters']
  }
];

// Helper functions for catalog queries
function getAllProducts() {
  return MONOGRAPH_PRODUCTS;
}

function getProductById(id) {
  const numericId = parseInt(id, 10);
  return MONOGRAPH_PRODUCTS.find(p => p.id === numericId) || null;
}

function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return MONOGRAPH_PRODUCTS;
  return MONOGRAPH_PRODUCTS.filter(p => p.category === cat);
}

function getRelatedProducts(productId, limit = 4) {
  const current = getProductById(productId);
  if (!current) return MONOGRAPH_PRODUCTS.slice(0, limit);
  return MONOGRAPH_PRODUCTS
    .filter(p => p.id !== current.id)
    .sort((a, b) => (b.category === current.category ? 1 : 0) - (a.category === current.category ? 1 : 0))
    .slice(0, limit);
}
