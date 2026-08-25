"use client";

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Suspense } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaLanguage } from "react-icons/fa";
import { LanguageBoard } from "./items/skill.lang";
import { SkillChipsBlock } from "./items/skill.tech";

const fullWidth = { width: "100%" } as const;

export const Skills = () => {
  return (
    <>
      <Typography variant="h2" className="extra-padded title">
        Skills
      </Typography>
      <Container className="root-content skill-container">
        <Stack spacing={2} sx={fullWidth}>
          <Grid container sx={fullWidth}>
            <Grid size={12} sx={{ ...fullWidth, display: "flex" }}>
              <Card
                className="skill-card"
                sx={{ ...fullWidth, overflow: "visible" }}
              >
                <CardContent sx={fullWidth}>
                  <Grid container sx={fullWidth}>
                    <Grid
                      size={12}
                      className="extra-padded"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h4">Technical Skills:</Typography>
                    </Grid>
                    <Grid size={12} className="extra-padded" sx={fullWidth}>
                      <Suspense fallback={<CgSpinner />}>
                        <SkillChipsBlock />
                      </Suspense>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={fullWidth}>
            <Grid size={12} sx={{ ...fullWidth, display: "flex" }}>
              <Card className="lang-card" sx={fullWidth}>
                <CardContent>
                  <div className="sub-head-title">
                    <Avatar className="sub-head-icon">
                      <FaLanguage />
                    </Avatar>
                    <Typography
                      variant="h4"
                      component="h3"
                      className="sub-head-text"
                    >
                      Languages Known:
                    </Typography>
                  </div>
                  <TableContainer className="padding-top-bottom">
                    <Table>
                      <TableHead>
                        <TableRow className="padding-left-right">
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Language
                            </Typography>
                          </TableCell>
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Reading &amp; Writing
                            </Typography>
                          </TableCell>
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Listening &amp; Speaking
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <Suspense fallback={<CgSpinner />}>
                          <LanguageBoard />
                        </Suspense>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};
