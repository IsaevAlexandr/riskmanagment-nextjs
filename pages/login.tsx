import React from "react";

import { signIn, providers } from "next-auth/client";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";

import { Layout } from "../components/Layout";
import { Await, RegisterUserDto } from "../interfaces";
import { Alert, Button, Container, Grid, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { FormTextField } from "../components/FormTextField";
import { Box } from "@mui/system";
import Link from "../src/Link";

interface PageProps {
  providers: Await<ReturnType<typeof providers>>;
}

const AUTH_ERRORS: Record<string, string> = {
  OAuthAccountNotLinked:
    "На данный момент авторизация через несколько провайдеров c одним email не поддерживается. Зайдите под тем провайдером, которым вы регистрировались",
};

type FormState = RegisterUserDto;

const Login: NextPage<PageProps> = ({ providers }) => {
  console.log("🚀 ~ file: login.tsx ~ line 37 ~ providers", providers);
  const router = useRouter();
  const [initState] = React.useState<FormState>({
    username: "",
    password: "",
  });

  const error: string =
    typeof router.query.error === "string" ? router.query.error : "";

  const handleSubmit = async (values: FormState) => {
    return signIn(providers!.credentials.id, {
      ...values,
      callbackUrl: "/",
    });
  };

  return (
    <Layout>
      <Container maxWidth="xs">
        <Grid spacing={2} sx={{ flexGrow: 1 }} direction="column" container>
          <Grid item>
            <Typography variant="h4">Войти в приложение</Typography>
          </Grid>
          {router.query.error && (
            <Grid item>
              <Alert severity="error">{AUTH_ERRORS[error] || error}</Alert>
            </Grid>
          )}

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
                      label="Логин пользователя"
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
                      Войти в приложение
                    </Button>
                  </Grid>

                  <Grid item>
                    <Link href="/register">Зарегистрироваться</Link>
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

Login.getInitialProps = async (_ctx: NextPageContext) => {
  return {
    providers: await providers(),
  };
};

export default Login;
