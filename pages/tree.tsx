import { Breadcrumbs, Grid, Typography, Container } from '@mui/material';
import { NextPage } from 'next';

import { Layout, ResponsiveImage } from '../components';

const TreePage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Дерево отказов</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12}>
            <ResponsiveImage src="/risk-tree.png" alt="risk tree" />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default TreePage;
