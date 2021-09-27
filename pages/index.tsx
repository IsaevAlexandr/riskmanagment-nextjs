import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Breadcrumbs, Button, Grid, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from 'react-query';
import { Column } from 'react-table';

import { Layout } from '../components/Layout';
import { useStores } from '../hooks';
import { RiskDto } from '../interfaces';
import { createRisk, getRisks } from '../api';
import { RiskModalForm } from '../components/RiskModalForm';
import { RiskMatrix } from '../components/RiskMatrix/RiskMatrix';
import { calculateCoordsForMatrix } from '../utils/calculateCoordsForMatrix';
import { Table } from '../components/Table';

import { Risk } from '.prisma/client';

export const getColumns = (): Column<Risk>[] => {
  return [
    { Header: 'N', accessor: (x) => x.id, width: 50 },
    { Header: 'Название', accessor: (x) => x.name },
    {
      Header: 'Описание',
      accessor: (x) => x.description,
    },
    { Header: 'Категория', accessor: (x) => x.category },
    { Header: 'Ключевой фактор', accessor: (x) => x.reason },
    { Header: 'Вероятность (текущая)', accessor: (x) => x.probability_before },
    { Header: 'Среднее НПВ', accessor: (x) => x.time_recovery_before },
    {
      Header: 'Затраты на восстановление',
      accessor: (x) => x.costs_recovery_after,
    },
    { Header: 'Текущий ущерб', accessor: (x) => x.costs_recovery_before },
    { Header: 'Мероприятие', accessor: (x) => x.measure_probability_presence },
    {
      Header: 'Вероятность после мероприятия',
      accessor: (x) => x.probability_after,
      width: 200,
    },
    {
      Header: 'Время на восстановление после мероприятия',
      accessor: (x) => x.time_recovery_after,
      width: 240,
    },
    { Header: 'Бизнес-процесс', accessor: (x) => x.business_process },
    { Header: 'Владелец риска', accessor: (x) => x.risk_owner },
  ];
};

const Index: NextPage = () => {
  const { risks, riskForm } = useStores();
  useQuery('risks', () => getRisks(), { onSuccess: risks.setData });
  const { mutate } = useMutation((d: RiskDto) => createRisk(d), {
    onSuccess: risks.addData,
  });

  const handleSave = (formState: Risk) => {
    mutate(formState);
  };

  const columns = React.useMemo(() => getColumns(), []);

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Риски</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={() => riskForm.open()}>
              <AddIcon />
              Управление рисками
            </Button>
          </Grid>

          <Grid item xs={12}>
            <RiskMatrix
              cellWidth={60}
              data={risks.data.map((risk) => {
                const { riskFactor, riskProbability } = calculateCoordsForMatrix(risk);

                return {
                  riskProbability,
                  riskFactor,
                  risk,
                };
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={4} sx={{ overflow: 'hidden' }}>
              <Table<Risk> columns={columns} data={risks.data} />
            </Paper>
          </Grid>
        </Grid>

        <RiskModalForm onSave={handleSave} />
      </Container>
    </Layout>
  );
};

export default observer(Index);
