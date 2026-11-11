export interface Principle {
  number: string;
  title: string;
  summary: string;
  manuscriptRef: string;
  archivalNote: string;
  primaryElements: string[];
}

export interface Ritual {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  category: 'Thermal & Stone' | 'Hydro-Botanical' | 'Complexion & Essence';
  duration: string;
  provenance: string;
  temperature: string;
  acousticProfile: string;
  image: string;
  botanicals: string[];
  protocolStages: {
    phase: string;
    title: string;
    detail: string;
  }[];
  featuredInCore: boolean;
}

export interface SanctuaryEstate {
  id: string;
  name: string;
  regionLabel: string;
  headline: string;
  quote: string;
  structure: string;
  ambiance: string;
  corridorNote: string;
  established: string;
  coordinates: string;
  image: string;
  chambers: {
    code: string;
    name: string;
    material: string;
    acousticRating: string;
    description: string;
  }[];
}

export interface ApothecaryItem {
  code: string;
  name: string;
  latinName: string;
  vessel: string;
  extractionMethod: string;
  notes: string;
  pairedRitual: string;
}

export interface MemoirLetter {
  id: string;
  quote: string;
  author: string;
  meta: string;
  ritualRef: string;
  estate: string;
}

const IMG_HERO_POOL = '/src/assets/images/hero_lagos_sanctuary_pool_1794314243723.jpg';
const IMG_KANURI_SMOKE = '/src/assets/images/ritual_kanuri_amber_smoke_1794314245482.jpg';
const IMG_HYDRO_BATH = '/src/assets/images/ritual_lagoon_hydro_immersion_1794314245969.jpg';
const IMG_ORI_FACIAL = '/src/assets/images/ritual_ori_baobab_facial_1794314249320.jpg';
const IMG_CORRIDOR = '/src/assets/images/sanctuary_rammed_earth_corridor_1794314247484.jpg';

export const HERO_IMAGE_PATH = IMG_HERO_POOL;

export const PRINCIPLES: Principle[] = [
  {
    number: '01.',
    title: 'Royal Court Traditions',
    summary:
      'We curate centuries-old West African healing rituals—from Kanuri royal smoke baths to Yoruba Ori balneology—elevated for deep modern somatic recovery.',
    manuscriptRef: 'Folio I · Borno, Oyo & Nri Botanical Ledgers',
    archivalNote:
      'Every protocol is researched alongside traditional Nigerian master herbalists and dermatologists, preserving indigenous body wisdom that predates industrial wellness.',
    primaryElements: ['Borno Turaren Wuta resins', 'Hand-whipped Kwara Ori', 'Fermented Osun Dudu botanicals']
  },
  {
    number: '02.',
    title: 'Rammed-Earth Silence',
    summary:
      'Built as an acoustic fortress against urban velocity. Behind thirty-six-inch laterite walls and woven Aso-Oke baffles, Lagos traffic and generator hum cease to exist.',
    manuscriptRef: 'Acoustic Survey No. 04 · 36-Inch Compressed Laterite',
    archivalNote:
      'Our Ikoyi and Maitama suites are engineered with double-vestibule Iroko doors and subterranean thermal insulation, holding interior ambient sound below 18 decibels.',
    primaryElements: ['18 dBA acoustic floor', 'Handwoven Aso-Oke sound baffles', 'Zero generator or street vibration']
  },
  {
    number: '03.',
    title: 'Single-Origin Provenance',
    summary:
      'From cold-pressed Plateau baobab oil to crimson Kano hibiscus and carved Iroko timber, every tactile element traces back to a named Nigerian harvest.',
    manuscriptRef: 'Provenance Registry · Smallholder & Monastic Estates',
    archivalNote:
      'We reject synthetic fragrance and imported filler oils. Each apothecary vessel carries a harvest lot code from our partner women’s cooperatives in Kwara, Borno, and Cross River.',
    primaryElements: ['Unbleached Iseyin Aso-Oke linen', 'First-press Plateau Baobab', 'Jos volcanic basalt stones']
  },
  {
    number: '04.',
    title: 'Executive Circadian Reset',
    summary:
      'Designed for founders, executives, and returning diaspora who operate at relentless speed. We do not merely relax the muscles; we reset the nervous system.',
    manuscriptRef: 'Chronobiology Monograph · High-Output Cortisol Recovery',
    archivalNote:
      'Phones and smartwatches are sealed in brass Faraday vaults upon arrival. Suites are booked with generous 90-minute post-ritual stillness so you never rush back into traffic.',
    primaryElements: ['Brass Faraday device vaults', '90-minute post-ritual rest', 'Private jetty & discreet courtyard entry']
  }
];

