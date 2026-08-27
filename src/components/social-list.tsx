import type { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaKeybase,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { getSocials } from "../lib/content";
import type { SocialIcon } from "../lib/types";

const icons: Record<SocialIcon, IconType> = {
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
  return <Icon aria-hidden="true" />;
}

export function SocialList() {
  return (
    <ul className="socials">
      {getSocials().map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${item.label} profile`}
          >
            <SocialIcon icon={item.icon} label={item.label} />
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
