import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';
import { Form } from 'react-final-form';
import { observer } from 'mobx-react-lite';

import { useStores } from '../hooks';

import { FormTextField, parseNumberProps } from './FormTextField';

import { Event } from '.prisma/client';

interface ModalFormProps {
  onSave(v: Event): void;
}

export const EventModalForm: React.FC<ModalFormProps> = observer(({ onSave }) => {
  const { eventForm } = useStores();

  const handleSubmit = async (form: Event) => {
    onSave(form);

    eventForm.onClose();
  };

  return (
    <Dialog open={eventForm.isOpen} onClose={eventForm.onClose}>
      <DialogTitle>Добавление нового мероприятия</DialogTitle>
      <Form initialValues={eventForm.initialState} onSubmit={handleSubmit}>
        {(props) => (
          <>
            <DialogContent>
              <DialogContentText>
                Чтобы добавить новое мероприятие, заполните поля ниже
              </DialogContentText>

              <Grid
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                noValidate
                autoComplete="off"
                container
                spacing={2}
              >
                <Grid item>
                  <FormTextField label="Мероприятие" name="event" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Описание мероприятия" name="description" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Адресуемый риск" name="risk" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="N риска" name="riskNum" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Вероятность до"
                    name="probabilityBefore"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Вероятность после"
                    name="probabilityAfter"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Потери до, тыс. руб"
                    name="lossesBefore"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Потери после, тыс. руб"
                    name="lossesAfter"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Оценка риска до, тыс. руб"
                    name="riskAssessmentBefore"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Оценка риска после, тыс. руб"
                    name="riskAssessmentAfter"
                    fullWidth
                    {...parseNumberProps}
                  />
                </Grid>
                <Grid item>
                  <FormTextField label="Дата начала" name="startDate" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Дата завершения" name="endDate" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Стоимость мероприятия" name="totalCost" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Ответственный" name="responsible" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Статус" name="status" fullWidth />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={eventForm.onClose}>Отмена</Button>
              <Button onClick={props.handleSubmit}>Сохранить</Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
});
