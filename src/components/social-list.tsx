import type { IconType } from "react-icons";
import {
  FaFilePdf,
  FaGithub,
  FaInstagram,
  FaKeybase,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { brandColorVars, socialBrandColor } from "../lib/brand-colors";
import { getSocials } from "../lib/content";
import { cvPdfFilename, cvPdfPath } from "../lib/cv-download";
import type { SocialIcon, SocialLink } from "../lib/types";

const icons: Record<SocialIcon, IconType> = {
  pdf: FaFilePdf,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  github: FaGithub,
  keybase: FaKeybase,
  tryhackme: SiTryhackme,
};

function SocialIcon({ icon, label }: Readonly<{ icon: SocialIcon; label: string }>) {
  const Icon = icons[icon];
  if (!Icon) {
    throw new Error(`Missing social icon "${icon}" for "${label}"`);
  }
  const color = socialBrandColor(icon);
  return (
    <Icon
      aria-hidden="true"
      style={color ? brandColorVars(color) : undefined}
    />
  );
}

function socialAnchorProps(item: SocialLink) {
  if (item.href === cvPdfPath) {
    return {
      download: cvPdfFilename(),
      "aria-label": "Download CV (PDF)",
    };
  }

  return {
    target: "_blank" as const,
    rel: "noreferrer noopener",
    "aria-label": `${item.label} profile`,
  };
}

export function SocialList() {
  return (
    <ul className="socials">
      {getSocials().map((item) => (
        <li key={item.href}>
          <a href={item.href} {...socialAnchorProps(item)}>
            <SocialIcon icon={item.icon} label={item.label} />
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
