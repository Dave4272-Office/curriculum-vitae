import { DateTime } from "luxon";
import { Certificate } from "./types/Certificate";

export const certList: Certificate[] = [
  {
    include: true,
    name: "MTA: HTML5 Application Development Fundamentals - Certified 2018",
    issuer: "Microsoft",
    issuericon: "static/logos/third-party/Microsoft.png",
    issuedate: DateTime.local(2018, 1, 11),
    credurl:
      "https://www.credly.com/badges/ce98fb09-d34f-4d38-b10d-f0f996a83c50/public_url",
  },
  {
    include: true,
    name: "Introduction to Git for Data Science",
    issuer: "DataCamp",
    issuericon: "static/logos/third-party/DataCamp.png",
    issuedate: DateTime.local(2018, 6, 7),
    certid: "5208174",
    credurl:
      "https://www.datacamp.com/statement-of-accomplishment/course/2288a86bccc6dac87de35445a748344c1a5cd44b",
  },
  {
    include: true,
    name: "Docker Essentials: A Developer Introduction",
    issuer: "IBM",
    issuericon: "static/logos/third-party/IBM.png",
    issuedate: DateTime.local(2019, 4, 3),
    credurl:
      "https://www.credly.com/badges/75bbe476-8227-475c-9bb9-042a4356404e/public_url",
  },
  {
    include: true,
    name: "MTA: Introduction to Programming Using Python - Certified 2019",
    issuer: "Microsoft",
    issuericon: "static/logos/third-party/Microsoft.png",
    issuedate: DateTime.local(2019, 7, 13),
    credurl:
      "https://www.credly.com/badges/073eaa44-09ba-41f0-81d1-1a5b00ec2677/public_url",
  },
];
