import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvPdfLanguage, CvPdfModel } from "../lib/cv-pdf";

Font.registerHyphenationCallback((word) => [word]);

const ink = "#1a1714";
const muted = "#4a453e";
const faint = "#7a7368";
const accent = "#9a3f24";
const rule = "#d7d0c3";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 32,
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: ink,
    lineHeight: 1.28,
  },
  header: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: rule,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
  },
  title: {
    marginTop: 2,
    fontSize: 9.5,
    color: muted,
  },
  body: {
    flexDirection: "row",
    gap: 14,
  },
  sidebar: {
    width: 152,
    flexGrow: 0,
    flexShrink: 0,
  },
  main: {
    width: 365,
    flexGrow: 0,
    flexShrink: 0,
  },
  section: {
    marginBottom: 6,
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: rule,
  },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: accent,
  },
  meta: {
    fontSize: 7.5,
    color: faint,
  },
  contact: {
    fontSize: 7.5,
    color: accent,
    textDecoration: "none",
    marginBottom: 2,
  },
  skillGroup: {
    marginBottom: 5,
  },
  skillType: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: muted,
    marginBottom: 1,
  },
  skillLabels: {
    fontSize: 7.5,
    color: ink,
    lineHeight: 1.35,
  },
  language: {
    fontSize: 7.5,
    marginBottom: 2,
    color: ink,
  },
  job: {
    marginBottom: 5,
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  jobOrg: {
    marginTop: 1,
    fontSize: 8,
    color: muted,
  },
  jobWhen: {
    marginTop: 1,
    fontSize: 7.5,
    color: faint,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 1.5,
    paddingRight: 2,
  },
  bulletMark: {
    width: 8,
    fontSize: 8,
    color: faint,
  },
  bulletText: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 8,
    color: ink,
  },
  jobSkills: {
    marginTop: 2,
    fontSize: 7.5,
    color: faint,
  },
  record: {
    marginBottom: 5,
  },
  recordTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
  },
  recordDetail: {
    fontSize: 8,
    color: muted,
  },
  certName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: ink,
    textDecoration: "none",
  },
  interests: {
    fontSize: 8,
    color: muted,
  },
});

function languageLine(lang: CvPdfLanguage): string {
  if (lang.readwrite === lang.listeningspeaking) {
    return `${lang.language} (${lang.listeningspeaking})`;
  }
  return `${lang.language} (${lang.listeningspeaking}; RW ${lang.readwrite})`;
}

function SectionHeading({
  children,
  meta,
}: Readonly<{ children: string; meta?: string }>) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.heading}>{children}</Text>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
    </View>
  );
}

export function CvPdfDocument({ model }: Readonly<{ model: CvPdfModel }>) {
  return (
    <Document title={`${model.name} — CV`} author={model.name}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{model.name}</Text>
          {model.currentTitle ? (
            <Text style={styles.title}>{model.currentTitle}</Text>
          ) : null}
        </View>

        <View style={styles.body}>
          <View style={styles.sidebar}>
            <View style={styles.section} wrap={false}>
              <SectionHeading>Contact</SectionHeading>
              {model.contacts.map((item) => (
                <Link key={item.href} src={item.href} style={styles.contact}>
                  {item.display}
                </Link>
              ))}
            </View>

            <View style={styles.section}>
              <SectionHeading>Skills</SectionHeading>
              {model.skillGroups.map((group) => (
                <View key={group.type} style={styles.skillGroup} wrap={false}>
                  <Text style={styles.skillType}>{group.type}</Text>
                  <Text style={styles.skillLabels}>{group.labels.join(", ")}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section} wrap={false}>
              <SectionHeading>Languages</SectionHeading>
              {model.languages.map((lang) => (
                <Text key={lang.language} style={styles.language}>
                  {languageLine(lang)}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.main}>
            <View style={styles.section}>
              <SectionHeading meta={model.careerLength || undefined}>
                Experience
              </SectionHeading>
              {model.jobs.map((job) => (
                <View
                  key={`${job.organization}-${job.designation}-${job.rangeLabel}`}
                  style={styles.job}
                >
                  <View wrap={false}>
                    <Text style={styles.jobTitle}>{job.designation}</Text>
                    <Text style={styles.jobOrg}>
                      {job.organization} · {job.emptype} · {job.location}
                    </Text>
                    <Text style={styles.jobWhen}>
                      {job.rangeLabel} · {job.tenureLabel}
                    </Text>
                  </View>
                  {job.desc.map((line) => (
                    <View key={line} style={styles.bullet} wrap={false}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
                  {job.skills.length > 0 ? (
                    <Text style={styles.jobSkills}>{job.skills.join(" · ")}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            <View style={styles.section} wrap={false}>
              <SectionHeading>Education</SectionHeading>
              {model.education.map((item) => (
                <View key={`${item.qualexam}-${item.rangeLabel}`} style={styles.record}>
                  <Text style={styles.recordTitle}>
                    {item.qualexam}
                    {item.qualspec ? `, ${item.qualspec}` : ""}
                  </Text>
                  <Text style={styles.recordDetail}>
                    {item.institutename} · {item.certauthname}
                  </Text>
                  <Text style={styles.meta}>
                    {item.rangeLabel} · {item.score}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section} wrap={false}>
              <SectionHeading>Certifications</SectionHeading>
              {model.certificates.map((item) => (
                <View key={`${item.name}-${item.issuedLabel}`} style={styles.record}>
                  <Link src={item.credurl} style={styles.certName}>
                    {item.name}
                  </Link>
                  <Text style={styles.recordDetail}>
                    {item.issuer}
                    {item.certid ? ` · ${item.certid}` : ""}
                  </Text>
                  <Text style={styles.meta}>{item.issuedLabel}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section} wrap={false}>
              <SectionHeading>Interests</SectionHeading>
              <Text style={styles.interests}>{model.interests}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
