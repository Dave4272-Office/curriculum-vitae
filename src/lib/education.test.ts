import { expect, test } from "vitest";
import { presentEducation, withOptionalAbbr } from "./education";
import type { AcademicRecord } from "./types";

const btech: AcademicRecord = {
  from: "2016",
  to: "2020",
  qualexam: "Bachelor of Technology",
  qualexammoniker: "Bachelors",
  score: "8.32 DGPA",
  certauthtype: "University",
  certauthname: "Maulana Abul Kalam Azad University of Technology",
  certauthabbr: "MAKAUT",
  institutetype: "College",
  institutename: "Birbhum Institute of Engineering and Technology, Suri",
  instituteabbr: "BIET, Suri",
  qualspectype: "Major",
  qualspec: "Computer Science and Engineering",
  qualspecabbr: "CSE",
};

const aissce: AcademicRecord = {
  from: "2014",
  to: "2016",
  qualexam: "AISSCE",
  qualexammoniker: "Sr. Secondary | XII",
  score: "84 %",
  certauthtype: "Board",
  certauthname: "Central Board of Secondary Education",
  certauthabbr: "CBSE",
  institutetype: "School",
  institutename: "Sainik School Purulia",
  instituteabbr: "SSP",
  qualspectype: "Subjects",
  qualspec: "English, Physics, Chemistry, Mathematics, Computer Science (C++)",
  qualspecabbr: "ENG, PHY, CHEM, MATH, CS(C++)",
};

const aisse: AcademicRecord = {
  from: "2009",
  to: "2014",
  qualexam: "AISSE",
  qualexammoniker: "Secondary | X",
  score: "9.2 CGPA (87.4 %)",
  certauthtype: "Board",
  certauthname: "Central Board of Secondary Education",
  certauthabbr: "CBSE",
  institutetype: "School",
  institutename: "Sainik School Purulia",
  instituteabbr: "SSP",
  qualspectype: "Subjects",
  qualspec: "General Education",
  qualspecabbr: null,
};

test("optional abbreviations wrap the full name and skip empty parentheses", () => {
  expect(withOptionalAbbr("Bachelor of Technology", "Bachelors")).toBe(
    "Bachelor of Technology (Bachelors)",
  );
  expect(withOptionalAbbr("Sainik School Purulia", null)).toBe(
    "Sainik School Purulia",
  );
});

test("site lines pair institute with institute abbr and keep full spec copy", () => {
  expect(presentEducation(btech, "site")).toEqual({
    exam: "Bachelor of Technology (Bachelors)",
    rangeLabel: "2016–2020",
    place: "Birbhum Institute of Engineering and Technology, Suri (BIET, Suri)",
    authority: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    spec: "Major: Computer Science and Engineering",
    outcome: "8.32 DGPA",
  });
  expect(presentEducation(aissce, "site")).toEqual({
    exam: "AISSCE (Sr. Secondary | XII)",
    rangeLabel: "2014–2016",
    place: "Sainik School Purulia (SSP)",
    authority: "Central Board of Secondary Education (CBSE)",
    spec: "Subjects: English, Physics, Chemistry, Mathematics, Computer Science (C++)",
    outcome: "84 %",
  });
  expect(presentEducation(aisse, "site")).toEqual({
    exam: "AISSE (Secondary | X)",
    rangeLabel: "2009–2014",
    place: "Sainik School Purulia (SSP)",
    authority: "Central Board of Secondary Education (CBSE)",
    spec: "Subjects: General Education",
    outcome: "9.2 CGPA (87.4 %)",
  });
});

test("PDF lines pair institute with certifying-authority abbr and compact spec", () => {
  expect(presentEducation(btech, "pdf")).toEqual({
    exam: "Bachelor of Technology (Bachelors)",
    rangeLabel: "2016–2020",
    place: "Birbhum Institute of Engineering and Technology, Suri (MAKAUT)",
    authority: null,
    spec: "Major: Computer Science and Engineering",
    outcome: "2020, 8.32 DGPA",
  });
  expect(presentEducation(aissce, "pdf")).toEqual({
    exam: "AISSCE (Sr. Secondary | XII)",
    rangeLabel: "2014–2016",
    place: "Sainik School Purulia (CBSE)",
    authority: null,
    spec: "Subjects: ENG, PHY, CHEM, MATH, CS(C++)",
    outcome: "2016, 84 %",
  });
  expect(presentEducation(aisse, "pdf")).toEqual({
    exam: "AISSE (Secondary | X)",
    rangeLabel: "2009–2014",
    place: "Sainik School Purulia (CBSE)",
    authority: null,
    spec: null,
    outcome: "2014, 9.2 CGPA (87.4 %)",
  });
});

test("PDF place and exam stay unwrapped when the paired abbr is missing", () => {
  expect(
    presentEducation(
      { ...aisse, certauthabbr: null, qualexammoniker: null },
      "pdf",
    ),
  ).toMatchObject({
    exam: "AISSE",
    place: "Sainik School Purulia",
  });
});

test("PDF Subjects with a blank abbr drop the spec line", () => {
  expect(
    presentEducation({ ...aisse, qualspecabbr: "" }, "pdf").spec,
  ).toBeNull();
});
