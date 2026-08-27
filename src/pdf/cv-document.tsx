import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvPdfLanguage, CvPdfModel, CvPdfSkillGroup } from "../lib/cv-pdf";
import { pdfSkillHeading } from "../lib/cv-pdf";
import { cvPdfFontFamily, registerCvPdfFonts } from "./cv-fonts";

registerCvPdfFonts();

const ink = "#000000";
const heading = "#8a2386";
const link = "#1154cc";

const skillOrder = [
  "Language",
  "Framework / Library",
  "Tool",
  "Platform",
  "Database",
  "IDE",
];

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 40,
    fontFamily: cvPdfFontFamily,
    fontSize: 10.5,
    color: ink,
    lineHeight: 1.26,
  },
  main: {
    width: 346,
  },
  sidebar: {
    position: "absolute",
    top: 32,
    right: 40,
    width: 170,
  },
  name: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1.12,
  },
  title: {
    marginTop: 3,
    marginBottom: 8,
    fontSize: 10.5,
  },
  contact: {
    fontSize: 10,
    color: link,
    textDecoration: "underline",
    marginBottom: 1.5,
  },
  contactBlock: {
    marginBottom: 12,
  },
  section: {
    marginBottom: 6,
  },
  sectionHead: {
    alignSelf: "flex-start",
    marginBottom: 4,
    borderBottomWidth: 0.8,
    borderBottomColor: heading,
  },
  headingLarge: {
    fontSize: 15,
    fontWeight: 400,
    color: heading,
    lineHeight: 1.2,
  },
  headingSmall: {
    fontSize: 14,
    fontWeight: 400,
    color: heading,
    lineHeight: 1.2,
  },
  skillGroup: {
    marginBottom: 7,
  },
  skillTypeRule: {
    alignSelf: "flex-start",
    marginBottom: 3,
    borderBottomWidth: 0.7,
    borderBottomColor: ink,
  },
  skillType: {
    fontSize: 12,
    fontWeight: 400,
  },
  skillLabels: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  language: {
    fontSize: 10.5,
    marginBottom: 1.5,
  },
  job: {
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
  },
  jobOrg: {
    fontSize: 12,
    fontWeight: 700,
  },
  jobWhen: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 10.5,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingRight: 4,
  },
  bulletMark: {
    width: 13,
    fontSize: 10.5,
  },
  bulletText: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 10.5,
  },
  nestedBullet: {
    flexDirection: "row",
    marginBottom: 2,
    marginLeft: 14,
    paddingRight: 4,
  },
  record: {
    marginBottom: 4,
  },
  recordTitle: {
    fontSize: 10.5,
    fontWeight: 700,
  },
  recordDetail: {
    fontSize: 10.5,
  },
  certName: {
    fontSize: 10.5,
    fontWeight: 700,
    color: link,
    textDecoration: "underline",
  },
  interests: {
    fontSize: 10.5,
  },
});

function languageLine(lang: CvPdfLanguage): string {
  if (lang.readwrite === lang.listeningspeaking) {
    return `${lang.language} (${lang.listeningspeaking})`;
  }
  return `${lang.language} (${lang.listeningspeaking}; RW ${lang.readwrite})`;
}

function orderedSkillGroups(groups: CvPdfSkillGroup[]): CvPdfSkillGroup[] {
  return [...groups].sort((a, b) => {
    const left = skillOrder.indexOf(a.type);
    const right = skillOrder.indexOf(b.type);
    return (left === -1 ? skillOrder.length : left) - (right === -1 ? skillOrder.length : right);
  });
}

function SectionHeading({
  children,
  size = "large",
}: Readonly<{ children: string; size?: "large" | "small" }>) {
  return (
    <View style={styles.sectionHead} wrap={false}>
      <Text style={size === "small" ? styles.headingSmall : styles.headingLarge}>
        {children}:
      </Text>
    </View>
  );
}

export function CvPdfDocument({ model }: Readonly<{ model: CvPdfModel }>) {
  return (
    <Document title={model.documentTitle} author={model.name}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.main}>
          <View wrap={false}>
            <Text style={styles.name}>{model.name}</Text>
            {model.currentTitle ? (
              <Text style={styles.title}>{model.currentTitle}</Text>
            ) : null}
          </View>

          <View style={styles.section}>
            <SectionHeading>Experience</SectionHeading>
            {model.jobs.map((job) => (
              <View
                key={`${job.organization}-${job.designation}-${job.rangeLabel}`}
                style={styles.job}
              >
                <View wrap={false}>
                  <Text style={styles.jobTitle}>{job.designation}</Text>
                  <Text style={styles.jobOrg}>
                    @ {job.organization}, {job.location}
                  </Text>
                  <Text style={styles.jobWhen}>{job.rangeLabel}</Text>
                </View>
                {job.desc.map((line) => (
                  <View key={line} style={styles.bullet} wrap={false}>
                    <Text style={styles.bulletMark}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
                {job.skills.length > 0 ? (
                  <View wrap={false}>
                    <View style={styles.bullet}>
                      <Text style={styles.bulletMark}>•</Text>
                      <Text style={styles.bulletText}>Technologies used:</Text>
                    </View>
                    <View style={styles.nestedBullet}>
                      <Text style={styles.bulletMark}>○</Text>
                      <Text style={styles.bulletText}>{job.skills.join(", ")}</Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading>Education</SectionHeading>
            {model.education.map((item) => (
              <View
                key={`${item.qualexam}-${item.rangeLabel}`}
                style={styles.record}
                wrap={false}
              >
                <Text style={styles.recordTitle}>{item.qualexam} -</Text>
                <Text style={styles.recordTitle}>
                  {item.institutename} ({item.certauthname})
                </Text>
                <Text style={styles.recordDetail}>
                  {item.rangeLabel}, {item.score}
                </Text>
                {item.qualspec ? (
                  <Text style={styles.recordDetail}>
                    {item.qualspectype}: {item.qualspec}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading>Certifications</SectionHeading>
            {model.certificates.map((item) => (
              <View
                key={`${item.name}-${item.issuedLabel}`}
                style={styles.record}
                wrap={false}
              >
                <Link src={item.credurl} style={styles.certName}>
                  {item.name}
                </Link>
                <Text style={styles.recordDetail}>
                  {item.issuer}
                  {item.certid ? ` · ${item.certid}` : ""}
                </Text>
                <Text style={styles.recordDetail}>{item.issuedLabel}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading size="small">Interests</SectionHeading>
            <Text style={styles.interests}>{model.interests}</Text>
          </View>
        </View>

        <View style={styles.sidebar}>
          <View style={styles.contactBlock}>
            {model.contacts.map((item) => (
              <Link key={item.href} src={item.href} style={styles.contact}>
                {item.display}
              </Link>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading size="small">Skills</SectionHeading>
            {orderedSkillGroups(model.skillGroups).map((group) => (
              <View key={group.type} style={styles.skillGroup}>
                <View style={styles.skillTypeRule}>
                  <Text style={styles.skillType}>{pdfSkillHeading(group.type)}:</Text>
                </View>
                <Text style={styles.skillLabels}>{group.labels.join(", ")}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading size="small">Languages</SectionHeading>
            {model.languages.map((lang) => (
              <Text key={lang.language} style={styles.language}>
                {languageLine(lang)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
