import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { TechSkill } from "./types/TechSkill";

export const techSkills: TechSkill[] = [
  {
    include: true,
    icon: (React.createElement(FontAwesomeIcon, {
      icon: ["fab", "git-alt"],
    })),
    label: "Git",
    type: "Tool",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "github"],
    }),
    label: "GitHub",
    type: "Platform",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "gitlab"],
    }),
    label: "GitLab",
    type: "Platform",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "bitbucket"],
    }),
    label: "Bitbucket",
    type: "Platform",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "html5"],
    }),
    label: "HTML 5",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "css3"],
    }),
    label: "CSS 3",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "js"],
    }),
    label: "JavaScript",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "php"],
    }),
    label: "php",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "bootstrap"],
    }),
    label: "Bootstrap",
    type: "Framework / Library",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "angular"],
    }),
    label: "Angular",
    type: "Framework / Library",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "react"],
    }),
    label: "React",
    type: "Framework / Library",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "docker"],
    }),
    label: "Docker",
    type: "Tool",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "java"],
    }),
    label: "Java",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "python"],
    }),
    label: "Python",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "sass"],
    }),
    label: "Sass",
    type: "Language",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "markdown"],
    }),
    label: "Markdown",
    type: "Tool",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "node-js"],
    }),
    label: "Node.js",
    type: "Framework / Library",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "npm"],
    }),
    label: "npm",
    type: "Tool",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "yarn"],
    }),
    label: "Yarn",
    type: "Tool",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "wordpress"],
    }),
    label: "WordPress",
    type: "Framework / Library",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "sourcetree"],
    }),
    label: "Sourcetree",
    type: "Tool",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "cpanel"],
    }),
    label: "cPanel",
    type: "Platform",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "confluence"],
    }),
    label: "Confluence",
    type: "Platform",
  },
  {
    include: true,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "cloudflare"],
    }),
    label: "Cloudflare",
    type: "Platform",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "android"],
    }),
    label: "Android",
    type: "Platform",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "aws"],
    }),
    label: "Amazon Web Services",
    type: "Platform",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "codepen"],
    }),
    label: "CodePen",
    type: "None",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "jenkins"],
    }),
    label: "Jenkins",
    type: "Tool",
  },
  {
    include: false,
    icon: React.createElement(FontAwesomeIcon, {
      icon: ["fab", "hackerrank"],
    }),
    label: "HackerRank",
    type: "None",
  },
];
