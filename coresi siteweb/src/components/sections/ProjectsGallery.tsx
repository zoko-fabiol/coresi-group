import React, { useState } from 'react';
import { FolderKanban, MapPin, Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { Language, translations } from '../../data/translations';
import { portfolioProjects, ProjectItem } from '../../data/portfolio';

interface ProjectsGalleryProps {
  currentLang: Language;
  onOpenQuoteModal: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ currentLang, onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[currentLang].projects;

  const categories = [
    { id: 'all', labelFr: 'Tous les Chantiers', labelEn: 'All Projects' },
    { id: 'oil_gas', labelFr: 'Pétrole & Gaz', labelEn: 'Oil & Gas' },
    { id: 'buildings', labelFr: 'Hangars & Bâtiments', labelEn: 'Warehouses & Steel' },
    { id: 'industry', labelFr: 'Chaudronnerie & Usines', labelEn: 'Boilermaking & Units' },
    { id: 'energy', labelFr: 'Énergie & Stations', labelEn: 'Energy & Stations' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projets" className="py-20 lg:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const label = currentLang === 'fr' ? c.labelFr : c.labelEn;
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3B7A2C] text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((p) => {
            const title = currentLang === 'fr' ? p.titleFr : p.titleEn;
            const desc = currentLang === 'fr' ? p.descriptionFr : p.descriptionEn;

            return (
              <div
                key={p.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-xl text-[10px] font-bold bg-slate-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    {p.metrics}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{p.location}</span>
                      <span>•</span>
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{p.year}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Client : <strong className="text-slate-200">{p.client}</strong></span>
                    <button
                      onClick={onOpenQuoteModal}
                      className="p-2 rounded-xl bg-slate-800 group-hover:bg-[#3B7A2C] text-slate-300 group-hover:text-white transition-colors cursor-pointer"
                      title="Projet similaire ? Demandez un devis"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
