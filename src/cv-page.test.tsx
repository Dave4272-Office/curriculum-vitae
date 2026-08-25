import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { CvPage } from "./components/cv-page";
import { Providers } from "./app/providers";
import { legacyRedirects } from "./lib/nav";
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
  expect(
    screen.getAllByText(/AWS Lambda · Amazon API Gateway/).length,
  ).toBeGreaterThan(0);

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
  expect(screen.getByText("Java")).toBeInTheDocument();
  expect(screen.getByText(/English\./)).toBeInTheDocument();
  expect(screen.queryByText("Rust")).not.toBeInTheDocument();
  expect(screen.queryByText("Kotlin")).not.toBeInTheDocument();

  expect(screen.getByRole("heading", { name: "Interests" })).toBeInTheDocument();
  expect(screen.getByText(/Novels fill the quieter hours/)).toBeInTheDocument();
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

test("small text nav jumps to on-page sections", () => {
  renderCv();

  expect(screen.getByRole("navigation", { name: "On this page" })).toBeInTheDocument();
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

test("legacy routes redirect to hash fragments", async () => {
  const redirects = nextConfig.redirects
    ? await nextConfig.redirects()
    : [];

  for (const route of legacyRedirects) {
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: route.source,
          destination: route.destination,
          permanent: true,
        }),
      ]),
    );
  }
});

test("content JSON files stay complete, including hidden include:false rows", async () => {
  const [work, edu, certs, skills, langs] = await Promise.all([
    import("../public/static/data/work.list.json"),
    import("../public/static/data/edu.list.json"),
    import("../public/static/data/cert.list.json"),
    import("../public/static/data/skill.list.json"),
    import("../public/static/data/lang.list.json"),
  ]);

  expect(work.default).toHaveLength(4);
  expect(edu.default).toHaveLength(3);
  expect(certs.default).toHaveLength(4);
  expect(skills.default).toHaveLength(40);
  expect(langs.default).toHaveLength(3);

  expect(work.default[0]).toEqual(
    expect.objectContaining({
      organizationicon: "static/logos/third-party/Infosys.svg",
      location: "Kolkata, West Bengal, India",
    }),
  );
  expect(skills.default.some((skill) => skill.label === "Rust" && !skill.include)).toBe(
    true,
  );
  expect(certs.default[0]).toEqual(
    expect.objectContaining({
      issuericon: "static/logos/third-party/Microsoft.png",
      credurl: expect.stringContaining("credly.com"),
    }),
  );
});

test("draws employer and issuer logos from JSON paths", () => {
  renderCv();

  expect(
    document.querySelectorAll('img[src="/static/logos/third-party/Infosys.svg"]')
      .length,
  ).toBe(3);
  expect(
    document.querySelector('img[src="/static/logos/third-party/Wipro.svg"]'),
  ).toBeTruthy();
  expect(
    document.querySelectorAll('img[src="/static/logos/third-party/Microsoft.png"]')
      .length,
  ).toBe(2);
  expect(
    document.querySelector('img[src="/static/logos/third-party/IBM.png"]'),
  ).toBeTruthy();
  expect(
    document.querySelector('img[src="/static/logos/third-party/DataCamp.png"]'),
  ).toBeTruthy();
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
