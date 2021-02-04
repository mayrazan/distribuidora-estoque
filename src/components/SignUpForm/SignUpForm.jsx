import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { registerForm, getDataApi } from "../../services/getDataApi";
import { alertMessage, successMessage } from "../../utils/messages";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignUpForm() {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: "",
    password: "",
    type: "user",
  });
  const history = useHistory();
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);
  const [isMessageError, setMessageError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getDataApi("users");
      setUsers(response);
    })();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerForm("users", form);
      setMessageSuccess(true);

      setTimeout(() => redirectToLogin(), 1000);
    }
  }

  function validateForm() {
    const response = users.filter((field) => {
      return field.email === form.email;
    }).length;

    if (form.email !== "" && form.password !== "" && response === 0) {
      setMessageVisible(false);
      return true;
    } else {
      setMessageVisible(true);
      if (response > 0) {
        setMessageError(true);
      }
    }
  }

  function redirectToLogin() {
    history.push("/");
    //window.location.reload();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(event) => {
              setForm({ ...form, password: event.target.value });
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Cadastrar
          </Button>
        </form>
      </div>

      {isMessageVisible ? alertMessage(classes.alerts, 1) : ""}
      {isMessageError ? alertMessage(classes.alerts, 2) : ""}
      {isMessageSuccess ? successMessage(classes.alerts) : ""}
    </Container>
  );
}
