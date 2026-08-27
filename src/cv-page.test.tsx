import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { CvPage } from "./components/cv-page";
import { Providers } from "./app/providers";
import { cvPdfFilename, cvPdfPath } from "./lib/cv-pdf";
import { sections, skipToHref } from "./lib/nav";
import nextConfig from "../next.config";

vi.mock("next/image", () => ({
  default: function Image({
    alt,
    src,
    priority,
    unoptimized,
    ...rest
  }: {
    alt: string;
    src: string;
    priority?: boolean;
    unoptimized?: boolean;
    width?: number;
    height?: number;
    className?: string;
  }) {
    void priority;
    void unoptimized;
    // Test double for next/image. Production uses next/image in cv-page.tsx.
    // eslint-disable-next-line @next/next/no-img-element -- test mock
    return <img alt={alt} src={src} {...rest} />;
  },
}));

function renderCv() {
  return render(
    <Providers>
      <CvPage />
    </Providers>,
  );
}

test("renders employment-first editorial page from existing JSON", () => {
  renderCv();

  expect(
    screen.getByRole("heading", { name: "Debraj Kundu" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Experience" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Senior Associate Consultant")).toBeInTheDocument();
  expect(screen.getAllByText(/Infosys/).length).toBeGreaterThan(0);
  expect(screen.getAllByText("Technologies used:")).toHaveLength(4);
  expect(
    screen.getAllByText(/AWS Lambda, Amazon API Gateway/).length,
  ).toBeGreaterThan(0);
  expect(screen.getByText("Jan 2025 – Present")).toBeInTheDocument();
  expect(screen.queryByText("January 2025 – Present")).not.toBeInTheDocument();
  expect(screen.getByText(/Wipro/)).toBeInTheDocument();
  expect(screen.queryByText(/Wipro Limited/)).not.toBeInTheDocument();
  expect(screen.getAllByText(/Bengaluru, Karnataka, India/)).toHaveLength(3);
  expect(screen.getByText(/Kolkata, West Bengal, India/)).toBeInTheDocument();
  expect(screen.queryByText(/Bengaluru, KN/)).not.toBeInTheDocument();

  expect(screen.getByRole("heading", { name: "Education" })).toBeInTheDocument();
  expect(screen.getByText(/B\. Tech/)).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: "Certifications" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /MTA: Introduction to Programming Using Python/,
    }),
  ).toHaveAttribute("href", expect.stringContaining("credly.com"));

  expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  expect(screen.getByText("Python")).toBeInTheDocument();
  expect(screen.getByText("Python").closest(".skill-inline")?.querySelector("svg")).toBeTruthy();
  expect(screen.getByText("Java")).toBeInTheDocument();
  expect(screen.getByText("Java").closest(".skill-inline")?.querySelector("svg")).toBeTruthy();
  expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();
  expect(screen.getByText("Serverless")).toBeInTheDocument();
  expect(screen.getByText("Jenkins")).toBeInTheDocument();
  expect(screen.getByText("GHA")).toBeInTheDocument();
  expect(
    screen.getAllByText(/Serverless Framework/).length,
  ).toBeGreaterThan(0);
  expect(screen.getAllByText(/GitHub Actions/).length).toBeGreaterThan(0);
  expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  expect(screen.getByText("Express.js")).toBeInTheDocument();
  expect(screen.getByText("Redis")).toBeInTheDocument();
  expect(screen.getByText(/English\./)).toBeInTheDocument();
  expect(screen.queryByText("Rust")).not.toBeInTheDocument();
  expect(screen.queryByText("Kotlin")).not.toBeInTheDocument();

  expect(screen.getByRole("heading", { name: "Interests" })).toBeInTheDocument();
  expect(screen.getByText(/Novels fill the quieter hours/)).toBeInTheDocument();
  expect(
    screen.queryByText("Developer | Learner | Full Stack | Linux | Open Source"),
  ).not.toBeInTheDocument();

  expect(screen.getByRole("link", { name: "Twitter profile" })).toHaveAttribute(
    "href",
    "https://twitter.com/Dave4272dk",
  );
  expect(screen.getByRole("link", { name: "GitHub profile" })).toHaveAttribute(
    "href",
    "https://github.com/Dave4272-Office",
  );
});

test("does not render the old Material chrome or rotating titles", () => {
  renderCv();

  expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Navigation Menu")).not.toBeInTheDocument();
  expect(screen.queryByText("Software Engineer")).not.toBeInTheDocument();
  expect(
    screen.queryByText(/Hobbies & Interests: 1\. Learning New Things/),
  ).not.toBeInTheDocument();
});

