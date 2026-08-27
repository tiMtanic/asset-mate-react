import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";

function AboutPage() {
  return (
    <Box>
      <PageHeader
        icon={InfoOutlinedIcon}
        title={"About"}
        caption={"Learn more about this project"}
      />
      <PageContent displayWithoutCard={true}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
                About Asset Mate
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                }}
              >
                Asset Mate is a single-page application for displaying company
                information, including stock price data.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mt: 2,
                  lineHeight: 1.7,
                }}
              >
                The application uses a mock backend, so stock prices may not
                always be up to date. The main focus of the project is building
                a responsive frontend with a mobile-first approach.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <GitHubIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography variant="h6" component="h2">
                  Source Code
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                You can find more detailed information about the project in the{" "}
                <Link
                  href="https://github.com/tiMtanic/asset-mate-react"
                  target="_blank"
                  underline="hover"
                >
                  GitHub Repository
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </PageContent>
    </Box>
  );
}

export default AboutPage;