export const RITUALS: Ritual[] = [
  {
    id: 'kanuri-dukhan-ritual',
    code: '094-KD',
    title: 'The Kanuri Dukhan & Basalt Reset',
    shortDescription:
      'Deep myofascial decompression using heated Jos volcanic basalt stones and royal Borno aromatic wood-smoke.',
    category: 'Thermal & Stone',
    duration: '120 Minutes',
    provenance: 'Maiduguri Royal Court Dukhan & Dilka Lineage',
    temperature: '46°C Basalt & Aromatic Smoke Chamber',
    acousticProfile: 'Absolute Silence (16 dBA)',
    image: IMG_KANURI_SMOKE,
    botanicals: ['Scented Kajiji Root & Sandalwood', 'Clove-Infused Dilka Paste', 'Warm Unrefined Sesame & Shea'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Dilka Botanical Polish & Smoke Acclimation',
        detail:
          'Exfoliation with warm clove-and-date Dilka paste followed by a traditional seated aromatic smoke bath infused with Kajiji root and frankincense.'
      },
      {
        phase: 'II. Immersion',
        title: 'Jos Plateau Basalt Myofascial Release',
        detail:
          'Smooth volcanic basalt stones heated in herbal water are glided slowly across the spine, shoulders, and hip flexors to dissolve executive tension.'
      },
      {
        phase: 'III. Stillness',
        title: 'Heavy Iseyin Aso-Oke Cocooning',
        detail:
          'The body is enveloped in warmed, unbleached handwoven cotton-silk cloths for 30 minutes of deep vagal nerve settling.'
      }
    ],
    featuredInCore: true
  },
  {
    id: 'ikogosi-zobo-bathing',
    code: '112-ZB',
    title: 'Ikogosi Mineral & Zobo Bathing',
    shortDescription:
      'Thermal hydro-therapy in magnesium-rich waters steeped with crimson hibiscus calyces and wild Efirin.',
    category: 'Hydro-Botanical',
    duration: '90 Minutes',
    provenance: 'Ekiti Thermal Spring & Savanna Infusion Archive',
    temperature: '39.5°C Hammered Copper Cistern',
    acousticProfile: 'Subterranean Water Resonance',
    image: IMG_HYDRO_BATH,
    botanicals: ['Kano Crimson Hibiscus (Zobo)', 'Wild Scent Leaf (Efirin)', 'Moringa Oleifera & Magnesium Salts'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Efirin & Lemongrass Vapor Alcove',
        detail:
          'Ten minutes in a laterite steam niche infused with crushed scent leaf and lemongrass to clear the respiratory tract and open peripheral circulation.'
      },
      {
        phase: 'II. Immersion',
        title: 'Monolithic Copper & Hibiscus Soak',
        detail:
          'Private immersion in warm mineral water rich in anthocyanins and polyphenols from steeped crimson hibiscus flowers and moringa leaves.'
      },
      {
        phase: 'III. Stillness',
        title: 'Cool Calabash Rinse & Warm Zobo Elixir',
        detail:
          'Rest on a heated stone daybed with a spiced ginger-hibiscus infusion and cool spring compress over the eyes.'
      }
    ],
    featuredInCore: true
  },
  {
    id: 'ori-baobab-facial',
    code: '045-OB',
    title: 'The Cold-Pressed Ori & Baobab Facial',
    shortDescription:
      'Melanin-rich barrier restoration and sculptural buccal release using whipped Kwara shea and baobab seed oil.',
    category: 'Complexion & Essence',
    duration: '105 Minutes',
    provenance: 'Kwara Women’s Cooperative & Lagos Botanical Atelier',
    temperature: 'Alternating 37°C Steam / 12°C Granite Sphere',
    acousticProfile: 'Soft Thumb-Piano (Agidigbo) Drone',
    image: IMG_ORI_FACIAL,
    botanicals: ['Raw Ivory Ori (Shea Butter)', 'First-Press Plateau Baobab Oil', 'Nsukka White Kaolin & Honey'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Aged Osun Dudu & Tamarind Cleansing',
        detail:
          'Gentle enzymatic resurfacing using botanical black soap distillate, raw wildflower honey, and steamed muslin compresses.'
      },
      {
        phase: 'II. Immersion',
        title: 'Sculptural Buccal & Jaw Decompression',
        detail:
          'Forty-five minutes of intra-oral and myofascial sculpting using golden baobab seed oil to release jaw clenching and urban facial fatigue.'
      },
      {
        phase: 'III. Stillness',
        title: 'Whipped Ori Mask & Cranial Acupressure',
        detail:
          'Deeply occlusive Harmattan-recovery mask paired with slow scalp and occipital ridge release in candlelit darkness.'
      }
    ],
    featuredInCore: true
  },
  {
    id: 'nsukka-clay-poultice',
    code: '134-NZ',
    title: 'Nsukka Nzu & Camwood Body Poultice',
    shortDescription:
      'Full-body mineral clay cocoon drawing on Igbo ceremonial earth and red camwood (Osun) skin renewal.',
    category: 'Thermal & Stone',
    duration: '110 Minutes',
    provenance: 'Eastern Highland Ceremonial Earth Ledger',
    temperature: '41°C Heated Laterite Slab',
    acousticProfile: 'Absolute Silence (16 dBA)',
    image: IMG_HERO_POOL,
    botanicals: ['Purified Nzu Kaolin Clay', 'Ground Red Camwood (Osun)', 'Cold-Pressed Palm Kernel Oil (Adi)'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Dry Raffia Silk Brushing',
        detail: 'Stimulation of lymphatic pathways using fine woven raffia mitts.'
      },
      {
        phase: 'II. Immersion',
        title: 'Warm Camwood & Kaolin Envelopment',
        detail:
          'Application of mineral-rich Nzu clay blended with antioxidant red camwood powder and warm honey across the entire body.'
      },
      {
        phase: 'III. Stillness',
        title: 'Rain-Shower Rinse & Adi Oil Seal',
        detail: 'Warm rain rinse followed by slow massage with roasted palm kernel and calabash nutmeg oil.'
      }
    ],
    featuredInCore: false
  },
  {
    id: 'efirin-steam-inhalation',
    code: '021-EF',
    title: 'Efirin & Uda Respiratory Decompression',
    shortDescription:
      'Vagal nerve and sinus clearing via copper-pot botanical steaming for frequent flyers and city dwellers.',
    category: 'Hydro-Botanical',
    duration: '75 Minutes',
    provenance: ' Niger Delta & Coastal Steam House Protocol',
    temperature: '40°C Herbal Vapor Chamber',
    acousticProfile: 'Natural Rainwater Drip Cadence',
    image: IMG_CORRIDOR,
    botanicals: ['Fresh Scent Leaf (Efirin)', 'Crushed Uda Seed Pods', 'Jos Highland Eucalyptus'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Thoracic & Diaphragmatic Release',
        detail: 'Manual rib-cage mobilization to reverse shallow high-stress breathing patterns.'
      },
      {
        phase: 'II. Immersion',
        title: 'Clay-Pot Herbal Vapor Inhalation',
        detail:
          'Guided slow-cadence breathing beside steaming earthenware vessels of Uda pods, clove, and fresh Efirin.'
      },
      {
        phase: 'III. Stillness',
        title: 'Supine Rest Under Weighted Aso-Oke',
        detail: 'Thirty minutes under heavy hand-loomed textiles as heart-rate variability normalizes.'
      }
    ],
    featuredInCore: false
  },
  {
    id: 'nocturne-uda-sleep',
    code: '078-UD',
    title: 'Executive Nocturne & Cranial Stillness',
    shortDescription:
      'Evening somnolence ritual engineered to cure insomnia, jet-lag, and decision fatigue.',
    category: 'Complexion & Essence',
    duration: '90 Minutes',
    provenance: 'Lagos-London Executive Recovery Dossier',
    temperature: '36.8°C Neutral Skin Thermal',
    acousticProfile: '28 Hz Acoustic Earth Resonance',
    image: IMG_ORI_FACIAL,
    botanicals: ['Warm Vetiver Root', 'Spiced Uda & Nutmeg Maceration', 'Whipped Shea & Magnesium Balm'],
    protocolStages: [
      {
        phase: 'I. Preparation',
        title: 'Warm Copper Foot Bath in Magnesium & Clove',
        detail: 'Draws excess thermal energy downward from the overactive mind toward the soles of the feet.'
      },
      {
        phase: 'II. Immersion',
        title: 'Continuous Warm-Oil Cranial Pour',
        detail: 'Slow ribbons of warmed vetiver and baobab oil poured across the forehead, temples, and vagus nerve pathway.'
      },
      {
        phase: 'III. Stillness',
        title: 'Lantern-Lit Escort to Private Sleep Suite',
        detail: 'Concludes in complete silence with optional overnight or 3-hour private suite rest.'
      }
    ],
    featuredInCore: false
  }
];

