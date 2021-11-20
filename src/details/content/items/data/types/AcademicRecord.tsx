export type AcademicRecord = {
  from: string;
  to?: string;
  qualexam: string;
  score: string;
  certauthtype: "Board" | "University";
  certauthname: string;
  institutetype: "School" | "College";
  institutename: string;
  qualspectype: "Subjects" | "Major";
  qualspec: string;
};
