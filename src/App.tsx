/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  HERO_IMAGE_PATH,
  PRINCIPLES,
  RITUALS,
  ESTATES,
  APOTHECARY_ITEMS,
  MEMOIR_LETTERS,
  Ritual
} from './data/sanctuaryData';
import { ArchivalImage } from './components/ArchivalImage';
import {
  RitualDossierModal,
  EstateExplorerModal,
  ArchivalMonographModal
} from './components/ArchivalModals';
import { Check, ArrowUpRight, BookOpen, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [heroActive, setHeroActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Philosophy interactive state
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);

  // Rituals gallery & catalogue index state
  const [showCatalogueIndex, setShowCatalogueIndex] = useState(false);
  const [ritualCategory, setRitualCategory] = useState<string>('All');
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  // Sanctuary estate state
  const [activeEstateId, setActiveEstateId] = useState<string>('ikoyi');
  const [estateModalOpen, setEstateModalOpen] = useState(false);

  // Apothecary suite selection
  const [selectedApothecaryCodes, setSelectedApothecaryCodes] = useState<string[]>([
    'LOT 094-KD'
  ]);

  // Monograph / legal modal state
  const [monographTopic, setMonographTopic] = useState<
    'story' | 'journal' | 'privacy' | 'terms' | null
  >(null);

  // Booking form state
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [selectedRitualTitle, setSelectedRitualTitle] = useState(
    'The Kanuri Dukhan & Basalt Reset'
  );
  const [selectedEstateName, setSelectedEstateName] = useState(
    'Ikoyi Creek Sanctuary, Lagos'
  );
  const [arrivalProtocol, setArrivalProtocol] = useState(
    'Discreet Courtyard Portico (Chauffeur)'
  );
  const [bookingError, setBookingError] = useState('');
  const [invitationRecord, setInvitationRecord] = useState<{
    referenceCode: string;
    name: string;
    contact: string;
    ritual: string;
    estate: string;
    arrivalProtocol: string;
    apothecaryLots: string[];
    timestamp: string;
  } | null>(null);

  const activeEstate =
    ESTATES.find((e) => e.id === activeEstateId) || ESTATES[0];

  // Filtered rituals
  const displayedRituals = RITUALS.filter((r) => {
    if (!showCatalogueIndex && !r.featuredInCore && ritualCategory === 'All') {
      return false;
    }
    if (ritualCategory !== 'All' && r.category !== ritualCategory) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroActive(true);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [showCatalogueIndex, ritualCategory, activeEstateId]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRitualForBooking = (ritualTitle: string) => {
    setSelectedRitual(null);
    setSelectedRitualTitle(ritualTitle);
    setInvitationRecord(null);
    scrollToSection('booking');
  };

  const handleReserveAtEstate = (estateName: string) => {
    setEstateModalOpen(false);
    setSelectedEstateName(estateName);
    setInvitationRecord(null);
    scrollToSection('booking');
  };

  const toggleApothecaryLot = (code: string) => {
    setSelectedApothecaryCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleRequestInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setBookingError('Please enter your full name for the Private Suite Registry.');
      return;
    }
    setBookingError('');

    const matchedRitual =
      RITUALS.find((r) => r.title === selectedRitualTitle) || RITUALS[0];
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const refCode = `AETH-NG-${matchedRitual.code.replace('-', '')}-${randomDigits}`;

    setInvitationRecord({
      referenceCode: refCode,
      name: guestName.trim(),
      contact: guestContact.trim() || 'Private Concierge Dispatch',
      ritual: selectedRitualTitle,
      estate: selectedEstateName,
      arrivalProtocol,
      apothecaryLots: selectedApothecaryCodes,
      timestamp: new Date().toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    });
  };

  return (
    <div className="font-body bg-vintage-cream text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div
          id="header-component"
          className="relative w-full h-[92px] flex items-center px-4 md:px-[62px] pointer-events-auto"
        >
          <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between h-full relative">
            {/* Quick Section Links (Desktop Left) */}
            <nav className="hidden xl:flex items-center gap-6 bg-vintage-cream/85 backdrop-blur-sm border border-vintage-accent/10 px-6 py-3">
              <button
                onClick={() => scrollToSection('philosophy')}
                className="font-body text-xs text-brand-primary hover:text-vintage-accent transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Philosophy
              </button>
              <button
                onClick={() => scrollToSection('rituals')}
                className="font-body text-xs text-brand-primary hover:text-vintage-accent transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Rituals
              </button>
              <button
                onClick={() => scrollToSection('sanctuary')}
                className="font-body text-xs text-brand-primary hover:text-vintage-accent transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Sanctuaries
              </button>
              <button
                onClick={() => scrollToSection('apothecary')}
                className="font-body text-xs text-brand-primary hover:text-vintage-accent transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Apothecary
              </button>
            </nav>

            {/* Logo Box */}
            <div className="absolute left-1/2 -translate-x-1/2 bg-vintage-cream/90 backdrop-blur-sm border border-vintage-accent/10 shadow-logo-card rounded-[2px] flex items-center px-[32px] py-[14px] min-w-[260px] sm:min-w-[280px] h-[64px] pointer-events-auto">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-4 w-full justify-center whitespace-nowrap shrink-0"
              >
                <span className="font-primary text-xl tracking-[0.2em] text-brand-primary uppercase font-bold">
                  Aetheria
                </span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open sanctuary navigation menu"
                className="absolute right-[14px] w-[36px] h-[36px] flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-brand-primary"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Booking Button */}
            <div className="ml-auto hidden md:block">
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-brand-primary flex items-center justify-center px-[32px] h-[56px] min-w-[160px] hover:bg-zinc-800 transition-colors pointer-events-auto cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="font-secondary text-[22px] leading-[28px] text-vintage-cream font-normal uppercase italic">
                  Reserve Silence
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Menu Overlay */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-brand-primary z-[60] flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
            mobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="absolute top-8 right-8 text-vintage-cream hover:opacity-70 transition-opacity cursor-pointer p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <span className="font-body text-xs tracking-widest-xl text-vintage-paper/50 uppercase">
            Ikoyi · Maitama · Idanre
          </span>

          <nav className="flex flex-col items-center gap-6 md:gap-8">
            <button
              onClick={() => scrollToSection('rituals')}
              className="font-primary text-3xl md:text-4xl text-vintage-cream hover:italic transition-all cursor-pointer"
            >
              The Rituals
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="font-primary text-3xl md:text-4xl text-vintage-cream hover:italic transition-all cursor-pointer"
            >
              Our Philosophy
            </button>
            <button
              onClick={() => scrollToSection('sanctuary')}
              className="font-primary text-3xl md:text-4xl text-vintage-cream hover:italic transition-all cursor-pointer"
            >
              The Sanctuaries
            </button>
            <button
              onClick={() => scrollToSection('apothecary')}
              className="font-primary text-3xl md:text-4xl text-vintage-cream hover:italic transition-all cursor-pointer"
            >
              Indigenous Apothecary
            </button>
            <button
              onClick={() => scrollToSection('memoirs')}
              className="font-primary text-3xl md:text-4xl text-vintage-cream hover:italic transition-all cursor-pointer"
            >
              Letters from Residents
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="mt-4 border border-vintage-cream/40 px-10 py-3 font-secondary text-2xl italic text-vintage-cream hover:bg-vintage-cream hover:text-brand-primary transition-colors cursor-pointer"
            >
              Reserve Silence
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="flex-grow">
        {/* Hero Split Section */}
        <section className="flex flex-col lg:flex-row min-h-screen bg-vintage-cream border-b border-vintage-paper items-stretch">
          <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 sm:px-12 lg:px-16 lg:pt-36 lg:pb-20 xl:px-24 xl:pt-40 border-r border-vintage-paper">
            <span
              className="font-body text-xs sm:text-sm uppercase tracking-[0.35em] text-vintage-accent mb-5 hero-text-stagger"
              style={{ animationDelay: '0.2s' }}
            >
              Ikoyi · Maitama · Idanre
            </span>
            <h1
              className="font-primary text-5xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 lg:mb-8 leading-[0.92] text-brand-primary hero-text-stagger"
              style={{ animationDelay: '0.4s' }}
            >
              Ancestral
              <br />
              Stillness
            </h1>
            <p
              className="font-secondary text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl italic leading-[1.15] mb-10 text-text-primary hero-text-stagger max-w-xl"
              style={{ animationDelay: '0.6s' }}
            >
              Leave Lagos at the gate.
              <br />
              Royal Kanuri smoke baths,
              <br />
              cold-pressed Ori, and deep
              <br />
              recovery for those who build.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-5 hero-text-stagger"
              style={{ animationDelay: '0.8s' }}
            >
              <button
                onClick={() => scrollToSection('rituals')}
                className="bg-brand-primary text-vintage-cream px-10 xl:px-12 py-4 xl:py-5 font-secondary text-2xl hover:bg-vintage-accent transition-all shadow-xl cursor-pointer whitespace-nowrap shrink-0"
              >
                Explore Rituals
              </button>
              <button
                onClick={() => setMonographTopic('story')}
                className="border border-brand-primary text-brand-primary px-10 xl:px-12 py-4 xl:py-5 font-secondary text-2xl hover:bg-brand-primary hover:text-white transition-all italic cursor-pointer whitespace-nowrap shrink-0"
              >
                Our Heritage
              </button>
            </div>
            <div className="mt-12 lg:mt-14 opacity-60">
              <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
                Single-Origin Nigerian Botanicals · Zero-Decibel Laterite Suites · Executive Recovery
              </p>
            </div>
          </div>

          <div className="flex-1 relative bg-vintage-paper overflow-hidden min-h-[480px] lg:min-h-full">
            <div
              className={`reveal-overlay hero-overlay-el ${
                heroActive ? 'active' : ''
              }`}
            />
            <div className="absolute inset-0 bg-brand-primary/5 z-10 pointer-events-none" />
            <ArchivalImage
              src={HERO_IMAGE_PATH}
              alt="Aetheria Ikoyi Rammed Laterite Courtyard & Thermal Pool"
              className={`w-full h-full object-cover image-zoom-reveal hero-zoom-el ${
                heroActive ? 'active' : ''
              }`}
            />
            <div
              className="absolute bottom-12 right-12 z-20 bg-vintage-cream/90 backdrop-blur p-8 border border-vintage-accent/20 hidden md:block hero-text-stagger max-w-md"
              style={{ animationDelay: '1.1s' }}
            >
              <p className="font-primary text-2xl italic text-brand-primary">
                "Where the city’s static dissolves into earth and water."
              </p>
            </div>
          </div>
        </section>

        {/* Principles Section (Volume I: The Philosophy) */}
        <section id="philosophy" className="py-24 lg:py-40 bg-vintage-cream px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3" data-animation-on-scroll="">
                <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent block mb-8">
                  — Volume I: The Philosophy
                </span>
                <h2 className="font-primary text-4xl lg:text-6xl leading-tight text-brand-primary mb-6">
                  Rooted Wisdom. Zero-Noise Recovery.
                </h2>
                <p className="font-secondary text-2xl italic text-text-primary/80 leading-relaxed mb-8">
                  Select any pillar below to inspect our indigenous botanical provenance and acoustic engineering standards.
                </p>
                <button
                  onClick={() => setMonographTopic('story')}
                  className="font-body text-xs uppercase tracking-widest text-brand-primary border-b border-brand-primary pb-2 hover:opacity-60 transition-opacity inline-flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Founding Chronicle</span>
                </button>
              </div>

              <div
                className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
                data-animation-on-scroll=""
              >
                {PRINCIPLES.map((principle) => {
                  const isExpanded = expandedPrinciple === principle.number;
                  return (
                    <div
                      key={principle.number}
                      onClick={() =>
                        setExpandedPrinciple(isExpanded ? null : principle.number)
                      }
                      className="space-y-5 p-6 -m-6 hover:bg-vintage-paper/40 transition-colors cursor-pointer border border-transparent hover:border-brand-primary/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm font-bold opacity-40 tabular-nums">
                          {principle.number}
                        </span>
                        <span className="font-body text-[11px] text-vintage-accent uppercase tracking-widest">
                          {isExpanded ? 'Close Folio −' : 'Inspect Folio +'}
                        </span>
                      </div>
                      <h3 className="font-primary text-3xl text-brand-primary">
                        {principle.title}
                      </h3>
                      <p className="font-body text-base leading-relaxed text-text-primary opacity-80">
                        {principle.summary}
                      </p>

                      {isExpanded && (
                        <div className="pt-4 mt-4 border-t border-brand-primary/15 space-y-3">
                          <div className="font-body text-xs text-vintage-accent">
                            {principle.manuscriptRef}
                          </div>
                          <p className="font-secondary text-xl italic text-text-primary/90 leading-relaxed">
                            {principle.archivalNote}
                          </p>
                          <div className="font-body text-xs text-brand-primary/80 pt-1">
                            {principle.primaryElements.join('  ·  ')}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Rituals Gallery */}
        <section id="rituals" className="bg-vintage-paper py-24 lg:py-40 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6"
              data-animation-on-scroll=""
            >
              <div>
                <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent block mb-4">
                  Core Collection
                </span>
                <h2 className="font-primary text-4xl lg:text-7xl text-brand-primary italic">
                  Signature Rituals
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter Controls */}
                <div className="flex flex-wrap items-center gap-1 bg-vintage-cream/70 p-1 border border-brand-primary/15">
                  {(
                    [
                      'All',
                      'Thermal & Stone',
                      'Hydro-Botanical',
                      'Complexion & Essence'
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setRitualCategory(cat)}
                      className={`px-3 py-1.5 font-body text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        ritualCategory === cat
                          ? 'bg-brand-primary text-vintage-cream'
                          : 'text-brand-primary hover:bg-brand-primary/10'
                      }`}
                    >
                      {cat === 'All' ? 'Core Selection' : cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowCatalogueIndex((prev) => !prev)}
                  className="font-body text-xs uppercase tracking-widest border-b border-brand-primary pb-2 hover:opacity-60 transition-opacity inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>
                    {showCatalogueIndex
                      ? 'Return to Gallery View'
                      : 'Catalogue Index (All 06)'}
                  </span>
                </button>
              </div>
            </div>

            {/* Full Archival Ledger Table when Catalogue Index is toggled */}
            {showCatalogueIndex ? (
              <div
                className="bg-vintage-cream border border-brand-primary/20 p-6 lg:p-12 shadow-xl mb-12"
                data-animation-on-scroll=""
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-brand-primary/15">
                  <div>
                    <span className="font-body text-xs text-vintage-accent uppercase tracking-widest">
                      West African Balneological & Executive Recovery Register
                    </span>
                    <h3 className="font-primary text-2xl lg:text-3xl text-brand-primary mt-1">
                      Complete Sanctuary Treatment Ledger
                    </h3>
                  </div>
                  <span className="font-body text-xs text-text-primary/60 tabular-nums">
                    Showing {displayedRituals.length} Documented Protocols
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-primary/20 font-body text-xs uppercase text-text-primary/60">
                        <th className="py-4 pr-4">Code</th>
                        <th className="py-4 px-4">Ritual Title</th>
                        <th className="py-4 px-4">Discipline</th>
                        <th className="py-4 px-4">Duration</th>
                        <th className="py-4 px-4">Indigenous Lineage</th>
                        <th className="py-4 pl-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-primary/10 text-sm">
                      {displayedRituals.map((ritual) => (
                        <tr
                          key={ritual.id}
                          onClick={() => setSelectedRitual(ritual)}
                          className="hover:bg-vintage-paper/50 transition-colors cursor-pointer group"
                        >
                          <td className="py-5 pr-4 font-body text-xs text-vintage-accent tabular-nums whitespace-nowrap">
                            {ritual.code}
                          </td>
                          <td className="py-5 px-4 font-primary text-xl text-brand-primary group-hover:italic">
                            {ritual.title}
                          </td>
                          <td className="py-5 px-4 font-body text-xs text-text-primary/80 whitespace-nowrap">
                            {ritual.category}
                          </td>
                          <td className="py-5 px-4 font-body text-xs text-text-primary/80 tabular-nums whitespace-nowrap">
                            {ritual.duration}
                          </td>
                          <td className="py-5 px-4 font-secondary text-lg italic text-text-primary/80">
                            {ritual.provenance}
                          </td>
                          <td className="py-5 pl-4 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRitual(ritual);
                              }}
                              className="font-body text-xs uppercase tracking-widest text-brand-primary border-b border-brand-primary pb-0.5 hover:text-vintage-accent cursor-pointer"
                            >
                              Inspect Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedRituals.map((ritual, idx) => (
                  <div
                    key={ritual.id}
                    onClick={() => setSelectedRitual(ritual)}
                    className="group cursor-pointer flex flex-col"
                    data-animation-on-scroll=""
                    style={{ transitionDelay: `${idx * 0.15}s` }}
                  >
                    <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-brand-primary/10">
                      <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-6">
                        <span className="font-secondary text-2xl italic text-vintage-cream flex items-center gap-2">
                          <span>Inspect Protocol Dossier</span>
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                      <ArchivalImage
                        src={ritual.image}
                        alt={ritual.title}
                        codeLabel={`Code: ${ritual.code}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <span className="absolute top-6 left-6 z-20 font-body text-[10px] text-white uppercase tracking-widest bg-brand-primary/60 backdrop-blur px-3 py-1 tabular-nums">
                        Code: {ritual.code}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-primary text-2xl text-brand-primary group-hover:italic transition-all">
                        {ritual.title}
                      </h3>
                      <span className="font-body text-xs text-vintage-accent tabular-nums shrink-0">
                        {ritual.duration}
                      </span>
                    </div>

                    <p className="font-secondary text-xl italic opacity-75 mb-6 flex-grow">
                      {ritual.shortDescription}
                    </p>
                    <div className="w-full h-[1px] bg-brand-primary/15 group-hover:bg-brand-primary/40 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* The Sanctuary (Split Editorial) */}
        <section id="sanctuary" className="bg-vintage-cream py-24 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-6">
            {/* Estate Location Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-brand-primary/10">
              <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent">
                — Nigerian Architectural Sanctuaries
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {ESTATES.map((estate) => (
                  <button
                    key={estate.id}
                    onClick={() => setActiveEstateId(estate.id)}
                    className={`px-4 py-2 font-body text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      estate.id === activeEstate.id
                        ? 'bg-brand-primary text-vintage-cream'
                        : 'bg-vintage-paper/60 text-brand-primary hover:bg-vintage-paper'
                    }`}
                  >
                    {estate.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
              <div className="flex-1 space-y-12" data-animation-on-scroll="">
                <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent block">
                  — {activeEstate.regionLabel} · {activeEstate.coordinates}
                </span>
                <h2 className="font-primary text-4xl lg:text-7xl text-brand-primary leading-tight">
                  {activeEstate.headline}
                </h2>
                <p className="font-secondary text-2xl lg:text-4xl italic text-text-primary leading-relaxed opacity-90">
                  {activeEstate.quote}
                </p>
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-brand-primary/10">
                  <div>
                    <h4 className="font-body text-[10px] uppercase tracking-widest opacity-50 mb-2">
                      Structure
                    </h4>
                    <p className="font-primary text-xl">{activeEstate.structure}</p>
                  </div>
                  <div>
                    <h4 className="font-body text-[10px] uppercase tracking-widest opacity-50 mb-2">
                      Ambiance
                    </h4>
                    <p className="font-primary text-xl">{activeEstate.ambiance}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-8">
                  <button
                    onClick={() => setEstateModalOpen(true)}
                    className="font-body text-sm uppercase tracking-widest text-brand-primary border-b border-brand-primary pb-2 hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Explore the Sanctuary Chambers
                  </button>
                  <button
                    onClick={() => handleReserveAtEstate(activeEstate.name)}
                    className="font-secondary text-2xl italic text-vintage-accent hover:text-brand-primary transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Reserve at {activeEstate.name.split(',')[0]} →
                  </button>
                </div>
              </div>

              <div className="flex-1 relative w-full" data-animation-on-scroll="">
                <div
                  onClick={() => setEstateModalOpen(true)}
                  className="aspect-square bg-vintage-paper overflow-hidden relative shadow-2xl cursor-pointer group"
                >
                  <ArchivalImage
                    src={activeEstate.image}
                    alt={`${activeEstate.name} Corridor`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border-[24px] border-vintage-cream/20 pointer-events-none" />
                </div>
                <div className="lg:absolute lg:-bottom-12 lg:-left-12 bg-brand-primary text-vintage-cream p-8 lg:p-12 lg:max-w-xs mt-6 lg:mt-0">
                  <p className="font-body text-xs leading-relaxed">
                    {activeEstate.corridorNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Apothecary Section */}
        <section
          id="apothecary"
          className="py-24 lg:py-36 bg-vintage-paper/60 border-t border-brand-primary/10 px-6"
        >
          <div className="max-w-[1440px] mx-auto">
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
              data-animation-on-scroll=""
            >
              <div>
                <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent block mb-4">
                  — Volume II: West African Materia Medica
                </span>
                <h2 className="font-primary text-4xl lg:text-6xl text-brand-primary">
                  Indigenous Apothecary
                </h2>
              </div>
              <p className="font-secondary text-2xl italic text-text-primary/80 max-w-md">
                Select single-origin Nigerian botanical preparations to be compounded for your private suite prior to arrival.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {APOTHECARY_ITEMS.map((item) => {
                const isSelected = selectedApothecaryCodes.includes(item.code);
                return (
                  <div
                    key={item.code}
                    onClick={() => toggleApothecaryLot(item.code)}
                    className={`p-8 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-vintage-cream border-brand-primary shadow-lg'
                        : 'bg-vintage-cream/60 border-brand-primary/15 hover:border-brand-primary/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-body text-xs text-vintage-accent mb-4 tabular-nums">
                        <span>{item.code}</span>
                        <span>{item.vessel}</span>
                      </div>
                      <h3 className="font-primary text-2xl text-brand-primary mb-1">
                        {item.name}
                      </h3>
                      <div className="font-secondary text-lg italic text-text-primary/70 mb-4">
                        {item.latinName}
                      </div>
                      <p className="font-body text-xs leading-relaxed text-text-primary/80 mb-6">
                        {item.notes}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-primary/10 flex items-center justify-between">
                      <span className="font-body text-[11px] text-text-primary/60">
                        Paired: {item.pairedRitual}
                      </span>
                      <span
                        className={`font-body text-xs inline-flex items-center gap-1.5 ${
                          isSelected ? 'text-brand-primary font-bold' : 'text-vintage-accent'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Suite Dossier</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Add to Suite</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials / Memoirs */}
        <section
          id="memoirs"
          className="py-24 lg:py-40 bg-brand-primary text-vintage-cream overflow-hidden"
        >
          <div className="max-w-[1440px] mx-auto px-6 relative">
            <div className="text-center mb-24" data-animation-on-scroll="">
              <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-paper/60 mb-6 block">
                — The Experience
              </span>
              <h2 className="font-primary text-4xl lg:text-6xl">
                Notes from Sanctuary Residents
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
              {MEMOIR_LETTERS.map((letter, index) => (
                <div
                  key={letter.id}
                  className="space-y-8 flex flex-col justify-between"
                  data-animation-on-scroll=""
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <p className="font-secondary text-3xl italic leading-relaxed opacity-90">
                    {letter.quote}
                  </p>
                  <div className="pt-4 border-t border-vintage-paper/15">
                    <h4 className="font-primary text-lg">{letter.author}</h4>
                    <span className="font-body text-[10px] uppercase tracking-widest opacity-60 block mt-1">
                      {letter.meta} · {letter.estate}
                    </span>
                    <span className="font-body text-[10px] text-vintage-paper/75 block mt-1">
                      {letter.ritualRef}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section
          id="booking"
          className="py-24 lg:py-40 bg-vintage-paper border-y border-vintage-accent/10 px-6"
        >
          <div
            className="max-w-[1000px] mx-auto text-center"
            data-animation-on-scroll=""
          >
            <span className="font-body text-xs uppercase tracking-widest-xl text-vintage-accent mb-8 block">
              Private Suite Access
            </span>
            <h2 className="font-primary text-5xl lg:text-8xl text-brand-primary mb-12">
              Step Out of the Static
            </h2>
            <p className="font-secondary text-3xl lg:text-4xl italic text-text-primary mb-16 max-w-2xl mx-auto opacity-80">
              Admitting no more than eight guests per day across our Ikoyi, Maitama, and Idanre sanctuaries for complete discretion.
            </p>

            <div className="bg-vintage-cream p-8 sm:p-12 lg:p-20 shadow-2xl relative text-left">
              {invitationRecord ? (
                <div className="space-y-8 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-primary/20">
                    <div>
                      <span className="font-body text-xs uppercase tracking-widest text-vintage-accent block mb-1">
                        Private Suite Pass Logged · {invitationRecord.timestamp}
                      </span>
                      <h3 className="font-primary text-3xl lg:text-4xl text-brand-primary">
                        Sanctuary Entry Dossier
                      </h3>
                    </div>
                    <span className="font-body text-sm bg-brand-primary text-vintage-cream px-4 py-2 tabular-nums self-start">
                      Ref: {invitationRecord.referenceCode}
                    </span>
                  </div>

                  <p className="font-secondary text-2xl lg:text-3xl italic text-text-primary leading-relaxed">
                    Thank you, {invitationRecord.name}. Our Chief Concierge has reserved a private suite request for{' '}
                    <span className="text-brand-primary font-semibold">
                      {invitationRecord.estate}
                    </span>
                    .
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-brand-primary/15 text-sm">
                    <div>
                      <dt className="font-body text-xs uppercase tracking-widest opacity-60 mb-1">
                        Selected Ritual Protocol
                      </dt>
                      <dd className="font-primary text-xl text-brand-primary">
                        {invitationRecord.ritual}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-xs uppercase tracking-widest opacity-60 mb-1">
                        Sanctuary Location
                      </dt>
                      <dd className="font-primary text-xl text-brand-primary">
                        {invitationRecord.estate}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-xs uppercase tracking-widest opacity-60 mb-1">
                        Arrival & Discretion Protocol
                      </dt>
                      <dd className="font-body text-xs text-text-primary">
                        {invitationRecord.arrivalProtocol} · {invitationRecord.contact}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-body text-xs uppercase tracking-widest opacity-60 mb-1">
                        Bespoke Suite Apothecary
                      </dt>
                      <dd className="font-body text-xs text-text-primary tabular-nums">
                        {invitationRecord.apothecaryLots.length > 0
                          ? invitationRecord.apothecaryLots.join(' · ')
                          : 'Standard Unscented Kwara Ori Preparation'}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="font-body text-xs opacity-60">
                      Gatehouse access code & private jetty coordinates dispatched within 4 hours.
                    </span>
                    <button
                      onClick={() => setInvitationRecord(null)}
                      className="border border-brand-primary text-brand-primary px-8 py-3 font-secondary text-2xl hover:bg-brand-primary hover:text-vintage-cream transition-colors cursor-pointer"
                    >
                      Modify Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRequestInvitation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div className="space-y-4">
                      <label
                        htmlFor="guest-name"
                        className="font-body text-[10px] uppercase tracking-widest opacity-60 block"
                      >
                        Full Name or Principal Alias
                      </label>
                      <input
                        id="guest-name"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Tunde Bakare"
                        className="w-full bg-transparent border-b border-brand-primary/20 py-4 font-primary text-2xl focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="ritual-interest"
                        className="font-body text-[10px] uppercase tracking-widest opacity-60 block"
                      >
                        Ritual Interest
                      </label>
                      <select
                        id="ritual-interest"
                        value={selectedRitualTitle}
                        onChange={(e) => setSelectedRitualTitle(e.target.value)}
                        className="w-full bg-transparent border-b border-brand-primary/20 py-4 font-primary text-2xl focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                      >
                        {RITUALS.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title} ({r.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="sanctuary-estate"
                        className="font-body text-[10px] uppercase tracking-widest opacity-60 block"
                      >
                        Sanctuary Location
                      </label>
                      <select
                        id="sanctuary-estate"
                        value={selectedEstateName}
                        onChange={(e) => setSelectedEstateName(e.target.value)}
                        className="w-full bg-transparent border-b border-brand-primary/20 py-4 font-primary text-xl focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                      >
                        {ESTATES.map((est) => (
                          <option key={est.id} value={est.name}>
                            {est.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="arrival-protocol"
                        className="font-body text-[10px] uppercase tracking-widest opacity-60 block"
                      >
                        Preferred Arrival Protocol
                      </label>
                      <select
                        id="arrival-protocol"
                        value={arrivalProtocol}
                        onChange={(e) => setArrivalProtocol(e.target.value)}
                        className="w-full bg-transparent border-b border-brand-primary/20 py-4 font-primary text-xl focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                      >
                        <option value="Discreet Courtyard Portico (Chauffeur)">
                          Discreet Courtyard Portico (Chauffeur)
                        </option>
                        <option value="Private Five Cowrie Creek Jetty (Boat)">
                          Private Creek Jetty (Boat Arrival)
                        </option>
                        <option value="Executive After-Hours Lockout (9PM–1AM)">
                          Executive After-Hours Lockout (9PM–1AM)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                      <label
                        htmlFor="guest-contact"
                        className="font-body text-[10px] uppercase tracking-widest opacity-60 block"
                      >
                        Private Concierge Contact (WhatsApp / Encrypted Mail / PA Line)
                      </label>
                      <input
                        id="guest-contact"
                        type="text"
                        value={guestContact}
                        onChange={(e) => setGuestContact(e.target.value)}
                        placeholder="+234 809 ... or office@domain.ng"
                        className="w-full bg-transparent border-b border-brand-primary/20 py-4 font-primary text-xl focus:outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  {bookingError && (
                    <p className="mt-6 font-body text-xs text-vintage-accent">
                      {bookingError}
                    </p>
                  )}

                  <div className="mt-14 text-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-brand-primary text-vintage-cream px-20 py-6 font-secondary text-3xl hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      Request Private Suite Pass
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p className="mt-12 font-body text-[10px] uppercase tracking-widest opacity-40">
              Gatehouse clearances and private jetty coordinates confirmed via encrypted dispatch within 4 hours.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-vintage-cream pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-primary text-3xl lg:text-5xl mb-8">Aetheria</h2>
              <p className="font-secondary text-2xl italic max-w-md opacity-80 leading-relaxed">
                Ancestral West African botanical rituals and acoustic rammed-earth sanctuaries for deep executive stillness.
              </p>
            </div>

            <div>
              <h4 className="font-body text-xs uppercase tracking-widest mb-8 text-vintage-paper/60">
                Sanctuary Locations
              </h4>
              <ul className="space-y-4 font-body text-sm">
                {ESTATES.map((estate) => (
                  <li key={estate.id}>
                    <button
                      onClick={() => {
                        setActiveEstateId(estate.id);
                        scrollToSection('sanctuary');
                      }}
                      className="hover:text-vintage-paper hover:underline transition-colors cursor-pointer text-left"
                    >
                      {estate.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-xs uppercase tracking-widest mb-8 text-vintage-paper/60">
                Connect
              </h4>
              <ul className="space-y-4 font-body text-sm">
                <li>
                  <button
                    onClick={() => setMonographTopic('story')}
                    className="hover:text-vintage-paper hover:underline transition-colors cursor-pointer"
                  >
                    Our Heritage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setMonographTopic('journal')}
                    className="hover:text-vintage-paper hover:underline transition-colors cursor-pointer"
                  >
                    The Botanical Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="hover:text-vintage-paper hover:underline transition-colors cursor-pointer"
                  >
                    Private Concierge
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-vintage-paper/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-body text-[10px] uppercase tracking-widest opacity-40">
              © 2026 Aetheria Sanctuary Nigeria · Ikoyi · Maitama · Idanre. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <button
                onClick={() => setMonographTopic('privacy')}
                className="font-body text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Discretion Charter
              </button>
              <button
                onClick={() => setMonographTopic('terms')}
                className="font-body text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Terms of the Sanctuary
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <RitualDossierModal
        ritual={selectedRitual}
        onClose={() => setSelectedRitual(null)}
        onSelectForBooking={handleSelectRitualForBooking}
      />

      <EstateExplorerModal
        isOpen={estateModalOpen}
        activeEstate={activeEstate}
        onSelectEstate={(id) => setActiveEstateId(id)}
        onClose={() => setEstateModalOpen(false)}
        onReserveAtEstate={handleReserveAtEstate}
      />

      <ArchivalMonographModal
        activeTopic={monographTopic}
        onClose={() => setMonographTopic(null)}
      />
    </div>
  );
}
