import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NextPage } from 'next';

import { Layout } from '../components/Layout';

// TODO: с зависимсотями разобраться
const Index: NextPage = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Risks
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default Index;