export const ESTATES: SanctuaryEstate[] = [
  {
    id: 'ikoyi',
    name: 'Ikoyi Creek Sanctuary, Lagos',
    regionLabel: 'Location: Old Ikoyi, Lagos',
    headline: 'A Fortress of Rammed Laterite',
    quote:
      '"The walls here are three feet of compressed red earth. Built to keep the tropical heat out, they serve even better to hold the velocity of Lagos completely at bay."',
    structure: 'Rammed Laterite & Carved Iroko Villa',
    ambiance: 'Acoustic Dusk & Lagoon Stillness',
    corridorNote:
      'Every corridor in our Old Ikoyi sanctuary is lined with handwoven Aso-Oke acoustic panels and baffled stone turns, ensuring zero generator hum or street intrusion.',
    established: 'Private Creekfront Compound · Old Ikoyi',
    coordinates: '6.4549° N, 3.4246° E',
    image: IMG_CORRIDOR,
    chambers: [
      {
        code: 'IK-01',
        name: 'The Subterranean Basalt Tepidarium',
        material: '36-Inch Compressed Laterite & Black Basalt',
        acousticRating: '14 dBA',
        description:
          'Carved below water level beside the creek, lit solely by recessed beeswax sconces reflecting off dark mineral water.'
      },
      {
        code: 'IK-02',
        name: 'The Aso-Oke Acoustic Gallery',
        material: 'Hand-Loomed Iseyin Cotton & Aged Iroko',
        acousticRating: '16 dBA',
        description:
          'Monumental earthen passages hung with heavy indigo and raw-cotton textiles that absorb footsteps and external sound.'
      },
      {
        code: 'IK-03',
        name: 'The Kanuri Dukhan Smoke Chamber',
        material: 'Burnished Clay Plaster & Cast Brass',
        acousticRating: '17 dBA',
        description:
          'Dedicated thermal suite with sunken floor braziers for traditional Borno aromatic wood-smoke and resin infusions.'
      },
      {
        code: 'IK-04',
        name: 'The Lagoon Reading Cloister & Jetty',
        material: 'Smoked Iroko Timber & Raw Flax',
        acousticRating: '18 dBA',
        description:
          'A silent post-ritual sanctuary overlooking the mangroves, with private boat-jetty arrival for guests coming from Victoria Island or Lekki.'
      }
    ]
  },
  {
    id: 'maitama',
    name: 'Maitama Rock Retreat, Abuja',
    regionLabel: 'Location: Maitama Hills, Abuja',
    headline: 'A Pavilion Beneath the Monolith',
    quote:
      '"Anchored directly into the ancient granite foothills of Abuja, where diplomatic schedules and capital pressure dissolve into cool stone shadow."',
    structure: 'Quarried Granite & Hausa Earth Vaults',
    ambiance: 'Cool Monolithic Shadow & Incense',
    corridorNote:
      'Designed with staggered private courtyards so high-profile guests, founders, and public figures never cross paths during their residency.',
    established: 'Granite Foothills Compound · Maitama',
    coordinates: '9.0882° N, 7.4934° E',
    image: IMG_HERO_POOL,
    chambers: [
      {
        code: 'AB-01',
        name: 'The Granite Bedrock Cistern',
        material: 'Natural Abuja Granite Outcrop & Copper',
        acousticRating: '15 dBA',
        description:
          'A thermal soaking pool carved directly into the natural rock face, infused with Kano crimson hibiscus and mineral salts.'
      },
      {
        code: 'AB-02',
        name: 'The Zaria Earth Vault',
        material: 'Traditional Tubali Mud Brick & Locust Bean Glaze',
        acousticRating: '16 dBA',
        description:
          'Domed acoustic chambers inspired by northern royal architecture, maintaining a naturally cool microclimate year-round.'
      },
      {
        code: 'AB-03',
        name: 'The Turaren Wuta Apothecary Library',
        material: 'Carved Mahogany & Amber Glass',
        acousticRating: '18 dBA',
        description:
          'Houses over 300 jars of aged bakhoor, Kajiji roots, desert dates, and cold-pressed northern seed oils.'
      },
      {
        code: 'AB-04',
        name: 'The Savannah Twilight Court',
        material: 'Dressed Laterite & Acacia Shade',
        acousticRating: '19 dBA',
        description:
          'An enclosed open-sky courtyard for evening herbal infusions and starlit nervous-system decompression.'
      }
    ]
  },
  {
    id: 'idanre',
    name: 'Idanre Hills Estate, Ondo',
    regionLabel: 'Location: Idanre Highlands, Ondo',
    headline: 'A Cloister Above the Cloud Forest',
    quote:
      '"Set three thousand feet up amidst granite inselbergs and misted cocoa forests, where time slows to the rhythm of mountain rain."',
    structure: 'Highland Stone & Forest Timber Sanctuary',
    ambiance: 'Highland Mist & Hearth Warmth',
    corridorNote:
      'Accessible via private helicopter pad or chauffeured forest ascent, reserved for two-to-five-day executive sabbaticals.',
    established: 'Highland Reserve · Idanre',
    coordinates: '7.1039° N, 5.1050° E',
    image: IMG_HYDRO_BATH,
    chambers: [
      {
        code: 'ID-01',
        name: 'The Cloud-Line Infinity Spring',
        material: 'Charred Cedar & Highland Basalt',
        acousticRating: '16 dBA',
        description:
          'A cantilevered thermal mineral pool overlooking ancient granite peaks and morning forest mist.'
      },
      {
        code: 'ID-02',
        name: 'The Cocoa & Ori Stillroom',
        material: 'Hand-Hewn Stone & Copper Alembics',
        acousticRating: '17 dBA',
        description:
          'Where fresh Ondo cacao butter, wild honey, and unrefined shea are blended warm for full-body enveloping rituals.'
      },
      {
        code: 'ID-03',
        name: 'The Monolithic Sleep Suites',
        material: 'Acoustic Lime Plaster & Heavy Cotton',
        acousticRating: '14 dBA',
        description:
          'Windowed toward the granite cliffs with blackout timber shutters for uninterrupted twelve-hour recovery sleep.'
      },
      {
        code: 'ID-04',
        name: 'The Physic Forest Trail',
        material: 'Weathered Granite Steps & Ferns',
        acousticRating: '20 dBA',
        description:
          'Private guided silent walks through medicinal flora indigenous to the southwestern highlands.'
      }
    ]
  }
];

