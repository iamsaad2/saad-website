// data.js — EDIT ME. All content for Saad's portfolio lives here.
// Placeholder content — swap in your real titles, links, and details.
window.SAAD_DATA = {
  profile: {
    name: 'SAAD',
    role: 'Medical Student · Researcher · Builder',
    tagline: 'Medicine, research & the occasional web app.',
    classOf: 'CLASS OF ’28',
    cardNo: '002714',
    interests: 'Oncology · Cardiology · ML in medicine',
    bio: [
      'Hello — my name is Saad and I’m a medical student at NEOMED.',
      'Most of my work lives at the intersection of oncology, cardiology, and machine learning — building tools that make clinicians faster.',
    ],
    stats: [
      ['MANUSCRIPTS', '01'], ['WEBSITES', '05'], ['POSTERS', '02'], ['CITATIONS', '00'],
    ],
  },

  // type → pill color. Original=coral, Review=mint, Education=sky, Survey=lav
  manuscripts: [
    {
      title: 'Trends in Long-Term Survival Among Patients With De Novo Metastatic Cancer',
      role: 'First author', venue: 'JCO Oncology Practice', year: '2025', type: 'Original',
      blurb: 'A population-level analysis of how long-term survival has changed over time among patients diagnosed with de novo metastatic cancer.',
      link: 'https://ascopubs.org/doi/10.1200/OP-25-01154?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200pubmed',
    },
  ],

  // sites & apps you've built. `slot` = unique id for the drag-drop screenshot.
  websites: [
    {
      name: 'Primary Site Predictor',
      desc: 'Predicts the likely primary cancer based on where the disease has metastasized.',
      tags: ['ML', 'Oncology'], status: 'Live', pill: 'coral', slot: 'web-1', url: 'https://metspredictor.netlify.app/',
      image: 'portfolio/assets/website-screenshots/primary-site-predictor.png',
    },
    {
      name: 'Metastasis Predictor',
      desc: 'Predicts where a cancer is likely to spread based on the primary site.',
      tags: ['ML', 'Oncology'], status: 'Live', pill: 'mint', slot: 'web-2', url: 'https://metspredictor.netlify.app/',
      image: 'portfolio/assets/website-screenshots/metastasis-predictor.png',
    },
    {
      name: 'Nodal Survival',
      desc: 'Estimates 1-, 5-, and 10-year survival based on lymph-node status.',
      tags: ['ML', 'Survival'], status: 'Live', pill: 'sky', slot: 'web-3', url: 'https://nodalsurvival.netlify.app/',
      image: 'portfolio/assets/website-screenshots/nodal-survival.png',
    },
    {
      name: 'Cancer Survival Predictor',
      desc: 'Predicts 1-, 5-, and 10-year survival from common clinical characteristics, by cancer type.',
      tags: ['ML', 'Survival'], status: 'Live', pill: 'lav', slot: 'web-4', url: 'https://cancer-survival-predictor.netlify.app/',
      image: 'portfolio/assets/website-screenshots/cancer-survival-predictor.png',
    },
    {
      name: 'NEOMED Research Forum',
      desc: 'An oral research forum at NEOMED where medical students presented their work.',
      tags: ['Event', 'Med-Ed'], status: 'Live', pill: 'coral', slot: 'web-5', url: 'https://neomedresearchforum.netlify.app/',
      image: 'portfolio/assets/website-screenshots/neomed-research-forum.png',
    },
  ],

  contact: [
    { label: 'Email', value: 'saad@example.com', pill: 'coral', link: 'mailto:saad@example.com' },
    { label: 'GitHub', value: 'github.com/saad', pill: 'mint', link: '#' },
    { label: 'Scholar', value: 'Google Scholar', pill: 'sky', link: '#' },
    { label: 'LinkedIn', value: 'in/saad', pill: 'lav', link: '#' },
  ],
};
