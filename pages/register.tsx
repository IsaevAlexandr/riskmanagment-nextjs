import React from "react";
import { Form } from "react-final-form";
import { Alert, Button, Container, Grid, Typography } from "@mui/material";
import { signIn } from "next-auth/client";
import { NextPage } from "next";

import { Layout } from "../components/Layout";
import { RegisterUserDto } from "../interfaces";

import { registerUsers } from "../api";
import { FormTextField } from "../components/FormTextField";

type FormState = RegisterUserDto;

const Register: NextPage = () => {
  const [error, setError] = React.useState<string>("");
  const [initState] = React.useState<FormState>({
    username: "",
    password: "",
  });

  const handleSubmit = async (formState: RegisterUserDto) => {
    try {
      await registerUsers(formState);

      signIn("credentials", { ...formState, callbackUrl: "/" });
    } catch (e) {
      setError(String(e));

      return;
    }
  };

  return (
    <Layout>
      <Container maxWidth="xs">
        <Grid
          spacing={2}
          sx={{ flexGrow: 1, justifyContent: "center" }}
          direction="column"
          container
        >
          <Grid item>
            <Typography variant="h4">Регистрация</Typography>
          </Grid>
          {error ? (
            <Grid item>
              <Alert severity="error">{error}</Alert>
            </Grid>
          ) : null}

          <Grid item>
            <Form onSubmit={handleSubmit} initialValues={initState}>
              {(props) => (
                <Grid
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={props.handleSubmit}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <FormTextField
                      label="Имя пользователя"
                      variant="standard"
                      name="username"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <FormTextField
                      name="password"
                      label="Пароль"
                      variant="standard"
                      type="password"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Зарегистрироваться
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Form>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Register;
