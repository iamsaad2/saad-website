// data.js — EDIT ME. All content for Saad's portfolio lives here.
// Placeholder content — swap in your real titles, links, and details.
window.SAAD_DATA = {
  profile: {
    name: "SAAD BADAT",
    role: "Medical Student · Researcher · Builder",
    tagline: "Medicine, research & the occasional web app.",
    classOf: "CLASS OF ’28",
    cardNo: "002714",
    interests: "Oncology · Cardiology · ML in medicine",
    bio: [
      "Hello — my name is Saad Badat and I’m a medical student at NEOMED.",
      "Most of my work lives at the intersection of oncology, cardiology, and machine learning — building tools that make clinicians faster.",
    ],
    stats: [
      ["MANUSCRIPTS", "01"],
      ["WEBSITES", "05"],
      ["POSTERS", "02"],
      ["CITATIONS", "00"],
    ],
  },

  // type → pill color. Original=coral, Review=mint, Education=sky, Survey=lav
  manuscripts: [
    {
      title:
        "Trends in Long-Term Survival Among Patients With De Novo Metastatic Cancer",
      role: "First author",
      venue: "JCO Oncology Practice",
      year: "2025",
      type: "Original",
      blurb:
        "A population-level analysis of how long-term survival has changed over time among patients diagnosed with de novo metastatic cancer.",
      link: "https://ascopubs.org/doi/10.1200/OP-25-01154?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200pubmed",
    },
  ],

  // sites & apps you've built. `slot` = unique id for the drag-drop screenshot.
  websites: [
    {
      name: "Primary Site Predictor",
      desc: "Predicts the likely primary cancer based on where the disease has metastasized.",
      tags: ["ML", "Oncology"],
      status: "Live",
      pill: "coral",
      slot: "web-1",
      url: "https://metspredictor.netlify.app/",
      image: "portfolio/assets/website-screenshots/primary-site-predictor.png",
    },
    {
      name: "Metastasis Predictor",
      desc: "Predicts where a cancer is likely to spread based on the primary site.",
      tags: ["ML", "Oncology"],
      status: "Live",
      pill: "mint",
      slot: "web-2",
      url: "https://metspredictor.netlify.app/",
      image: "portfolio/assets/website-screenshots/metastasis-predictor.png",
    },
    {
      name: "Nodal Survival",
      desc: "Estimates 1-, 5-, and 10-year survival based on lymph-node status.",
      tags: ["ML", "Survival"],
      status: "Live",
      pill: "sky",
      slot: "web-3",
      url: "https://nodalsurvival.netlify.app/",
      image: "portfolio/assets/website-screenshots/nodal-survival.png",
    },
    {
      name: "Cancer Survival Predictor",
      desc: "Predicts 1-, 5-, and 10-year survival from common clinical characteristics, by cancer type.",
      tags: ["ML", "Survival"],
      status: "Live",
      pill: "lav",
      slot: "web-4",
      url: "https://cancer-survival-predictor.netlify.app/",
      image:
        "portfolio/assets/website-screenshots/cancer-survival-predictor.png",
    },
    {
      name: "NEOMED Research Forum",
      desc: "An oral research forum at NEOMED where medical students presented their work.",
      tags: ["Event", "Med-Ed"],
      status: "Live",
      pill: "coral",
      slot: "web-5",
      url: "https://neomedresearchforum.netlify.app/",
      image: "portfolio/assets/website-screenshots/neomed-research-forum.png",
    },
  ],

  contact: [
    {
      label: "Email",
      value: "sbadat@neomed.edu",
      pill: "coral",
      link: "mailto:sbadat@neomed.edu",
    },
    {
      label: "GitHub",
      value: "github.com/iamsaad2",
      pill: "mint",
      link: "https://github.com/iamsaad2",
    },
    {
      label: "Scholar",
      value: "Google Scholar",
      pill: "sky",
      link: "https://scholar.google.com/citations?user=nu0MAoAAAAAJ&hl=en",
    },
    {
      label: "LinkedIn",
      value: "in/saad-badat",
      pill: "lav",
      link: "https://www.linkedin.com/in/saad-badat-461a38188/",
    },
  ],
};
