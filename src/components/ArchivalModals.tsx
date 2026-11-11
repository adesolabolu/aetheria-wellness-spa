import React, { useState } from 'react';
import { X, ArrowRight, Compass, BookOpen, Shield } from 'lucide-react';
import { Ritual, SanctuaryEstate, ESTATES } from '../data/sanctuaryData';
import { ArchivalImage } from './ArchivalImage';

interface RitualModalProps {
  ritual: Ritual | null;
  onClose: () => void;
  onSelectForBooking: (ritualTitle: string) => void;
}

export const RitualDossierModal: React.FC<RitualModalProps> = ({
  ritual,
  onClose,
  onSelectForBooking
}) => {
  if (!ritual) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-brand-primary/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-vintage-cream text-text-primary max-w-4xl w-full border border-brand-primary/20 shadow-2xl overflow-hidden my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close ritual dossier"
          className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center bg-vintage-cream/90 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-vintage-cream transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative bg-vintage-paper min-h-[320px] lg:min-h-full">
            <ArchivalImage
              src={ritual.image}
              alt={ritual.title}
              codeLabel={`Code: ${ritual.code}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/50 to-transparent p-6 text-vintage-cream">
              <div className="font-body text-xs tracking-widest mb-1">
                Protocol {ritual.code} · {ritual.category}
              </div>
              <div className="font-secondary text-xl italic opacity-90">
                {ritual.provenance}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 lg:p-12 space-y-8 max-h-[85vh] overflow-y-auto">
            <div>
              <div className="font-body text-xs text-vintage-accent tracking-widest mb-2">
                Indigenous & Executive Protocol · {ritual.duration}
              </div>
              <h3 className="font-primary text-3xl lg:text-4xl text-brand-primary mb-3">
                {ritual.title}
              </h3>
              <p className="font-secondary text-2xl italic text-text-primary/80">
                {ritual.shortDescription}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-6 py-5 border-y border-brand-primary/15 text-sm">
              <div>
                <dt className="font-body text-xs text-text-primary/60 mb-1">Thermal Profile</dt>
                <dd className="font-primary text-base text-brand-primary tabular-nums">
                  {ritual.temperature}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs text-text-primary/60 mb-1">Acoustic Environment</dt>
                <dd className="font-primary text-base text-brand-primary tabular-nums">
                  {ritual.acousticProfile}
                </dd>
              </div>
            </dl>

            <div className="space-y-4">
              <h4 className="font-body text-xs tracking-widest text-vintage-accent">
                Three-Stage Sequence
              </h4>
              <div className="space-y-4">
                {ritual.protocolStages.map((stage) => (
                  <div
                    key={stage.phase}
                    className="pb-4 border-b border-brand-primary/10 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-primary text-lg text-brand-primary">
                        {stage.title}
                      </span>
                      <span className="font-body text-xs text-vintage-accent shrink-0">
                        {stage.phase}
                      </span>
                    </div>
                    <p className="font-body text-xs leading-relaxed text-text-primary/80">
                      {stage.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-body text-xs tracking-widest text-vintage-accent mb-2">
                West African Materia Medica
              </h4>
              <p className="font-body text-xs text-text-primary/80">
                {ritual.botanicals.join('  ·  ')}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-primary/15">
              <span className="font-body text-xs text-text-primary/60">
                Private Suite · 90-Min Post-Ritual Stillness Included
              </span>
              <button
                onClick={() => onSelectForBooking(ritual.title)}
                className="w-full sm:w-auto bg-brand-primary text-vintage-cream px-8 py-3.5 font-secondary text-2xl hover:bg-vintage-accent transition-colors flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Reserve This Ritual</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EstateModalProps {
  isOpen: boolean;
  activeEstate: SanctuaryEstate;
  onSelectEstate: (estateId: string) => void;
  onClose: () => void;
  onReserveAtEstate: (estateName: string) => void;
}

export const EstateExplorerModal: React.FC<EstateModalProps> = ({
  isOpen,
  activeEstate,
  onSelectEstate,
  onClose,
  onReserveAtEstate
}) => {
  const [selectedChamberIndex, setSelectedChamberIndex] = useState(0);

  if (!isOpen) return null;

  const activeChamber =
    activeEstate.chambers[selectedChamberIndex] || activeEstate.chambers[0];

  return (
    <div
      className="fixed inset-0 z-[70] bg-brand-primary/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-vintage-cream text-text-primary max-w-5xl w-full border border-brand-primary/20 shadow-2xl overflow-hidden my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-brand-primary/15 bg-vintage-paper/60">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-vintage-accent" />
            <span className="font-body text-xs tracking-widest text-brand-primary">
              Architectural & Acoustic Dossier · {activeEstate.coordinates}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close estate explorer"
            className="w-9 h-9 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-vintage-cream transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 lg:p-12 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Estate Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-primary/15">
            <div>
              <span className="font-body text-xs text-vintage-accent block mb-1">
                {activeEstate.regionLabel} · {activeEstate.established}
              </span>
              <h3 className="font-primary text-3xl lg:text-4xl text-brand-primary">
                {activeEstate.headline}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {ESTATES.map((estate) => (
                <button
                  key={estate.id}
                  onClick={() => {
                    onSelectEstate(estate.id);
                    setSelectedChamberIndex(0);
                  }}
                  className={`px-4 py-2 font-body text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    estate.id === activeEstate.id
                      ? 'bg-brand-primary text-vintage-cream'
                      : 'bg-vintage-paper text-brand-primary hover:bg-brand-primary/10'
                  }`}
                >
                  {estate.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="font-body text-xs text-text-primary/60 mb-2">
                Select Sanctuary Chamber to Inspect:
              </div>
              {activeEstate.chambers.map((chamber, idx) => (
                <button
                  key={chamber.code}
                  onClick={() => setSelectedChamberIndex(idx)}
                  className={`w-full text-left p-4 border transition-colors cursor-pointer ${
                    idx === selectedChamberIndex
                      ? 'bg-brand-primary text-vintage-cream border-brand-primary'
                      : 'bg-vintage-paper/40 text-text-primary border-brand-primary/15 hover:border-brand-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-body opacity-70 mb-1 tabular-nums">
                    <span>{chamber.code}</span>
                    <span>Acoustic Floor: {chamber.acousticRating}</span>
                  </div>
                  <div className="font-primary text-xl">{chamber.name}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-vintage-paper/50 p-8 border border-brand-primary/15 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-primary/15 pb-4">
                <div>
                  <span className="font-body text-xs text-vintage-accent">
                    Chamber Specification · {activeChamber.code}
                  </span>
                  <h4 className="font-primary text-2xl lg:text-3xl text-brand-primary mt-1">
                    {activeChamber.name}
                  </h4>
                </div>
                <span className="font-body text-xs text-brand-primary tabular-nums">
                  Measured Noise Floor: {activeChamber.acousticRating}
                </span>
              </div>

              <p className="font-secondary text-2xl italic leading-relaxed text-text-primary">
                {activeChamber.description}
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-brand-primary/10 text-xs font-body">
                <div>
                  <dt className="opacity-60 mb-1">Indigenous Materiality</dt>
                  <dd className="font-primary text-base text-brand-primary">
                    {activeChamber.material}
                  </dd>
                </div>
                <div>
                  <dt className="opacity-60 mb-1">Atmospheric Protocol</dt>
                  <dd className="font-primary text-base text-brand-primary">
                    {activeEstate.ambiance}
                  </dd>
                </div>
              </dl>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => onReserveAtEstate(activeEstate.name)}
                  className="bg-brand-primary text-vintage-cream px-8 py-3 font-secondary text-2xl hover:bg-vintage-accent transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Request Suite at {activeEstate.name.split(',')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MonographModalProps {
  activeTopic: 'story' | 'journal' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const ArchivalMonographModal: React.FC<MonographModalProps> = ({
  activeTopic,
  onClose
}) => {
  if (!activeTopic) return null;

  const contentMap = {
    story: {
      kicker: 'Founding Monograph · Ikoyi · Maitama · Idanre',
      title: 'The Chronicle of Aetheria Nigeria',
      subtitle:
        'Uniting royal West African botanical traditions with acoustic rammed-earth architecture for those who build at full speed.',
      sections: [
        {
          heading: 'I. Reclaiming Indigenous Stillness',
          body: 'Long before modern spas, West African royal courts perfected the science of somatic restoration—from the Kanuri Dukhan smoke chambers of Borno to the Ori and Osun Dudu apothecaries of Yorubaland and the Nzu clay rituals of the East. Aetheria preserves these living archives in their purest, unhurried form.'
        },
        {
          heading: 'II. An Acoustic Fortress in the City',
          body: 'Lagos and Abuja demand extraordinary nervous-system output. Our sanctuaries are engineered with 36-inch compressed laterite walls, carved Iroko louvers, and hand-loomed Aso-Oke acoustic panels that eliminate generator hum, traffic, and urban static the moment the gate closes.'
        },
        {
          heading: 'III. Unhurried Executive Stewardship',
          body: 'Each sanctuary admits no more than eight guests per day. Treatments are never rushed; every reservation includes ninety minutes of post-ritual rest in our creekfront or granite reading cloisters.'
        }
      ]
    },
    journal: {
      kicker: 'The Archival Journal · Quarterly Research Folios',
      title: 'Monographs on Nigerian Botanicals & Architecture',
      subtitle:
        'Field dispatches from our resident ethnobotanists, acoustic architects, and master herbalists.',
      sections: [
        {
          heading: 'Folio XXVIII · Borno Turaren Wuta & Cortisol Down-Regulation',
          body: 'How aromatic sesquiterpenes in traditional Kajiji root, sandalwood, and frankincense smoke baths lower sympathetic nervous system arousal after high-stakes executive travel.'
        },
        {
          heading: 'Folio XXVII · Thermal & Acoustic Mass in Rammed Laterite Walls',
          body: 'Why compressed Nigerian red earth and handwoven Iseyin Aso-Oke textiles outperform synthetic insulation in creating an 18-decibel oasis in the heart of Old Ikoyi.'
        },
        {
          heading: 'Folio XXVI · Cold-Pressed Kwara Ori vs. Refined Shea',
          body: 'Preserving cinnamic acid esters and unsaponifiable lipids through low-temperature hand-whipping for superior barrier repair during Harmattan and frequent aviation.'
        }
      ]
    },
    privacy: {
      kicker: 'Protocol of Discretion · Executive Governance',
      title: 'Privacy & Guest Anonymity Charter',
      subtitle:
        'Absolute discretion for founders, public figures, diplomats, and returning diaspora.',
      sections: [
        {
          heading: 'Staggered Courtyard & Jetty Arrivals',
          body: 'Our Ikoyi Creek Sanctuary offers direct private boat-jetty access and enclosed vehicle porticoes. Suite transitions are timed with architectural buffers so you never cross paths with another guest unless requested.'
        },
        {
          heading: 'Zero Digital Footprint',
          body: 'All guest preferences are held in encrypted offline ledgers. Cameras and recording devices are strictly prohibited across all estates.'
        }
      ]
    },
    terms: {
      kicker: 'Conditions of Entry · Sanctuary Covenant',
      title: 'Terms of the Sanctuary',
      subtitle:
        'To protect deep stillness for every resident, entry into Aetheria is governed by three covenants.',
      sections: [
        {
          heading: '01. The Brass Faraday Vault',
          body: 'Upon arrival at the gatehouse, all mobile telephones, laptops, and smartwatches are sealed in individual brass Faraday vaults. Our concierge remains reachable for urgent family or security dispatches.'
        },
        {
          heading: '02. Non-Conversational Thermal Zones',
          body: 'All basalt pools, Dukhan chambers, and rammed-earth corridors are strictly silent zones. Consultations with your lead practitioner take place inside your sound-locked private suite.'
        },
        {
          heading: '03. Bespoke Botanical Preparation',
          body: 'Because Dilka pastes, Zobo mineral baths, and fresh Ori poultices are compounded to order for each named guest, we request 48 hours notice for schedule adjustments.'
        }
      ]
    }
  };

  const doc = contentMap[activeTopic];

  return (
    <div
      className="fixed inset-0 z-[70] bg-brand-primary/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-vintage-cream text-text-primary max-w-3xl w-full border border-brand-primary/20 shadow-2xl p-8 lg:p-14 my-auto relative max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close monograph"
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-vintage-cream transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-body text-xs text-vintage-accent tracking-widest mb-4">
          {activeTopic === 'privacy' || activeTopic === 'terms' ? (
            <Shield className="w-4 h-4" />
          ) : (
            <BookOpen className="w-4 h-4" />
          )}
          <span>{doc.kicker}</span>
        </div>

        <h3 className="font-primary text-3xl lg:text-5xl text-brand-primary mb-4">
          {doc.title}
        </h3>
        <p className="font-secondary text-2xl italic text-text-primary/80 pb-8 border-b border-brand-primary/15">
          {doc.subtitle}
        </p>

        <div className="space-y-8 py-8">
          {doc.sections.map((sec) => (
            <div key={sec.heading} className="space-y-2">
              <h4 className="font-primary text-2xl text-brand-primary">
                {sec.heading}
              </h4>
              <p className="font-body text-sm leading-relaxed text-text-primary/85 max-w-2xl">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-brand-primary/15 flex items-center justify-between">
          <span className="font-body text-xs opacity-60">
            Aetheria Sanctuary Press · Ikoyi · Maitama · Idanre
          </span>
          <button
            onClick={onClose}
            className="bg-brand-primary text-vintage-cream px-8 py-2.5 font-secondary text-xl hover:bg-vintage-accent transition-colors cursor-pointer"
          >
            Close Folio
          </button>
        </div>
      </div>
    </div>
  );
};
