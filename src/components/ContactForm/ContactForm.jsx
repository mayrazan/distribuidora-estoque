import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { registerForm } from "../../services/getDataApi";
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

export default function ContactForm() {
  const classes = useStyles();
  const [form, setForm] = useState({
    name: "",
    supermarket: "",
    textField: "",
  });
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerForm("contact", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 400);
    }
  }

  function validateForm() {
    if (form.name !== "" && form.supermarket !== "" && form.textField !== "") {
      setMessageVisible(false);
      return true;
    } else {
      setMessageVisible(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Contato
        </Typography>

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoFocus
            value={form.name}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="supermarket"
            label="Mercado"
            id="supermarket"
            value={form.supermarket}
            onChange={(event) => {
              setForm({ ...form, supermarket: event.target.value });
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="textField"
            label="Campo de texto"
            id="textField"
            value={form.textField}
            onChange={(event) => {
              setForm({ ...form, textField: event.target.value });
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
      {isMessageSuccess ? successMessage(classes.alerts) : ""}
    </Container>
  );
}
