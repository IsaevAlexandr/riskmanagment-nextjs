import * as React from 'react';
import { NextPage } from 'next';
import { useMutation, useQuery } from 'react-query';
import { CellProps, Column } from 'react-table';
import { observer } from 'mobx-react-lite';
import { Container, Typography, IconButton, Stack, Breadcrumbs, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';

import { Layout, RiskModalForm, RiskMatrix, Table } from '../components';
import { useStores } from '../hooks';
import { riskCrudApi } from '../api';
import { calculateCoordsForMatrix } from '../utils';

import { Risk } from '.prisma/client';

interface GetRiskColumns {
  onUpdate(r: Risk): void;
  onDelete(r: Risk): void;
  onDescClick(r: Risk): void;
}

export const getRiskColumns = ({
  onUpdate,
  onDelete,
  onDescClick,
}: GetRiskColumns): Column<Risk>[] => {
  return [
    { Header: 'N', accessor: (x) => x.id, width: 50 },
    {
      Header: '',
      id: 'controls',
      accessor: (x) => x,
      Cell({ value }: CellProps<Risk, Risk>) {
        return (
          <Stack spacing={2} direction="row">
            <IconButton onClick={() => onUpdate(value)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(value)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
    { Header: 'Название', accessor: (x) => x.name },
    {
      Header: 'Описание',
      id: 'description',
      accessor: (x) => x,
      Cell({ value }: CellProps<Risk, Risk>) {
        return value.description?.startsWith('/') ? (
          <IconButton onClick={() => onDescClick(value)}>
            <InsertPhotoRoundedIcon />
          </IconButton>
        ) : (
          value.description
        );
      },
    },
    { Header: 'Категория', accessor: (x) => x.category },
    { Header: 'Ключевой фактор', accessor: (x) => x.reason },
    { Header: 'Вероятность (текущая)', accessor: (x) => x.probability_before },
    { Header: 'Среднее НПВ, тыс. руб', accessor: (x) => x.time_recovery_before },
    {
      Header: 'Затраты на восстановление, тыс. руб',
      accessor: (x) => x.costs_recovery_after,
    },
    { Header: 'Текущий ущерб, тыс. руб', accessor: (x) => x.costs_recovery_before },
    { Header: 'Мероприятие', accessor: (x) => x.measure_probability_presence },
    {
      Header: 'Вероятность после мероприятия',
      accessor: (x) => x.probability_after,
      width: 200,
    },
    {
      Header: 'Время на восстановление после мероприятия, часы',
      accessor: (x) => x.time_recovery_after,
      width: 240,
    },
    { Header: 'Бизнес-процесс', accessor: (x) => x.business_process },
    { Header: 'Владелец риска', accessor: (x) => x.risk_owner },
  ];
};

const Index: NextPage = () => {
  const { risks, riskForm, imageModal } = useStores();
  useQuery('risks', () => riskCrudApi.get(), { onSuccess: risks.setData });
  const createMutation = useMutation((d: Risk) => riskCrudApi.post(d), {
    onSuccess: risks.addData,
  });
  const updateMutation = useMutation((d: Risk) => riskCrudApi.put(d), {
    onSuccess: (r) => risks.updateItem(r),
  });
  const deleteMutation = useMutation((d: Risk) => riskCrudApi.delete(d), {
    onSuccess: (r) => risks.deleteItem(r),
  });
  const columns = React.useMemo(
    () =>
      getRiskColumns({
        onUpdate: (r) => riskForm.open({ formSt: r, onSubmit: updateMutation.mutate }),
        onDelete: (r) => deleteMutation.mutate(r),
        onDescClick: (r) =>
          imageModal.setOpen({ imageSrc: r.description || '', title: 'Описание риска' }),
      }),
    [deleteMutation, imageModal, riskForm, updateMutation.mutate],
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Управление рисками</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => riskForm.open({ onSubmit: createMutation.mutate })}
            >
              <AddIcon />
              Добавить риск
            </Button>
          </Grid>

          <Grid item>
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
            <Table<Risk> columns={columns} data={risks.data} />
          </Grid>
        </Grid>

        <RiskModalForm />
      </Container>
    </Layout>
  );
};

export default observer(Index);
