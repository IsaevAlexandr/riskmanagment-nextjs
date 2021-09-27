import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Column, Table } from 'fixed-data-table-2';
import { Breadcrumbs, Button, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from 'react-query';

import { Layout } from '../components/Layout';
import { useWindowResize } from '../hooks/useWindowResize';
import { SortHeaderCell } from '../components/SortHeaderCell';
import { TextCell } from '../components/TextCell';
import { useStores } from '../hooks';
import { CELL_HEIGHT } from '../constants';
import { CustomColumn, RiskDto } from '../interfaces';
import { createRisk, getRisks } from '../api';
import { RiskModalForm } from '../components/RiskModalForm';

import { Risk } from '.prisma/client';

// TODO: с зависимсотями разобраться
// TODO: удалить src
// TODO: добавить page title на каждую страницу
const columns: CustomColumn<Risk>[] = [
  {
    title: 'N',
    columnKey: 'id',
    width: 100,
    fixed: true,
  },
  {
    title: 'Название',
    columnKey: 'name',
    width: 200,
    fixed: true,
  },
  {
    title: 'Описание',
    columnKey: 'description',
    width: 200,
  },
  {
    title: 'Категория',
    columnKey: 'category',
    width: 200,
  },
  {
    title: 'Ключевой фактор',
    columnKey: 'reason',
    width: 200,
  },
  {
    title: 'Вероятность (текущая)',
    columnKey: 'probability_before',
    width: 200,
  },
  {
    title: 'Среднее НПВ',
    columnKey: 'time_recovery_before',
    width: 200,
  },
  {
    title: 'Затраты на восстановление',
    columnKey: 'costs_recovery_after',
    width: 200,
  },
  {
    title: 'Текущий ущерб',
    columnKey: 'costs_recovery_before',
    width: 200,
  },
  {
    title: 'Мероприятие',
    columnKey: 'measure_probability_presence',
    width: 200,
  },
  {
    title: 'Вероятность после мероприятия',
    columnKey: 'probability_after',
    width: 200,
  },
  {
    title: 'Время на восстановление после мероприятия',
    columnKey: 'time_recovery_after',
    width: 200,
  },
  {
    title: 'Бизнес-процесс',
    columnKey: 'business_process',
    width: 200,
  },
  {
    title: 'Владелец риска',
    columnKey: 'risk_owner',
    width: 200,
  },
];

const Index: NextPage = () => {
  const { risks, riskForm } = useStores();
  useQuery('risks', () => getRisks(), { onSuccess: risks.setData });
  const { mutate } = useMutation((d: RiskDto) => createRisk(d), {
    onSuccess: risks.addData,
  });
  const { height, width } = useWindowResize();

  const handleSave = (formState: Risk) => {
    mutate(formState);
  };
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
            <Table
              rowHeight={CELL_HEIGHT}
              rowsCount={risks.data.length}
              headerHeight={CELL_HEIGHT}
              width={width ? Math.ceil(width / 1.6) : 1000}
              height={height ? Math.ceil(height / 1.6) : 500}
            >
              {columns.map(({ title, columnKey, ...props }) => (
                <Column
                  key={columnKey}
                  columnKey={columnKey}
                  header={
                    <SortHeaderCell
                      onSortChange={risks.sortByProp}
                      sortDir={risks.colSortDirs[columnKey]}
                    >
                      {title}
                    </SortHeaderCell>
                  }
                  cell={<TextCell data={risks.data} />}
                  {...props}
                />
              ))}
            </Table>
          </Grid>
        </Grid>

        <RiskModalForm onSave={handleSave} />
      </Container>
    </Layout>
  );
};

export default observer(Index);
