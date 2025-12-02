export const siteConfig = {
  organization: {
    legalName: "Košický šermiarsky cech",
    ico: "[Placeholder IČO]",
    address: "[Placeholder adresa združenia]",
  },
  contact: {
    options: [
      {
        id: "email",
        icon: "email-icon.svg",
        alt: "Email icon",
        labelKey: "emailLabel",
        display: "info@kosicehema.sk",
        href: "mailto:info@kosicehema.sk",
      },
      {
        id: "phone",
        icon: "mobile-icon.svg",
        alt: "Phone icon",
        labelKey: "phoneLabel",
        display: "+421 XXX XXX XXX",
        href: "tel:+421XXXXXXXXX",
      },
    ],
    socials: [
      {
        id: "facebook",
        icon: "facebook-icon.svg",
        alt: "Facebook",
        label: "Facebook",
        href: "https://www.facebook.com/kosicehema",
      },
      {
        id: "instagram",
        icon: "instagram-icon.svg",
        alt: "Instagram",
        label: "Instagram",
        href: "https://www.instagram.com/kosice.hema",
      },
    ],
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
