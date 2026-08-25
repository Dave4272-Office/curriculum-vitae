import {
  FaGithub,
  FaInstagram,
  FaKeybase,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { socials, type SocialLink } from "../lib/socials";

const icons = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  github: FaGithub,
  keybase: FaKeybase,
  tryhackme: SiTryhackme,
} as const;

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" />;
}

export function SocialList() {
  return (
    <ul className="socials">
      {socials.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${item.label} profile`}
          >
            <SocialIcon icon={item.icon} />
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
