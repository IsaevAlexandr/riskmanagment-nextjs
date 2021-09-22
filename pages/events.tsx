import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Layout } from "../components/Layout";
import { NextPage } from "next";

const Events: NextPage = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Events
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default Events;
