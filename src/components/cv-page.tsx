import Image from "next/image";
import { BrandMark } from "./brand-mark";
import { DownloadCv } from "./download-cv";
import { SiteNav } from "./site-nav";
import { SocialList } from "./social-list";
import { ThemeToggle } from "./theme-toggle";
import {
  bio,
  getCertificates,
  getEducation,
  getExperience,
  getSkillGroups,
  getSpokenLanguages,
} from "../lib/content";
import { sectionIds, skipToHref, skipToSectionId } from "../lib/nav";

export function CvPage() {
  const { jobs, careerLength } = getExperience();
  const education = getEducation();
  const certificates = getCertificates();
  const skillGroups = getSkillGroups();
  const languages = getSpokenLanguages();

  return (
    <div className="page">
      <a className="skip-link" href={skipToHref}>
        Skip to {skipToSectionId}
      </a>

      <header className="intro">
        <div className="intro-lead" id={sectionIds.about}>
          <div className="identity">
            <Image
              src="/profile-dave.jpg"
              alt="Debraj Kundu"
              width={72}
              height={72}
              className="portrait"
              priority
            />
            <div>
              <p className="eyebrow">Curriculum vitae</p>
              <h1>{bio.name}</h1>
            </div>
          </div>

          <div className="intro-copy">
            <p>{bio.summary}</p>
            <p>{bio.focus}</p>
          </div>
        </div>

        <SiteNav />
        <ThemeToggle />
        <DownloadCv />
        <SocialList />
      </header>

      <main className="content">
        <section
          id={sectionIds.experience}
          className="section section--hero"
          aria-labelledby="experience-heading"
        >
          <div className="section-head">
            <h2 id="experience-heading">Experience</h2>
            {careerLength ? (
              <p className="section-meta">{careerLength}</p>
            ) : null}
          </div>
          <ol className="jobs">
            {jobs.map((job) => (
              <li key={`${job.organization}-${job.designation}-${job.from}`}>
                <article className="job">
                  <div className="job-when">
                    <p className="job-range">{job.rangeLabelShort}</p>
                    <p className="job-tenure">{job.tenureLabel}</p>
                  </div>
                  <div className="job-body">
                    <h3>{job.designation}</h3>
                    <p className="job-org">
                      <BrandMark
                        src={job.organizationicon}
                        label={job.organization}
                      />
                      <span>
                        {job.organization}
                        <span aria-hidden="true"> · </span>
                        {job.emptype}
                        <span aria-hidden="true"> · </span>
                        {job.location}
                      </span>
                    </p>
                    <ul className="job-desc">
                      {job.desc.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    {job.skills.length > 0 ? (
                      <dl className="job-tech">
                        <dt>Technologies used:</dt>
                        <dd>{job.skills.join(", ")}</dd>
                      </dl>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          id={sectionIds.education}
          className="section"
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading">Education</h2>
          <ol className="records">
            {education.map((item) => (
              <li key={`${item.qualexam}-${item.from}`}>
                <p className="record-when">{item.rangeLabel}</p>
                <div>
                  <h3>
                    {item.qualexam}
                    {item.qualspec ? `, ${item.qualspec}` : ""}
                  </h3>
                  <p>
                    {item.institutename}
                    <span aria-hidden="true"> · </span>
                    {item.certauthname}
                  </p>
                  <p className="record-meta">{item.score}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id={sectionIds.certifications}
          className="section"
          aria-labelledby="certs-heading"
        >
          <h2 id="certs-heading">Certifications</h2>
          <ol className="certs">
            {certificates.map((item) => (
              <li key={`${item.name}-${item.issuedate}`}>
                <time dateTime={item.issuedate}>{item.issuedLabel}</time>
                <div>
                  <a href={item.credurl} target="_blank" rel="noreferrer noopener">
                    {item.name}
                  </a>
                  <p className="cert-issuer">
                    <BrandMark src={item.issuericon} label={item.issuer} />
                    <span>
                      {item.issuer}
                      {item.certid ? ` · ${item.certid}` : ""}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id={sectionIds.skills}
          className="section"
          aria-labelledby="skills-heading"
        >
          <h2 id="skills-heading">Skills</h2>
          <p className="skills-lede">
            Tools I reach for on the job sit on the roles above. The short list
            below is the rest of the working set.
          </p>
          <dl className="skill-groups">
            {skillGroups.map((group) => (
              <div key={group.type} className="skill-group">
                <dt>{group.type}</dt>
                <dd>
                  {group.items.map((skill, index) => {
                    const Icon = skill.Icon;
                    return (
                      <span key={skill.label}>
                        {index > 0 ? ", " : null}
                        <span className="skill-inline">
                          <Icon aria-hidden="true" className="skill-icon" />
                          {skill.label}
                        </span>
                      </span>
                    );
                  })}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="spoken">
            {languages.map((lang) => (
              <li key={lang.language}>
                <strong>{lang.language}.</strong> Reading and writing:{" "}
                {lang.readwrite.toLowerCase()}. Listening and speaking:{" "}
                {lang.listeningspeaking.toLowerCase()}.
              </li>
            ))}
          </ul>
        </section>

        <section
          id={sectionIds.interests}
          className="section"
          aria-labelledby="interests-heading"
        >
          <h2 id="interests-heading">Interests</h2>
          <p className="interests-copy">{bio.interests}</p>
        </section>
      </main>
    </div>
  );
}
