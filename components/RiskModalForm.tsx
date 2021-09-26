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

import { FormTextField } from './FormTextField';

import { Risk } from '.prisma/client';

interface ModalFormProps {
  onSave(v: Risk): void;
}

export const RiskModalForm: React.FC<ModalFormProps> = observer(({ onSave }) => {
  const { riskForm } = useStores();

  const handleSubmit = async (form: Risk) => {
    onSave(form);

    riskForm.onClose();
  };

  return (
    <Dialog open={riskForm.isOpen} onClose={riskForm.onClose}>
      <DialogTitle>Добавление нового риска</DialogTitle>
      <Form initialValues={riskForm.initialState} onSubmit={handleSubmit}>
        {(props) => (
          <>
            <DialogContent>
              <img src="./riskSuggest.jpeg" alt="Risk suggest" style={{ width: '100%' }} />
              <DialogContentText>Чтобы добавить новый риск, заполните поля ниже</DialogContentText>

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
                  <FormTextField label="Название риска" name="name" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Описание" name="description" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Категория" name="category" fullWidth />
                </Grid>

                <Grid item>
                  <FormTextField label="Ключевой фактор" name="reason" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField label="Среднее НПВ" name="time_recovery_before" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Затраты на восстановление"
                    name="costs_recovery_after"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FormTextField label="Текущий ущерб" name="costs_recovery_before" fullWidth />
                </Grid>
                <Grid item>
                  <FormTextField
                    label="Мероприятие"
                    name="measure_probability_presence"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item>
                <FormTextField
                  label="Вероятность после мероприятия"
                  name="probability_after"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FormTextField
                  label="Потери времени на восстановление после мероприятия"
                  name="time_recovery_after"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FormTextField label="Текущая вероятность" name="probability_before" fullWidth />
              </Grid>
              <Grid item>
                <FormTextField label="Бизнес-процесс" name="business_process" fullWidth />
              </Grid>
              <Grid item>
                <FormTextField label="Владелец риска" name="risk_owner" fullWidth />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={riskForm.onClose}>Отмена</Button>
              <Button onClick={props.handleSubmit}>Сохранить</Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
});
