export type Language = 'fr' | 'en';

export interface TranslationData {
  nav: {
    home: string;
    about: string;
    services: string;
    products: string;
    projects: string;
    standards: string;
    contact: string;
    requestQuote: string;
    phone: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  about: {
    badge: string;
    title: string;
    highlight: string;
    text1: string;
    text2: string;
    text3: string;
    coreValuesTitle: string;
    values: {
      title: string;
      desc: string;
    }[];
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      category: string;
      desc: string;
      features: string[];
      image: string;
    }[];
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      badge: string;
      desc: string;
      specs: string[];
      image: string;
    }[];
  };
  standards: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      code: string;
      name: string;
      desc: string;
    }[];
  };
  partners: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    addressTitle: string;
    addressText: string;
    kribiTitle: string;
    kribiText: string;
    phoneTitle: string;
    emailTitle: string;
    hoursTitle: string;
    hoursText: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    email: string;
    phone: string;
    serviceSelect: string;
    servicePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contactInfo: string;
    legalOhada: string;
    copyright: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationData> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Nos Métiers',
      products: 'Produits & Solutions',
      projects: 'Réalisations',
      standards: 'Qualité & Normes',
      contact: 'Contact',
      requestQuote: 'Demander un Devis',
      phone: '+237 682 36 82 82',
    },
    hero: {
      badge: 'Excellence Industrielle & Métallique depuis 2012',
      title1: 'L\'Ingénierie Métallique & le',
      titleHighlight: 'Montage d\'Usines',
      title2: 'au Cœur de l\'Afrique Centrale',
      subtitle:
        'Chaudronnerie lourde, tuyauterie industrielle certifiée ASME, bacs de stockage pétrolier et érection d\'unités clés en main. Partenaire de confiance des multinationales de l\'énergie et de l\'industrie.',
      ctaPrimary: 'Découvrir Nos Réalisations',
      ctaSecondary: 'Demander une Étude / Devis',
      stat1Value: '+14 ans',
      stat1Label: 'D\'expérience avérée (depuis 2012)',
      stat2Value: '+180',
      stat2Label: 'Ouvrages industriels livrés',
      stat3Value: '100%',
      stat3Label: 'Conformité ASME IX & ISO 9606',
      stat4Value: '0',
      stat4Label: 'Accident (Culture QHSE stricte)',
    },
    about: {
      badge: 'Histoire & Vision',
      title: 'Une Référence Industrielle au',
      highlight: 'Cameroun & en Zone CEMAC',
      text1:
        'CORESI International est une société d\'ingénierie et de construction métallique fondée en 2012. Grâce aux multiples ouvrages d\'envergure réalisés pour les plus grands donneurs d\'ordres, nous nous positionnons aujourd\'hui comme le partenaire de référence au Cameroun et en Afrique Centrale.',
      text2:
        'Notre approche qualité, associée à une rigueur d\'exécution militaire, garantit le respect scrupuleux des normes internationales les plus exigeantes (ASME Section IX, CODAP, API 650, ISO).',
      text3:
        'Nos équipes d\'ingénieurs calculateurs, chefs de projets et soudeurs homologués 6G interviennent sur l\'ensemble du territoire, de nos ateliers centraux de Douala jusqu\'au pôle portuaire et offshore de Kribi.',
      coreValuesTitle: 'Nos 4 Piliers Fondamentaux',
      values: [
        {
          title: 'Sécurité & QHSE Absolue',
          desc: 'Politique stricte « Zéro Accident » et respect inconditionnel des standards de sécurité sur chantiers à haut risque.',
        },
        {
          title: 'Haute Précision & Normes',
          desc: 'Traçabilité métallurgique complète, contrôle CND (radiographie, ultrasons, ressuage) et soudures certifiées.',
        },
        {
          title: 'Respect des Délais & Jalons',
          desc: 'Gestion rigoureuse des plannings de chantiers pour garantir la mise en service sans retard des unités industrielles.',
        },
        {
          title: 'Solutions Sur Mesure Clé en Main',
          desc: 'De la note de calcul initiale à l\'érection sur site, nous concevons des réponses parfaitement adaptées aux contraintes locales.',
        },
      ],
    },
    services: {
      badge: 'Nos Domaines d\'Expertise',
      title: 'Des Métiers d\'Excellence pour l\'Industrie',
      subtitle:
        'Des capacités techniques avancées pour concrétiser vos projets les plus complexes, de l\'ingénierie de détail à la mise en service.',
      items: [
        {
          id: 'plant-erection',
          title: 'Montage d\'Usines & Érection Industrielle',
          category: 'Grands Chantiers',
          desc: 'Installation et montage intégral d\'unités de production industrielle, cimenteries, centrales thermiques, usines de transformation et complexes pétroliers.',
          features: [
            'Levage lourd et manutention complexe',
            'Alignement laser de machines tournantes',
            'Pose de structures et charpentes lourdes',
            'Mise en service et essais sous charge',
          ],
          image: '/images/hero/plant_erection_hd.jpg',
        },
        {
          id: 'chaudronnerie',
          title: 'Chaudronnerie Industrielle & Mécano-Soudure',
          category: 'Atelier & Fabrication',
          desc: 'Conception et fabrication en atelier de pièces mécano-soudées complexes, cyclones, gaines de dépoussiérage, trémies et réservoirs métalliques.',
          features: [
            'Roulage de tôles fortes épaisseurs',
            'Découpe plasma et oxycoupage numérique',
            'Assemblages sous contrôle géométrique',
            'Soudeurs qualifiés ASME IX et ISO 9606',
          ],
          image: '/images/services/welding_workshop.jpg',
        },
        {
          id: 'tuyauterie',
          title: 'Tuyauterie Industrielle & Skids Haute Pression',
          category: 'Process & Fluides',
          desc: 'Préfabrication et pose de lignes de tuyauterie acier carbone, inox et alliages pour le transport de vapeur, hydrocarbures, gaz et fluides corrosifs.',
          features: [
            'Contrôle non destructif 100% (CND Radio / Ressuage)',
            'Épreuves hydrauliques certifiées',
            'Préfabrication de skids modulaires pré-équipés',
            'Traitement de surface anticorrosion',
          ],
          image: '/images/services/piping_fittings.jpeg',
        },
        {
          id: 'cuves',
          title: 'Bacs de Stockage & Cuves Pétrolières',
          category: 'Hydrocarbures & Bacs',
          desc: 'Construction neuve, réhabilitation et réparation de réservoirs de stockage d\'hydrocarbures selon les normes internationales API 650 et CODRES.',
          features: [
            'Bacs à toit fixe et toit flottant',
            'Cuves double paroi enterrées et aériennes',
            'Remplacement de viroles et fonds de bacs',
            'Équipements de sécurité et détection incendie',
          ],
          image: '/images/services/storage_tanks.jpg',
        },
        {
          id: 'charpente',
          title: 'Charpente Métallique & Hangars Industriels',
          category: 'Bâtiments Industriels',
          desc: 'Étude, calcul de structure, fabrication et érection de hangars logistiques grande portée, plateformes d\'accès et bâtiments métalliques modulaires.',
          features: [
            'Notes de calcul Eurocodes & CM66',
            'Intégration de chemins de roulement et ponts roulants',
            'Bardages et couvertures étanches thermo-laqués',
            'Montage rapide sur site sécurisé',
          ],
          image: '/images/services/warehouse_const.jpeg',
        },
        {
          id: 'maintenance',
          title: 'Maintenance Industrielle & Arrêts d\'Unités',
          category: 'Opérations Continues',
          desc: 'Interventions d\'urgence, maintenance préventive et gestion complète des arrêts techniques majeurs d\'usines et de raffineries.',
          features: [
            'Équipes d\'intervention d\'astreinte 24/7',
            'Remplacement d\'échangeurs et faisceaux',
            'Travaux d\'étanchéité et rechargement de soudures',
            'Rapport technique détaillé et conformité CND',
          ],
          image: '/images/services/mobile_gas_station.jpeg',
        },
      ],
    },
    products: {
      badge: 'Solutions Clé en Main',
      title: 'Nos Équipements Prêts à l\'Emploi',
      subtitle:
        'Des produits normalisés et modulaires, conçus pour répondre aux besoins opérationnels immédiats des sites industriels et miniers isolés.',
      items: [
        {
          id: 'mobile-station',
          title: 'Stations-Services Mobiles Conteneurisées',
          badge: 'Meilleure Vente',
          desc: 'Unités de distribution de carburant entièrement autonomes, intégrées en conteneurs maritimes ISO 20ft / 40ft blindés.',
          specs: [
            'Capacités de 10 000 à 60 000 Litres',
            'Groupe motopompe certifié ATEX avec volucompteur numérique',
            'Alimentation solaire photovoltaïque ou groupe intégré',
            'Prête à brancher (Plug & Play) en moins de 24h',
          ],
          image: '/images/services/mobile_gas_station.jpeg',
        },
        {
          id: 'warehouse-modular',
          title: 'Hangars Démontables & Entrepôts Métalliques',
          badge: 'Déploiement Rapide',
          desc: 'Structures modulaires en acier galvanisé haute résistance conçues pour les bases-vie, dépôts logistiques et zones portuaires.',
          specs: [
            'Portées libres sans poteau intermédiaire jusqu\'à 40 mètres',
            'Montage et démontage sans détérioration des profilés',
            'Résistance certifiée aux vents violents côtiers et pluies tropicales',
            'Options portes sectionnelles motorisées et aérateurs dynamiques',
          ],
          image: '/images/services/warehouse_const.jpeg',
        },
        {
          id: 'piping-spools',
          title: 'Tronçons de Tuyauterie & Raccords Forgés',
          badge: 'Qualité Certifiée',
          desc: 'Spools de tuyauterie préfabriqués en atelier avec dossiers constructeurs complets, certificats matière 3.1 et radiographies.',
          specs: [
            'Diamètres de 1/2" à 48" en classes 150# à 2500#',
            'Matières : Acier Carbone A106 Gr.B, Inox 304L/316L, Duplex',
            'Revêtements polyuréthane ou peinture époxy marine C5M',
            'Livraison conditionnée prête à boulonner sur site',
          ],
          image: '/images/services/piping_fittings.jpeg',
        },
      ],
    },
    standards: {
      badge: 'Exigence & Réglementation',
      title: 'Conformité Normative & Certifications',
      subtitle:
        'Chaque projet réalisé par CORESI fait l\'objet d\'un suivi qualité rigoureux et d\'un dossier des ouvrages exécutés (DOE) complet.',
      items: [
        {
          code: 'ASME Section IX',
          name: 'Qualification des Soudeurs & Modes Opératoires (QMOS/QS)',
          desc: 'Tous nos procédés de soudage (TIG, SMAW, MIG/MAG) et nos soudeurs sont qualifiés selon les codes internationaux ASME.',
        },
        {
          code: 'CODAP & CODRES',
          name: 'Codes Français de Construction des Appareils à Pression & Réservoirs',
          desc: 'Dimensionnement et fabrication des cuves et réservoirs sous pression en parfaite adéquation avec la réglementation des installations classées.',
        },
        {
          code: 'ISO 9606 & ISO 3834',
          name: 'Exigences de Qualité en Soudage par Fusion',
          desc: 'Maîtrise complète de la qualité des assemblages soudés en atelier et sur chantier.',
        },
        {
          code: 'Culture QHSE Zéro Accident',
          name: 'Management de la Santé, Sécurité et Environnement',
          desc: 'Briefing sécurité quotidien (causeries HSE), port obligatoire des EPI, permis de feu et analyses de risques systématiques.',
        },
      ],
    },
    partners: {
      badge: 'Confiance & Reconnaissance',
      title: 'Ils Font Confiance à CORESI International',
      subtitle:
        'Partenaire privilégié des multinationales de l\'énergie, des organismes internationaux et des leaders de l\'industrie en Afrique.',
    },
    projects: {
      badge: 'Portfolio Industriel',
      title: 'Nos Réalisations d\'Envergure',
      subtitle:
        'Découvrez un aperçu des projets menés à bien par nos équipes sur les principaux sites industriels et énergétiques.',
      filterAll: 'Tous les Projets',
    },
    contact: {
      badge: 'Contactez Nos Experts',
      title: 'Démarrons Votre Prochain Projet',
      subtitle:
        'Notre bureau d\'études et nos équipes techniques sont à votre écoute pour analyser votre cahier des charges et chiffrer vos besoins.',
      addressTitle: 'Siège Social & Ateliers Centraux',
      addressText: '124, Rue Deido Bonandjo, Douala – Cameroun',
      kribiTitle: 'Base Opérationnelle Kribi',
      kribiText: 'Zone Portuaire & Offshore, Kribi – Cameroun',
      phoneTitle: 'Téléphones Directs',
      emailTitle: 'Courriels Officiels',
      hoursTitle: 'Horaires d\'Ouverture',
      hoursText: 'Lundi – Vendredi : 07h30 – 18h00 | Samedi : 08h00 – 13h00 (Astreinte chantiers 24/7)',
      formTitle: 'Demande de Devis & Étude Technique',
      formSubtitle: 'Remplissez ce formulaire et notre équipe d\'ingénieurs vous contactera sous 24 à 48 heures.',
      fullName: 'Nom Complet / Fonction',
      email: 'Adresse E-mail Professionnelle',
      phone: 'Numéro de Téléphone (avec indicatif)',
      serviceSelect: 'Domaine d\'Intervention Principal',
      servicePlaceholder: 'Sélectionnez un domaine...',
      message: 'Description Sommaire du Projet / Spécifications',
      messagePlaceholder: 'Précisez le type d\'ouvrage, dimensions, localisation du site, tonnage estimé ou délais souhaités...',
      submit: 'Envoyer ma Demande de Devis',
      submitting: 'Transmission en cours...',
      successMessage: 'Votre demande a été transmise avec succès à la Direction Technique CORESI. Nous reviendrons vers vous très rapidement.',
    },
    footer: {
      tagline:
        'Société de référence en chaudronnerie, tuyauterie industrielle, bacs de stockage et montage d\'usines au Cameroun et en Afrique Centrale depuis 2012.',
      quickLinks: 'Navigation Rapide',
      contactInfo: 'Coordonnées & Adresses',
      legalOhada: 'Entreprise enregistrée au Registre du Commerce et du Crédit Mobilier (RCCM) et Identifiant Fiscal (NIF) officiel du Cameroun.',
      copyright: 'CORESI International SARL. Tous droits réservés.',
      rights: 'Conçu et propulsé avec les standards web de haute performance.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Our Services',
      products: 'Products & Solutions',
      projects: 'Projects',
      standards: 'Quality & Standards',
      contact: 'Contact',
      requestQuote: 'Request a Quote',
      phone: '+237 682 36 82 82',
    },
    hero: {
      badge: 'Industrial Excellence & Steel Construction Since 2012',
      title1: 'Steel Engineering &',
      titleHighlight: 'Plant Erection',
      title2: 'Across Central Africa',
      subtitle:
        'Heavy boilermaking, ASME certified industrial piping, petroleum storage tanks, and turnkey plant erection. Trusted partner of international energy and industrial leaders.',
      ctaPrimary: 'Explore Our Projects',
      ctaSecondary: 'Request a Quote / Study',
      stat1Value: '+14 Years',
      stat1Label: 'Of proven expertise (since 2012)',
      stat2Value: '+180',
      stat2Label: 'Industrial projects delivered',
      stat3Value: '100%',
      stat3Label: 'ASME IX & ISO 9606 Compliance',
      stat4Value: '0',
      stat4Label: 'Accidents (Strict QHSE culture)',
    },
    about: {
      badge: 'History & Vision',
      title: 'An Industrial Benchmark in',
      highlight: 'Cameroon & Central Africa',
      text1:
        'CORESI International is an engineering and metal construction company founded in 2012. Thanks to multiple high-profile projects delivered for world-class contractors, we place ourselves today as the benchmark in Cameroon and Central Africa.',
      text2:
        'Our quality approach, combined with military-grade operational discipline, guarantees strict compliance with the most demanding international standards (ASME Section IX, CODAP, API 650, ISO).',
      text3:
        'Our certified structural engineers, project managers, and 6G certified welders operate across all regions, from our central workshops in Douala to the offshore port cluster in Kribi.',
      coreValuesTitle: 'Our 4 Core Pillars',
      values: [
        {
          title: 'Safety & Absolute QHSE',
          desc: 'Strict "Zero Accident" policy and unconditional compliance with safety standards on high-risk industrial sites.',
        },
        {
          title: 'High Precision & Standards',
          desc: 'Full metallurgical traceability, non-destructive testing (NDT radiograph, ultrasonic, dye penetrant), and certified welding.',
        },
        {
          title: 'On-Time Milestone Delivery',
          desc: 'Rigorous schedule control ensuring smooth commissioning without shutdown delays.',
        },
        {
          title: 'Turnkey Tailored Solutions',
          desc: 'From structural calculation notes to on-site erection, we design solutions engineered for local operational constraints.',
        },
      ],
    },
    services: {
      badge: 'Areas of Expertise',
      title: 'Industrial Engineering & Specialized Trades',
      subtitle:
        'Advanced technical capabilities to turn your most challenging structural and process projects into reality.',
      items: [
        {
          id: 'plant-erection',
          title: 'Plant Erection & Unit Assembly',
          category: 'Heavy Construction',
          desc: 'Full installation and assembly of industrial production units, cement factories, thermal power plants, processing units, and oil & gas facilities.',
          features: [
            'Heavy lifting and complex rigging operations',
            'Laser precision alignment of rotating equipment',
            'Erection of heavy steel structural frameworks',
            'Commissioning and load-testing assistance',
          ],
          image: '/images/hero/plant_erection_hd.jpg',
        },
        {
          id: 'chaudronnerie',
          title: 'Heavy Boilermaking & Welding Fabrication',
          category: 'Workshop & Fabrication',
          desc: 'In-shop design and fabrication of complex welded structures, cyclones, dust extraction ducts, industrial hoppers, and custom pressure vessels.',
          features: [
            'Heavy plate rolling and bending',
            'CNC plasma and precision flame cutting',
            'Assembly under strict geometric control',
            'ASME IX & ISO 9606 qualified welders',
          ],
          image: '/images/services/welding_workshop.jpg',
        },
        {
          id: 'tuyauterie',
          title: 'Industrial Piping & High Pressure Skids',
          category: 'Process & Fluids',
          desc: 'Prefabrication and erection of carbon steel, stainless steel, and alloy piping networks for steam, hydrocarbons, gas, and chemical processes.',
          features: [
            '100% Non-destructive testing (Radiography / NDT)',
            'Certified hydrostatic pressure testing',
            'Pre-assembled modular skids delivery',
            'Marine-grade C5M anti-corrosion coating',
          ],
          image: '/images/services/piping_fittings.jpeg',
        },
        {
          id: 'cuves',
          title: 'Petroleum Storage Tanks & Pressure Vessels',
          category: 'Hydrocarbons & Storage',
          desc: 'New construction, rehabilitation, and inspection of bulk liquid storage tanks according to API 650 and CODRES international standards.',
          features: [
            'Fixed roof and floating roof tank designs',
            'Underground and above-ground double-walled tanks',
            'Shell and tank bottom plate replacement',
            'Fire suppression and level-sensing integrations',
          ],
          image: '/images/services/storage_tanks.jpg',
        },
        {
          id: 'charpente',
          title: 'Structural Steel & Warehouse Construction',
          category: 'Industrial Buildings',
          desc: 'Structural engineering, calculation notes, fabrication, and erection of large clear-span warehouses, access platforms, and modular facilities.',
          features: [
            'Eurocode & AISC structural calculation reports',
            'Overhead crane beam and runway integration',
            'Weather-tight thermal sandwich cladding',
            'Fast and safe on-site crane erection',
          ],
          image: '/images/services/warehouse_const.jpeg',
        },
        {
          id: 'maintenance',
          title: 'Industrial Maintenance & Plant Turnarounds',
          category: 'Ongoing Operations',
          desc: 'Emergency turnaround teams, preventive maintenance programs, and major technical shutdown management for refineries and factories.',
          features: [
            '24/7 dedicated rapid-response teams',
            'Heat exchanger bundle replacement & cleaning',
            'Weld overlay and flange face re-machining',
            'Comprehensive NDT compliance reporting',
          ],
          image: '/images/services/mobile_gas_station.jpeg',
        },
      ],
    },
    products: {
      badge: 'Turnkey Solutions',
      title: 'Ready-to-Deploy Industrial Equipment',
      subtitle:
        'Standardized and modular products engineered to fulfill immediate operational needs in remote mining, logistics, and industrial sites.',
      items: [
        {
          id: 'mobile-station',
          title: 'Containerized Mobile Gas Stations',
          badge: 'Best Seller',
          desc: 'Fully self-contained fuel dispensing stations built inside heavy-duty ISO 20ft / 40ft sea containers.',
          specs: [
            'Capacities ranging from 10,000 to 60,000 Liters',
            'ATEX-certified dispensing pump with digital meter',
            'Solar power generator or integrated diesel genset',
            'Plug & play setup operational in less than 24 hours',
          ],
          image: '/images/services/mobile_gas_station.jpeg',
        },
        {
          id: 'warehouse-modular',
          title: 'Demountable Warehouses & Industrial Sheds',
          badge: 'Rapid Deployment',
          desc: 'High-strength galvanized steel modular warehouses designed for logistics camps, port facilities, and remote mining sites.',
          specs: [
            'Clear spans up to 40 meters without central columns',
            'Fast assembly and dismantling without steel degradation',
            'Certified resistance to high coastal winds and heavy rains',
            'Motorized sectional doors and dynamic ventilation options',
          ],
          image: '/images/services/warehouse_const.jpeg',
        },
        {
          id: 'piping-spools',
          title: 'Prefabricated Piping Spools & Fittings',
          badge: 'Certified Quality',
          desc: 'Shop-fabricated piping spools accompanied by full QA/QC documentation packages, 3.1 material certificates, and radiographs.',
          specs: [
            'Diameters from 1/2" up to 48" in ASME 150# to 2500# classes',
            'Materials: Carbon Steel A106 Gr.B, Stainless 304L/316L, Duplex',
            'Polyurethane or epoxy marine C5M protective coatings',
            'Delivered ready to bolt on-site without field hot-work',
          ],
          image: '/images/services/piping_fittings.jpeg',
        },
      ],
    },
    standards: {
      badge: 'Strict Compliance',
      title: 'Standards & International Accreditations',
      subtitle:
        'Every project delivered by CORESI undergoes rigorous quality verification and is backed by a comprehensive As-Built Record Book.',
      items: [
        {
          code: 'ASME Section IX',
          name: 'Welder Qualifications & Welding Procedure Specifications (WPS/PQR)',
          desc: 'All our welding processes (TIG, SMAW, GMAW/FCAW) and welders are qualified to ASME Section IX international codes.',
        },
        {
          code: 'CODAP & CODRES',
          name: 'Unfired Pressure Vessels & Vertical Storage Tank Codes',
          desc: 'Full compliance with international design and fabrication standards for industrial high-pressure vessels.',
        },
        {
          code: 'ISO 9606 & ISO 3834',
          name: 'Fusion Welding Quality Requirements',
          desc: 'End-to-end quality assurance on all welded assemblies executed in our workshops and field sites.',
        },
        {
          code: 'Zero Accident QHSE Culture',
          name: 'Health, Safety & Environmental Management',
          desc: 'Daily safety tool-box talks, mandatory PPE, hot-work permits, and systematic Job Safety Analyses (JSA).',
        },
      ],
    },
    partners: {
      badge: 'Proven Trust',
      title: 'They Trust CORESI International',
      subtitle:
        'Preferred engineering and metal construction partner for international energy majors and industrial leaders in Africa.',
    },
    projects: {
      badge: 'Industrial Track Record',
      title: 'Selected Flagship Projects',
      subtitle:
        'Explore a curated selection of successful industrial and energy projects executed by our engineering teams.',
      filterAll: 'All Projects',
    },
    contact: {
      badge: 'Get in Touch',
      title: 'Let\'s Discuss Your Next Industrial Project',
      subtitle:
        'Our engineering office and technical estimators are ready to analyze your drawings, specifications, and project milestones.',
      addressTitle: 'Headquarters & Central Workshops',
      addressText: '124, Rue Deido Bonandjo, Douala – Cameroon',
      kribiTitle: 'Kribi Operational Base',
      kribiText: 'Port & Offshore Industrial Cluster, Kribi – Cameroon',
      phoneTitle: 'Direct Phone Lines',
      emailTitle: 'Official Emails',
      hoursTitle: 'Operating Hours',
      hoursText: 'Monday – Friday: 07:30 – 18:00 | Saturday: 08:00 – 13:00 (24/7 on-call field support)',
      formTitle: 'Request a Quote / Technical Study',
      formSubtitle: 'Fill out this form and our engineering team will get back to you within 24 to 48 hours.',
      fullName: 'Full Name / Title',
      email: 'Corporate Email Address',
      phone: 'Phone Number (with country code)',
      serviceSelect: 'Primary Trade or Service Required',
      servicePlaceholder: 'Select a trade...',
      message: 'Project Description / Technical Specifications',
      messagePlaceholder: 'Specify structure type, dimensions, site location, estimated tonnage, or desired deadlines...',
      submit: 'Submit Quote Request',
      submitting: 'Transmitting request...',
      successMessage: 'Your inquiry has been successfully sent to CORESI Technical Direction. We will reply promptly.',
    },
    footer: {
      tagline:
        'Leading company in boilermaking, industrial piping, bulk storage tanks, and plant erection in Cameroon and Central Africa since 2012.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact & Locations',
      legalOhada: 'Registered in Cameroon under the OHADA Commercial Register (RCCM) and official Tax Identification Number (NIF).',
      copyright: 'CORESI International SARL. All rights reserved.',
      rights: 'Designed and built with modern high-performance web standards.',
    },
  },
};
