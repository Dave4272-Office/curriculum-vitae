export const sectionNav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
] as const;

export const legacyRedirects = [
  { source: "/edu", destination: "/#education" },
  { source: "/exp", destination: "/#experience" },
  { source: "/certs", destination: "/#certifications" },
  { source: "/skills", destination: "/#skills" },
  { source: "/interests", destination: "/#interests" },
] as const;
