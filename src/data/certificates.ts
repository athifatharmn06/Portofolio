export type CertificateCategory = 'Professional' | 'Conference' | 'Competition' | 'Language' | 'Intellectual Property';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Human-readable issue date, or the grade for courses that show no date */
  date: string;
  /** Short result line, e.g. a score or grade */
  result?: string;
  category: CertificateCategory;
  /** Redacted raster copy of the certificate (never the original PDF) */
  image: string;
  /** Portrait artwork is shown contained instead of cropped */
  portrait?: boolean;
  /** Public verification link, when the issuer provides one */
  verifyUrl?: string;
  /** Extra line for the lightbox caption */
  note?: string;
}

export const certificateCategories: ('All' | CertificateCategory)[] = [
  'All',
  'Professional',
  'Conference',
  'Competition',
  'Language',
  'Intellectual Property',
];

export const certificatesData: Certificate[] = [
  {
    id: 'oracle-ai-foundations',
    title: 'Oracle AI Database Certified Foundations Associate',
    issuer: 'Oracle University',
    date: 'Aug 25, 2026',
    category: 'Professional',
    image: '/certificates/oracle-ai-foundations-associate.webp',
  },
  {
    id: 'oracle-dev-foundations',
    title: 'Databases for Developers: Foundations',
    issuer: 'Oracle Dev Gym',
    date: 'Certificate of Excellence',
    result: 'Grade 100%',
    category: 'Professional',
    image: '/certificates/oracle-db-dev-foundations.webp',
  },
  {
    id: 'oracle-dev-next-level',
    title: 'Databases for Developers: Next Level',
    issuer: 'Oracle Dev Gym',
    date: 'Certificate of Excellence',
    result: 'Grade 97%',
    category: 'Professional',
    image: '/certificates/oracle-db-dev-next-level.webp',
  },
  {
    id: 'oracle-plsql',
    title: 'Get Started with PL/SQL Table Functions',
    issuer: 'Oracle Dev Gym',
    date: 'Certificate of Excellence',
    result: 'Grade 98%',
    category: 'Professional',
    image: '/certificates/oracle-plsql-table-functions.webp',
  },
  {
    id: 'sap-rise',
    title: 'Introducing RISE with SAP Methodology',
    issuer: 'SAP Learning',
    date: 'Oct 22, 2026',
    result: 'Beginner level',
    category: 'Professional',
    image: '/certificates/sap-rise.webp',
    portrait: true,
    verifyUrl: 'https://badger.learning.sap.com/verify/xyfov-dusab-bysyb-cagod-fegup',
  },
  {
    id: 'sap-cloud-erp',
    title: 'Exploring SAP Cloud ERP',
    issuer: 'SAP Learning',
    date: 'Oct 22, 2026',
    result: 'Beginner level',
    category: 'Professional',
    image: '/certificates/sap-cloud-erp.webp',
    portrait: true,
    verifyUrl: 'https://badger.learning.sap.com/verify/xilud-deles-furik-hecer-donah',
  },
  {
    id: 'cisco-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Oct 21, 2026',
    category: 'Professional',
    image: '/certificates/cisco-networking-basics.webp',
    verifyUrl: 'https://www.credly.com/badges/e7daf76b-1e3e-4148-bb0a-f3f8515e5266',
  },
  {
    id: 'cisco-devices',
    title: 'Networking Devices and Basic Configuration',
    issuer: 'Cisco Networking Academy',
    date: 'Oct 25, 2026',
    category: 'Professional',
    image: '/certificates/cisco-devices-config.webp',
    verifyUrl: 'https://www.credly.com/badges/5f2bfd4c-7563-4d8b-8eaf-6b9123044ff3',
  },
  {
    id: 'teknofest',
    title: 'TEKNOFEST 2026 Güneydoğu, International UAV Competition',
    issuer: 'TEKNOFEST / TÜBİTAK',
    date: 'Sep 30 - Oct 4, 2026',
    result: 'Finalist',
    category: 'Competition',
    image: '/certificates/teknofest-2026.webp',
    note: 'Participation certificate (Katılım Belgesi) awarded for competing as a finalist in the International Unmanned Aerial Vehicles Competition.',
  },
  {
    id: 'eecsi',
    title: 'EECSI 2026 Presenter',
    issuer: 'The 13th International Conference on Electrical Engineering, Computer Science and Informatics',
    date: 'Sep 2-3, 2026',
    result: 'Presenter',
    category: 'Conference',
    image: '/certificates/eecsi-2026-presenter.webp',
    note: 'Paper: Adaptive Blink Detection Using MediaPipe FaceMesh and Sigmoid-Based Eye-Closure Scoring Under Low-Light Conditions.',
  },
  {
    id: 'icvee',
    title: 'ICVEE 2026 Presenter',
    issuer: 'The Ninth International Conference on Vocational Education and Electrical Engineering',
    date: 'Sep 17-18, 2026',
    result: 'Presenter',
    category: 'Conference',
    image: '/certificates/icvee-2026-presenter.webp',
  },
  {
    id: 'eprt',
    title: 'EPrT (English Proficiency Test)',
    issuer: 'Telkom University Language Center',
    date: 'Mar 4, 2026',
    result: 'Score 547 (CEFR B2 equivalent)',
    category: 'Language',
    image: '/certificates/eprt.webp',
    portrait: true,
    verifyUrl: 'https://igracias.telkomuniversity.ac.id/LACValidation/index.php?id=2639150&id2=84&id3=2641595&id4=1102220005',
    note: 'A total score of 547 falls in the 543-623 EPrT band, which corresponds to CEFR B2. Valid until Mar 4, 2028.',
  },
  {
    id: 'ecct',
    title: 'ECCT (English Communicative Competence Test)',
    issuer: 'Telkom University Language Center',
    date: 'Oct 3, 2024',
    result: 'Score 3.75 / 4.00',
    category: 'Language',
    image: '/certificates/ecct.webp',
    portrait: true,
    verifyUrl: 'https://igracias.telkomuniversity.ac.id/LACValidation/index.php?id=1815368&id2=107&id3=1817580&id4=1102220005',
    note: 'Score band 3.60-4.00 is described as Advanced level.',
  },
  {
    id: 'hki',
    title: 'Intellectual Property Registration: Rumeksa',
    issuer: 'Ministry of Law, Directorate General of Intellectual Property (Indonesia)',
    date: 'Sep 7, 2026',
    result: 'Registered',
    category: 'Intellectual Property',
    image: '/certificates/hki-rumeksa.webp',
    portrait: true,
    verifyUrl: 'https://hakcipta.dgip.go.id/legal/c/MDAxNDc0MjEw',
    note: 'Surat Pencatatan Ciptaan (copyright registration) for Rumeksa, an infrared-camera, Edge-AI driver drowsiness detection device. Addresses are redacted for privacy and the creators attachment page is omitted.',
  },
];
