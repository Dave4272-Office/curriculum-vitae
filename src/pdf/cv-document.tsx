import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  pdfEducationExam,
  pdfEducationOutcome,
  pdfEducationPlace,
  pdfEducationSpec,
  pdfSkillHeading,
  type CvPdfLanguage,
  type CvPdfModel,
  type CvPdfSkillGroup,
} from "../lib/cv-pdf";
import { cvPdfFontFamily, registerCvPdfFonts } from "./cv-fonts";

registerCvPdfFonts();

const ink = "#000000";
const heading = "#8a2386";
const link = "#1154cc";

/** A4 width in pt. Columns + gutter must fit inside the padded page. */
const A4_WIDTH = 595.28;
const PAGE_PADDING_X = 40;
const COLUMN_GUTTER = 12;
const SIDEBAR_WIDTH = 160;
const BULLET_MARK_WIDTH = 13;
const BULLET_PAD_RIGHT = 4;
const NESTED_BULLET_INDENT = 14;

export const cvPdfLayout = {
  pageWidth: A4_WIDTH,
  pagePaddingX: PAGE_PADDING_X,
  columnGutter: COLUMN_GUTTER,
  sidebarWidth: SIDEBAR_WIDTH,
  contentWidth: A4_WIDTH - PAGE_PADDING_X * 2,
  mainWidth: A4_WIDTH - PAGE_PADDING_X * 2 - COLUMN_GUTTER - SIDEBAR_WIDTH,
  /** Space between education entries. */
  educationRecordMarginBottom: 9,
  /** Space after a skill group; keep above 0 so wrapped rows cannot collide. */
  skillGroupMarginBottom: 4,
  skillLabelsLineHeight: 1.45,
} as const;

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
    paddingBottom: 12,
    paddingHorizontal: PAGE_PADDING_X,
    fontFamily: cvPdfFontFamily,
    fontSize: 10.5,
    color: ink,
    lineHeight: 1.26,
  },
  main: {
    width: cvPdfLayout.mainWidth,
  },
  sidebar: {
    position: "absolute",
    top: 32,
    right: PAGE_PADDING_X,
    width: cvPdfLayout.sidebarWidth,
  },
  name: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1.12,
  },
  title: {
    marginTop: 3,
    marginBottom: 3,
    fontSize: 10.5,
  },
  site: {
    fontSize: 10.5,
    color: link,
    textDecoration: "underline",
    marginBottom: 8,
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
  address: {
    fontSize: 10,
    marginBottom: 1.5,
  },
  section: {
    marginBottom: 4,
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
    marginBottom: cvPdfLayout.skillGroupMarginBottom,
  },
  skillTypeRule: {
    alignSelf: "flex-start",
    marginTop: 2,
    marginBottom: 4,
    borderBottomWidth: 0.7,
    borderBottomColor: ink,
  },
  skillType: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.35,
  },
  skillLabels: {
    width: cvPdfLayout.sidebarWidth,
    fontSize: 10,
    lineHeight: cvPdfLayout.skillLabelsLineHeight,
    marginBottom: 2,
  },
  language: {
    fontSize: 10.5,
    marginBottom: 1.5,
  },
  job: {
    marginBottom: 4,
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
    marginBottom: 1,
    paddingRight: BULLET_PAD_RIGHT,
  },
  bulletMark: {
    width: BULLET_MARK_WIDTH,
    fontSize: 10.5,
  },
  bulletText: {
    width:
      cvPdfLayout.mainWidth - BULLET_MARK_WIDTH - BULLET_PAD_RIGHT,
    fontSize: 10.5,
  },
  nestedBullet: {
    flexDirection: "row",
    marginBottom: 2,
    marginLeft: NESTED_BULLET_INDENT,
    paddingRight: BULLET_PAD_RIGHT,
  },
  nestedBulletText: {
    width:
      cvPdfLayout.mainWidth -
      NESTED_BULLET_INDENT -
      BULLET_MARK_WIDTH -
      BULLET_PAD_RIGHT,
    fontSize: 10.5,
  },
  record: {
    marginBottom: 3,
  },
  eduRecord: {
    marginBottom: cvPdfLayout.educationRecordMarginBottom,
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
            {model.tagline ? (
              <Text style={styles.title}>{model.tagline}</Text>
            ) : null}
            {model.site ? (
              <Link src={model.siteHref} style={styles.site}>
                {model.site}
              </Link>
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
                      <Text style={styles.nestedBulletText}>
                        {job.skills.join(", ")}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeading>Education</SectionHeading>
            {model.education.map((item) => {
              const spec = pdfEducationSpec(item);
              return (
                <View
                  key={`${item.qualexam}-${item.rangeLabel}`}
                  style={styles.eduRecord}
                  wrap={false}
                >
                  <Text style={styles.recordTitle}>
                    {pdfEducationExam(item)}
                  </Text>
                  <Text style={styles.recordTitle}>
                    {pdfEducationPlace(item)}
                  </Text>
                  <Text style={styles.recordDetail}>
                    {pdfEducationOutcome(item)}
                  </Text>
                  {spec ? (
                    <Text style={styles.recordDetail}>
                      {item.qualspectype}: {spec}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <SectionHeading>Certifications</SectionHeading>
            {model.certificates.map((item) => (
              <View
                key={`${item.name}-${item.issuedLabel}`}
                style={styles.record}
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
            {model.address ? (
              <Text style={styles.address}>{model.address}</Text>
            ) : null}
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
