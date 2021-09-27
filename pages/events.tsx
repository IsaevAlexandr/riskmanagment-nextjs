import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Breadcrumbs, Button, Grid, IconButton, Stack, TextField } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import { CellProps, Column } from 'react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Layout } from '../components/Layout';
import { eventCrudApi } from '../api';
import { useStores } from '../hooks';
import { EventModalForm } from '../components/EventModalForm';
import { Table } from '../components/Table';
import { ResponsiveImage } from '../components/ResponsiveImage';

import { Event } from '.prisma/client';

const getColumns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate(e: Event): void;
  onDelete(e: Event): void;
}): Column<Event>[] => {
  return [
    { Header: 'N', accessor: (x) => x.id, width: 50 },

    {
      Header: '',
      id: 'controls',
      accessor: (x) => x,
      Cell({ value }: CellProps<Event, Event>) {
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

    { Header: 'Мероприятие', accessor: (x) => x.event },
    {
      Header: 'Описание мероприятия',
      accessor: (x) => x.description,
      width: 200,
    },
    { Header: 'Адресуемый риск', accessor: (x) => x.risk },
    { Header: 'N риска', accessor: (x) => x.riskNum },
    { Header: 'Вероятность до', accessor: (x) => x.probabilityBefore },
    { Header: 'Вероятность после', accessor: (x) => x.probabilityAfter },
    {
      Header: 'Потери до, тыс. руб',
      accessor: (x) => x.lossesBefore,
      width: 200,
    },
    {
      Header: 'Потери после, тыс. руб',
      accessor: (x) => x.lossesAfter,
      width: 200,
    },
    {
      Header: 'Оценка риска до, тыс. руб',
      accessor: (x) => x.riskAssessmentBefore,
      width: 200,
    },
    {
      Header: 'Оценка риска после, тыс. руб',
      accessor: (x) => x.riskAssessmentAfter,
      width: 200,
    },
    { Header: 'Дата начала', accessor: (x) => x.startDate },
    { Header: 'Дата завершения', accessor: (x) => x.endDate },
    { Header: 'Стоимость мероприятия, тыс. руб', accessor: (x) => x.totalCost },
    { Header: 'Ответственный', accessor: (x) => x.responsible },
    { Header: 'Статус', accessor: (x) => x.status },
  ];
};

const Events: NextPage = () => {
  const { events, eventForm } = useStores();
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);

  useQuery('events', () => eventCrudApi.get(), {
    onSuccess: events.setData,
  });
  const createMutation = useMutation((e: Event) => eventCrudApi.post(e), {
    onSuccess: events.addData,
  });
  const updateMutation = useMutation((e: Event) => eventCrudApi.put(e), {
    onSuccess: (e) => events.updateItem(e),
  });
  const deleteMutation = useMutation((e: Event) => eventCrudApi.delete(e), {
    onSuccess: (e) => events.deleteItem(e),
  });

  const columns = React.useMemo(
    () =>
      getColumns({
        onUpdate: (e) => eventForm.open({ formSt: e, onSubmit: (e) => updateMutation.mutate(e) }),
        onDelete: (e) => deleteMutation.mutate(e),
      }),
    [deleteMutation, eventForm, updateMutation],
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Планирование мероприятий по снижению рисков</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item sx={{ mr: 'auto' }}>
            <Button
              variant="contained"
              onClick={() => eventForm.open({ onSubmit: (v) => createMutation.mutate(v) })}
            >
              <AddIcon />
              Мероприятие
            </Button>
          </Grid>

          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Дата с"
                endText="Дата по"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} variant="standard" />
                    <Box sx={{ mx: 2 }}> - </Box>
                    <TextField {...endProps} variant="standard" />
                  </>
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <ResponsiveImage src="/Gantt_Chart.jpg" />
          </Grid>

          <Grid item xs={12}>
            <Table<Event> columns={columns} data={events.data} />
          </Grid>
        </Grid>

        <EventModalForm />
      </Container>
    </Layout>
  );
};

export default observer(Events);
