import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { Button, Grid, Link, TextField } from '@mui/material';
import { Table, Column, Cell, CellProps } from 'fixed-data-table-2';
import { useMutation, useQuery } from 'react-query';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';

import { Layout } from '../components/Layout';
import { createEvent, getEvents } from '../api';
import { useStores } from '../hooks';
import { EventDto, SortTypes } from '../interfaces';
import { EventModalForm } from '../components/EventModalForm';

import { Event } from '.prisma/client';

function reverseSortDirection(sortDir: SortTypes): SortTypes {
  return sortDir === 'DESC' ? 'ASC' : 'DESC';
}

interface SortHeaderCellProps {
  onSortChange(c: string, t: SortTypes): void;
  sortDir?: SortTypes;
}

const SortHeaderCell: React.FC<SortHeaderCellProps & CellProps> = ({
  onSortChange,
  sortDir,
  children,

  ...props
}) => {
  const _onSortChange = () => {
    if (onSortChange) {
      onSortChange(String(props.columnKey!), sortDir ? reverseSortDirection(sortDir) : 'DESC');
    }
  };

  return (
    <Cell {...props}>
      <Link
        underline="none"
        onClick={(e) => {
          e.preventDefault();
          _onSortChange();
        }}
      >
        {children} {sortDir ? (sortDir === 'DESC' ? '↓' : '↑') : ''}
      </Link>
    </Cell>
  );
};

function TextCellBase<T>({ data, ...props }: CellProps & { data: T[] }) {
  // @ts-ignore
  const dataToCell = data?.[props.rowIndex!]?.[props.columnKey!];

  return dataToCell ? <Cell {...props}>{dataToCell}</Cell> : null;
}

const TextCell = React.memo(TextCellBase);

const Events: NextPage = () => {
  const { events, eventForm } = useStores();
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);
  const ref = React.useRef<HTMLDivElement>(null);

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
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Мероприятия</Typography>
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

          <Grid item xs={12} ref={ref}>
            <Table
              rowHeight={50}
              rowsCount={events.data.length}
              headerHeight={50}
              width={ref.current?.getBoundingClientRect().width ?? 1000}
              height={Math.min(
                events.data.length * 50,
                typeof window !== 'undefined' ? window.innerHeight - 240 : 500,
              )}
              // {...this.props}
            >
              <Column
                columnKey="id"
                header={
                  <SortHeaderCell onSortChange={events.sortByProp} sortDir={events.colSortDirs.id}>
                    Id
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={100}
                fixed
              />
              <Column
                columnKey="event"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.event}
                  >
                    Мероприятие
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
                fixed
              />
              <Column
                columnKey="description"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.description}
                  >
                    Описание мероприятия
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="risk"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.risk}
                  >
                    Адресуемый риск
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="riskNum"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.riskNum}
                  >
                    N риска
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="probabilityBefore"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.probabilityBefore}
                  >
                    Вероятность до
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="probabilityAfter"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.probabilityAfter}
                  >
                    Вероятность после
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="lossesBefore"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.lossesBefore}
                  >
                    Потери до, тыс. руб
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="lossesAfter"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.lossesAfter}
                  >
                    Потери после, тыс. руб
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="riskAssessmentBefore"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.riskAssessmentBefore}
                  >
                    Оценка риска до, тыс. руб
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="riskAssessmentAfter"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.riskAssessmentAfter}
                  >
                    Оценка риска после, тыс. руб
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="startDate"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.startDate}
                  >
                    Дата начала
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="endDate"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.endDate}
                  >
                    Дата завершения
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="totalCost"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.totalCost}
                  >
                    Стоимость мероприятия
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="responsible"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.responsible}
                  >
                    Ответственный
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
              <Column
                columnKey="status"
                header={
                  <SortHeaderCell
                    onSortChange={events.sortByProp}
                    sortDir={events.colSortDirs.status}
                  >
                    Статус
                  </SortHeaderCell>
                }
                cell={<TextCell data={events.data} />}
                width={200}
              />
            </Table>
          </Grid>
        </Grid>

        <EventModalForm onSave={handleSaveEvent} />
      </Container>
    </Layout>
  );
};

export default observer(Events);
