import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Breadcrumbs, Button, Grid, TextField } from '@mui/material';
import { Table, Column } from 'fixed-data-table-2';
import { useMutation, useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';

import { Layout } from '../components/Layout';
import { createEvent, getEvents } from '../api';
import { useStores, useWindowResize } from '../hooks';
import { CustomColumn, EventDto } from '../interfaces';
import { EventModalForm } from '../components/EventModalForm';
import { TextCell } from '../components/TextCell';
import { SortHeaderCell } from '../components/SortHeaderCell';
import { CELL_HEIGHT } from '../constants';

import { Event } from '.prisma/client';

const columns: CustomColumn<Event>[] = [
  {
    title: 'N',
    columnKey: 'id',
    width: 100,
    fixed: true,
  },
  {
    title: 'Мероприятие',
    columnKey: 'event',
    width: 200,
    fixed: true,
  },
  {
    title: 'Описание мероприятия',
    columnKey: 'description',
    width: 200,
  },
  {
    title: 'Адресуемый риск',
    columnKey: 'risk',
    width: 200,
  },
  {
    title: 'N риска',
    columnKey: 'riskNum',
    width: 200,
  },
  {
    title: 'Вероятность до',
    columnKey: 'probabilityBefore',
    width: 200,
  },
  {
    title: 'Вероятность после',
    columnKey: 'probabilityAfter',
    width: 200,
  },
  {
    title: 'Потери до, тыс. руб',
    columnKey: 'lossesBefore',
    width: 200,
  },
  {
    title: 'Потери после, тыс. руб',
    columnKey: 'lossesAfter',
    width: 200,
  },
  {
    title: 'Оценка риска до, тыс. руб',
    columnKey: 'riskAssessmentBefore',
    width: 200,
  },
  {
    title: 'Оценка риска после, тыс. руб',
    columnKey: 'riskAssessmentAfter',
    width: 200,
  },
  {
    title: 'Дата начала',
    columnKey: 'startDate',
    width: 200,
  },
  {
    title: 'Дата завершения',
    columnKey: 'endDate',
    width: 200,
  },
  {
    title: 'Стоимость мероприятия',
    columnKey: 'totalCost',
    width: 200,
  },
  {
    title: 'Ответственный',
    columnKey: 'responsible',
    width: 200,
  },
  {
    title: 'Статус',
    columnKey: 'status',
    width: 200,
  },
];

const Events: NextPage = () => {
  const { events, eventForm } = useStores();
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);
  const { height, width } = useWindowResize();

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
            <Table
              rowHeight={CELL_HEIGHT}
              rowsCount={events.data.length}
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
                      onSortChange={events.sortByProp}
                      sortDir={events.colSortDirs[columnKey]}
                    >
                      {title}
                    </SortHeaderCell>
                  }
                  cell={<TextCell data={events.data} />}
                  {...props}
                />
              ))}
            </Table>
          </Grid>
        </Grid>

        <EventModalForm onSave={handleSaveEvent} />
      </Container>
    </Layout>
  );
};

export default observer(Events);