export const APOTHECARY_ITEMS: ApothecaryItem[] = [
  {
    code: 'LOT 094-KD',
    name: 'Borno Kajiji & Sandalwood Smoke Oil',
    latinName: 'Cyperus articulatus · Santalum album',
    vessel: '100ml UV-Violet Archival Flacon',
    extractionMethod: '60-Day Resin Maceration in Cold-Pressed Sesame',
    notes:
      'Formulated from royal Maiduguri Dukhan recipes to warm deep fascia, quiet cortisol spikes, and scent the skin with smoked amber.',
    pairedRitual: 'The Kanuri Dukhan & Basalt Reset'
  },
  {
    code: 'LOT 112-ZB',
    name: 'Kano Crimson Hibiscus & Efirin Tincture',
    latinName: 'Hibiscus sabdariffa · Ocimum gratissimum',
    vessel: '250ml Stoppered Apothecary Carafe',
    extractionMethod: 'Copper-Alembic Hydro-Distillation',
    notes:
      'Antioxidant-dense balneological infusion that relieves muscular heaviness, jet-lag swelling, and urban skin oxidative stress.',
    pairedRitual: 'Ikogosi Mineral & Zobo Bathing'
  },
  {
    code: 'LOT 045-OB',
    name: 'Unrefined Kwara Ori & Plateau Baobab Elixir',
    latinName: 'Vitellaria paradoxa · Adansonia digitata',
    vessel: '50ml Pipette Glass Vial',
    extractionMethod: 'First Mechanical Cold-Press (Unrefined)',
    notes:
      'Rich in vitamins A, E, and omega fatty acids to repair melanin-rich skin barriers against air-conditioning and Harmattan dryness.',
    pairedRitual: 'The Cold-Pressed Ori & Baobab Facial'
  }
];