test("page section ids and skip link come from the nav registry", () => {
  renderCv();

  for (const section of sections) {
    expect(document.getElementById(section.id)).toBeTruthy();
  }
  expect(screen.getByRole("link", { name: /Skip to experience/i })).toHaveAttribute(
    "href",
    skipToHref,
  );
});

test("small text nav jumps to on-page sections", () => {
  renderCv();

  const nav = screen.getByRole("navigation", { name: "On this page" });
  expect(nav).toBeInTheDocument();
  expect(nav.closest(".site-nav-wrap")).toBeTruthy();
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "true",
  );
  expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
    "href",
    "#experience",
  );
  expect(screen.getByRole("link", { name: "Education" })).toHaveAttribute(
    "href",
    "#education",
  );
  expect(screen.getByRole("link", { name: "Certifications" })).toHaveAttribute(
    "href",
    "#certifications",
  );
  expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
    "href",
    "#skills",
  );
  expect(screen.getByRole("link", { name: "Interests" })).toHaveAttribute(
    "href",
    "#interests",
  );
});

test("intro offers a download of the generated CV PDF among socials", () => {
  renderCv();

  const link = screen.getByRole("link", { name: "Download CV (PDF)" });
  expect(link).toHaveAttribute("href", cvPdfPath);
  expect(link).toHaveAttribute("download", cvPdfFilename());
  expect(link).toHaveTextContent("Download");
  expect(link.closest(".socials")).toBeTruthy();
  expect(screen.queryByText("Download CV (PDF)")).not.toBeInTheDocument();
});

test("theme control exposes Light, Dark, and System", async () => {
  const user = userEvent.setup();
  renderCv();

  const light = screen.getByRole("button", { name: "Light" });
  const dark = screen.getByRole("button", { name: "Dark" });
  const system = screen.getByRole("button", { name: "System" });

  expect(light).toBeInTheDocument();
  expect(dark).toBeInTheDocument();
  expect(system).toBeInTheDocument();

  await user.click(dark);
  expect(dark).toHaveAttribute("aria-pressed", "true");
  expect(document.documentElement.classList.contains("dark")).toBe(true);

  await user.click(light);
  expect(light).toHaveAttribute("aria-pressed", "true");
  expect(document.documentElement.classList.contains("light")).toBe(true);

  await user.click(system);
  expect(system).toHaveAttribute("aria-pressed", "true");
});

test("content JSON files stay complete, including hidden include:false rows", async () => {
  const [work, edu, certs, skills, langs, socials] = await Promise.all([
    import("../public/static/data/work.list.json"),
    import("../public/static/data/edu.list.json"),
    import("../public/static/data/cert.list.json"),
    import("../public/static/data/skill.list.json"),
    import("../public/static/data/lang.list.json"),
    import("../public/static/data/social.list.json"),
  ]);

  expect(work.default).toHaveLength(4);
  expect(edu.default).toHaveLength(3);
  expect(certs.default).toHaveLength(4);
  expect(skills.default).toHaveLength(45);
  expect(langs.default).toHaveLength(3);
  expect(socials.default).toHaveLength(7);

  expect(work.default[0]).toEqual(
    expect.objectContaining({
      organizationicon: "static/logos/third-party/Infosys.svg",
      location: "Kolkata, West Bengal, India",
    }),
  );
  expect(work.default.map((job) => job.designation)).toEqual([
    "Senior Associate Consultant",
    "Associate Consultant",
    "Associate Business Analyst",
    "Project Engineer",
  ]);
  expect(work.default[0]?.skills).toContain("GitHub Actions");
  expect(work.default[1]?.skills).toContain("GitHub Actions");
  expect(work.default[2]?.skills).toContain("Jenkins");
  expect(work.default[3]?.skills).toContain("Jenkins");
  expect(work.default[0]?.skills).not.toContain("Jenkins");
  expect(work.default[1]?.skills).not.toContain("Jenkins");
  expect(work.default[2]?.skills).not.toContain("GitHub Actions");
  expect(work.default[3]?.skills).not.toContain("GitHub Actions");
  expect(work.default[3]?.organization).toBe("Wipro");
  expect(
    work.default.some((job) => job.skills.includes("Serverless Framework")),
  ).toBe(true);
  expect(work.default.every((job) => !job.skills.includes("Serverless"))).toBe(
    true,
  );
  expect(work.default.every((job) => !job.skills.includes("GHA"))).toBe(true);
  expect(
    work.default.every((job) => !job.skills.includes("Amazon Web Services")),
  ).toBe(true);
  expect(
    work.default.some((job) => job.skills.includes("AWS Lambda")),
  ).toBe(true);
  expect(skills.default.some((skill) => skill.label === "Rust" && !skill.include)).toBe(
    true,
  );
  expect(
    skills.default.some(
      (skill) => skill.label === "Amazon Web Services" && skill.include,
    ),
  ).toBe(true);
  expect(
    skills.default.some(
      (skill) => skill.label === "Serverless" && skill.include,
    ),
  ).toBe(true);
  expect(
    skills.default.some((skill) => skill.label === "Jenkins" && skill.include),
  ).toBe(true);
  expect(
    skills.default.some((skill) => skill.label === "GHA" && skill.include),
  ).toBe(true);
  expect(
    skills.default.some(
      (skill) => skill.label === "Kubernetes" && skill.include,
    ),
  ).toBe(true);
  expect(
    skills.default.some(
      (skill) => skill.label === "Express.js" && skill.include,
    ),
  ).toBe(true);
  expect(
    skills.default.some((skill) => skill.label === "Redis" && skill.include),
  ).toBe(true);
  expect(certs.default[0]).toEqual(
    expect.objectContaining({
      issuericon: "static/logos/third-party/Microsoft.png",
      credurl: expect.stringContaining("credly.com"),
    }),
  );
  expect(socials.default.map((item) => item.icon)).toEqual([
    "twitter",
    "linkedin",
    "instagram",
    "github",
    "keybase",
    "tryhackme",
    "pdf",
  ]);
  expect(socials.default.at(-1)).toEqual(
    expect.objectContaining({
      label: "Download",
      include: true,
      pdf: false,
    }),
  );
  expect(
    socials.default.map((item) => ({
      label: item.label,
      include: item.include,
      pdf: item.pdf,
    })),
  ).toEqual([
    { label: "Twitter", include: true, pdf: false },
    { label: "LinkedIn", include: true, pdf: true },
    { label: "Instagram", include: true, pdf: false },
    { label: "GitHub", include: true, pdf: true },
    { label: "Keybase", include: true, pdf: false },
    { label: "TryHackMe", include: true, pdf: false },
    { label: "Download", include: true, pdf: false },
  ]);
});

