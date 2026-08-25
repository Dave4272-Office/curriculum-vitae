export type SocialLink = {
  label: string;
  href: string;
  icon: "twitter" | "linkedin" | "instagram" | "github" | "keybase" | "tryhackme";
};

export const socials: SocialLink[] = [
  {
    label: "Twitter",
    href: "https://twitter.com/Dave4272dk",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/debraj-kundu/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dave4272dk/",
    icon: "instagram",
  },
  {
    label: "GitHub",
    href: "https://github.com/Dave4272-Office",
    icon: "github",
  },
  {
    label: "Keybase",
    href: "https://keybase.io/dave4272",
    icon: "keybase",
  },
  {
    label: "TryHackMe",
    href: "https://tryhackme.com/p/Dave4272",
    icon: "tryhackme",
  },
];
