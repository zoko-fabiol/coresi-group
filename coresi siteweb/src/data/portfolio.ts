export interface ProjectItem {
  id: string;
  titleFr: string;
  titleEn: string;
  client: string;
  category: 'oil_gas' | 'buildings' | 'industry' | 'energy';
  location: string;
  year: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
  metrics: string;
}

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    titleFr: 'Montage & Érection d\'Usine de Traitement de Gaz',
    titleEn: 'Gas Treatment Facility Structural Erection',
    client: 'Opérateur Pétrolier Majeur',
    category: 'oil_gas',
    location: 'Kribi / Offshore Terminal, Cameroun',
    year: '2023 - 2024',
    descriptionFr: 'Préfabrication et érection de 850 tonnes de charpente métallique lourde, skid compresseurs et colonnes de séparation avec contrôle CND 100%.',
    descriptionEn: 'Prefabrication and erection of 850 metric tons of heavy structural steel, compressor skids, and separation columns with 100% NDT inspection.',
    image: '/images/hero/plant_erection_hd.jpg',
    metrics: '850 Tonnes | 120 000 Heures sans accident',
  },
  {
    id: 'proj-2',
    titleFr: 'Réhabilitation de Bacs de Stockage Pétrolier API 650',
    titleEn: 'Petroleum Bulk Storage Tanks Rehabilitation API 650',
    client: 'TotalEnergies Distribution',
    category: 'oil_gas',
    location: 'Dépôt Pétrolier de Douala, Cameroun',
    year: '2022',
    descriptionFr: 'Remplacement de fonds de bacs, viroles corrodées, pose d\'écrans flottants en aluminium et épreuve hydrostatique sous contrôle d\'organisme agréé.',
    descriptionEn: 'Tank bottom and corroded shell plate replacement, floating internal deck installation, and certified hydrostatic testing under third-party inspection.',
    image: '/images/services/storage_tanks.jpg',
    metrics: '2 x 15 000 m³ | Norme API 650',
  },
  {
    id: 'proj-3',
    titleFr: 'Fabrication & Pose de Skids de Tuyauterie Haute Pression',
    titleEn: 'Fabrication & Erection of High Pressure Piping Skids',
    client: 'SLB (Schlumberger)',
    category: 'oil_gas',
    location: 'Base Logistique Pétrolière, Cameroun',
    year: '2023',
    descriptionFr: 'Préfabrication en atelier et raccordement sur site de manifolds et lignes haute pression classe 600# et 1500# en acier carbone A106 Gr.B.',
    descriptionEn: 'Shop prefabrication and on-site tie-in of manifolds and high-pressure process lines class 600# and 1500# in carbon steel A106 Gr.B.',
    image: '/images/services/piping_fittings.jpeg',
    metrics: '3 500 mètres linéaires | ASME B31.3',
  },
  {
    id: 'proj-4',
    titleFr: 'Construction de Hangars Logistiques Grande Portée (35m)',
    titleEn: 'Large Clear-Span Logistics Warehouse Construction (35m)',
    client: 'DHL Global Forwarding & Partenaires',
    category: 'buildings',
    location: 'Zone Portuaire Autonome de Kribi (PAK)',
    year: '2024',
    descriptionFr: 'Conception, calcul Eurocodes, fabrication et levage d\'un entrepôt sécurisé de 4 200 m² sans poteau intermédiaire avec 2 ponts roulants de 10T.',
    descriptionEn: 'Engineering, Eurocodes calculation, shop fabrication, and erection of a 4,200 m² secure warehouse without central columns, featuring two 10-ton overhead cranes.',
    image: '/images/services/warehouse_const.jpeg',
    metrics: '4 200 m² | Portée libre de 35 mètres',
  },
  {
    id: 'proj-5',
    titleFr: 'Chaudronnerie Lourde : Cyclones & Gaines de Dépoussiérage',
    titleEn: 'Heavy Boilermaking: Industrial Cyclones & Dust Exhaust Ducts',
    client: 'Complexe Cimentier & Minier',
    category: 'industry',
    location: 'Ateliers Centraux Douala & Site d\'installation',
    year: '2023',
    descriptionFr: 'Roulage de viroles de 16mm d\'épaisseur, assemblage mécano-soudé de cyclones haute température et traitement thermique après soudure.',
    descriptionEn: 'Rolling of 16mm heavy plates, welding assembly of high-temperature cyclones, and post-weld heat treatment.',
    image: '/images/services/welding_workshop.jpg',
    metrics: 'Diamètre 3.8m | Acier résistant à l\'abrasion',
  },
  {
    id: 'proj-6',
    titleFr: 'Déploiement de Stations-Services Mobiles Conteneurisées',
    titleEn: 'Deployment of Containerized Mobile Fuel Stations',
    client: 'Projets Infrastructures & PNUD',
    category: 'energy',
    location: 'Chantiers d\'Exploitation Forestière & Mines',
    year: '2021 - 2024',
    descriptionFr: 'Livraison clés en main de 12 stations conteneurisées autonomes double paroi 40 000 Litres équipées de volucompteurs ATEX et supervision solaire.',
    descriptionEn: 'Turnkey delivery of 12 autonomous containerized 40,000L double-walled fuel stations with ATEX digital dispensers and solar power integration.',
    image: '/images/services/mobile_gas_station.jpeg',
    metrics: '12 Unités Déployées | Prêtes en 24h',
  },
];