test("draws employer and issuer logos from JSON paths", () => {
  renderCv();

  expect(
    document.querySelectorAll('img[src="/static/logos/third-party/Infosys.svg"]'),
  ).toHaveLength(3);
  expect(
    document.querySelector('img[src="/static/logos/third-party/Wipro.svg"]'),
  ).toBeTruthy();
  expect(
    document.querySelectorAll(
      'img[src="/static/logos/third-party/Microsoft.png"]',
    ),
  ).toHaveLength(2);
  expect(
    document.querySelector('img[src="/static/logos/third-party/IBM.png"]'),
  ).toBeTruthy();
  expect(
    document.querySelector('img[src="/static/logos/third-party/DataCamp.png"]'),
  ).toBeTruthy();
});

test("Experience still renders", () => {
  renderCv();

  expect(
    screen.getByRole("heading", { name: "Experience" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Senior Associate Consultant")).toBeInTheDocument();
});

test("CSP allows the GA collect fallback and does not open unpkg.com", async () => {
  const headers = nextConfig.headers ? await nextConfig.headers() : [];
  const csp =
    headers
      .flatMap((entry) => entry.headers)
      .find((header) => header.key === "Content-Security-Policy")?.value ?? "";

  expect(csp).toContain("www.google.com/g/collect");
  expect(csp).toContain("www.google-analytics.com");
  expect(csp).toContain("www.googletagmanager.com");
  expect(csp).not.toContain("unpkg.com");
});

test("nav click marks the chosen section current", async () => {
  const user = userEvent.setup();
  renderCv();

  const experience = screen.getByRole("link", { name: "Experience" });
  await user.click(experience);
  expect(experience).toHaveAttribute("aria-current", "true");
  expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
    "aria-current",
  );
});

test("back to top is hidden at the page top", () => {
  renderCv();

  expect(
    screen.queryByRole("button", { name: "Back to top" }),
  ).not.toBeInTheDocument();
  expect(document.querySelector(".back-to-top")).toHaveAttribute("hidden");
});

test("back to top appears after scrolling and returns to the first section", async () => {
  const user = userEvent.setup();
  renderCv();

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: 400,
  });
  fireEvent.scroll(window);

  const backToTop = screen.getByRole("button", { name: "Back to top" });
  expect(backToTop).toBeVisible();

  await user.click(screen.getByRole("link", { name: "Education" }));
  expect(screen.getByRole("link", { name: "Education" })).toHaveAttribute(
    "aria-current",
    "true",
  );

  await user.click(backToTop);
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
    "aria-current",
    "true",
  );

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: 0,
  });
});
