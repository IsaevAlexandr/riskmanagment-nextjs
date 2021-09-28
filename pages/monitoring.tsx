import { Container, Typography, Alert, Breadcrumbs, Button, Grid } from '@mui/material';
import { NextPage } from 'next';
import UpdateIcon from '@mui/icons-material/Update';
import { Box } from '@mui/system';

import { Layout, ResponsiveImage } from '../components';
import { useMonitoringData } from '../hooks';

const Monitoring: NextPage = () => {
  const { updateData, generatedEvent } = useMonitoringData();

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Мониторинг рисков и непрерывности работы систем</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={updateData}>
              <UpdateIcon sx={{ mr: 1 }} />
              Обновить данные
            </Button>
          </Grid>
          <Grid item sx={{ ml: 'auto' }}>
            <Typography variant="subtitle1" color="GrayText">
              Данные автоматически обновляются каждые 5 секунд.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ minHeight: 48 }}>
              {generatedEvent.message && <Alert severity="warning">{generatedEvent.message}</Alert>}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ResponsiveImage src={generatedEvent.picture} alt="status image" />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Monitoring;
