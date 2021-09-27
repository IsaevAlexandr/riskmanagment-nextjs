import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Breadcrumbs, Button, Grid, TextField } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import { Column } from 'react-table';

import { Layout } from '../components/Layout';
import { createEvent, getEvents } from '../api';
import { useStores } from '../hooks';
import { EventDto } from '../interfaces';
import { EventModalForm } from '../components/EventModalForm';
import { Table } from '../components/Table';

import { Event } from '.prisma/client';

const getColumns = (): Column<Event>[] => {
  return [
    { Header: 'N', accessor: (x) => x.id, width: 50 },
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
    { Header: 'Стоимость мероприятия', accessor: (x) => x.totalCost },
    { Header: 'Ответственный', accessor: (x) => x.responsible },
    { Header: 'Статус', accessor: (x) => x.status },
  ];
};

const Events: NextPage = () => {
  const { events, eventForm } = useStores();
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);
  const columns = React.useMemo(() => getColumns(), []);

  useQuery('events', () => getEvents(), {
    onSuccess: events.setData,
  });
  const { mutate } = useMutation((event: EventDto) => createEvent(event), {
    onSuccess: events.addData,
  });

  const handleSaveEvent = (formState: Event) => {
    mutate(formState);
  };

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="h5">Мероприятия</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item sx={{ mr: 'auto' }}>
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
          <Grid item>
            <Button variant="contained" onClick={() => eventForm.open()}>
              <AddIcon />
              Мероприятие
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Table<Event> columns={columns} data={events.data} />
          </Grid>
        </Grid>

        <EventModalForm onSave={handleSaveEvent} />
      </Container>
    </Layout>
  );
};

export default observer(Events);
