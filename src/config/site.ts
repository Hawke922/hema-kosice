export const siteConfig = {
  organization: {
    legalName: "Košický šermiarsky cech",
    ico: "[Placeholder IČO]",
    address: "[Placeholder adresa združenia]",
  },
  contact: {
    email: "info@kosicehema.sk",
    phone: "+421 XXX XXX XXX",
    facebook: "https://www.facebook.com/kosicehema",
    instagram: "https://www.instagram.com/kosice.hema",
  },
  training: {
    hallName: "[Placeholder gymnazium]",
    hallAddress: "[Placeholder adresa telocvicne]",
    schedule: "[Dni a časy]",
  },
  documents: {
    bylaws: "/documents/stanovy.pdf",
    registration: "/documents/registracia.pdf",
    tax: "#",
  },
  partners: {
    // Add partner logos or data here later
  },
} as const;

export type SiteConfig = typeof siteConfig;