export const MEMOIR_LETTERS: MemoirLetter[] = [
  {
    id: 'tunde',
    quote:
      '"Stepping off Bourdillon into the Ikoyi sanctuary feels like crossing continents. After two hours in the Kanuri Dukhan and basalt chamber, six months of Lagos deal-fatigue simply evaporated."',
    author: 'Tunde A.',
    meta: 'Managing Partner 2025 • Ikoyi, Lagos',
    ritualRef: 'Code: 094-KD · The Kanuri Dukhan & Basalt Reset',
    estate: 'Ikoyi Creek Sanctuary'
  },
  {
    id: 'zainab',
    quote:
      '"No generator hum, no ringing phones, no performative luxury—just thick earth walls, the scent of real Borno Kajiji resin, and a silence so deep you can finally hear yourself think."',
    author: 'Zainab B.',
    meta: 'Architect & Founder 2025 • Maitama, Abuja',
    ritualRef: 'Code: 112-ZB · Ikogosi Mineral & Zobo Bathing',
    estate: 'Maitama Rock Retreat'
  },
  {
    id: 'chidi',
    quote:
      '"Every time I fly in from London, my first stop is Aetheria. The Cold-Pressed Ori facial and the Aso-Oke acoustic suites are world-class—rooted in our own heritage with unmatched precision."',
    author: 'Dr. Chidi O.',
    meta: 'Guest 2025 • London & Victoria Island',
    ritualRef: 'Code: 045-OB · The Cold-Pressed Ori & Baobab Facial',
    estate: 'Ikoyi Creek Sanctuary'
  }
];
