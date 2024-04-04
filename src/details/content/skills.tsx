import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
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
import "./skillchip.sass";
import "./skills.sass";

export const Skills = () => {
  return (
    <>
      <Typography variant="h2" className="extra-padded title">
        Skills
      </Typography>
      <Container className="root-content skill-container">
        <Grid container direction="column" alignItems="center">
          <Grid item container justifyContent="center" alignItems="center">
            <Card className="skill-card">
              <CardContent>
                <Grid container>
                  <Grid item className="extra-padded">
                    <Typography variant="h4">Technical Skills:</Typography>
                  </Grid>
                  <Grid item className="extra-padded">
                    <Suspense fallback={<CgSpinner />}>
                      <SkillChipsBlock />
                    </Suspense>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container justifyContent="center">
            <Card className="lang-card">
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
      </Container>
    </>
  );
};
